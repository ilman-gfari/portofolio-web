# Data sintetis: rekonsiliasi SUG vs Web DS (latihan QA data)
SEMUA DATA FIKTIF. SUG dan Web DS diperlakukan sebagai ASUMSI (dua sistem generik); arti sebenarnya tidak ditemukan di sumber publik.
Urutan: `python3 generate_data.py` -> `make_raw.py` -> `clean_data.py` -> `reconcile.py`.
Jangan buka `KUNCI_cacat_tertanam.md` sebelum menganalisis. Baris kotor per tabel 1-10% (dijaga assert); `clean_data.py` memulihkan 100% dan tidak menghapus cacat nyata.
