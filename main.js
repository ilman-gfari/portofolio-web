/* ==========================================================
   MAIN — merender konten dari config.js dan menjalankan animasi.
   Jarang perlu diedit; atur lewat config.js (PROFILE, ANIM, THEME).
   ========================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const root = document.documentElement;
  const P = PROFILE, A = ANIM;

  // ---------- Tema ----------
  root.style.setProperty("--accent", THEME.accent);
  root.style.setProperty("--accent2", THEME.accent2);
  root.style.setProperty("--font", THEME.font);
  let mode = "dark";
  try { mode = localStorage.getItem("mode") || THEME.defaultMode; } catch (e) { mode = THEME.defaultMode; }
  root.dataset.mode = mode;
  $("themeBtn").addEventListener("click", () => {
    mode = mode === "dark" ? "light" : "dark";
    root.dataset.mode = mode;
    try { localStorage.setItem("mode", mode); } catch (e) {}
  });

  // ---------- Variabel animasi ke CSS ----------
  root.style.setProperty("--rv-dist", A.revealDistance + "px");
  root.style.setProperty("--rv-dur", A.revealDuration + "ms");
  root.style.setProperty("--marquee-s", A.marqueeSeconds + "s");
  root.style.setProperty("--blob-s", A.blobSeconds + "s");
  if (!A.blobs) document.body.classList.add("no-blobs");
  if (!A.scrollProgress) $("progress").style.display = "none";

  // ---------- Render konten ----------
  document.title = P.name + " — " + P.title;
  $("logo").textContent = P.name;
  $("navLinks").innerHTML = P.nav.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join("");

  if (P.status) $("status").querySelector("b").textContent = P.status; else $("status").remove();
  $("heroName").textContent = P.name;
  $("skills").innerHTML = P.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join("");
  $("cta").innerHTML =
    `<a class="btn primary" href="${esc(P.ctaPrimary.href)}">${esc(P.ctaPrimary.label)}</a>` +
    `<a class="btn ghost" href="${esc(P.ctaSecondary.href)}">${esc(P.ctaSecondary.label)}</a>`;

  const items = P.marquee.map((m) => `<span>${esc(m)}</span>`).join("");
  $("marquee").innerHTML = items + items; // digandakan agar loop mulus

  $("workHeading").textContent = P.work.heading;
  $("workSub").textContent = P.work.sub;
  $("workMore").textContent = P.work.more;
  // Gaya per-kartu: opsi di config.js diubah menjadi CSS inline pada kartu itu saja.
  const cardStyle = (c) => {
    const vars = { accent: "--accent", bg: "--surface", border: "--border", text: "--text", muted: "--muted",
                   radius: "--radius", padding: "--pad", statsJustify: "--stats-justify" };
    const out = Object.keys(vars).filter((k) => c[k]).map((k) => `${vars[k]}:${c[k]}`);
    if (c.span) out.push(`grid-column:span ${Number(c.span) || 1}`);
    if (c.minHeight) out.push(`min-height:${c.minHeight}`);
    if (c.style) out.push(c.style);
    return out.join(";");
  };
  $("cards").innerHTML = P.work.cases.map((c) => {
    const slug = c.id || String(c.company).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const top = (c.icon || c.badge)
      ? `<div class="top">${c.icon ? `<span class="ico">${esc(c.icon)}</span>` : ""}${c.badge ? `<span class="pill">${esc(c.badge)}</span>` : ""}</div>` : "";
    const media = c.image
      ? `<div class="media" style="background-image:url('${esc(c.image)}');height:${esc(c.imageHeight || "170px")}"></div>` : "";
    const tags = (c.tags && c.tags.length)
      ? `<div class="tags">${c.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : "";
    const stats = (c.stats || []).map((s) =>
      `<div class="stat"><b data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix || "")}">0${esc(s.suffix || "")}</b><span>${esc(s.label)}</span></div>`).join("");
    return `
    <a class="card ${esc(c.class || "")}" id="card-${esc(slug)}" data-card="${esc(slug)}" href="${esc(c.href)}" style="${esc(cardStyle(c))}">
      ${media}${top}
      <span class="arrow">↗</span>
      <span class="role">${esc(c.role)}</span>
      <h3>${esc(c.company)}</h3>
      <p>${esc(c.desc)}</p>
      ${tags}
      <div class="stats ${c.statsEqual ? "stats-equal" : ""}">${stats}</div>
      ${c.cta ? `<span class="go">${esc(c.cta)} →</span>` : ""}
    </a>`;
  }).join("");

  $("apHeading").textContent = P.approach.heading;
  $("apTag").textContent = P.approach.tagline;
  $("steps").innerHTML = P.approach.steps.map((s, i) => `
    <div class="step"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="ic">${s.icon}</span>
      <h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("");
  $("bringTitle").textContent = P.approach.bringTitle;
  $("bringList").innerHTML = P.approach.bring.map((b) => `<li>${esc(b)}</li>`).join("");

  const C = P.contact;
  $("ctHeading").textContent = C.heading;
  $("ctText").textContent = C.text;
  $("ctButtons").innerHTML =
    (C.email    ? `<a class="btn primary" href="mailto:${esc(C.email)}">Email Me</a>` : "") +
    (C.linkedin ? `<a class="btn ghost" href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : "") +
    (C.github   ? `<a class="btn ghost" href="${esc(C.github)}" target="_blank" rel="noopener">GitHub</a>` : "");
  $("footer").textContent = P.footer;

  // ---------- Typewriter / tagline ----------
  const tag = $("tagline");
  if (A.typewriter) {
    let i = 0; tag.classList.add("caret");
    (function type() {
      tag.firstChild ? (tag.firstChild.nodeValue = P.tagline.slice(0, ++i)) : tag.prepend(document.createTextNode(P.tagline.slice(0, ++i)));
      if (i < P.tagline.length) setTimeout(type, A.typeSpeed); else setTimeout(() => tag.classList.remove("caret"), 1800);
    })();
  } else tag.textContent = P.tagline;

  // ---------- Nav & progress saat scroll ----------
  const nav = $("nav"), bar = $("progress");
  function onScroll() {
    if (A.navBlurOnScroll) nav.classList.toggle("scrolled", window.scrollY > 24);
    if (A.scrollProgress) {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    }
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---------- Reveal ----------
  const targets = [...document.querySelectorAll("[data-reveal], .card, .step, .stat, .chip")];
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
  if (A.reveal && "IntersectionObserver" in window) {
    // jeda berurutan untuk anak dalam satu grup
    document.querySelectorAll(".cards, .steps, .chips, .stats").forEach((g) =>
      [...g.children].forEach((c, i) => c.style.setProperty("--rv-delay", i * A.revealStagger + "ms")));
    targets.forEach((t) => t.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      // lepas kelas reveal setelah selesai agar hover/tilt kartu tidak ikut lambat
      setTimeout(() => { el.classList.remove("reveal", "in"); el.style.removeProperty("--rv-delay"); },
        A.revealDuration + (parseInt(el.style.getPropertyValue("--rv-delay")) || 0) + 100);
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (e.target.matches("[data-count]")) countUp(e.target);
      io.unobserve(e.target);
    }), { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
    // angka di dalam .stat dihitung saat kartunya muncul
    document.querySelectorAll(".card").forEach((c) => io.observe(c));
  } else {
    document.querySelectorAll("[data-count]").forEach(countUp);
  }

  // ---------- Kartu: sorotan kursor + tilt ----------
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", x + "px"); card.style.setProperty("--my", y + "px");
      if (A.cardTilt) {
        const rx = ((y / r.height) - 0.5) * -2 * A.tiltMax, ry = ((x / r.width) - 0.5) * 2 * A.tiltMax;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      }
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  // ---------- Warna + logo per kartu (opsi `color`, `logo`, `logoSize`, `logoBg` di config.js) ----------
  const CX = { topBar: true, tint: true, tintStrength: 9, logoRadius: "12px", logoPad: "6px" };  // ← atur gaya umum di sini
  (function () {
    const css = document.createElement("style");
    css.textContent =
      ".card.has-color{" + (CX.topBar ? "border-top:3px solid var(--accent);" : "") + "}" +
      (CX.tint ? ".card.has-color{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) " + CX.tintStrength + "%,var(--surface)),var(--surface) 70%)}" : "") +
      ".card.has-color:hover{border-color:var(--accent)}" +
      ".card .logo-box{display:grid;place-items:center;width:var(--logo-size,25px);height:var(--logo-size,20px);flex-shrink:0;border-radius:" + CX.logoRadius + ";overflow:hidden;font-size:calc(var(--logo-size,44px)*.6);line-height:1}" +
      ".card .logo-box img{width:100%;height:100%;object-fit:contain;padding:" + CX.logoPad + ";box-sizing:border-box}" +
      ".card .logo-row{display:flex;align-items:center;gap:5px}";
    document.head.appendChild(css);
    const isImg = (s) => /^(https?:|data:|\.{0,2}\/)|\.(png|jpe?g|gif|svg|webp|avif|ico)(\?.*)?$/i.test(s);
    document.querySelectorAll("#cards > .card").forEach((card, i) => {
      const c = P.work.cases[i]; if (!c) return;
      const color = c.color || c.accent;
      if (color) { card.style.setProperty("--accent", color); card.classList.add("has-color"); }
      if (!c.logo) return;
      const box = document.createElement("span");
      box.className = "logo-box";
      if (c.logoSize) box.style.setProperty("--logo-size", c.logoSize);
      if (c.logoBg) box.style.background = c.logoBg;
      if (isImg(c.logo)) {
        const img = document.createElement("img");
        img.src = c.logo; img.alt = ""; img.loading = "lazy";
        img.onerror = () => { box.style.display = "none"; };   // gagal dimuat → disembunyikan
        box.appendChild(img);
      } else box.textContent = c.logo;                           // emoji / teks pendek
      const top = card.querySelector(".top");
      if (top) { const ico = top.querySelector(".ico"); if (ico) ico.remove(); top.insertBefore(box, top.firstChild); }
      else {
        const row = document.createElement("div"); row.className = "logo-row"; row.appendChild(box);
        const arrow = card.querySelector(".arrow");
        card.insertBefore(row, arrow ? arrow.nextSibling : card.firstChild);
      }
    });
  })();
})();