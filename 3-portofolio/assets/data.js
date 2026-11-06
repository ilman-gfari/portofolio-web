
/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Satuan laba cabang: juta Rupiah.
   ========================================================== */

const DATA = {

  // Pertanyaan bisnis
pertanyaan: [
  {
    Lensa: "Operational Decomposition",
    Metrik: "Total Revenue, Total Proyek Terpasang (MWp/kWp), Sesi Maintenance (O&M), ARPU (Average Revenue per User)",
    Catatan: "Mengidentifikasi akar masalah fluktuasi pendapatan secara presisi (apakah di volume kapasitas instalasi atau nilai transaksi layanan)."
  },
  {
    Lensa: "Competitive Intelligence",
    Metrik: "Pola Referral Source, Distribusi Asal Klien/Korporat, Price Point Pembanding (Rp/kWp)",
    Catatan: "Memahami siapa kompetitor langsung (seperti Xurya, Sun Energy, SolarKita) yang memperebutkan jalur rujukan B2B dan segmen pasar yang sama."
  },
  {
    Lensa: "Product Portfolio Optimization",
    Metrik: "Kontribusi Revenue per Tier/Package (Residensial vs Komersial vs Industri), Completion Rate Proyek",
    Catatan: "Menerapkan prinsip Pareto untuk mempertahankan paket layanan unggulan (seperti PV Rooftop Komersial) dan mengevaluasi paket yang kurang efisien."
  },
  {
    Lensa: "Spatial Feasibility & Expansion",
    Metrik: "Konsentrasi Lokasi Klien (Commercial & Residential Hub), Volume Kebutuhan Daya per Wilayah",
    Catatan: "Menilai tingkat demand organik secara kuantitatif sebelum memutuskan investasi fisik cabang baru atau depo teknis di lokasi target."
  }
],
  // Analisis kompetitor
  kompetitor: [
  {
    Kategori: "Residensial (PLTS Atap Perumahan)",
    Pelayanan: "Pemasangan paket PV Rooftop rumah tangga, pemantauan energi harian via HP, pemeliharaan sistem",
    Positioning: "Affordable & Reliable Smart Home Energy",
    Kompetitor_utama: "SolarKita, Xurya, Sun Energy, Utomo SolaRUV"
  },
  {
    Kategori: "Komersial & Bisnis (B2B Commercial)",
    Pelayanan: "Solusi PV Rooftop perkantoran, perhotelan, retail, dan pusat perbelanjaan untuk efisiensi tagihan bulanan",
    Positioning: "Green Building & Cost-Efficiency Solution",
    Kompetitor_utama: "Sun Energy, Xurya Daya Indonesia, Caelus Energy, TotalEnergies ENEOS"
  },
  {
    Kategori: "Industri & Manufaktur (B2B Industrial)",
    Pelayanan: "Instalasi skala besar pada pabrik, pergudangan, dan kawasan industri guna menekan emisi karbon",
    Positioning: "ESG & Net-Zero Transition Partner",
    Kompetitor_utama: "Xurya, Sun Energy, Cleantech Solar, Amp Energy"
  },
  {
    Kategori: "Konsultasi & Audit Energi",
    Pelayanan: "Audit pemakaian daya, kalkulasi ROI sistem surya, perancangan sistem terintegrasi",
    Positioning: "Data-Driven Energy Consultant",
    Kompetitor_utama: "Energy Management Indonesia (EMI), SGS Indonesia, Bureau Veritas"
  }
  ],

  // Laba per cabang (satuan: juta Rupiah)
  frameworkAnalisis: [
  {
    lensa: "Completeness Check",
    fokus: "SUG vs Web DS Matching",
    parameter: "Pengecekan null value / missing log, match jumlah baris (row count), filter anomali telemetri IoT inverter",
    tindakan: "Escalate Bug (Log data missing ke ticketing Data Engineer)"
  },
  {
    lensa: "Metric Integrity",
    fokus: "Operational Decomposition",
    parameter: "Rekonsiliasi Revenue vs Total Proyek Terpasang, validasi rumus ARPU & Completion Rate, audit korelasi alokasi CAC",
    tindakan: "Logic Audit (Pastikan bebas dari calculation bias)"
  },
  {
    lensa: "Spatial Discrepancy",
    fokus: "Regional Expansion Feasibility",
    parameter: "Cross-check persentase distribusi per pulau, filtering unassigned location, validasi pemisahan segmen B2B vs B2C",
    tindakan: "Reconcile Location (Remap koordinat/wilayah yang belum ter-tag)"
  },
  {
    lensa: "Competitor Benchmark",
    fokus: "Competitive Intelligence",
    parameter: "Audit data kompetitor (Xurya, Sun Energy, dll.), validasi unit rate pembanding (Rp/kWp), pembersihan data dummy",
    tindakan: "Update Master (Sync master data market intelligence)"
  }
],

  // Distribusi channel pemasaran dan CAC
  // Share = persen dalam angka numerik
  // CAC = Rupiah dalam angka numerik
  distribusiwilayah : [
  { Wilayah: "Jawa", Jumlah: 3150, Persentase: "39,00%" },
  { Wilayah: "Sumatera", Jumlah: 2430, Persentase: "27,00%" },
  { Wilayah: "Kalimantan", Jumlah: 1470, Persentase: "16,33%" },
  { Wilayah: "Sulawesi", Jumlah: 930, Persentase: "10,33%" },
  { Wilayah: "Bali-Nusra", Jumlah: 660, Persentase: "7.33%" },
  { Wilayah: "Total", Jumlah: 9000, Persentase: "100.00%" }
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
issue: [
    { Issue: "A_hilang_di_webds", qty: 105 },
    { Issue: "D_status_beda", qty: 113 },
    { Issue: "C_nilai_kosong", qty: 47 },
    { Issue: "F_nilai_beda_lain", qty: 164 },
    { Issue: "E_nilai_beda_x1000", qty: 547 },
    { Issue: "B_ekstra_di_webds", qty: 78 }
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
  issue_by_regional: [
  { regional: "Sumatera", issue: 414, persentase: "39,28%" },
  { regional: "Jawa", issue: 382, persentase: "36,24%" },
  { regional: "Kalimantan", issue: 106, persentase: "10,06%" },
  { regional: "Sulawesi", issue: 122, persentase: "11,57%" },
  { regional: "Bali-Nusra", issue: 30, persentase: "2,85%" }
  ]

};
