# Template Portofolio Analis (multi-halaman)

Struktur mengikuti portofolio referensi: Index → Konteks Bisnis → Pertanyaan Bisnis → Temuan & Rekomendasi → Visualisasi → Deep Dive → Report Data → Cara Kerja → Perihal Loker.

**Cara membuka:** klik dua kali `index.html` (tidak perlu server). Chart butuh internet sekali untuk memuat Chart.js dari CDN.

## Struktur file

```
index.html                 ← halaman utama
konteks-bisnis.html        ← 01
pertanyaan-bisnis.html     ← 02
temuan.html                ← 03
visualisasi.html           ← 04 (chart)
report-data.html           ← 05 (tabel)
deep-dive.html             ← 06
cara-kerja.html            ← appendix
perihal-loker.html         ← appendix
assets/
  config.js                ← NAMA, KONTAK, KPI, MENU  (edit pertama)
  data.js                  ← ANGKA untuk chart & tabel
  style.css                ← warna & tampilan (edit variabel di :root)
  layout.js                ← sidebar/footer otomatis (jarang perlu diedit)
```

## Urutan edit yang disarankan

1. **`assets/config.js`**: isi nama, perusahaan, kontak, KPI. Ubah `showSampleBadge` ke `false` kalau data sudah asli.
2. **`assets/data.js`**: ganti angka contoh dengan hasil analisis Anda. Chart di Visualisasi/Deep Dive dan tabel di Report Data ikut berubah otomatis.
3. **Tiap file `.html`**: ganti teks contoh. Bagian yang perlu diedit ditandai komentar `<!-- EDIT: ... -->`.
4. **`assets/style.css`**: ubah `--accent` untuk mengganti warna utama.

## Tips

- **Tambah halaman baru:** salin salah satu `.html`, ubah `data-page="..."` di `<body>`, lalu daftarkan di `nav` pada `config.js` (dengan `id` yang sama).
- **Tambah baris tabel dari data:** tambahkan objek di `data.js`. Tabel dengan atribut `data-table="nama"` otomatis menampilkannya.
- **Tambah gambar:** taruh di folder `assets/`, lalu `<img src="assets/gambar.png" alt="...">`.
- **Publish gratis:** unggah seluruh folder ke GitHub Pages, Netlify, atau Cloudflare Pages.
