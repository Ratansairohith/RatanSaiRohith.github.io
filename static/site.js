(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return esc(s).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>'); }
  function fmtDate(d) {
    if (!d) return "";
    var p = String(d).split("-");
    return p.length === 1 ? p[0] : MONTHS[parseInt(p[1], 10) - 1] + " " + p[0];
  }
  function range(a, b) { return fmtDate(a) + " to " + (b ? fmtDate(b) : "present"); }
  function $(id) { return document.getElementById(id); }

  /* ---------- theme ---------- */
  var root = document.documentElement;
  function isDark() {
    var t = root.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function labelTheme() { $("theme").textContent = isDark() ? "Light mode" : "Dark mode"; }
  $("theme").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelTheme();
  });
  labelTheme();

  /* ---------- hero ---------- */
  var parts = S.name.split(" ");
  var half = Math.ceil(parts.length / 2);
  $("name").innerHTML = "<span>" + esc(parts.slice(0, half).join(" ")) + "</span><br><span>" + esc(parts.slice(half).join(" ")) + "</span>";
  $("role").textContent = S.role + (S.location ? ", " + S.location : "");
  $("tagline").innerHTML = rich(S.tagline);

  var links = (S.links || []).slice();
  if (S.resume) links.unshift({ label: "Resume", url: S.resume });
  var linkHtml = links.map(function (l) { return '<li><a href="' + esc(l.url) + '">' + esc(l.label) + "</a></li>"; }).join("");
  if (S.email) linkHtml += '<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></li><li><button type="button" class="copy" data-copy="' + esc(S.email) + '">Copy email</button></li>';
  $("links").innerHTML = linkHtml;

  if (S.photo) $("photo").src = S.photo; else $("photo").remove();
  if (S.updated) $("updated").textContent = "Updated " + fmtDate(S.updated);

  /* ---------- sections ---------- */
  var sections = [];
  function section(id, title, html) {
    if (!html) return;
    sections.push({ id: id, title: title });
    $("main").insertAdjacentHTML("beforeend", '<section id="' + id + '" aria-labelledby="' + id + '-h"><h2 id="' + id + '-h">' + esc(title) + "</h2>" + html + "</section>");
  }

  section("about", "About", (S.about || []).map(function (p) { return "<p>" + rich(p) + "</p>"; }).join(""));

  var news = (S.news || []).slice().sort(function (a, b) { var x = String(a.date).slice(0, 4), y = String(b.date).slice(0, 4); return x < y ? 1 : x > y ? -1 : 0; });
  var SHOW = 5;
  if (news.length) {
    var years = [];
    news.forEach(function (n) { var y = String(n.date).slice(0, 4); if (years.indexOf(y) < 0) years.push(y); });
    var chips = years.length > 1 ? '<div class="filters" role="group" aria-label="Filter news by year"><button type="button" data-year="" aria-pressed="true">All</button>' +
      years.map(function (y) { return '<button type="button" data-year="' + y + '" aria-pressed="false">' + y + "</button>"; }).join("") + "</div>" : "";
    var items = news.map(function (n) {
      var text = rich(n.text) + (n.url ? ' <a href="' + esc(n.url) + '">Read more</a>' : "");
      return '<li data-year="' + esc(String(n.date).slice(0, 4)) + '"><time datetime="' + esc(n.date) + '">' + fmtDate(n.date) + "</time><div>" + text + "</div></li>";
    }).join("");
    var btn = news.length > SHOW ? '<button class="more" type="button" aria-expanded="false"></button>' : "";
    section("news", "News", chips + '<ul class="news">' + items + "</ul>" + btn);
  }

  section("work", "Work", (S.experience || []).map(function (j, idx) {
    var meta = range(j.start, j.end) + (j.place ? ", " + esc(j.place) : "");
    var org = j.url ? '<a href="' + esc(j.url) + '">' + esc(j.org) + "</a>" : esc(j.org);
    return '<details class="job"' + (idx < 2 ? " open" : "") + '><summary><p class="org">' + org + "</p><h3>" + esc(j.role) + '</h3><p class="meta">' + meta + "</p></summary>" +
      (j.points && j.points.length ? "<ul>" + j.points.map(function (p) { return "<li>" + rich(p) + "</li>"; }).join("") + "</ul>" : "") + "</details>";
  }).join(""));

  section("projects", "Projects", (S.projects || []).map(function (p) {
    var l = (p.links || []).map(function (x) { return '<a href="' + esc(x.url) + '">' + esc(x.label) + "</a>"; }).join("&ensp;");
    return '<article class="project"><h3>' + esc(p.name) + "</h3>" + (p.status ? '<p class="meta">' + esc(p.status) + "</p>" : "") +
      "<p>" + rich(p.summary) + "</p>" + (p.detail ? '<p class="detail">' + rich(p.detail) + "</p>" : "") + (l ? "<p>" + l + "</p>" : "") + "</article>";
  }).join(""));

  function facts(list, dt, dd) {
    if (!list || !list.length) return "";
    return '<dl class="facts">' + list.map(function (x) { return "<div><dt>" + dt(x) + "</dt><dd>" + dd(x) + "</dd></div>"; }).join("") + "</dl>";
  }
  section("recognition", "Recognition", facts(S.recognition, function (r) { return esc(r.title); }, function (r) { return rich(r.detail); }));
  section("press", "Press", S.press && S.press.length ? '<ul class="press">' + S.press.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).map(function (x) {
    var title = x.url ? '<a href="' + esc(x.url) + '">' + esc(x.title) + "</a>" : esc(x.title) + ' <span class="note">(print)</span>';
    return '<li><time datetime="' + esc(x.date) + '">' + fmtDate(x.date) + '</time><div><span class="outlet">' + esc(x.outlet) + "</span>" + title + "</div></li>";
  }).join("") + "</ul>" : "");
  section("education", "Education", facts(S.education, function (e) { return esc(e.degree); }, function (e) {
    return esc(e.school) + (e.detail ? '<br><span class="meta">' + esc(e.detail) + "</span>" : "");
  }));
  section("earlier", "Earlier projects", S.archive && S.archive.length ? '<ul class="archive">' + S.archive.map(function (a) {
    var n = a.url ? '<a href="' + esc(a.url) + '">' + esc(a.name) + "</a>" : esc(a.name);
    return "<li>" + n + (a.note ? ' <span class="note">' + rich(a.note) + "</span>" : "") + "</li>";
  }).join("") + "</ul>" : "");

  $("toc").innerHTML = sections.map(function (s) { return '<li><a href="#' + s.id + '">' + esc(s.title) + "</a></li>"; }).join("");
  $("foot").innerHTML = "<p>" + esc(S.name) + (S.email ? ', <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" : "") + "</p><p>" +
    (S.updated ? "Last updated " + fmtDate(S.updated) : "") + "</p>";

  /* news filtering and show-more */
  var year = "", expanded = false, more = document.querySelector(".more");
  function applyNews() {
    var shown = 0, total = 0;
    document.querySelectorAll(".news li").forEach(function (li) {
      var match = !year || li.dataset.year === year;
      if (match) total++;
      var visible = match && (year || expanded || shown < SHOW);
      if (visible) shown++;
      li.hidden = !visible;
    });
    if (more) {
      more.hidden = !!year || total <= SHOW;
      more.textContent = expanded ? "Show fewer" : "Show all " + total + " updates";
      more.setAttribute("aria-expanded", String(expanded));
    }
  }
  document.querySelectorAll(".filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      year = b.dataset.year;
      document.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      applyNews();
    });
  });
  if (more) more.addEventListener("click", function () { expanded = !expanded; applyNews(); });
  applyNews();

  /* copy email */
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy email"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, function () { b.textContent = b.dataset.copy; });
      else b.textContent = b.dataset.copy;
    });
  });

  /* section highlight in the side menu */
  if ("IntersectionObserver" in window) {
    var navLinks = {};
    document.querySelectorAll("#toc a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(navLinks).forEach(function (k) { navLinks[k].removeAttribute("aria-current"); });
        if (navLinks[e.target.id]) navLinks[e.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    document.querySelectorAll("main section").forEach(function (s) { io.observe(s); });
  }

})();
