/* Merender halaman Info Loker. Biasanya tidak perlu diedit — ubah isi di loker-data.js */
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const root = document.documentElement;
  const A = (typeof ANIM !== "undefined") ? ANIM : { reveal: true, revealDistance: 28, revealDuration: 700, revealStagger: 90, countUp: true, countDuration: 1400 };

  // ---- tema: ikut landing ----
  root.style.setProperty("--accent", THEME.accent);
  root.style.setProperty("--accent2", THEME.accent2);
  root.style.setProperty("--font", THEME.font);
  let mode; try { mode = localStorage.getItem("mode") || THEME.defaultMode; } catch (e) { mode = THEME.defaultMode; }
  root.dataset.mode = mode;
  $("themeBtn").addEventListener("click", () => {
    mode = mode === "dark" ? "light" : "dark"; root.dataset.mode = mode;
    try { localStorage.setItem("mode", mode); } catch (e) {}
  });

  // ---- navbar dari PROFILE.nav (landing). loker/ sejajar dengan landing/ ----
  const fix = (h) => /^(https?:|mailto:|tel:|\.\.\/|\/)/.test(h) ? h
    : h.startsWith("#") ? "../landing/index.html" + h
    : "../landing/" + h.replace(/^\.\//, "");
  $("logo").textContent = PROFILE.name; $("logo").href = "../landing/index.html";
  $("navLinks").innerHTML = PROFILE.nav.map((n) => {
    const href = fix(n.href);
    const active = /(^|\/)loker\/(index\.html)?$/.test(href) ? "active" : "";
    return `<a class="${active}" href="${esc(href)}">${esc(n.label)}</a>`;
  }).join("");
  $("footer").textContent = PROFILE.footer;
  const nav = $("nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---- konten ----
  document.title = LOKER.heading + " — " + PROFILE.name;
  $("heading").textContent = LOKER.heading;
  $("sub").textContent = LOKER.sub;
  $("updated").textContent = LOKER.updated ? "Diperbarui: " + LOKER.updated : "";

  const cardStyle = (c) => {
    const vars = { accent: "--accent", bg: "--surface", border: "--border", text: "--text", muted: "--muted",
                   radius: "--radius", padding: "--pad", statsJustify: "--stats-justify" };
    const out = Object.keys(vars).filter((k) => c[k]).map((k) => `${vars[k]}:${c[k]}`);
    if (c.minHeight) out.push(`min-height:${c.minHeight}`);
    if (c.style) out.push(c.style);
    return out.join(";");
  };

  $("cards").innerHTML = LOKER.jobs.map((c) => {
    const slug = c.id || String(c.company + "-" + c.role).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const soon = !c.file;
    const top = (c.icon || c.badge)
      ? `<div class="top">${c.icon ? `<span class="ico">${esc(c.icon)}</span>` : "<span></span>"}${c.badge ? `<span class="pill">${esc(c.badge)}</span>` : ""}</div>` : "";
    const tags = (c.tags && c.tags.length) ? `<div class="tags">${c.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : "";
    const stats = (c.stats || []).map((s) =>
      `<div class="stat"><b data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || "")}">0${esc(s.suffix || "")}</b><span>${esc(s.label)}</span></div>`).join("");
    const inner = `${top}${soon ? "" : '<span class="arrow">↗</span>'}
      <span class="role">${esc(c.role)}</span><h3>${esc(c.company)}</h3><p>${esc(c.desc)}</p>${tags}
      <div class="stats ${c.statsEqual ? "stats-equal" : ""}">${stats}</div>
      ${soon ? "" : `<span class="go">${esc(c.cta || "Buka mock project")} →</span>`}`;
    const attrs = `class="card ${soon ? "soon" : ""} ${esc(c.class || "")}" data-card="${esc(slug)}" style="${esc(cardStyle(c))}"`;
    return soon ? `<div ${attrs}>${inner}</div>` : `<a ${attrs} href="${esc(c.file)}">${inner}</a>`;
  }).join("");

  // ---- animasi: muncul bertahap + angka menghitung naik ----
  const countUp = (el) => {
    const end = Number(el.dataset.count), suf = el.dataset.suffix || "";
    if (!A.countUp) { el.textContent = end.toLocaleString("id-ID") + suf; return; }
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / A.countDuration, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString("id-ID") + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  };
  const cards = [...document.querySelectorAll(".card")];
  if (LOKER.animate && A.reveal && "IntersectionObserver" in window) {
    root.style.setProperty("--rv-dist", A.revealDistance + "px");
    root.style.setProperty("--rv-dur", A.revealDuration + "ms");
    cards.forEach((c, i) => { c.style.setProperty("--rv-delay", Math.min(i, 4) * A.revealStagger + "ms"); c.classList.add("reveal"); });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; el.classList.add("in");
      setTimeout(() => { el.classList.remove("reveal", "in"); el.style.removeProperty("--rv-delay"); }, A.revealDuration + 600);
      el.querySelectorAll("[data-count]").forEach(countUp); io.unobserve(el);
    }), { threshold: 0.12 });
    cards.forEach((c) => io.observe(c));
  } else document.querySelectorAll("[data-count]").forEach(countUp);

  // ---- efek sorotan kursor pada kartu ----
  cards.forEach((card) => card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px"); card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }));
})();
