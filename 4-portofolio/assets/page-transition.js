/* ==========================================================
   PAGE TRANSITION — animasi loading + transisi pindah halaman.
   Pasang SATU baris ini di <head> setiap halaman (setelah style.css):
     <script src="page-transition.js"></script>
   Semua pengaturan ada di objek PT di bawah.
   ========================================================== */
(function () {
  const PT = {
    enabled: true,

    // Gaya animasi buka/tutup:
    //   "curtain" = dua panel membuka dari tengah (atas & bawah)
    //   "slide"   = layar naik ke atas
    //   "fade"    = memudar
    type: "curtain",

    brand: "",              // teks di layar loading. Kosong = otomatis dari config.js
    showProgress: true,     // progress bar

    firstLoadDuration: 1100, // ms — loading pertama dalam satu sesi (minimal ditampilkan)
    quickDuration: 300,      // ms — halaman berikutnya (lebih singkat)
    preloaderOnce: true,     // true: loading penuh hanya sekali per sesi, halaman lain pakai versi singkat
    exitDuration: 750,       // ms — animasi layar membuka
    leaveDuration: 450,      // ms — animasi layar menutup saat klik link
    maxWait: 5000,           // ms — batas aman, layar pasti terbuka

    easing: "cubic-bezier(.77, 0, .18, 1)",
    enterAnimation: true,    // konten halaman naik & muncul setelah layar membuka
    enterTargets: "#content, .hero .wrap",  // elemen yang dianimasikan saat masuk

    // Warna: kosong = ikut variabel CSS situs (--bg, --accent, --text)
    bg: "", accent: "", text: ""
  };

  if (!PT.enabled) return;
  const doc = document.documentElement;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ---------- Deteksi kunjungan pertama dalam sesi ----------
  let first = true;
  try {
    first = !sessionStorage.getItem("pt-seen");
    sessionStorage.setItem("pt-seen", "1");
  } catch (e) {}
  const holdMs = (PT.preloaderOnce && !first) ? PT.quickDuration : PT.firstLoadDuration;
  const full = holdMs === PT.firstLoadDuration;

  // ---------- CSS ----------
  const style = document.createElement("style");
  style.textContent = `
  .pt{position:fixed;inset:0;z-index:2147483000;pointer-events:all;
      --pt-bg:${PT.bg || "var(--bg, #0b0e14)"};--pt-ac:${PT.accent || "var(--accent, #7c9cff)"};--pt-tx:${PT.text || "var(--text, #eef2f8)"};
      --pt-exit:${PT.exitDuration}ms;--pt-leave:${PT.leaveDuration}ms;--pt-ease:${PT.easing}}
  .pt-bg{position:absolute;left:0;right:0;background:var(--pt-bg);transition:transform var(--pt-leave) var(--pt-ease),opacity var(--pt-leave) ease}
  .pt-top{top:0;height:50.2%}.pt-bot{bottom:0;height:50.2%}
  .pt-content{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:18px;color:var(--pt-tx);
      transition:opacity .25s ease;font-family:var(--font,system-ui,sans-serif)}
  .pt-brand{font-weight:800;font-size:clamp(1.4rem,4vw,2.2rem);letter-spacing:-.02em;animation:ptPop .7s ease both}
  .pt-bar{width:min(220px,60vw);height:3px;border-radius:3px;background:color-mix(in srgb,var(--pt-tx) 15%,transparent);overflow:hidden}
  .pt-bar i{display:block;height:100%;width:0;background:var(--pt-ac);border-radius:3px}
  .pt.show-bar .pt-bar i{animation:ptBar ${holdMs}ms cubic-bezier(.3,.7,.2,1) forwards}
  .pt-bar.done i{animation:none;width:100%;transition:width .2s}
  .pt.nobar .pt-bar{display:none}
  .pt.out{pointer-events:none;visibility:hidden;transition:visibility 0s linear var(--pt-exit)}
  .pt.out .pt-content{opacity:0;transition-duration:.2s}
  .pt.out .pt-bg{transition-duration:var(--pt-exit)}

  .pt.t-curtain.out .pt-top{transform:translateY(-100%)}
  .pt.t-curtain.out .pt-bot{transform:translateY(100%)}
  .pt.t-slide.out .pt-top,.pt.t-slide.out .pt-bot{transform:translateY(-101%)}
  .pt.t-fade.out .pt-bg{opacity:0}

  /* animasi masuk konten */
  html.pt-enter ${PT.enterTargets.split(",").map(s => s.trim()).join(",html.pt-enter ")}{animation:ptEnter .8s cubic-bezier(.2,.7,.2,1) both}

  @keyframes ptBar{from{width:0}to{width:92%}}
  @keyframes ptPop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes ptEnter{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.pt{display:none!important}}
  `;
  doc.appendChild(style);

  // ---------- Overlay ----------
  const pt = document.createElement("div");
  pt.className = "pt t-" + PT.type + (PT.showProgress && full ? " show-bar" : " nobar");
  pt.innerHTML = '<div class="pt-bg pt-top"></div><div class="pt-bg pt-bot"></div>' +
    '<div class="pt-content"><div class="pt-brand"></div><div class="pt-bar"><i></i></div></div>';
  doc.appendChild(pt);
  const brandEl = pt.querySelector(".pt-brand");
  const bar = pt.querySelector(".pt-bar");
  brandEl.textContent = PT.brand || document.title || "";

  const t0 = performance.now();
  let opened = false;

  function open() {
    if (opened) return; opened = true;
    bar.classList.add("done");
    setTimeout(() => {
      pt.classList.add("out");
      if (PT.enterAnimation) {
        doc.classList.add("pt-enter");
        setTimeout(() => doc.classList.remove("pt-enter"), PT.exitDuration + 900);
      }
    }, 180);
  }

  function ready() {
    const wait = Math.max(0, holdMs - (performance.now() - t0));
    setTimeout(open, wait);
  }

  // ambil nama brand dari config.js situs jika tersedia
  document.addEventListener("DOMContentLoaded", () => {
    if (!PT.brand) {
      const n = (window.PROFILE && PROFILE.name) || (window.SITE && (SITE.company || SITE.owner));
      if (n) brandEl.textContent = n;
    }
  });

  const loaded = new Promise((res) => {
    if (document.readyState === "complete") res(); else addEventListener("load", res, { once: true });
  });
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.all([loaded, fontsReady]).then(ready);
  setTimeout(open, PT.maxWait); // pengaman

  // ---------- Transisi saat pindah halaman ----------
  function isInternalNav(a, e) {
    if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download") || a.dataset.pt === "off") return false;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (!/^(https?:|file:)$/.test(a.protocol)) return false;               // mailto:, tel:, dll → lewati
    if (a.protocol !== location.protocol || a.host !== location.host) return false; // domain lain
    if (a.pathname === location.pathname && a.search === location.search) return false; // #anchor di halaman sama
    return true;
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (!isInternalNav(a, e)) return;
    e.preventDefault();
    const href = a.href;
    brandEl.textContent = brandEl.textContent; // tetap
    bar.classList.remove("done");
    pt.classList.remove("show-bar"); pt.classList.add("nobar");
    pt.classList.remove("out");        // layar menutup
    setTimeout(() => { location.href = href; }, PT.leaveDuration + 60);
    // jika navigasi gagal/dibatalkan, buka lagi
    setTimeout(() => pt.classList.add("out"), PT.leaveDuration + 3500);
  });

  // tombol Back/Forward (bfcache): pastikan layar tidak menutupi halaman
  addEventListener("pageshow", (e) => { if (e.persisted) pt.classList.add("out"); });
})();
