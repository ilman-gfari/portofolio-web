# make_raw.py — mengotori 7 dataset: 1-10% baris per file, satu masalah per baris, dicek lewat assert. Seed tetap.
import pandas as pd, numpy as np
rng = np.random.default_rng(7); log = []
def dirty(name, df, issues):
    raw = df.astype(object).copy(); used = set(); n = len(df)
    for issue, col, frac, fn in issues:
        pool = [i for i in df.index if i not in used and (col is None or pd.notna(df.at[i, col]))]
        k = max(1, int(round(frac * n))); pick = rng.choice(pool, min(k, len(pool)), replace=False)
        for i in pick:
            raw.at[i, col] = fn(df.at[i, col]); used.add(i); log.append((name, i, col, issue))
    pct = 100 * len(used) / n; assert 1.0 <= pct <= 10.0, (name, pct)
    raw.to_csv(f"raw/{name}.csv", index=False); print(f"{name:16s} baris={n:>6} kotor={len(used):>5} ({pct:.2f}%)")
    return pct
ld = lambda n: pd.read_csv(f"{n}.csv", dtype=str, keep_default_na=False).replace("", np.nan)
def dmy(s): return pd.Timestamp(s).strftime("%d/%m/%Y")
def mon(s): return pd.Timestamp(s).strftime("%d-%b-%Y")
stat = [("status_kapital_spasi","status",.015,lambda v: " "+v.upper()+" "),("status_alias","status",.01,lambda v: {"online":"On-line","offline":"off","alarm":"ALARM!"}[v])]
dev = [("id_huruf_kecil","device_id",.01,lambda v: v.lower()),("id_spasi","device_id",.008,lambda v: v+" ")]
for n, extra in [("sug_daily", [("tanggal_dmy","snapshot_date",.015,dmy)]), ("webds_daily", [("tanggal_mon","snapshot_date",.015,mon)])]:
    df = ld(n); dirty(n, df, stat + dev + extra + [("energi_koma","energy_kwh",.012,lambda v: str(v).replace(".",",")),("energi_satuan_teks","energy_kwh",.006,lambda v: str(v)+" kWh")])
df = ld("device_master"); dirty("device_master", df, [("region_alias","region",.04,lambda v: {"Sumatera":"sumatra","Jawa":"JAWA","Kalimantan":"Kalimantan ","Sulawesi":"sulawesi","Bali-Nusra":"Bali Nusra"}[v]),("tipe_kapital","device_type",.02,lambda v: v.upper()),("tgl_dmy","install_date",.03,dmy)])
df = ld("sync_job_log"); dirty("sync_job_log", df, [("status_kapital","status",.04,lambda v: v.upper()),("region_alias","region",.03,lambda v: v.lower()),("error_spasi","error_code",.03,lambda v: v+" ")])
df = ld("defect_log"); dirty("defect_log", df, [("severity_alias","severity",.04,lambda v: {"critical":"Critical","high":"HIGH","medium":"med","low":"Low","info":"INFO"}[v]),("status_spasi","status",.03,lambda v: v.upper())])
df = ld("defect_history"); dirty("defect_history", df, [("status_kapital","to_status",.04,lambda v: v.upper()),("tgl_dmy","changed_at",.03,lambda v: pd.Timestamp(v).strftime("%d/%m/%Y %H:%M"))])
df = ld("test_runs"); dirty("test_runs", df, [("hasil_alias","result",.04,lambda v: {"pass":"PASSED","fail":"Failed"}[v]),("tgl_dmy","run_date",.03,dmy)])
pd.DataFrame(log, columns=["dataset","row_index","kolom","masalah"]).to_csv("issues_log.csv", index=False)
