/* OPSIONAL — tombol melayang "← Info Loker" di pojok kiri bawah file mock project.
   Tempel sebelum </body> di file HTML di loker/projects/ :   <script src="../back.js"></script>
   Ubah teks/posisi di bawah. */
(function () {
  var a = document.createElement("a");
  a.href = "../index.html"; a.textContent = "← Info Loker";
  a.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:2147483000;padding:9px 16px;border-radius:999px;" +
    "background:#111827;color:#fff;font:600 13px system-ui,sans-serif;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.3);opacity:.9";
  a.onmouseenter = function () { a.style.opacity = 1; }; a.onmouseleave = function () { a.style.opacity = .9; };
  document.body.appendChild(a);
})();
