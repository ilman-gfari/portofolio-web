
/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Satuan laba cabang: juta Rupiah.
   ========================================================== */

const DATA = {

  // Pertanyaan bisnis
  pertanyaan: [
    {
      Lensa: "Operational Decomposition",
      Metrik: "Total Revenue, Total Booking, Sesi Kehadiran, ARPV (Average Revenue per Visit)",
      Catatan: "Mengidentifikasi akar masalah fluktuasi pendapatan secara presisi (apakah di volume atau nilai transaksi)."
    },
    {
      Lensa: "Competitive Intelligence",
      Metrik: "Pola Referral Source, Distribusi Asal Pasien, Price Point Pembanding",
      Catatan: "Memahami siapa kompetitor langsung yang memperebutkan jalur rujukan dan segmen pasar yang sama."
    },
    {
      Lensa: "Product Portfolio Optimization",
      Metrik: "Kontribusi Revenue per Tier/Package, Completion Rate Sesi",
      Catatan: "Menerapkan prinsip Pareto untuk mempertahankan layanan unggulan dan mengeliminasi layanan yang tidak efisien."
    },
    {
      Lensa: "Spatial Feasibility & Expansion",
      Metrik: "Konsentrasi Domisili Pasien (Domicile Area), Volume Pasien per Wilayah",
      Catatan: "Menilai tingkat demand organik secara kuantitatif sebelum memutuskan investasi fisik cabang baru di lokasi target (misal: Muara Karang)."
    }
  ],

  // Analisis kompetitor
  kompetitor: [
    {
      Kategori: "Olahraga",
      Pelayanan: "Cedera otot, tulang, ligamen; pemulihan ACL dan patah tulang",
      Positioning: "Spesialis Cedera & Performa Atlet",
      Kompetitor_utama: "First Physio BSD, Movewell Physio, The Bali Physio, Kens Physio"
    },
    {
      Kategori: "Pascaoperasi",
      Pelayanan: "Rehabilitasi setelah operasi ortopedi",
      Positioning: "Hospital-Standard Bridge Recovery (Alternatif & Pelengkap RS)",
      Kompetitor_utama: "Sasana Husada (Cideng), Medifit, Araphysio"
    },
    {
      Kategori: "Geriatri",
      Pelayanan: "Fisioterapi lansia",
      Positioning: "Functional Mobility & Independence",
      Kompetitor_utama: "Klinik Medifit, ACESIO, PhysioHealth"
    },
    {
      Kategori: "Nyeri dan tulang belakang",
      Pelayanan: "Nyeri leher dan punggung, sendi, saraf",
      Positioning: "Solusi Akar Penyebab Nyeri & Postur",
      Kompetitor_utama: "Lentera Physio-Spine, BackFit HWS, PhysioHub, Kineo Clinic"
    }
  ],

  // Laba per cabang (satuan: juta Rupiah)
  kategori: [
    { nama: "Cideng",           revenue: 610.5 },
    { nama: "Karawaci",         revenue: 815.7 },
    { nama: "Gading Serpong",   revenue: 711.4 },
    { nama: "Simatupang",       revenue: 929.5 },
    { nama: "PIK 2",            revenue: 671.1 },
    { nama: "Gandaria",         revenue: 533.5 },
    { nama: "Alam Sutera",      revenue: 262.2 },
    { nama: "Surabaya Pakuwon", revenue: -38.5 },
    { nama: "Kelapa Gading",    revenue: 167.9 },
    { nama: "Meruya",           revenue: -190.1 },
    { nama: "Bekasi",           revenue: -246.4 },
    { nama: "Surabaya Samator", revenue: -135.2 },
  ],

  // Distribusi channel pemasaran dan CAC
  // Share = persen dalam angka numerik
  // CAC = Rupiah dalam angka numerik
  channel: [
    { Channel: "Dokter Rujukan", Share: 17.00, CAC: 150533.14 },
    { Channel: "Google Maps", Share: 13.91, CAC: 298156.48 },
    { Channel: "Komunitas GYM", Share: 7.19, CAC: 198765.15 },
    { Channel: "Kantor Korporat", Share: 6.71, CAC: 180763.18 },
    { Channel: "Teman & Keluarga", Share: 23.22, CAC: 79749.45 },
    { Channel: "Tidak Diketahui", Share: 5.00, CAC: 0.00 },
    { Channel: "WhatsApp & Instagram", Share: 26.98, CAC: 249075.29 }
  ],

  // Pola transaksi per bulan
  transaksiperbulan: [
    { bulan: "Januari 2025", transaksi: 1010 },
    { bulan: "Februari 2025", transaksi: 950 },
    { bulan: "Maret 2025", transaksi: 1091 },
    { bulan: "April 2025", transaksi: 1023 },
    { bulan: "Mei 2025", transaksi: 1211 },
    { bulan: "Juni 2025", transaksi: 1229 },
    { bulan: "Juli 2025", transaksi: 1394 },
    { bulan: "Agustus 2025", transaksi: 1452 },
    { bulan: "September 2025", transaksi: 1448 },
    { bulan: "Oktober 2025", transaksi: 1631 },
    { bulan: "November 2025", transaksi: 1596 },
    { bulan: "Desember 2025", transaksi: 1690 }
  ],

// Ranking pasien baru berdasarkan area (data terbaru)
areapasiennew: [
  { nama: "Kebayoran Baru", kategori: "Pasien Baru", qty: 648, revenue: 1 },
  { nama: "Cilandak", kategori: "Pasien Baru", qty: 639, revenue: 2 },
  { nama: "Curug", kategori: "Pasien Baru", qty: 598, revenue: 3 },
  { nama: "Teluknaga", kategori: "Pasien Baru", qty: 345, revenue: 4 },
  { nama: "Pesanggrahan", kategori: "Pasien Baru", qty: 339, revenue: 5 }
],
  // Log data cleaning (data contoh / dummy)
  cleaning: [
    { langkah: "Data mentah", baris: 18000, catatan: "Hasil scraping / export awal" },
    { langkah: "Hapus duplikat", baris: 17200, catatan: "800 baris duplikat dihapus" },
    { langkah: "Hapus nilai kosong kritikal", baris: 16500, catatan: "Baris tanpa harga / outlet" },
    { langkah: "Perbaiki format & tipe data", baris: 16500, catatan: "Tanggal, harga, koordinat" },
    { langkah: "Data bersih", baris: 16229, catatan: "Siap dianalisis" }
  ],

  // Segmentasi konsep outlet (dummy)
  konsep: [
    { nama: "Konsep 1", jumlah: 120 },
    { nama: "Konsep 2", jumlah: 95 },
    { nama: "Konsep 3", jumlah: 80 },
    { nama: "Konsep 4", jumlah: 55 }
  ],

  // Sebaran per kota (dummy)
  kota: [
    { nama: "Kota A", outlet: 90 },
    { nama: "Kota B", outlet: 60 },
    { nama: "Kota C", outlet: 40 },
    { nama: "Kota D", outlet: 25 },
    { nama: "Kota E", outlet: 18 }
  ]

};
