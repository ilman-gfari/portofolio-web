/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Ganti nilainya dengan hasil analisis Anda; chart ikut berubah.
   Angka di bawah ini DATA CONTOH (dummy), bukan data nyata.
   ========================================================== */

const DATA = {

    // Pertanyataan bisnis
  pertanyaan: [
    { Lensa: "Operational Decomposition", Metrik: "Total Revenue, Total Booking, Sesi Kehadiran, ARPV (Average Revenue per Visit)", Catatan: "Mengidentifikasi akar masalah fluktuasi pendapatan secara presisi (apakah di volume atau nilai transaksi)." },
    { Lensa: "Competitive Intelligence", Metrik: "Pola Referral Source, Distribusi Asal Pasien, Price Point Pembanding", Catatan: "Memahami siapa kompetitor langsung yang memperebutkan jalur rujukan dan segmen pasar yang sama." },
    { Lensa: "Product Portfolio Optimization",     Metrik: "Kontribusi Revenue per Tier/Package, Completion Rate Sesi",  Catatan: "Menerapkan prinsip Pareto untuk mempertahankan layanan unggulan dan mengeleminasi layanan yang tidak efisien." },
    { Lensa: "Spatial Feasibility & Expansion",     Metrik: "Konsentrasi Domisili Pasien (Domicile Area), Volume Pasien per Wilayah",  Catatan: "Menilai tingkat demand organik secara kuantitatif sebelum memutuskan investasi fisik cabang baru di lokasi target (misal: Muara Karang)." }],


  // kompetitor
  kompetitor : [
    {Kategori: "Olahraga", Pelayanan:"Cedera otot, tulang, ligamen; pemulihan ACL dan patah tulang",Positioning:"Spesialis Cedera & Performa Atlet",Kompetitor_utama:"First Physio BSD, Movewell Physio, The Bali Physio, Kens Physio" },
    {Kategori: "Pascaoperasi", Pelayanan:"Rehabilitasi setelah operasi ortopedi",Positioning:"Hospital-Standard Bridge Recovery (Alternatif & Pelengkap RS)",Kompetitor_utama:"Sasana Husada (Cideng), Medifit, Araphysio" },
    {Kategori: "Geriatri", Pelayanan:"Fisioterapi lansia",Positioning:"Functional Mobility & Independence",Kompetitor_utama:"Klinik Medifit, ACESIO, PhysioHealth" },
    {Kategori: "Nyeri dan tulang belakang", Pelayanan:"Nyeri leher dan punggung, sendi, saraf",Positioning:"Solusi Akar Penyebab Nyeri & Postur",Kompetitor_utama:"Lentera Physio-Spine, BackFit HWS, PhysioHub, Kineo Clinic" },
    
  ], 


  // Laba per Cabang menu (satuan: juta Rupiah)
kategori: [
  { nama: "Cideng",           revenue: 610,5 },
  { nama: "Karawaci",         revenue: 815,7 },
  { nama: "Gading Serpong",   revenue: 711,4 },
  { nama: "Simatupang",       revenue: 929,5 },
  { nama: "PIK 2",            revenue: 671,1 },
  { nama: "Gandaria",         revenue: 533,5 },
  { nama: "Alam Sutera",      revenue: 262,2 },
  { nama: "Surabaya Pakuwon", revenue: -38,5 },
  { nama: "Kelapa Gading",    revenue: 167,9 },
  { nama: "Meruya",           revenue: -190,1 },
  { nama: "Bekasi",           revenue: -246,4 },
  { nama: "Surabaya Samator", revenue: -135,2 },
  { nama: "Medan",            revenue: 0 },
  { nama: "Muara Karang",     revenue: 0 }
],

  // Distribusi channel penjualan (persen)
  channel: [
  { Channel: "WhatsApp & Instagram", Share: "26,98%", Deskripsi: "Dominan (B2C) — Corong utama akuisisi pasien baru via platform digital." },
  { Channel: "Teman & Keluarga", Share: "23,22%", Deskripsi: "Word of Mouth — Rekomendasi langsung berbasis kepuasan pasien (High Trust)." },
  { Channel: "Rujukan Dokter", Share: "17,00%", Deskripsi: "High Trust (B2B2C) — Pasien medis/rehabilitasi pascaoperasi dengan ticket size tinggi." },
  { Channel: "Google Maps", Share: "13,91%", Deskripsi: "Organic Catchment — Menjangkau pasien lokal terdekat berbasis lokasi (POI)." },
  { Channel: "Komunitas GYM", Share: "7,19%", Deskripsi: "Niche/Sports — Target segmen aktif dan cedera olahraga (sports recovery)." },
  { Channel: "Kantor Korporat", Share: "6,71%", Deskripsi: "B2B Benefit — Kemitraan wellness dan penanganan postur karyawan perusahaan." },
  { Channel: "Tidak Diketahui", Share: "5,00%", Deskripsi: "Data akuisisi transaksi yang belum teridentifikasi sumber channel-nya." }

  ],

  // Pola transaksi per hari (indeks relatif, rata-rata hari kerja = 100)
  harian: [
    { hari: "Sen", indeks: 95 },
    { hari: "Sel", indeks: 98 },
    { hari: "Rab", indeks: 100 },
    { hari: "Kam", indeks: 104 },
    { hari: "Jum", indeks: 115 },
    { hari: "Sab", indeks: 130 },
    { hari: "Min", indeks: 122 }
  ],

  // Ranking menu (urut dari terbesar). qty = unit terjual, revenue = juta Rp
  menu: [
    { nama: "Menu A", kategori: "Kopi Susu",  qty: 52000, revenue: 180 },
    { nama: "Menu B", kategori: "Kopi Susu",  qty: 41000, revenue: 150 },
    { nama: "Menu C", kategori: "Kopi Hitam", qty: 36000, revenue: 110 },
    { nama: "Menu D", kategori: "Non-Coffee", qty: 28000, revenue: 95 },
    { nama: "Menu E", kategori: "Makanan",    qty: 19000, revenue: 70 }
  ],

  // Log data cleaning
  cleaning: [
    { langkah: "Data mentah",                     baris: 18000, catatan: "Hasil scraping / export awal" },
    { langkah: "Hapus duplikat",                  baris: 17200, catatan: "800 baris duplikat dihapus" },
    { langkah: "Hapus nilai kosong kritikal",     baris: 16500, catatan: "Baris tanpa harga / outlet" },
    { langkah: "Perbaiki format & tipe data",     baris: 16500, catatan: "Tanggal, harga, koordinat" },
    { langkah: "Data bersih",                     baris: 16229, catatan: "Siap dianalisis" }
  ],

  // Segmentasi konsep outlet (halaman Deep Dive)
  konsep: [
    { nama: "Konsep 1", jumlah: 120 },
    { nama: "Konsep 2", jumlah: 95 },
    { nama: "Konsep 3", jumlah: 80 },
    { nama: "Konsep 4", jumlah: 55 }
  ],

  // Sebaran per kota (top kota)
  kota: [
    { nama: "Kota A", outlet: 90 },
    { nama: "Kota B", outlet: 60 },
    { nama: "Kota C", outlet: 40 },
    { nama: "Kota D", outlet: 25 },
    { nama: "Kota E", outlet: 18 }
  ]
};
