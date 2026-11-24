(function () {
  "use strict";

  /* ---------- theme (same behaviour as the homepage) ---------- */
  var root = document.documentElement, themeBtn = document.getElementById("theme");
  function isDark() {
    var t = root.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function labelTheme() { if (themeBtn) themeBtn.textContent = isDark() ? "Light mode" : "Dark mode"; }
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelTheme();
  });
  labelTheme();

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fmt(v, d) { return Number(v).toFixed(d == null ? 2 : d); }
  function head(title, help) { return '<p class="fig-title">' + esc(title) + "</p>" + (help ? '<p class="fig-help">' + esc(help) + "</p>" : ""); }
  function note(t) { return '<p class="fig-note">' + esc(t) + "</p>"; }

  /* animate bars when they scroll into view */
  function growBars(el) {
    var fills = el.querySelectorAll("[data-w]");
    function go() { fills.forEach(function (f) { f.style.width = f.getAttribute("data-w"); }); }
    if (!("IntersectionObserver" in window)) return go();
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
  }

  var FIG = {};

  /* ---------- 1. the desk at a glance ---------- */
  FIG["desk-diagram"] = function (el) {
    var jobs = [
      ["Daily brief", "Weekdays, before the open", "What changed overnight, signals to watch, a technical scan of every stock, sector direction, underdogs, and small studies the desk runs on its own questions."],
      ["Trigger check", "Weekdays, after the close", "Checks every price level written in advance against the day's close, rewrites about 20 chart reads, and records and grades calls."],
      ["Earnings and verdict", "Weekday evenings", "Earnings cards for companies that reported, crowd and analyst sentiment, a news radar, and a combined verdict for every stock."],
      ["The lab", "Twice a week", "Research agents propose new signals. A fixed test decides which ones pass."],
      ["Weekly review", "Saturday morning", "Deep dives on underdogs, a wider market sweep, and written post-mortems on the desk's own calls."],
      ["Sunday prep", "Sunday morning", "The week ahead: who reports, the economic calendar, and the levels closest to being crossed."]
    ];
    var roles = [["Chart analyst", "reads price"], ["Fundamentals reader", "turns earnings into a card"], ["Sector check", "company move or industry move?"], ["News radar", "dated events and risks"], ["Sentiment", "the crowd and the analysts"]];
    el.innerHTML = head("The desk at a glance", "Six scheduled jobs feed five specialist roles. Pick a job to see what it produces.") +
      '<div class="desk">' +
      '<div class="desk-col"><h4>Scheduled jobs</h4>' + jobs.map(function (j, i) {
        return '<button type="button" class="job" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(j[0]) + "</button>";
      }).join("") + "</div>" +
      '<div class="desk-col"><h4>Specialists</h4>' + roles.map(function (r) {
        return '<div class="node">' + esc(r[0]) + "<small>" + esc(r[1]) + "</small></div>";
      }).join("") + "</div>" +
      '<div class="desk-col"><h4>Checks and output</h4>' +
      '<div class="node key">Senior reviewer<small>checks each analyst against the source before anything is published</small></div>' +
      '<div class="node key">Verdict<small>code lays the reads side by side: where they agree, where they conflict</small></div>' +
      '<div class="node key">Track record<small>every call written down and graded later</small></div>' +
      '<div class="node loop">Back to the analysts<small>past grades are on the page the analyst sees before writing</small></div>' +
      "</div></div>" +
      '<div class="desk-out" aria-live="polite"></div>';
    var out = el.querySelector(".desk-out"), btns = el.querySelectorAll("button.job");
    function show(i) {
      btns.forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.i === i)); });
      out.innerHTML = "<b>" + esc(jobs[i][0]) + "</b>, " + esc(jobs[i][1].toLowerCase()) + ". " + esc(jobs[i][2]);
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.i); }); });
    show(0);
  };

  /* ---------- 2. track record by pattern ---------- */
  FIG["track-record"] = function (el) {
    var rows = [
      ["Inverse head and shoulders", 62, "228 cases"],
      ["Double bottom", 59, "329 cases"],
      ["Double top", 48, ""],
      ["Cup and handle", 40, ""],
      ["Bear flag", 34, ""]
    ];
    el.innerHTML = head("How often each pattern was right", "Share of calls that beat the typical tracked stock over the next 20 sessions. The line marks 50%, a coin flip.") +
      '<div class="bars">' + rows.map(function (r) {
        var cls = r[1] > 52 ? "good" : r[1] < 45 ? "bad" : "";
        return '<div class="bar-row"><span>' + esc(r[0]) + (r[2] ? "<small>" + esc(r[2]) + "</small>" : "") + "</span>" +
          '<span class="bar-track"><i class="bar-fill ' + cls + '" style="width:0" data-w="' + r[1] + '%"></i><i class="bar-mid" style="left:50%"></i></span>' +
          '<span class="bar-val">' + r[1] + "%</span></div>";
      }).join("") + "</div>" +
      note("Only windows with no news event inside them are counted, so the numbers measure the pattern and not an earnings surprise.");
    growBars(el);
  };

  /* ---------- 3. AXP levels ---------- */
  FIG["axp-chart"] = function (el) {
    var close = 301.70;
    var L = [
      { v: 321.80, t: "200 day average", s: "200 day avg", g: "avg" },
      { v: 318.34, t: "50 day average", s: "50 day avg", g: "avg" },
      { v: 317.08, t: "21 day average", s: "21 day avg", g: "avg" },
      { v: 313.24, t: "Resistance, 3 touches. Close above: support held", s: "Resistance", g: "sr", k: "res" },
      { v: 306.90, t: "Nov 23 close, the same evening", s: "Nov 23 close", g: "px", k: "later" },
      { v: 301.70, t: "Nov 20 close, the read's starting point", s: "Nov 20 close", g: "px", k: "px" },
      { v: 301.03, t: "A close below breaks the idea", s: "Idea breaks", g: "sig", k: "down" },
      { v: 300.90, t: "Support, 5 touches this year", s: "Support (5)", g: "sr", k: "sup" },
      { v: 296.28, t: "A close below confirms the floor has gone", s: "Floor gone", g: "sig", k: "down" },
      { v: 288.37, t: "Older support, 3 touches", s: "Older support", g: "sr", k: "sup" }
    ];
    var groups = [["avg", "Averages"], ["sr", "Support and resistance"], ["sig", "Signals to watch"], ["px", "Prices"]];
    var on = { avg: true, sr: true, sig: true, px: true };
    var color = { avg: "var(--muted)", sr: "var(--accent)", sig: "var(--bot)", px: "var(--ink)", later: "var(--human)" };
    el.innerHTML = head("Where American Express sat on Nov 20, 2026", "Every level the desk was watching, to scale. Toggle a group, or hover a line to read it.") +
      '<div class="chips" role="group" aria-label="Show levels">' + groups.map(function (g) {
        return '<button type="button" data-g="' + g[0] + '" aria-pressed="true">' + g[1] + "</button>";
      }).join("") + "</div><div class=\"lv\"></div>" +
      note("Prices are adjusted for dividends, as the desk uses them, so older levels can sit slightly under the price quoted on the day. Percentages are distance from the Nov 20 close.");
    var box = el.querySelector(".lv");

    function draw() {
      var narrow = box.clientWidth < 560, W = narrow ? Math.max(300, box.clientWidth) : 680, H = 470, top = 24, bot = 24, lo = 284, hi = 326, x1 = narrow ? 34 : 60, x2 = narrow ? 104 : 220, xl = x2 + 12;
      var y = function (v) { return top + (hi - v) / (hi - lo) * (H - top - bot); };
      var vis = L.filter(function (l) { return on[l.g]; });
      var ys = vis.map(function (l) { return y(l.v); }), ly = [];
      ys.forEach(function (v, i) { ly[i] = i ? Math.max(v, ly[i - 1] + 17) : v; });
      for (var i = ly.length - 1; i >= 0; i--) { var maxY = (i === ly.length - 1 ? H - 6 : ly[i + 1] - 17); if (ly[i] > maxY) ly[i] = maxY; }
      var s = '<svg viewBox="0 0 ' + W + " " + H + '"' + (narrow ? ' style="width:' + W + 'px"' : "") + ' role="img" aria-label="Price levels for American Express">';
      for (var p = 285; p <= 325; p += 5) s += '<line x1="' + x1 + '" x2="' + x2 + '" y1="' + y(p) + '" y2="' + y(p) + '" stroke="var(--rule)" stroke-width="1"/><text class="muted" x="' + (x1 - 10) + '" y="' + (y(p) + 4) + '" text-anchor="end" font-size="11">' + p + "</text>";
      s += '<rect x="' + x1 + '" y="' + y(301.03) + '" width="' + (x2 - x1) + '" height="' + (y(296.28) - y(301.03)) + '" fill="var(--bot)" opacity="0.08"/>';
      vis.forEach(function (l, i) {
        var c = color[l.k === "later" ? "later" : l.g], yy = ys[i], dash = l.g === "avg" ? "6 4" : l.g === "sig" ? "2 3" : "";
        var w = l.k === "px" ? 3 : 2, pct = (l.v / close - 1) * 100;
        s += '<g class="lvl" tabindex="0"><line x1="' + x1 + '" x2="' + x2 + '" y1="' + yy + '" y2="' + yy + '" stroke="' + c + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : "") + "/>" +
          '<path d="M' + x2 + "," + yy + " L" + (xl - 4) + "," + ly[i] + '" stroke="' + c + '" stroke-width="1" fill="none" opacity="0.6"/>' +
          '<text x="' + xl + '" y="' + (ly[i] + 4) + '" font-size="12.5"><tspan font-weight="700">' + fmt(l.v) + "</tspan>" +
          (l.k === "px" ? "" : '<tspan class="muted"> ' + (pct > 0 ? "+" : "") + fmt(pct, 1) + "%</tspan>") + '<tspan dx="8">' + esc(narrow ? l.s : l.t) + "</tspan></text></g>";
      });
      s += "</svg>";
      box.innerHTML = s;
      box.querySelectorAll(".lvl").forEach(function (g) {
        function hi(onn) { box.querySelectorAll(".lvl").forEach(function (o) { o.style.opacity = onn && o !== g ? 0.25 : 1; }); }
        g.addEventListener("mouseenter", function () { hi(true); });
        g.addEventListener("mouseleave", function () { hi(false); });
        g.addEventListener("focus", function () { hi(true); });
        g.addEventListener("blur", function () { hi(false); });
      });
    }
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(draw, 150); });
    el.querySelectorAll(".chips button").forEach(function (b) {
      b.addEventListener("click", function () {
        on[b.dataset.g] = !on[b.dataset.g];
        b.setAttribute("aria-pressed", String(on[b.dataset.g]));
        draw();
      });
    });
    draw();
  };

  /* ---------- 4. evidence for AXP's flags ---------- */
  FIG["evidence-table"] = function (el) {
    var rows = [
      ["Sitting on support", 7761, 48, -0.54],
      ["Double bottom forming", 6050, 48, -0.57],
      ["Double top forming", 6070, 49, -0.54],
      ["RSI low for this stock", 3247, 53, -0.21],
      ["Closed below the lower Bollinger band", 1586, 52, 0.02],
      ["Below the lower volatility band", 1966, 53, -0.14]
    ];
    el.innerHTML = head("The six flags on AXP, and what the backtest says", "For each flag: how many past cases the desk replayed, how often the stock beat the typical tracked stock over the next 20 sessions, and the average edge.") +
      '<table class="ev"><thead><tr><th>Flag</th><th class="n">Cases</th><th>Beat the typical stock</th><th class="n hide-s">20 day edge</th><th class="hide-s">Verdict</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return "<tr><td>" + esc(r[0]) + '</td><td class="n">' + r[1].toLocaleString("en-US") + "</td>" +
          '<td><div style="display:flex;gap:.5rem;align-items:center"><span class="mini" style="flex:1"><i style="width:' + r[2] + '%"></i><b></b></span><span class="n">' + r[2] + "%</span></div></td>" +
          '<td class="n hide-s">' + (r[3] > 0 ? "+" : "") + fmt(r[3]) + '%</td><td class="hide-s"><span class="tag">did not beat chance</span></td></tr>';
      }).join("") + "</tbody></table>" +
      note("The line in each bar marks 50%, a coin flip. All six are within a few points of it.");
  };

  /* ---------- 5. the specialists, one card at a time ---------- */
  FIG["agent-cards"] = function (el) {
    var cards = [
      ["Chart analyst", "flat", "Mixed", "Sitting on support near 300.90, under all three averages, RSI low for this stock. The double bottom and double top run through the same swings, so neither counts."],
      ["Earnings and fundamentals reader", "up", "Counts in favour", "Beat on earnings and raised the forecast, but underlying profit grew only about 2% once tax, reserves and a one-off gain are set aside. Business intact, beat lower quality than the headline."],
      ["Sector check", "flat", "Context", "Last week's drop belonged to the financials sector. Measured against its usual link to the sector fund, AXP did 3.5% better than expected."],
      ["News radar", "down", "Counts against", "A proposed 10% cap on card interest rates got louder on Nov 21, and insiders sold about 122 million dollars of stock in early November."],
      ["Sentiment", "up", "Counts in favour", "The retail crowd is neutral at 45 out of 100. Analysts are more positive, with an average target about 21% above the price and few investors betting against it."],
      ["Own study", "flat", "Too few cases", "15 past cases like this one: higher 20 sessions later 64% of the time, but in 9 of 14 the price first slipped 2% or more under the level."],
      ["Lead verdict", "flat", "Watch, not act", "Two of five kinds of evidence agree. Below 301.03 the idea breaks, below 296.28 the floor has gone, above 313.24 the support held."]
    ];
    var i = 0;
    el.innerHTML = head("The morning read, one specialist at a time", "Step through the cards. Each one is a separate read; the verdict comes last.") +
      '<div class="cards-dots" role="group" aria-label="Choose a card">' + cards.map(function (c, k) {
        return '<button type="button" data-k="' + k + '">' + esc(c[0].split(" ")[0]) + "</button>";
      }).join("") + '</div><div class="card" aria-live="polite"></div>' +
      '<div class="cards-nav"><button type="button" class="prev">Previous</button><button type="button" class="next btn-primary">Next</button></div>';
    var card = el.querySelector(".card"), dots = el.querySelectorAll(".cards-dots button");
    function show(k) {
      i = (k + cards.length) % cards.length;
      var c = cards[i];
      card.innerHTML = '<p class="role">' + esc(c[0]) + '</p><span class="stance ' + c[1] + '">' + esc(c[2]) + "</span><p>" + esc(c[3]) + "</p>";
      dots.forEach(function (d) { if (+d.dataset.k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      el.querySelector(".next").textContent = i === cards.length - 1 ? "Start over" : "Next";
    }
    dots.forEach(function (d) { d.addEventListener("click", function () { show(+d.dataset.k); }); });
    el.querySelector(".prev").addEventListener("click", function () { show(i - 1); });
    el.querySelector(".next").addEventListener("click", function () { show(i + 1); });
    show(0);
  };

  /* ---------- 6. sector link ---------- */
  FIG["sector-regression"] = function (el) {
    var beta = 1.26;
    el.innerHTML = head("How much of a move is the sector's?", "Over 250 sessions, AXP has moved about 1.26 times as much as the financials fund XLF. Drag to see what that link expects.") +
      '<label for="xlfmove" style="font-size:.9rem">If XLF moves <b class="xv"></b></label>' +
      '<input id="xlfmove" type="range" min="-8" max="8" step="0.5" value="-5">' +
      '<div class="reg-out"><div><small>Expected AXP move</small><b class="ev1"></b></div><div><small>Share of AXP\'s daily moves the fund explains</small><b>about half</b></div><div><small>Last week, AXP versus expected</small><b>3.5% better</b></div></div>' +
      note("A stock that falls about as much as its sector predicts is mostly carrying sector news. The gap between actual and expected is the part that belongs to the company.");
    var r = el.querySelector("input"), xv = el.querySelector(".xv"), e1 = el.querySelector(".ev1");
    function upd() {
      var v = +r.value;
      xv.textContent = (v > 0 ? "+" : "") + fmt(v, 1) + "%";
      e1.textContent = (v > 0 ? "+" : "") + fmt(v * beta, 1) + "%";
    }
    r.addEventListener("input", upd);
    upd();
  };

  /* ---------- 7. the desk's own study ---------- */
  FIG["own-study"] = function (el) {
    el.innerHTML = head("The desk's own count: 15 past cases like this one", "Closed on a well-tested support while under both shorter averages, then measured 20 sessions later.") +
      '<div class="study-grid">' +
      '<div><p class="fig-help" style="margin:0 0 .5rem">Higher 20 sessions later</p><div class="bars">' +
      '<div class="bar-row" style="grid-template-columns:7rem minmax(0,1fr) 3rem"><span>These 15 cases</span><span class="bar-track"><i class="bar-fill good" style="width:0" data-w="64%"></i><i class="bar-mid" style="left:50%"></i></span><span class="bar-val">64%</span></div>' +
      '<div class="bar-row" style="grid-template-columns:7rem minmax(0,1fr) 3rem"><span>Any 20 sessions</span><span class="bar-track"><i class="bar-fill" style="width:0" data-w="56%"></i><i class="bar-mid" style="left:50%"></i></span><span class="bar-val">56%</span></div>' +
      "</div></div>" +
      '<div><p class="fig-help" style="margin:0 0 .5rem">Median move after 20 sessions</p><div class="bars">' +
      '<div class="bar-row" style="grid-template-columns:7rem minmax(0,1fr) 3rem"><span>These 15 cases</span><span class="bar-track"><i class="bar-fill good" style="width:0" data-w="84%"></i></span><span class="bar-val">+4.2%</span></div>' +
      '<div class="bar-row" style="grid-template-columns:7rem minmax(0,1fr) 3rem"><span>Any 20 sessions</span><span class="bar-track"><i class="bar-fill" style="width:0" data-w="26%"></i></span><span class="bar-val">+1.3%</span></div>' +
      "</div></div></div>" +
      '<p class="fig-help" style="margin:1.1rem 0 0">But first: in 9 of 14 cases the price slipped 2% or more under the level</p>' +
      '<div class="dots14" aria-label="9 of 14 cases dipped first">' + Array.apply(null, Array(14)).map(function (_, k) { return '<span class="' + (k < 9 ? "on" : "") + '"></span>'; }).join("") + "</div>" +
      note("The desk's own conclusion: too few cases to lean on.");
    growBars(el);
  };

  /* ---------- render ---------- */
  document.querySelectorAll(".fig[data-fig]").forEach(function (el) {
    var f = FIG[el.dataset.fig];
    if (f) f(el);
    else el.remove();
  });
})();
