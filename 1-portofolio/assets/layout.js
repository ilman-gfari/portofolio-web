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
})();
