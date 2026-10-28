/* ==========================================================
   LAYOUT — merender sidebar, header, KPI, kartu, dan footer.
   Biasanya TIDAK perlu diedit. Ubah konten di config.js.
   ========================================================== */
(function () {
  const page = document.body.dataset.page;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Sidebar ----------
  const nav = SITE.nav.map((g) => `
    <div class="nav-group">
      <h4>${esc(g.group)}</h4>
      ${g.items.map((i) => `<a class="nav-link ${i.id === page ? "active" : ""}" href="${i.href}">${i.icon} ${esc(i.label)}</a>`).join("")}
    </div>`).join("");

  const c = SITE.contact;
  const contact = [
    c.website  && `<a href="${esc(c.website)}"  target="_blank" rel="noopener">🌐 Website</a>`,
    c.linkedin && `<a href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    c.github   && `<a href="${esc(c.github)}"   target="_blank" rel="noopener">GitHub</a>`,
    c.email    && `<a href="mailto:${esc(c.email)}">Email</a>`
  ].filter(Boolean).join("");

  const logo = SITE.logo ? `<img src="${esc(SITE.logo)}" alt="">` : "";
  const sidebar = `
    <button class="menu-btn" aria-label="Menu" id="menuBtn">☰</button>
    <aside class="sidebar" id="sidebar">
      <div class="brand">${logo}<span>${esc(SITE.company)}</span></div>
      ${nav}
      ${contact ? `<div class="nav-group contact"><h4>Contact</h4>${contact}</div>` : ""}
    </aside>`;

  // ---------- Bungkus konten halaman ----------
  const content = document.getElementById("content");
  const shell = document.createElement("div");
  shell.className = "shell";
  shell.innerHTML = sidebar + `<div class="main"><div class="content" id="slot"></div>
    <footer class="footer">${esc(SITE.company)} — ${esc(SITE.role)} Portfolio · ${esc(SITE.owner)} · ${esc(SITE.updated)}</footer></div>`;
  document.body.prepend(shell);
  shell.querySelector("#slot").appendChild(content);

  if (SITE.showSampleBadge) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = "⚠ DATA CONTOH — ganti dengan data Anda";
    content.prepend(b);
  }

  document.getElementById("menuBtn").addEventListener("click", () =>
    document.getElementById("sidebar").classList.toggle("open"));

  document.title = (document.querySelector("h1")?.textContent || "Portfolio") + " · " + SITE.company;

  // ---------- Komponen otomatis ----------
  const kpiBox = document.getElementById("kpis");
  if (kpiBox) kpiBox.innerHTML = SITE.kpis.map((k) =>
    `<div class="kpi"><div class="v">${esc(k.value)}</div><div class="l">${esc(k.label)}</div></div>`).join("");

  const cardBox = document.getElementById("cards");
  if (cardBox) {
    let n = 0;
    cardBox.innerHTML = SITE.nav.map((g) => {
      const items = g.items.filter((i) => i.desc);
      if (!items.length) return "";
      return `<h2>${esc(g.group)}</h2><div class="grid">` + items.map((i) =>
        `<a class="card" href="${i.href}"><div class="num">${String(++n).padStart(2, "0")}</div>
         <h3>${i.icon} ${esc(i.label)}</h3><p>${esc(i.desc)}</p></a>`).join("") + `</div>`;
    }).join("");
  }

  // Isi teks dinamis: <span data-site="owner"></span>
  document.querySelectorAll("[data-site]").forEach((el) => { el.textContent = SITE[el.dataset.site] ?? ""; });

  // Tabel dari DATA: <table data-table="menu" data-cols="nama,kategori,qty,revenue">
  document.querySelectorAll("table[data-table]").forEach((t) => {
    const rows = DATA[t.dataset.table] || [];
    const cols = t.dataset.cols.split(",");
    const heads = (t.dataset.heads || t.dataset.cols).split(",");
    const fmt = (v) => typeof v === "number" ? v.toLocaleString("id-ID") : esc(v);
    t.innerHTML = `<thead><tr>${heads.map((h, i) => `<th class="${typeof rows[0]?.[cols[i]] === "number" ? "num" : ""}">${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r, n) => `<tr>${cols.map((c) => `<td class="${typeof r[c] === "number" ? "num" : ""}">${c === "#" ? n + 1 : fmt(r[c])}</td>`).join("")}</tr>`).join("")}</tbody>`;
  });

  // ---------- Tema mengikuti kartu perusahaan di landing page (warna + logo) ----------
  // Otomatis: membaca config.js landing, mencari kartu yang cocok, lalu memakai `color` & `logo`-nya.
  // Kartu dicari berurutan: (1) SITE.theme.id = `id` kartu di landing, (2) SITE.theme.match = nama company,
  // (3) kartu yang href-nya menuju folder portofolio ini, (4) kartu yang company-nya sama dengan SITE.company.
  // Tanpa mengisi apa pun di config.js portofolio, cara (3) dan (4) sudah jalan otomatis.
  // Opsional di assets/config.js (di dalam SITE):
  //   theme: { enabled: true, source: "../landing/config.js", id: "perusahaan-a", match: "Perusahaan A", color: "", logo: "", logoBg: "" }
  (function () {
    const T = Object.assign({ enabled: true, source: "", id: "", match: "", color: "", logo: "", logoBg: "" }, SITE.theme || {});
    if (!T.enabled) return;
    const rootEl = document.documentElement;
    const isImg = (s) => /^(https?:|data:|\.{0,2}\/)|\.(png|jpe?g|gif|svg|webp|avif|ico)(\?.*)?$/i.test(s);

    function setLogo(logo, bg, base) {
      const brand = document.querySelector(".brand"); if (!brand) return;
      brand.querySelectorAll("img, .logo-box").forEach((n) => n.remove());
      const box = document.createElement("span");
      box.className = "logo-box";
      box.style.cssText = "display:grid;place-items:center;width:34px;height:34px;flex-shrink:0;border-radius:8px;overflow:hidden;font-size:1.25rem;line-height:1" + (bg ? ";background:" + bg : "");
      let iconHref = "";
      if (isImg(logo)) {
        const src = new URL(logo, base || location.href).href;       // path logo di landing → disesuaikan ke halaman ini
        const img = document.createElement("img");
        img.src = src; img.alt = ""; img.style.cssText = "width:100%;height:100%;object-fit:contain;padding:4px;box-sizing:border-box";
        img.onerror = () => { box.style.display = "none"; };
        box.appendChild(img); iconHref = src;
      } else {
        box.textContent = logo;
        iconHref = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">' + logo + "</text></svg>");
      }
      brand.insertBefore(box, brand.firstChild);
      let fav = document.querySelector('link[rel~="icon"]');            // favicon tab ikut logo
      if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
      fav.href = iconHref;
    }

    function apply(c, base) {
      const color = T.color || (c && (c.color || c.accent));
      const logo = T.logo || (c && c.logo);
      const logoBg = T.logoBg || (c && c.logoBg);
      if (color) {
        rootEl.style.setProperty("--accent", color);
        rootEl.style.setProperty("--accent-soft", "color-mix(in srgb, " + color + " 14%, var(--surface))");
        // teks di atas warna aksen: hitam bila aksen terang, putih bila gelap (agar menu aktif tetap terbaca)
        const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
        if (m) {
          let h = m[1]; if (h.length === 3) h = h.split("").map((x) => x + x).join("");
          const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
          const L = 0.2126 * lin(parseInt(h.slice(0, 2), 16)) + 0.7152 * lin(parseInt(h.slice(2, 4), 16)) + 0.0722 * lin(parseInt(h.slice(4, 6), 16));
          rootEl.style.setProperty("--on-accent", L > 0.4 ? "#10151c" : "#ffffff");
        }
      }
      if (logo) setLogo(logo, logoBg, c && c.logo === logo ? base : null);
    }

    function findCase(cases, base) {
      const folder = (u) => u.replace(/[#?].*$/, "").replace(/[^/]*$/, "");
      const here = folder(location.href), name = String(T.match || SITE.company || "").toLowerCase();
      const sameName = (c) => String(c.company || "").toLowerCase() === name;
      return (T.id && cases.find((c) => String(c.id || "").toLowerCase() === String(T.id).toLowerCase()))
        || (T.match && cases.find(sameName))
        || cases.find((c) => c.href && c.href !== "#" && folder(new URL(c.href, base).href) === here)
        || cases.find(sameName);
    }

    if (T.color || T.logo) apply(null);                              // pengaturan manual langsung berlaku
    if (T.color && T.logo) return;                                   // keduanya manual → tidak perlu baca landing

    const sources = T.source ? [T.source] : ["../landing/config.js", "../../landing/config.js", "../../../landing/config.js"];
    (function load(i) {
      if (i >= sources.length) return;
      const s = document.createElement("script");
      s.src = sources[i];
      s.onload = () => {
        try {
          const cases = (typeof PROFILE !== "undefined" && PROFILE.work && PROFILE.work.cases) || [];
          const base = new URL(sources[i], location.href);
          const c = findCase(cases, base);
          if (c) apply(c, base);
        } catch (e) { /* landing tidak terbaca → pakai tema bawaan portofolio */ }
      };
      s.onerror = () => load(i + 1);                                 // coba lokasi berikutnya
      document.head.appendChild(s);
    })(0);
  })();

  // ---------- LAYOUT v2: kolom kartu per grup, penomoran, logo di hero ----------
  // Opsional di assets/config.js → SITE.nav: beri grup  numPrefix: "A"  agar kartunya bernomor A1, A2, ... (mis. Appendix)
  (function () {
    const cards = document.getElementById("cards");
    if (cards) {
      let n = 0;
      cards.querySelectorAll("h2").forEach((h) => {
        const grid = h.nextElementSibling;
        if (!grid || !grid.classList.contains("grid")) return;
        const items = grid.querySelectorAll(".card");
        grid.classList.add("cols-" + Math.min(Math.max(items.length, 1), 3));   // 1–3 kolom sesuai jumlah kartu
        const g = SITE.nav.find((x) => x.group === h.textContent.trim());
        items.forEach((c, i) => {
          const num = c.querySelector(".num"); if (!num) return;
          num.textContent = (g && g.numPrefix) ? g.numPrefix + (i + 1) : String(++n).padStart(2, "0");
        });
      });
    }

    // logo di atas judul (halaman index) — mengambil logo yang sama dengan sidebar / tema landing
    if (document.body.dataset.page === "index") {
      const place = () => {
        if (document.querySelector(".hero-logo")) return true;
        const src = document.querySelector(".brand .logo-box, .brand img");
        const eb = document.querySelector("#content .eyebrow");
        if (!src || !eb) return false;
        const box = document.createElement("div");
        box.className = "hero-logo";
        box.innerHTML = src.matches(".logo-box") ? src.innerHTML : src.outerHTML;
        eb.parentNode.insertBefore(box, eb);
        return true;
      };
      if (!place()) {
        const brand = document.querySelector(".brand");
        if (brand) {                                    // logo dari tema landing datang belakangan → tunggu
          const mo = new MutationObserver(() => { if (place()) mo.disconnect(); });
          mo.observe(brand, { childList: true });
          setTimeout(() => mo.disconnect(), 8000);
        }
      }
    }
  })();
})();