
/* ==========================================================
   DATA — semua angka chart & tabel ada di sini.
   Satuan laba cabang: juta Rupiah.
   ========================================================== */

const DATA = {

raw_tabel: [
  {Tabel: "dim_branch", Baris: "25", Isi: "Kota dan wilayah berdasarkan situs",badgeClass: "badge-blue"},
  {Tabel: "dim_client",Baris: "150",Isi: "klien fiktif beserta kategori industri",badgeClass: "badge-green"},
  {Tabel: "dim_vehicle",Baris: "750",Isi: "unit kendaraan dengan model, bahan bakar (BBM/EV), cabang, tanggal dan harga beli",badgeClass: "badge-pink"},
  {Tabel: "contracts",Baris: "1.118",Isi: "kontrak per unit mencakup klien, periode, tenor dan tarif bulanan",badgeClass: "badge-yellow"},
  {Tabel: "fact_vehicle_month",Baris: "9.000",Isi: "catatan bulanan per unit mencakup hari tersewa, downtime, km, pendapatan, biaya servis, penyusutan, asuransi dan pajak",badgeClass: "badge-jingga"},
  {Tabel: "maintenance_orders",Baris: "3.681",Isi: "order servis preventif, korektif dan kecelakaan",badgeClass: "badge-bluelight"},
  {Tabel: "invoices",Baris: "1.611",Isi: "Tagihan bulanan per klien mencakup jatuh tempo dan tanggal pembayaran",badgeClass: "badge-drakblue"},
  {Tabel: "auction_sales",Baris: "140 ",Isi: "Unit kendaraan terjual mencakup umur, km, nilai buku dan harga jual",badgeClass: "badge-orange"}
 ],
// Analisis kompetitor
  kompetitor: [
  {
    Kategori: "Sewa Armada Korporasi (Long-Term Corporate Lease)",
    Pelayanan: "Penyediaan unit kendaraan operasional/direksi jangka panjang (1–5 tahun) plus pemeliharaan rutin, asuransi, & unit pengganti",
    Positioning: "Reliable & Worry-Free Fleet Mobility Partner",
    Kompetitor_utama: "PT Mitra Pinasthika Mustika Rent (MPMRent), TRAC (Astra), Adi Sarana Armada (ASSA), ORIX"
  },
  {
    Kategori: "Sewa Jangka Pendek & Operasional (Short-Term & Commercial)",
    Pelayanan: "Sewa harian/bulanan untuk kebutuhan logistik, proyek musiman, dan kebutuhan operasional mendesak",
    Positioning: "Flexible & Rapid Response Fleet Service",
    Kompetitor_utama: "TRAC, Bluebird Fleet, Indorent"
  },
  {
    Kategori: "Layanan Pengelolaan Armada (Fleet Management Services - FMS)",
    Pelayanan: "Layanan integrasi data telematika, downtime management, pemeliharaan berkala, & analisis biaya operasional (TCO)",
    Positioning: "Data-Driven Fleet Optimization & Cost Efficiency",
    Kompetitor_utama: "Transkon Jaya, Webfleet, Cartrack, Geotab"
  },
  {
    Kategori: "Pelepasan & Lelang Aset Kendaraan (Used Fleet Disposal & Auction)",
    Pelayanan: "Layanan pelepasan unit bekas sewa (end-of-lease) melalui platform lelang independen/kemitraan",
    Positioning: "Maximizing Residual Value & Transparent Asset Disposal",
    Kompetitor_utama: "JBA Indonesia, IBID (Astra Auction), Balai Lelang Caready"
  }
  ],

  // Laba per cabang (satuan: juta Rupiah)
frameworkAnalisis: [
    {
      lensa: "Fleet Utilization & Operational",
      fokus: "Keseimbangan Utilisasi Cabang & Status Unit",
      parameter: "Analisis kesenjangan utilisasi regional (contoh: rata-rata nasional tersamar di angka 92,5% padahal cabang Kendari anjlok di 47,1%), rasio unit aktif vs nganggur (idle days), serta pelacakan telemetri GPS dan anomali log harian.",
      tindakan: "Realokasi unit antar cabang yang kurang produktif dan eskalasi otomatis data log telemetri yang terputus ke tim Data Engineering."
    },
    {
      lensa: "Contract Profitability & Margin Mix",
      fokus: "Erosi Margin Kontrak & Deteksi Kontrak Negatif",
      parameter: "Dekomposisi margin bersih per sektor industri (misal: logistik vs energi), perbandingan kohort tahun kontrak (kontrak lama 2024 vs kontrak baru 2025), serta identifikasi kontrak bocor yang merugikan perusahaan.",
      tindakan: "Melakukan penyesuaian harga sewa (repricing) berkala untuk kontrak jangka panjang yang tergerus biaya pemeliharaan dan menghentikan atau merestrukturisasi kontrak yang bermargin negatif."
    },
    {
      lensa: "Asset Maintenance & TCO",
      fokus: "Efisiensi Biaya Servis & Identifikasi Unit Boros",
      parameter: "Perhitungan biaya servis per kilometer (cost per km) per model kendaraan, pelacakan histori perbaikan, serta deteksi kelompok unit 'lemon' (5% unit boros yang menyumbang porsi besar biaya bengkel).",
      tindakan: "Menjadwalkan peremajaan atau penarikan lebih awal untuk unit kendaraan yang biaya perawatannya sudah melewati ambang batas ekonomis."
    },
    {
      lensa: "Asset Lifecycle & Remarketing (Lelang)",
      fokus: "Titik Optimal Pelepasan Unit (Disposal Timing)",
      parameter: "Analisis rasio realisasi harga lelang terhadap nilai buku (*book value*) berdasarkan kelompok kilometer (kilometer bands), akumulasi kerugian unit yang terlambat dijual.",
      tindakan: "Menetapkan kebijakan pelepasan/penjualan unit secara ketat di ambang batas optimal (yakni di sekitar 120.000 KM sebelum harga jual lelang merosot drastis)."
    }
  ],


// Distribusi Armada Regional
  distribusiwilayah: [
    { Wilayah: "Jawa-Banten", Jumlah: 352, Persentase: "46,93%" ,badgeClass: "badge-drakblue"},
    { Wilayah: "Sumatera", Jumlah: 182, Persentase: "24,27%" },
    { Wilayah: "Kalimantan", Jumlah: 132, Persentase: "17,60%" }, // atau sesuaikan dengan porsi riil
    { Wilayah: "Sulawesi", Jumlah: 72, Persentase: "9,60%" },
    { Wilayah: "Bali", Jumlah: 12, Persentase: "1,60%" }  ],

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
