# reconcile.py — membandingkan SUG vs Web DS (data bersih) pada kunci (device_id, snapshot_date).
import pandas as pd, numpy as np
S = pd.read_csv("bersih/sug_daily.csv"); W = pd.read_csv("bersih/webds_daily.csv"); M = pd.read_csv("bersih/device_master.csv")
dupW = W.duplicated(["device_id","snapshot_date"], keep=False); Wd = W.drop_duplicates(["device_id","snapshot_date"], keep="first")
J = S.merge(Wd, on=["device_id","snapshot_date"], how="outer", suffixes=("_sug","_web"), indicator=True).merge(M[["device_id","region","device_type","firmware"]], on="device_id", how="left")
def cat(r):
    if r._merge == "left_only": return "A_hilang_di_webds"
    if r._merge == "right_only": return "B_ekstra_di_webds"
    if r.status_sug != r.status_web: return "D_status_beda"
    a, b = r.energy_kwh_sug, r.energy_kwh_web
    if pd.isna(a) and pd.isna(b): return "OK"
    if pd.isna(b) != pd.isna(a): return "C_nilai_kosong"
    if abs(a-b) <= 0.06: return "OK"
    return "E_nilai_beda_x1000" if b/a > 500 else "F_nilai_beda_lain"
J["kategori"] = J.apply(cat, axis=1); J["duplikat_di_webds"] = J.set_index(["device_id","snapshot_date"]).index.isin(W[dupW].set_index(["device_id","snapshot_date"]).index)
print("Baris dibandingkan:", len(J), "| duplikat di Web DS (baris ekstra dibuang):", len(W)-len(Wd))
print(J.kategori.value_counts().to_string()); print("\nPer wilayah (non-OK):"); print(J[J.kategori!="OK"].groupby(["kategori","region"]).size().unstack(fill_value=0).to_string())
print("\nStatus beda per firmware (% dari baris):"); print((J.assign(b=J.kategori=="D_status_beda").groupby("firmware").b.mean()*100).round(2).to_string())
print("\nNilai x1000 per tipe:", J[J.kategori=="E_nilai_beda_x1000"].device_type.value_counts().to_dict())
J[J.kategori!="OK"].to_csv("temuan_rekonsiliasi.csv", index=False)
T = pd.read_csv("bersih/test_runs.csv"); print("\nPass rate per rilis:"); print(T.assign(p=T.result=="pass").groupby("release").p.mean().round(2).to_string())
print("Regresi R1->R2 / R2->R3 :", T.pivot(index="test_case", columns="release", values="result").to_string())
