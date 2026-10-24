# Landing Page Personal (dengan animasi)

Buka `index.html` langsung di browser — tidak perlu server atau instalasi.

## File

| File | Fungsi |
|---|---|
| `config.js` | **Edit ini dulu.** Semua teks, kartu case study, kontak, pengaturan animasi (`ANIM`), warna & font (`THEME`). |
| `style.css` | Tampilan. Keyframes animasi ada di bagian paling bawah ("ANIMASI"). |
| `main.js` | Merender konten + logika animasi (reveal, count-up, tilt, typewriter, progress bar). |
| `index.html` | Kerangka halaman. |

## Mengatur animasi (`ANIM` di config.js)

- `reveal`, `revealDistance`, `revealDuration`, `revealStagger`: efek muncul saat scroll
- `countUp`, `countDuration`: angka di kartu menghitung naik
- `marqueeSeconds`: kecepatan teks berjalan (angka kecil = cepat)
- `blobs`, `blobSeconds`: gradient bergerak di hero
- `cardTilt`, `tiltMax`: kartu miring mengikuti kursor
- `typewriter`, `typeSpeed`: tagline diketik otomatis
- `navBlurOnScroll`, `scrollProgress`: navbar blur & garis progres

Mau animasi baru? Tambahkan `@keyframes` di `style.css`, lalu pasang di elemen yang diinginkan.
Pengguna dengan pengaturan "reduce motion" otomatis tidak melihat animasi.

## Menambah kartu case study

Di `config.js`, salin satu blok `{ company: ..., role: ..., stats: [...] }` di dalam `work.cases`.
Isi `href` dengan tautan ke halaman portofolio (contoh: `../portfolio/index.html` untuk template portofolio sebelumnya).

## Publish

Unggah folder ini ke GitHub Pages, Netlify, atau Cloudflare Pages.

## Animasi loading & pindah halaman

File `page-transition.js` memberi: layar loading (nama + progress bar) saat pertama dibuka, dan animasi tutup–buka layar tiap klik link ke halaman lain.

- Pasang di setiap halaman, di `<head>` setelah `style.css`: `<script src="page-transition.js"></script>` (sudah terpasang di `index.html`).
- Semua pengaturan ada di objek `PT` di bagian atas file: `type` ("curtain" / "slide" / "fade"), `firstLoadDuration`, `quickDuration`, `exitDuration`, `leaveDuration`, `preloaderOnce`, `brand`, warna.
- `enabled: false` untuk mematikan seluruhnya. Tambahkan `data-pt="off"` pada link tertentu agar tidak memakai transisi.
- Link `#anchor`, `mailto:`, link ke domain lain, dan tab baru otomatis dilewati.
