/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Ganti nilainya dengan hasil analisis Anda; chart ikut berubah.
   Angka di bawah ini DATA CONTOH (dummy), bukan data nyata.
   ========================================================== */

const DATA = {

    // Pertanyataan bisnis
  pertanyaan: [
    { Lensa: "Operational Decomposition", Metrik: "Total Revenue, Total Booking, Sesi Kehadiran, ARPV (Average Revenue per Visit)", Penting: "Mengidentifikasi akar masalah fluktuasi pendapatan secara presisi (apakah di volume atau nilai transaksi)." },
    { Lensa: "Competitive Intelligence", Metrik: "Pola Referral Source, Distribusi Asal Pasien, Price Point Pembanding", Penting: "Memahami siapa kompetitor langsung yang memperebutkan jalur rujukan dan segmen pasar yang sama." },
    { Lensa: "Product Portfolio Optimization",     Metrik: "Kontribusi Revenue per Tier/Package, Completion Rate Sesi",  Penting: "Menerapkan prinsip Pareto untuk mempertahankan layanan unggulan dan mengeleminasi layanan yang tidak efisien." },
    { Lensa: "Spatial Feasibility & Expansion",     Metrik: "Konsentrasi Domisili Pasien (Domicile Area), Volume Pasien per Wilayah",  Penting: "Menilai tingkat demand organik secara kuantitatif sebelum memutuskan investasi fisik cabang baru di lokasi target (misal: Muara Karang)." }],

  // Revenue per kategori menu (satuan: juta Rupiah)
  kategori: [
    { nama: "Kopi Susu",     revenue: 420 },
    { nama: "Kopi Hitam",    revenue: 180 },
    { nama: "Non-Coffee",    revenue: 150 },
    { nama: "Makanan",       revenue: 90 },
    { nama: "Lainnya",       revenue: 35 }
  ],

  // Distribusi channel penjualan (persen)
  channel: [
    { nama: "Dine-in / Pickup", persen: 45 },
    { nama: "Delivery",         persen: 30 },
    { nama: "Aplikasi",         persen: 20 },
    { nama: "Lainnya",          persen: 5 }
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
