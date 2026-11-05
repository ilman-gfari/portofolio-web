# clean_data.py — membersihkan raw/ lalu membandingkan dengan file asli (kunci). Cacat NYATA di Web DS TIDAK diubah.
import pandas as pd, numpy as np, re
rd = lambda p: pd.read_csv(p, dtype=str, keep_default_na=False).replace("", np.nan)
def dt(s):
    if pd.isna(s): return s
    for f in ("%Y-%m-%d %H:%M:%S","%Y-%m-%d","%d/%m/%Y %H:%M","%d/%m/%Y","%d-%b-%Y"):
        try: return pd.to_datetime(s, format=f).strftime("%Y-%m-%d %H:%M:%S" if " " in s or f.endswith("%S") else "%Y-%m-%d")
        except ValueError: pass
    return s
def num(s):
    if pd.isna(s): return s
    return re.sub(r"[^0-9.\-]", "", str(s).replace("kWh","").replace(",", "."))
STAT = {"online":"online","on-line":"online","offline":"offline","off":"offline","alarm":"alarm","alarm!":"alarm"}
REG = {"sumatera":"Sumatera","sumatra":"Sumatera","jawa":"Jawa","kalimantan":"Kalimantan","sulawesi":"Sulawesi","bali-nusra":"Bali-Nusra","bali nusra":"Bali-Nusra"}
SEV = {"critical":"critical","high":"high","med":"medium","medium":"medium","low":"low","info":"info"}
RES = {"passed":"pass","pass":"pass","failed":"fail","fail":"fail"}
low = lambda s: s.str.strip().str.lower()
def clean(n):
    d = rd(f"raw/{n}.csv")
    if "device_id" in d: d["device_id"] = d.device_id.str.strip().str.upper()
    for c in ("status",):
        if c in d and n not in ("defect_log","sync_job_log"): d[c] = low(d[c]).map(STAT)
    if n == "sync_job_log": d["status"] = low(d.status); d["region"] = low(d.region).map(REG); d["error_code"] = d.error_code.str.strip()
    if "energy_kwh" in d: d["energy_kwh"] = d.energy_kwh.map(num)
    if "snapshot_date" in d: d["snapshot_date"] = d.snapshot_date.map(dt)
    if n == "device_master":
        d["region"] = low(d.region).map(REG); TY={"inverter_a":"inverter_A","inverter_c":"inverter_C","meter_a":"meter_A","meter_b":"meter_B","gateway_g":"gateway_G"}; d["device_type"] = low(d.device_type).map(TY); d["install_date"] = d.install_date.map(dt)
    if n == "defect_log": d["severity"] = low(d.severity).map(SEV); d["status"] = low(d.status)
    if n == "defect_history": d["to_status"] = low(d.to_status); d["changed_at"] = d.changed_at.map(dt)
    if n == "test_runs": d["result"] = low(d.result).map(RES); d["run_date"] = d.run_date.map(dt)
    d.to_csv(f"bersih/{n}.csv", index=False); return d
tot = 0
for n in ["sug_daily","webds_daily","device_master","sync_job_log","defect_log","defect_history","test_runs"]:
    c = clean(n); a = rd(f"{n}.csv")
    ok = True
    for col in a.columns:
        x, y = a[col].fillna(""), c[col].fillna("")
        if col in ("energy_kwh","voltage_v"): x, y = pd.to_numeric(x, errors="coerce"), pd.to_numeric(y, errors="coerce"); bad = int((~np.isclose(x.fillna(-9), y.fillna(-9))).sum())
        else: bad = int((x != y).sum())
        if bad: ok = False; print(f"  {n}.{col}: {bad} beda")
    print(f"{n:16s} pemulihan = {'100%' if ok else 'ADA SELISIH'}")
