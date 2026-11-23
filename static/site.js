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
    if (window.__refreshColors) window.__refreshColors();
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
    return '<details class="job"' + (idx < 2 ? " open" : "") + '><summary><p class="org">' + esc(j.org) + "</p><h3>" + esc(j.role) + '</h3><p class="meta">' + meta + "</p></summary>" +
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
  }).join("") + '</ul><p class="meta" style="margin-top:1rem">The <a href="archive/2020/">first version of this site</a>, built in 2020, is still online.</p>' : "");

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

  /* ---------- spot the bots ---------- */
  traffic($("traffic"));

  function traffic(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var help = $("game-help");
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) help.textContent = "Every dot is a visitor to a website. Bots move too perfectly. Watch their paths, then tap the ones you think are bots.";
    var helpText = help.textContent;
    var W = 0, H = 0, dpr = 1, people = [], pulses = [], mouse = null, running = true, detecting = false, frame = 0;
    var C = {};
    var N_HUMAN = 22, N_BOT = 9, LENS = 85, TRAIL = 46;

    function refreshColors() {
      var cs = getComputedStyle(root);
      ["page", "ink", "muted", "rule", "accent", "bot", "human", "warn", "dot"].forEach(function (k) { C[k] = cs.getPropertyValue("--" + k).trim(); });
      if (reduce) draw();
    }
    window.__refreshColors = refreshColors;
    if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { refreshColors(); labelTheme(); });

    function size() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var nw = r.width, nh = r.height;
      if (W && nw) people.forEach(function (p) { p.x *= nw / W; p.y *= nh / H; p.trail = []; });
      W = nw; H = nh;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      people = [];
      var i;
      for (i = 0; i < N_HUMAN; i++) {
        people.push({ bot: false, x: Math.random() * W, y: Math.random() * H, h: Math.random() * 6.283,
          base: 0.35 + Math.random() * 0.6, ph: Math.random() * 6.283, pause: 0, state: 0, trail: [] });
      }
      // bots: perfectly straight, constant speed; one synchronized group of three
      var group = { h: Math.floor(Math.random() * 8) * Math.PI / 4, v: 1.25 };
      for (i = 0; i < N_BOT; i++) {
        var g = i < 3;
        var h = g ? group.h : Math.floor(Math.random() * 8) * Math.PI / 4 + (Math.random() < 0.5 ? 0 : Math.PI / 8);
        people.push({ bot: true, x: g ? W * 0.2 + i * 26 : Math.random() * W, y: g ? H * 0.3 + i * 18 : Math.random() * H,
          h: h, v: g ? group.v : 0.9 + Math.random() * 0.7, state: 0, trail: [] });
      }
      for (i = 0; i < TRAIL * 2; i++) step(true);   // warm up so paths exist from the start
      pulses = []; detecting = false;
      updateScore();
      help.textContent = helpText;
      $("detect").disabled = false;
    }

    function wrap(p) {
      var jumped = false;
      if (p.x < -6) { p.x += W + 12; jumped = true; } else if (p.x > W + 6) { p.x -= W + 12; jumped = true; }
      if (p.y < -6) { p.y += H + 12; jumped = true; } else if (p.y > H + 6) { p.y -= H + 12; jumped = true; }
      if (jumped) p.trail = [];
    }

    function step(warm) {
      frame++;
      var k = reduce && !warm ? 0 : 1;
      people.forEach(function (p) {
        if (p.bot) {
          p.x += Math.cos(p.h) * p.v * k; p.y += Math.sin(p.h) * p.v * k;
        } else if (p.pause > 0) {
          p.pause--;
        } else {
          p.h += (Math.random() - 0.5) * 0.35 + Math.sin(frame * 0.02 + p.ph) * 0.03;
          if (Math.random() < 0.006) p.h += (Math.random() - 0.5) * 2.4;
          if (Math.random() < 0.003) p.pause = 30 + Math.random() * 70;
          var v = p.base * (0.6 + 0.5 * Math.sin(frame * 0.03 + p.ph));
          p.x += Math.cos(p.h) * v * k; p.y += Math.sin(p.h) * v * k;
        }
        wrap(p);
        if (frame % 2 === 0) { p.trail.push(p.x, p.y); if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2); }
      });
    }

    function colorOf(p, revealAll) {
      if (p.state === 1) return C.bot;
      if (p.state === 2) return C.warn;
      if (revealAll) return p.bot ? C.bot : C.human;
      return C.dot;
    }

    function draw() {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);
      var revealAll = detecting === "done";
      if (mouse) {
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, LENS, 0, 6.283);
        ctx.strokeStyle = C.muted; ctx.globalAlpha = 0.6; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      }
      people.forEach(function (p) {
        var near = mouse && Math.hypot(p.x - mouse.x, p.y - mouse.y) < LENS;
        var show = true;
        if (show && p.trail.length > 4) {
          ctx.beginPath(); ctx.moveTo(p.trail[0], p.trail[1]);
          for (var i = 2; i < p.trail.length; i += 2) ctx.lineTo(p.trail[i], p.trail[i + 1]);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = colorOf(p, revealAll);
          ctx.globalAlpha = near || p.state ? 0.85 : (revealAll || reduce ? 0.4 : 0.16);
          ctx.lineWidth = 1.6; ctx.lineJoin = "round"; ctx.stroke(); ctx.globalAlpha = 1;
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.state ? 5.5 : 4.5, 0, 6.283);
        ctx.fillStyle = colorOf(p, revealAll); ctx.fill();
        if (p.state) { ctx.beginPath(); ctx.arc(p.x, p.y, 9.5, 0, 6.283); ctx.strokeStyle = colorOf(p); ctx.lineWidth = 1.5; ctx.stroke(); }
      });
      pulses = pulses.filter(function (q) {
        q.t += reduce ? 26 : 1;
        var k = q.t / 26;
        if (k >= 1) return false;
        ctx.beginPath(); ctx.arc(q.p.x, q.p.y, 9 + k * 26, 0, 6.283);
        ctx.strokeStyle = q.c; ctx.globalAlpha = 1 - k; ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = 1;
        return true;
      });
    }

    function updateScore() {
      var caught = 0, fp = 0, left = 0;
      people.forEach(function (p) {
        if (p.bot && p.state === 1) caught++;
        if (!p.bot && p.state === 2) fp++;
        if (p.bot && p.state !== 1) left++;
      });
      $("caught").textContent = caught; $("fp").textContent = fp; $("left").textContent = left;
      if (!left && !detecting) {
        help.textContent = fp === 0
          ? "All " + caught + " bots caught and no humans blocked. You'd make a good detector."
          : "All " + caught + " bots caught, but " + fp + (fp === 1 ? " human" : " humans") + " got blocked too. Avoiding that is the hard part of bot detection.";
        detecting = "done";
        $("detect").disabled = true;
      }
    }

    function flag(p, by) {
      if (p.state) return;
      p.state = p.bot ? 1 : 2;
      pulses.push({ p: p, t: 0, c: p.bot ? C.bot : C.warn });
      if (by === "user") {
        help.textContent = p.bot
          ? "Bot caught. Notice how straight and steady its path was."
          : "That was a human. Real people wander, pause and change speed.";
      }
      updateScore();
    }

    function at(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    canvas.addEventListener("pointermove", function (e) { mouse = at(e); if (reduce) draw(); });
    canvas.addEventListener("pointerleave", function () { mouse = null; if (reduce) draw(); });
    canvas.addEventListener("click", function (e) {
      var m = at(e), best = null, bd = e.pointerType === "touch" ? 26 : 16;
      people.forEach(function (p) { var d = Math.hypot(p.x - m.x, p.y - m.y); if (d < bd) { bd = d; best = p; } });
      if (best) flag(best, "user");
      if (reduce) draw();
    });

    $("detect").addEventListener("click", function () {
      if (detecting) return;
      detecting = true;
      $("detect").disabled = true;
      help.textContent = "Scoring each visitor on how regular its movement is...";
      var bots = people.filter(function (p) { return p.bot && !p.state; });
      bots.forEach(function (p, i) {
        setTimeout(function () {
          flag(p, "detector");
          if (i === bots.length - 1) {
            detecting = "done";
            help.textContent = "Done: every bot is flagged in pink and humans are shown in green. Real detectors use many more signals than motion, but regularity is one of them.";
          }
          if (reduce) draw();
        }, 260 * (i + 1));
      });
    });
    $("reset").addEventListener("click", function () { spawn(); if (reduce) draw(); });

    var looping = false;
    function loop() {
      if (looping || reduce) return;
      looping = true;
      (function tick() {
        if (!running) { looping = false; return; }
        step(false); draw();
        requestAnimationFrame(tick);
      })();
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { running = en[0].isIntersecting; if (running) loop(); }).observe(canvas);
    }

    refreshColors();
    size();
    spawn();
    draw();
    loop();

    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); draw(); }, 120); });
  }
})();
