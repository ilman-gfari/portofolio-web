# generate_data.py — data SINTETIS untuk latihan QA rekonsiliasi dua sistem (SUG vs Web DS).
# SUG dan Web DS di sini = dua sistem GENERIK: SUG = sumber (status dan pengukuran perangkat), Web DS = tampilan web yang menerima data dari SUG lewat sinkronisasi.
# Itu ASUMSI penulis; arti istilah SUG dan Web DS di perusahaan sebenarnya tidak ditemukan di sumber publik. Semua data ini fiktif.
# Cacat (defect) sengaja ditanam di Web DS dan dicatat di KUNCI_cacat_tertanam.md. Jangan dibaca sebelum menganalisis.
import numpy as np, pandas as pd
rng = np.random.default_rng(2026)
DAYS = pd.date_range("2026-10-01", "2026-10-30"); N = 300
REG = ["Sumatera","Jawa","Kalimantan","Sulawesi","Bali-Nusra"]; TYP = ["inverter_A","inverter_C","meter_A","meter_B","gateway_G"]; FW = ["v2.1","v2.2","v2.3"]
M = pd.DataFrame({"device_id": [f"DV{i:04d}" for i in range(1, N+1)], "region": rng.choice(REG, N, p=[.30,.35,.15,.12,.08]),
                  "device_type": rng.choice(TYP, N, p=[.28,.17,.22,.18,.15]), "firmware": rng.choice(FW, N, p=[.35,.40,.25])})
M["site_id"] = [f"ST{(i // 3) + 1:03d}" for i in range(N)]
M["install_date"] = pd.to_datetime("2024-01-01") + pd.to_timedelta(rng.integers(0, 600, N), unit="D")
new_ids = rng.choice(M.index[M.device_type != "gateway_G"], 5, replace=False); M.loc[new_ids, "install_date"] = pd.to_datetime("2026-09-01") + pd.to_timedelta(rng.integers(0, 25, 5), unit="D")
rest = M.index.difference(new_ids); orph_ids = rng.choice(rest[M.loc[rest, "device_type"] != "gateway_G"], 3, replace=False)
M["decommission_date"] = pd.NaT; M.loc[orph_ids, "decommission_date"] = pd.Timestamp("2026-10-05")
base = rng.uniform(8, 60, N); base[(M.device_type.str.startswith("meter")).values] = rng.uniform(20, 150, int(M.device_type.str.startswith("meter").sum()))
vbase = rng.uniform(222, 236, N); day_f = np.clip(rng.normal(1, .15, len(DAYS)), .5, 1.5)

# ---- SUG (sumber, dianggap benar)
rows = []
for di, d in enumerate(DAYS):
    active = M[(M.decommission_date.isna()) | (M.decommission_date > d)]
    for i in active.index:
        r = M.loc[i]; u = rng.random(); st = "online" if u < .93 else ("offline" if u < .98 else "alarm")
        t = d + pd.Timedelta(hours=23, minutes=int(rng.integers(40, 58)), seconds=int(rng.integers(0, 60))) if st != "offline" else d + pd.Timedelta(hours=int(rng.integers(6, 21)), minutes=int(rng.integers(0, 60)))
        en = np.nan if r.device_type == "gateway_G" else round(float(base[i] * day_f[di] * rng.uniform(.9, 1.1)), 2) if st != "offline" else round(float(base[i] * day_f[di] * rng.uniform(.1, .5)), 2)
        rows.append((r.device_id, d.strftime("%Y-%m-%d"), st, t.strftime("%Y-%m-%d %H:%M:%S"), en, round(float(vbase[i] + rng.normal(0, 1.2)), 1) if st != "offline" else np.nan))
SUG = pd.DataFrame(rows, columns=["device_id","snapshot_date","status","last_seen","energy_kwh","voltage_v"])

# ---- Web DS = SUG + cacat tertanam
W = SUG.merge(M[["device_id","region","device_type","firmware"]], on="device_id", how="left"); W["d"] = pd.to_datetime(W.snapshot_date); planted = {}
newset = set(M.loc[new_ids, "device_id"]); mask = W.device_id.isin(newset) & (W.d < "2026-10-22"); planted["C1_perangkat_baru_tidak_masuk_webds"] = int(mask.sum()); W = W[~mask].copy()
prev = SUG.assign(d=pd.to_datetime(SUG.snapshot_date) + pd.Timedelta(days=1)).set_index(["device_id","d"])[["status","last_seen","energy_kwh","voltage_v"]]
n_stale = 0
for dd in ["2026-10-09","2026-10-10","2026-10-21"]:
    m = (W.region == "Sumatera") & (W.d == dd)
    for i in W.index[m]:
        k = (W.at[i, "device_id"], pd.Timestamp(dd))
        if k in prev.index: W.loc[i, ["status","last_seen","energy_kwh","voltage_v"]] = prev.loc[k].values; n_stale += 1
planted["C2_data_basi_saat_sinkron_gagal_sumatera"] = n_stale
m = (W.device_type == "meter_B") & (W.d >= "2026-10-12") & (W.d <= "2026-10-21") & W.energy_kwh.notna(); W.loc[m, "energy_kwh"] *= 1000; planted["C3_energi_meter_B_x1000"] = int(m.sum())
m = (W.device_type == "inverter_C") & (W.d <= "2026-10-27") & (rng.random(len(W)) < .035); W.loc[m, "energy_kwh"] = np.nan; planted["C4_energi_kosong_inverter_C"] = int(m.sum())
m = (W.status == "online") & (rng.random(len(W)) < np.where(W.firmware == "v2.3", .03, .001)); W.loc[m, "status"] = "offline"; planted["C5_status_beda_firmware_v23_dominan"] = int(m.sum())
W["energy_kwh"] = W.energy_kwh.round(1)                                                         # selisih pembulatan: JINAK (toleransi)
dup = W[W.d.isin(pd.to_datetime(["2026-10-10","2026-10-11"]))].sample(45, random_state=5).copy(); dup["last_seen"] = (pd.to_datetime(dup.last_seen) + pd.Timedelta(minutes=3)).dt.strftime("%Y-%m-%d %H:%M:%S")
planted["C6_baris_ganda_setelah_retry"] = len(dup); W = pd.concat([W, dup])
orph = []
for i in orph_ids:
    for d in DAYS[DAYS >= "2026-10-05"]: orph.append((M.at[i, "device_id"], d.strftime("%Y-%m-%d"), "offline", "2026-10-04 23:50:00", 0.0, np.nan, M.at[i, "region"], M.at[i, "device_type"], M.at[i, "firmware"], d))
W = pd.concat([W, pd.DataFrame(orph, columns=W.columns)]); planted["C7_perangkat_dinonaktifkan_masih_tampil"] = len(orph)
W = W.drop(columns=["region","device_type","firmware","d"]).sort_values(["snapshot_date","device_id","last_seen"]).reset_index(drop=True)

# ---- log sinkronisasi
sl = []; rid = 0
for d in DAYS:
    for rg in REG:
        n_act = int(((SUG.snapshot_date == d.strftime("%Y-%m-%d")) & SUG.device_id.isin(M.loc[M.region == rg, "device_id"])).sum()); fail_day = rg == "Sumatera" and d.strftime("%Y-%m-%d") in ["2026-10-09","2026-10-10","2026-10-21"]
        for h in (0, 6, 12, 18):
            rid += 1; stt, rec, err = "ok", n_act, ""
            if fail_day and h in (6, 12): stt, rec, err = "failed", 0, "TIMEOUT_504"
            elif fail_day and h == 18: stt, rec, err = "partial", int(n_act * .82), "PARTIAL_BATCH"
            elif rng.random() < .01: stt, rec, err = "partial", int(n_act * rng.uniform(.97, .995)), "WARN_RETRY"
            sl.append((f"SYN{rid:05d}", (d + pd.Timedelta(hours=h)).strftime("%Y-%m-%d %H:%M:%S"), rg, n_act, rec, stt, err))
SYNC = pd.DataFrame(sl, columns=["run_id","run_time","region","records_sent","records_received","status","error_code"])

# ---- defect log, riwayat status (jejak audit), uji ulang
core = [("Perangkat baru tidak muncul di Web DS","data_hilang","high","2026-10-03","R3","2026-10-23","closed"),("Perangkat nonaktif masih tampil di Web DS","data_orphan","medium","2026-10-06","","","open"),
        ("Data basi saat sinkron gagal (Sumatera)","data_basi","high","2026-10-10","R3","2026-10-24","closed"),("Energi meter_B 1000x lipat","nilai_salah","critical","2026-10-14","R3","2026-10-23","closed"),
        ("Nilai energi kosong pada inverter_C","nilai_kosong","medium","2026-10-08","R4","2026-10-29","closed"),("Status berbeda pada firmware v2.3","status_beda","medium","2026-10-15","","","open"),
        ("Baris ganda setelah retry sinkron","duplikat","low","2026-10-12","R3","2026-10-23","closed"),("Energi dibulatkan 1 desimal di Web DS","pembulatan","info","2026-10-04","","2026-10-07","closed")]
fillers = ["Label kolom laporan ekspor berbeda dengan SUG","Urutan kolom ekspor CSV berubah","Filter wilayah lambat dimuat","Tooltip grafik memotong nilai","Format tanggal di halaman detail tidak seragam","Tombol unduh tidak aktif pada layar kecil",
           "Teks status terpotong pada tabel","Pencarian perangkat peka huruf besar-kecil","Halaman login menampilkan pesan error umum","Pagination melompat saat filter diubah","Legenda grafik tidak sesuai warna","Waktu muat dashboard lebih dari 8 detik",
           "Zona waktu tidak ditampilkan di kolom last seen","Ekspor melebihi 10 ribu baris gagal","Catatan rilis tidak mencantumkan perubahan skema","Peran pembaca bisa melihat tombol ubah","Nama wilayah beda ejaan di dua halaman","Grafik harian tidak menampilkan hari tanpa data",
           "Hasil pencarian tidak mempertahankan urutan","Dokumentasi API tidak mencantumkan kolom baru","Notifikasi alarm terlambat","Ikon status tidak terbaca pada mode gelap"]
cat_f = ["ui","ui","kinerja","ui","ui","ui","ui","ui","akses","ui","ui","kinerja","dokumentasi","kinerja","dokumentasi","akses","ui","ui","ui","dokumentasi","kinerja","ui"]
dl = [(f"DEF{i+1:03d}", t, c, sv, fd, "QA-1", "Tim Integrasi", "closed" if cl else "open", rel, cl) if False else (f"DEF{i+1:03d}", t, c, sv, fd, "QA-1", "Tim Integrasi", stt, rel, cl)
      for i, (t, c, sv, fd, rel, cl, stt) in enumerate(core)]
for j, (t, c) in enumerate(zip(fillers, cat_f)):
    fd = (pd.Timestamp("2026-10-02") + pd.Timedelta(days=int(rng.integers(0, 26)))); stt = rng.choice(["closed","closed","open","retest"], p=[.5, .2, .2, .1]); rel = "R3" if stt != "open" else ""
    cl = (fd + pd.Timedelta(days=int(rng.integers(4, 12)))).strftime("%Y-%m-%d") if stt == "closed" else ""
    dl.append((f"DEF{len(core)+j+1:03d}", t, c, rng.choice(["low","medium","low","info"]), fd.strftime("%Y-%m-%d"), "QA-1", "Tim UI" if c == "ui" else "Tim Integrasi", stt, rel, cl))
DEF = pd.DataFrame(dl, columns=["defect_id","title","category","severity","found_date","reported_by","owner","status","release_fixed","closed_date"])
hist = []
for r in DEF.itertuples():
    fd = pd.Timestamp(r.found_date); seq = [("", "open", fd, "QA-1", "Temuan dicatat")]
    t = fd + pd.Timedelta(days=1)
    if r.status != "open": seq.append(("open", "in_progress", t, "Dev-1", "Dikerjakan"))
    if r.status in ("closed", "retest"): t = t + pd.Timedelta(days=int(rng.integers(3, 8))); seq.append(("in_progress", "fixed", t, "Dev-1", f"Perbaikan masuk {r.release_fixed}")); t = t + pd.Timedelta(days=1); seq.append(("fixed", "retest", t, "QA-1", "Uji ulang"))
    if r.status == "closed":
        tc = max(pd.Timestamp(r.closed_date) + pd.Timedelta(hours=16), t + pd.Timedelta(hours=4)); seq.append(("retest", "closed", tc, "QA-1", "Lolos uji ulang")); DEF.loc[DEF.defect_id == r.defect_id, "closed_date"] = tc.strftime("%Y-%m-%d")
    for a, b, tt, who, note in seq: hist.append((r.defect_id, tt.strftime("%Y-%m-%d %H:%M:%S"), a, b, who, note))
HIST = pd.DataFrame(hist, columns=["defect_id","changed_at","from_status","to_status","changed_by","note"])
res = {"R1": dict(TC01="fail",TC02="fail",TC03="pass",TC04="fail",TC05="pass",TC06="pass",TC07="fail",TC08="fail"), "R2": dict(TC01="fail",TC02="fail",TC03="fail",TC04="fail",TC05="fail",TC06="fail",TC07="fail",TC08="fail"),
       "R3": dict(TC01="pass",TC02="fail",TC03="pass",TC04="fail",TC05="pass",TC06="pass",TC07="pass",TC08="fail"), "R4": dict(TC01="pass",TC02="fail",TC03="pass",TC04="pass",TC05="pass",TC06="pass",TC07="pass",TC08="fail")}
rel_d = {"R1":"2026-10-02","R2":"2026-10-13","R3":"2026-10-23","R4":"2026-10-29"}
tcn = dict(TC01="Semua perangkat SUG ada di Web DS",TC02="Status sama antara SUG dan Web DS",TC03="Nilai energi sama dalam toleransi",TC04="Tidak ada nilai kosong yang tidak wajar",TC05="Tidak ada baris ganda per perangkat per hari",TC06="Data tepat waktu setelah sinkron",TC07="Perangkat baru masuk Web DS",TC08="Perangkat nonaktif hilang dari Web DS")
TR = pd.DataFrame([(f"RUN-{r}-{tc}", r, rel_d[r], tc, tcn[tc], v) for r, d in res.items() for tc, v in d.items()], columns=["run_id","release","run_date","test_case","description","result"])

for name, df in [("device_master", M.assign(install_date=M.install_date.dt.strftime("%Y-%m-%d"), decommission_date=M.decommission_date.dt.strftime("%Y-%m-%d"))[["device_id","site_id","region","device_type","firmware","install_date","decommission_date"]]),
                 ("sug_daily", SUG), ("webds_daily", W), ("sync_job_log", SYNC), ("defect_log", DEF), ("defect_history", HIST), ("test_runs", TR)]:
    df.to_csv(f"{name}.csv", index=False); print(f"{name:16s}{len(df):>8}")
with open("KUNCI_cacat_tertanam.md", "w") as f:
    f.write("# Kunci jawaban: cacat yang sengaja ditanam di webds_daily.csv (JANGAN dibaca sebelum menganalisis)\n\n")
    for k, v in planted.items(): f.write(f"- {k}: {v} baris\n")
    f.write("\nJinak (bukan cacat): pembulatan energi 1 desimal di Web DS; gateway_G tidak punya energi (kosong di dua sistem); WARN_RETRY di log sinkron tanpa dampak data.\nRilis: R1 2026-10-02, R2 2026-10-13 (regresi energi meter_B), R3 2026-10-23, R4 2026-10-29.\n")
print(planted)
