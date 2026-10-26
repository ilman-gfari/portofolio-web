/* ==========================================================
   CONFIG — semua teks, kartu case study, dan pengaturan animasi.
   Edit file ini dulu. Tidak perlu menyentuh HTML.
   ========================================================== */

const PROFILE = {
  name: "Ilman Gifari",
  title: "Portofolio",
  tagline: "Mengubah data berantakan menjadi keputusan bisnis.",
  status: "Open to opportunities",          // kosongkan "" untuk menyembunyikan badge
  skills: ["Business Intelligence", "Data Analysis", "Python", "SQL", "Microsoft Excel","Google Spreadsheet","Data Visualization"],
  ctaPrimary:   { label: "Lihat Case Study", href: "#work" },
  ctaSecondary: { label: "Hubungi Saya",     href: "#contact" },

  // Teks berjalan di bawah hero (ticker)
  marquee: ["Python", "SQL", "Microsoft Excel", "Google Sheets", "Data Visualization", "Business Intelligence",
            , "Data Cleaning", "Statistical Analysis", "Dashboard Design"],

  nav: [
    { label: "Portofolio",    href: "#work" },
    { label: "About",   href: "#approach" },
    { label: "Contact", href: "#contact" },
    { label: "Info Loker", href: "loker/index.html" }
  ],

  work: {
    heading: "Temukan pola, atasi masalah, berikan dampak.",
    sub: "Case study yang mensimulasikan pekerjaan di perusahaan sungguhan.",
    more: "Case study lainnya segera hadir",
    // Salin satu blok { ... } untuk menambah kartu.
    // stats.value berupa angka → otomatis count-up. stats.suffix opsional (mis. "%", "+").
    cases: [
      { company: "TokoMart", role: "Operation Analyst", id: "1-portofolio",
        desc: "Analisis tren penjualan bulanan untuk perusahaan retail",
        color: "#c53b22",
        logo: "🏪",
        logoSize: "52px",
        href: "1-portofolio/index.html",
        stats: [{ value: 10, suffix: "", label: "Cabang" }, { value: 5145, suffix: "", label: "Data transaksi" }, { value: 4, suffix: "", label: "Temuan" },{ value: 4, suffix: "", label: "Temuan" }] },
      { company: "Physiorehab Clinic", role: "Data Analyst – Expansion", id: "2-portofolio",
        color: "rgb(35, 178, 77)",
        logo : "2-portofolio/assets/logo.svg", logoSize: "100px",
        desc: "Analisis wilayah berpotensi dan analisis lokasi untuk ekspansi.",
        href: "2-portofolio/index.html",
        stats: [{ value: 557, suffix: "", label: "Cabang" }, { value: 4, suffix: "", label: "Dashboard" }, { value: 4, suffix: "", label: "Dashboard" },{ value: 4, suffix: "", label: "Temuan" }] },
      { company: "Perusahaan C", role: "Business Analyst",
        desc: "Monitoring kepatuhan dan kualitas data lintas cabang.",
        href: "1-portofolio/index.html",
        stats: [{ value: 557, suffix: "", label: "Cabang" }, { value: 4, suffix: "", label: "Dashboard" }, { value: 4, suffix: "", label: "Dashboard" },{ value: 4, suffix: "", label: "Temuan" }] },
      { company: "Perusahaan B", role: "Sales Data Analyst",
        desc: "Analisis penjualan kompetitif untuk perusahaan FMCG.",
        href: "#",
        stats: [{ value: 557, suffix: "", label: "Cabang" }, { value: 4, suffix: "", label: "Dashboard" }, { value: 4, suffix: "", label: "Dashboard" },{ value: 4, suffix: "", label: "Temuan" }] },
      { company: "Perusahaan C", role: "Business Analyst",
        desc: "Monitoring kepatuhan dan kualitas data lintas cabang.",
        href: "#",
        stats: [{ value: 557, suffix: "", label: "Cabang" }, { value: 4, suffix: "", label: "Dashboard" }, { value: 4, suffix: "", label: "Dashboard" },{ value: 4, suffix: "", label: "Temuan" }] }
    ]
  },

  approach: {
    heading: "Cara saya bekerja",
    tagline: "Business-first. Data nyata. Hasil terukur.",
    steps: [
      { icon: "🎯", title: "Pahami Bisnis Dulu",   text: "Mulai dari pertanyaan bisnis, bukan dari tools." },
      { icon: "🔎", title: "Data & Sumber Nyata",    text: "Memakai data publik atau data nyata, bukan angka karangan." },
      { icon: "⚙️", title: "Pipeline End-to-End",    text: "Dari pengumpulan, cleaning, analisis, sampai laporan." },
      { icon: "📈", title: "Dampak Terukur",         text: "Setiap rekomendasi disertai proyeksi angka." }
    ],
    bringTitle: "Yang saya bawa",
    bring: [
      "Analisis end-to-end dari data mentah ke rekomendasi",
      "Portofolio siap pakai dengan laporan HTML interaktif",
      "Komunikasi insight untuk non-teknis",
      "Kebiasaan mendokumentasikan metodologi",
      "Cepat belajar domain bisnis baru"
    ]
  },

  contact: {
    heading: "Mari terhubung",
    text: "Terbuka untuk peluang di bidang data analytics.",
    email: "gifariilman79@email.com",                  // "" untuk menyembunyikan tombol
    linkedin: "https://www.linkedin.com/in/username",
    github: "https://github.com/ilman-gfari"
  },

  footer: "© 2026 Ilman Gifari"
};

/* ----------------------------------------------------------
   PENGATUAN ANIMASI — ubah angka / true-false di sini.
   ---------------------------------------------------------- */
const ANIM = {
  reveal: true,            // elemen muncul saat di-scroll
  revealDistance: 28,      // px geser awal
  revealDuration: 700,     // ms
  revealStagger: 90,       // ms jeda antar-elemen dalam satu grup
  countUp: true,           // angka di kartu menghitung naik
  countDuration: 1400,     // ms
  marqueeSeconds: 28,      // makin kecil makin cepat
  blobs: true,             // gradient bergerak di hero
  blobSeconds: 18,
  cardTilt: true,          // kartu miring mengikuti kursor
  tiltMax: 6,              // derajat
  typewriter: false,       // ketik otomatis untuk tagline hero
  typeSpeed: 38,           // ms per huruf
  navBlurOnScroll: true,
  scrollProgress: true     // garis progres di atas halaman
};

/* Warna & font — ubah di sini, otomatis diterapkan ke CSS. */
const THEME = {
  defaultMode: "dark",     // "dark" atau "light"
  accent:  "#7c9cff",
  accent2: "#5eead4",
  font: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
};
