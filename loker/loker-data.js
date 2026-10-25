/* ==========================================================
   DATA LOKER — satu blok { ... } = satu kartu = satu file HTML mock project.
   Cara pakai:
     1) Taruh file HTML hasil mock project di folder  loker/projects/
     2) Salin satu blok di bawah, isi `file` dengan path-nya
   Semua contoh di bawah adalah DATA CONTOH.
   ========================================================== */
const LOKER = {
  heading: "Info Loker",
  sub: "Mock project untuk tiap lowongan yang saya lamar — klik kartu untuk membuka hasilnya.",
  updated: "Oktober 2026",

  // true = kartu muncul bertahap saat di-scroll, angka stats menghitung naik (ikut pengaturan ANIM di landing)
  animate: true,

  jobs: [
    {
      company: "Perusahaan A",
      role: "Operation Analyst",
      desc: "Analisis performa outlet dan efisiensi operasional, dipetakan ke requirement lowongan.",
      file: "projects/tutorial_techconnect_hc_analytics.html",     // ← file HTML mock project
      stats: [{ value: 350, suffix: "", label: "Outlet dianalisis" }, { value: 51, suffix: "", label: "Kota" }],
      tags: ["SQL", "Excel", "Dashboard"],
      // opsi gaya per-kartu (semua opsional, sama seperti kartu di landing):
      // accent, bg, border, text, muted, radius, padding, minHeight, icon, badge, cta, statsJustify, statsEqual, class, id, style
      badge: "Open", icon: "💼", cta: "Buka mock project"
    },
    {
      company: "Perusahaan B",
      role: "Sales Data Analyst",
      desc: "Analisis penjualan kompetitif untuk perusahaan FMCG.",
      file: "projects/contoh-mock-project.html",
      stats: [{ value: 120, suffix: "", label: "SKU" }, { value: 18, suffix: "%", label: "Potensi kenaikan" }],
      tags: ["Python", "Power BI"],
      icon: "📦"
    },
    {
      company: "Perusahaan C",
      role: "Business Intelligence Intern",
      desc: "Membangun dashboard dan merapikan data pelaporan.",
      file: "",                       // kosong = tampil "segera hadir" dan tidak bisa diklik
      tags: ["Excel", "SQL"],
      badge: "Segera hadir"
    }
  ]
};
