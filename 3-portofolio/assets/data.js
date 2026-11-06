
/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Satuan laba cabang: juta Rupiah.
   ========================================================== */

const DATA = {

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
  issueperhari: [
  { hari: "Senin", issue: 143 },
  { hari: "Selasa", issue: 131 },
  { hari: "Rabu", issue: 194 },
  { hari: "Kamis", issue: 88 },
  { hari: "Jumat", issue: 166 },
  { hari: "Sabtu", issue: 155 },
  { hari: "Minggu", issue: 99 },
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
  ],

  //issue device
  deviceIssue : [
  { device: "inverter_C", A_hilang_di_webds: 21, D_status_beda: 17, C_nilai_kosong: 10, F_nilai_beda_lain: 27, E_nilai_beda_x1000: 130, B_ekstra_di_webds: 26 },
  { device: "meter_A", A_hilang_di_webds: 0, D_status_beda: 20, C_nilai_kosong: 13, F_nilai_beda_lain: 42, E_nilai_beda_x1000: 78, B_ekstra_di_webds: 26 },
  { device: "gateway_G", A_hilang_di_webds: 21, D_status_beda: 17, C_nilai_kosong: 3, F_nilai_beda_lain: 28, E_nilai_beda_x1000: 59, B_ekstra_di_webds: 0 },
  { device: "inverter_A", A_hilang_di_webds: 42, D_status_beda: 32, C_nilai_kosong: 12, F_nilai_beda_lain: 36, E_nilai_beda_x1000: 190, B_ekstra_di_webds: 0 },
  { device: "meter_B", A_hilang_di_webds: 21, D_status_beda: 27, C_nilai_kosong: 9, F_nilai_beda_lain: 31, E_nilai_beda_x1000: 90, B_ekstra_di_webds: 26 },
]


};
