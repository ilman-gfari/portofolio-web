/* ==========================================================
   CONFIG UTAMA — edit file ini dulu.
   Semua nama, kontak, KPI, dan menu sidebar diatur di sini.
   ========================================================== */

const SITE = {
  // --- Identitas ---
  owner: "Ilman Gifari",
  role: "Operation Analyst",
  company: "Physiorehab Clinic",            // perusahaan / studi kasus yang dianalisis
  logo: "assets/logo.svg",                              // URL logo (opsional), contoh: "assets/logo.png"
  tagline: "",
  scope: "10 Cabang",         // baris kecil di bawah judul
  updated: "Oktober 2026",

  // tambahkan thema
  theme: {
  id: "2-portofolio",
  enabled: true,                        // false = matikan fitur ini
  source: "../config.js",       // lokasi config landing (otomatis dicoba ../landing, ../../landing, ../../../landing)
  match: "Physiorehab Clinic",                // paksa pilih kartu tertentu
  color: "", logo: "", logoBg: ""       // isi untuk mengganti secara manual, tanpa membaca landing
 },

  // Tampilkan badge "DATA CONTOH" di semua halaman. Ubah ke false kalau data sudah asli.
  showSampleBadge: false,

  // --- Kontak (kosongkan "" untuk menyembunyikan) ---
  contact: {
    website: "",
    linkedin: "https://www.linkedin.com/in/ilmangifari",
    email: "gifariilman79@email.com",
    github: ""
  },

  // --- KPI di halaman Index ---
  kpis: [
    { value: "13",       label: "Cabang" },
    { value: "53.321",    label: "Baris Data Bersih" },
    { value: "Rp 24,99 M",  label: "Revenue" },
    { value: "04",        label: "Kategori Produk" },
    { value: "20",        label: "Total Produk" }
  ],

  // --- Menu sidebar + kartu di Index ---
  // id harus sama dengan atribut data-page di <body> tiap halaman.
  nav: [
    { group: "", items: [
      { id: "",              icon: "🌐 ", label: "IlmanGifari",              href: "../index.html" }
    ]},
    { group: "Portfolio", items: [
      { id: "index",              icon: "🏠", label: "Index",              href: "index.html" },
      { id: "konteks-bisnis",     icon: "🏢", label: "Konteks Bisnis",     href: "konteks-bisnis.html",
        desc: "Profil perusahaan, kondisi keuangan, model bisnis, channel penjualan, dan lanskap kompetitor." },
      { id: "pertanyaan-bisnis",  icon: "❓", label: "Pertanyaan Bisnis",  href: "pertanyaan-bisnis.html",
        desc: "Pertanyaan strategis dari stakeholder beserta framework analisis yang dipakai." },
      { id: "temuan",             icon: "💡", label: "Temuan & Rekom",     href: "temuan.html",
        desc: "Temuan utama yang terukur, ringkasan eksekutif, dan rekomendasi dengan proyeksi dampak." }
    ]},
    { group: "Reports", items: [
      { id: "visualisasi",  icon: "📊", label: "Visualisasi",  href: "visualisasi.html",
        desc: "Chart interaktif: revenue per kategori, distribusi channel, pola weekend, ranking menu." },
      { id: "deep-dive",    icon: "🔬", label: "Deep Dive",    href: "deep-dive.html",
        desc: "Segmentasi konsep outlet, sebaran geografis, analisis jarak antar-outlet, jam operasional." },
      { id: "report-data",  icon: "📋", label: "Report Data",  href: "report-data.html",
        desc: "Log data cleaning, angka lengkap, ranking penuh — untuk verifikasi." }
    ]},
    { group: "Appendix", items: [
      { id: "cara-kerja",    icon: "⚙️", label: "Cara Kerja",    href: "cara-kerja.html",
        desc: "Metodologi: pipeline data, tools & stack, alur cleaning, reproducibility." },
      { id: "perihal-loker", icon: "📄", label: "Perihal Loker", href: "perihal-loker.html",
        desc: "Pemetaan lowongan kerja ke portofolio: requirement, pertanyaan, tanggung jawab." }
    ]}
  ]
};
