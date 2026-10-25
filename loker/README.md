# Folder Loker

Halaman daftar loker (gaya landing, 1 kolom ke bawah). Klik kartu → membuka file HTML mock project.

Letakkan folder `loker/` SEJAJAR dengan `landing/`:

```
situs/
├── landing/
└── loker/
    ├── index.html        halaman daftar
    ├── loker-data.js     ← edit di sini (daftar kartu)
    ├── loker.css, loker.js
    ├── back.js           (opsional) tombol "← Info Loker" untuk file mock project
    └── projects/         ← taruh file HTML mock project di sini
        └── contoh-mock-project.html
```

## Menambah mock project
1. Taruh file HTML-nya di `loker/projects/` (mis. `projects/fore-coffee.html`).
2. Di `loker-data.js`, salin satu blok lalu isi `company`, `role`, `desc`, dan `file: "projects/fore-coffee.html"`.

Jika mock project berupa folder (banyak file), taruh foldernya di `projects/` dan isi `file: "projects/nama-folder/index.html"`.

## Menautkan dari navbar landing
Di `config.js` landing, tambahkan ke `PROFILE.nav`:
`{ label: "Info Loker", href: "../loker/index.html" }`

Halaman ini memakai `config.js`, `style.css`, dan `page-transition.js` dari folder `landing/`, jadi nama, warna, tema, dan animasi ikut otomatis.
