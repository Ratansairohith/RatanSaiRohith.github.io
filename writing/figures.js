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

  /* ---------- helpers ---------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fmt(v, d) { return Number(v).toFixed(d == null ? 2 : d); }
  function sgn(v, d) { return (v > 0 ? "+" : v < 0 ? "−" : "") + fmt(Math.abs(v), d == null ? 1 : d); }
  function day(iso) { var p = iso.split("-"); return MON[+p[1] - 1] + " " + (+p[2]); }
  var figNo = 0;
  function head(title, help) {
    return '<div class="fig-head"><p class="fig-num">Figure ' + figNo + '</p><p class="fig-title">' + esc(title) + "</p>" +
      (help ? '<p class="fig-help">' + esc(help) + "</p>" : "") + "</div>";
  }
  function note(t) { return '<p class="fig-note">' + esc(t) + "</p>"; }
  function onVisible(el, fn) {
    if (!("IntersectionObserver" in window)) return fn();
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { fn(); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
  }
  function onResize(fn) { var t, w = window.innerWidth; window.addEventListener("resize", function () { if (window.innerWidth === w) return; w = window.innerWidth; clearTimeout(t); t = setTimeout(fn, 120); }); }

  /* Bars scored against a coin flip. Each row: [label, value %, small text, class, edge text].
     Scale runs 30% to 70% so every figure that uses it can be compared by eye. */
  var LO = 30, HI = 70;
  function pos(v) { return (Math.max(LO, Math.min(HI, v)) - LO) / (HI - LO) * 100; }
  function coinBars(rows, opts) {
    opts = opts || {};
    var edge = !!opts.edge, cls = "dv" + (edge ? " with-edge" : "");
    var h = '<div class="' + cls + '">' + (opts.noHead ? "" :
      '<span class="head lab-h">' + esc(opts.labelHead || "") + "</span>" +
      '<span class="head">' + esc(opts.barHead || "") + "</span>" +
      '<span class="head r">Rate</span>' + (edge ? '<span class="head r">20 day edge</span>' : ""));
    rows.forEach(function (r) {
      var v = r[1], a = pos(Math.min(v, 50)), b = pos(Math.max(v, 50));
      h += '<span class="lab">' + esc(r[0]) + (r[2] ? "<small>" + esc(r[2]) + "</small>" : "") + "</span>" +
        '<span class="track"><i class="mid"></i><i class="fill ' + (r[3] || "") + '" style="left:50%;width:0" data-l="' + a + '" data-w="' + (b - a) + '"></i></span>' +
        '<span class="num">' + v + "%</span>" + (edge ? '<span class="edge">' + esc(r[4]) + "</span>" : "") +
        '<i class="rowline"></i>';
    });
    h += '<span class="axis-pad"></span><span class="axis">' +
      [30, 40, 50, 60, 70].map(function (t) {
        var c = t === 50 ? "mid" : t === 40 || t === 60 ? "minor" : t === 30 ? "first" : "last";
        return '<span class="' + c + '" style="left:' + pos(t) + '%">' + (t === 50 ? '50%<span class="long">, coin flip</span>' : t + "%") + "</span>";
      }).join("") +
      "</span></div>";
    return h;
  }
  function growCoin(el) {
    onVisible(el, function () {
      el.querySelectorAll(".track .fill").forEach(function (f) { f.style.left = f.dataset.l + "%"; f.style.width = f.dataset.w + "%"; });
      el.querySelectorAll(".medbars .bar").forEach(function (f) { f.style.width = f.dataset.w; });
    });
  }

  var FIG = {};

  /* ---------- the desk at a glance ---------- */
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
    var arrow = '<svg class="arrow" width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M1 7h18M14 2l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    el.innerHTML = head("The desk at a glance", "Six scheduled jobs feed five specialist roles, and every read is checked and graded. Pick a job to see what it produces.") +
      '<div class="desk">' +
      '<div class="desk-col"><h4>Scheduled jobs</h4>' + jobs.map(function (j, i) {
        return '<button type="button" class="job" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(j[0]) + "</button>";
      }).join("") + "</div>" + arrow +
      '<div class="desk-col"><h4>Specialists</h4>' + roles.map(function (r) {
        return '<div class="node">' + esc(r[0]) + "<small>" + esc(r[1]) + "</small></div>";
      }).join("") + "</div>" + arrow +
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
      out.innerHTML = '<span class="when">' + esc(jobs[i][0]) + ", " + esc(jobs[i][1].toLowerCase()) + "</span>" + esc(jobs[i][2]);
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(+b.dataset.i); }); });
    show(0);
  };

  /* ---------- track record by pattern ---------- */
  FIG["track-record"] = function (el) {
    var rows = [
      ["Inverse head and shoulders", 62, "228 cases", "good"],
      ["Double bottom", 59, "329 cases", "good"],
      ["Double top", 48, "", ""],
      ["Cup and handle", 40, "", "bad"],
      ["Bear flag", 34, "", "bad"]
    ];
    el.innerHTML = head("How often each pattern was right", "Share of calls that beat the typical tracked stock over the next 20 sessions. Bars grow right of the line when a pattern did better than a coin flip, and left when it did worse.") +
      coinBars(rows, { labelHead: "Pattern", barHead: "Left of the line: worse than a coin flip" }) +
      note("Only windows with no news event inside them are counted, so the numbers measure the pattern and not an earnings surprise.");
    growCoin(el);
  };

  /* ---------- AXP: the real chart ---------- */
  FIG["axp-chart"] = function (el) {
    var X = window.AXP;
    if (!X) { el.remove(); return; }
    var C = X.candles; // [date, open, high, low, close, ema21, ema50, sma200]
    var READ = C.length - 2; // Nov 20: the read used prices through this close
    var AV = [
      { k: 5, t: "21 day average", s: "21d", c: "var(--accent)", dash: "" },
      { k: 6, t: "50 day average", s: "50d", c: "var(--warn)", dash: "" },
      { k: 7, t: "200 day average", s: "200d", c: "var(--muted)", dash: "5 4" }
    ];
    var LV = [
      { v: 313.24, t: "Resistance, 3 touches", s: "Resistance", c: "var(--human)", dash: "" },
      { v: 301.03, t: "Idea breaks below", s: "Breaks", c: "var(--bot)", dash: "4 3" },
      { v: 300.90, t: "Support, 5 touches", s: "Support", c: "var(--accent)", dash: "" },
      { v: 296.28, t: "Floor gone below", s: "Floor", c: "var(--bot)", dash: "4 3" },
      { v: 288.37, t: "Older support", s: "Old support", c: "var(--accent)", dash: "" }
    ];
    var RANGES = [["1 month", 22], ["3 months", 64], ["6 months", C.length]];
    var st = { n: 64, avg: true, lv: true, i: READ };

    el.innerHTML = head("American Express going into the Nov 20 read",
      "Daily candles, the desk's three moving averages and the levels it wrote down on Nov 20. Hover or drag across the chart to read any day.") +
      '<div class="fig-tools"><div class="seg" role="group" aria-label="Time range">' + RANGES.map(function (r) {
        return '<button type="button" data-n="' + r[1] + '" aria-pressed="' + (r[1] === st.n) + '">' + r[0] + "</button>";
      }).join("") + '</div><div class="legend" role="group" aria-label="Show on chart">' +
      '<button type="button" data-l="avg" aria-pressed="true"><i class="sw" style="color:var(--accent)"></i>Averages</button>' +
      '<button type="button" data-l="lv" aria-pressed="true"><i class="sw dash" style="color:var(--bot)"></i>Desk levels</button>' +
      "</div></div>" +
      '<div class="readout" aria-live="polite"></div><div class="chart-box"></div>' +
      note("Prices are adjusted for dividends, the way the desk uses them, so the moving averages match the numbers in the text. The shaded day is Monday, Nov 23, after the read was written. Price data: Yahoo Finance.");
    var box = el.querySelector(".chart-box"), ro = el.querySelector(".readout");

    function readout(i) {
      var c = C[i], prev = C[i - 1] ? C[i - 1][4] : c[1], ch = (c[4] / prev - 1) * 100;
      var tag = i === READ ? " (the read)" : i === C.length - 1 ? " (after the read)" : "";
      ro.innerHTML = '<span class="day">' + day(c[0]) + ", " + c[0].slice(0, 4) + esc(tag) + "</span>" +
        (box.clientWidth < 600 ? "" : "<span>Open <b>" + fmt(c[1]) + "</b></span><span>High <b>" + fmt(c[2]) + "</b></span><span>Low <b>" + fmt(c[3]) + "</b></span>") +
        "<span>Close <b>" + fmt(c[4]) + '</b></span><span class="chg ' + (ch >= 0 ? "up" : "down") + '">' + sgn(ch) + "%</span>" +
        (st.avg ? '<span class="avgs">' + AV.map(function (a) {
          return c[a.k] == null ? "" : '<span><i class="sw' + (a.dash ? " dash" : "") + '" style="display:inline-block;width:14px;border-top:2px ' + (a.dash ? "dashed" : "solid") + " " + a.c + ';vertical-align:middle;margin-right:5px"></i>' + esc(box.clientWidth < 600 ? a.t.replace(" average", "") : a.t) + " <b>" + fmt(c[a.k]) + "</b></span>";
        }).join("") + "</span>" : "");
    }

    function draw() {
      var Wb = Math.max(300, box.clientWidth), narrow = Wb < 600;
      var W = Wb, H = narrow ? 330 : 430, mL = narrow ? 30 : 40, gut = narrow ? 100 : 168, mR = gut, mT = 22, mB = 24;
      var pw = W - mL - mR, ph = H - mT - mB;
      var a0 = C.length - st.n, V = C.slice(a0);
      var lo = Infinity, hi = -Infinity;
      V.forEach(function (c) { lo = Math.min(lo, c[3]); hi = Math.max(hi, c[2]); if (st.avg) AV.forEach(function (a) { if (c[a.k] != null) { lo = Math.min(lo, c[a.k]); hi = Math.max(hi, c[a.k]); } }); });
      if (st.lv) LV.forEach(function (l) { if (l.v > lo - 15) { lo = Math.min(lo, l.v); hi = Math.max(hi, l.v); } });
      var pad = (hi - lo) * 0.06; lo -= pad; hi += pad;
      var step = pw / V.length, bw = Math.max(1, Math.min(14, step * 0.64));
      var x = function (i) { return mL + (i - a0 + 0.5) * step; };
      var y = function (v) { return mT + (hi - v) / (hi - lo) * ph; };
      var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Daily price chart of American Express with moving averages and the desk\'s levels">';
      // grid and price ticks
      var tickStep = (hi - lo) > 60 ? 10 : 5;
      for (var p = Math.ceil(lo / tickStep) * tickStep; p <= hi; p += tickStep) {
        s += '<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + y(p) + '" y2="' + y(p) + '" stroke="var(--rule)" stroke-width="1"/>' +
          '<text class="muted" x="' + (mL - 6) + '" y="' + (y(p) + 3.5) + '" text-anchor="end" font-size="10.5">' + p + "</text>";
      }
      // months / dates along the bottom
      var lastM = "";
      V.forEach(function (c, k) {
        var i = a0 + k, m = c[0].slice(5, 7), lab = "";
        if (st.n > 30) { if (m !== lastM && k > 0) lab = MON[+m - 1]; }
        else if (k % 5 === 0) lab = day(c[0]);
        lastM = m;
        if (lab) s += '<line x1="' + x(i) + '" x2="' + x(i) + '" y1="' + (mT + ph) + '" y2="' + (mT + ph + 4) + '" stroke="var(--muted)"/><text class="muted" x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="10.5">' + lab + "</text>";
      });
      // the session after the read
      var xa = x(C.length - 1) - step / 2;
      s += '<rect x="' + xa + '" y="' + mT + '" width="' + step + '" height="' + ph + '" fill="var(--accent)" opacity="0.09"/>' +
        '<line x1="' + xa + '" x2="' + xa + '" y1="' + (mT - 8) + '" y2="' + (mT + ph) + '" stroke="var(--accent)" stroke-dasharray="3 3" opacity="0.8"/>' +
        '<text x="' + (xa - 5) + '" y="' + (mT - 10) + '" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--accent)" style="fill:var(--accent)">Read written</text>';
      // levels
      var labels = [];
      if (st.lv) {
        s += '<rect x="' + mL + '" y="' + y(301.03) + '" width="' + pw + '" height="' + (y(296.28) - y(301.03)) + '" fill="var(--bot)" opacity="0.07"/>';
        LV.forEach(function (l) {
          if (l.v < lo || l.v > hi) return;
          s += '<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + y(l.v) + '" y2="' + y(l.v) + '" stroke="' + l.c + '" stroke-width="1.4"' + (l.dash ? ' stroke-dasharray="' + l.dash + '"' : "") + ' opacity="0.9"/>';
          labels.push({ y: y(l.v), c: l.c, v: l.v, t: narrow ? l.s : l.t });
        });
      }
      // averages
      if (st.avg) AV.forEach(function (a) {
        var d = "", last = null;
        V.forEach(function (c, k) { if (c[a.k] == null) return; d += (d ? "L" : "M") + fmt(x(a0 + k), 1) + "," + fmt(y(c[a.k]), 1); last = c; });
        if (!d) return;
        s += '<path d="' + d + '" fill="none" stroke="' + a.c + '" stroke-width="1.7"' + (a.dash ? ' stroke-dasharray="' + a.dash + '"' : "") + ' stroke-linejoin="round"/>';
        labels.push({ y: y(last[a.k]), c: a.c, v: last[a.k], t: narrow ? a.s : a.t });
      });
      // candles
      V.forEach(function (c, k) {
        var i = a0 + k, upC = c[4] >= c[1], col = upC ? "var(--human)" : "var(--bot)";
        var yt = y(Math.max(c[1], c[4])), yb = y(Math.min(c[1], c[4]));
        s += '<g' + (i === READ ? ' class="readc"' : "") + '><line x1="' + x(i) + '" x2="' + x(i) + '" y1="' + y(c[2]) + '" y2="' + y(c[3]) + '" stroke="' + col + '" stroke-width="1"/>' +
          '<rect x="' + (x(i) - bw / 2) + '" y="' + yt + '" width="' + bw + '" height="' + Math.max(1, yb - yt) + '" fill="' + col + '"' + (upC ? ' fill-opacity="0.35" stroke="' + col + '" stroke-width="1"' : "") + ' rx="1"/></g>';
      });
      // last close label
      var lc = C[C.length - 1];
      labels.push({ y: y(lc[4]), c: "var(--ink)", v: lc[4], t: narrow ? "Nov 23" : "Close, Nov 23", strong: true });
      // right gutter labels, spread so they never overlap
      labels.sort(function (p, q) { return p.y - q.y; });
      var gap = narrow ? 14 : 15, ly = [];
      labels.forEach(function (l, i) { ly[i] = i ? Math.max(l.y, ly[i - 1] + gap) : Math.max(l.y, mT); });
      for (var j = ly.length - 1; j >= 0; j--) { var mx = j === ly.length - 1 ? mT + ph : ly[j + 1] - gap; if (ly[j] > mx) ly[j] = mx; }
      var gx = mL + pw + 6;
      labels.forEach(function (l, i) {
        s += '<path d="M' + (mL + pw) + "," + l.y + " L" + (gx + 4) + "," + ly[i] + '" stroke="' + l.c + '" stroke-width="1" fill="none" opacity="0.6"/>' +
          '<text x="' + (gx + 8) + '" y="' + (ly[i] + 3.5) + '" font-size="' + (narrow ? 10 : 11) + '"><tspan font-weight="700"' + (l.strong ? "" : ' style="fill:' + l.c + '"') + ">" + fmt(l.v) + '</tspan><tspan class="muted" dx="5">' + esc(l.t) + "</tspan></text>";
      });
      // crosshair layer
      s += '<g class="xh" style="pointer-events:none"></g>' +
        '<rect class="hit" x="' + mL + '" y="' + mT + '" width="' + pw + '" height="' + ph + '" fill="transparent" tabindex="0" aria-label="Chart. Use the left and right arrow keys to move between days."/>';
      s += "</svg>";
      box.innerHTML = s;

      var svg = box.querySelector("svg"), xh = svg.querySelector(".xh"), hit = svg.querySelector(".hit");
      function mark(i) {
        st.i = i; var c = C[i];
        xh.innerHTML = '<line x1="' + x(i) + '" x2="' + x(i) + '" y1="' + mT + '" y2="' + (mT + ph) + '" stroke="var(--ink)" stroke-width="1" opacity="0.35"/>' +
          '<line x1="' + mL + '" x2="' + (mL + pw) + '" y1="' + y(c[4]) + '" y2="' + y(c[4]) + '" stroke="var(--ink)" stroke-width="1" opacity="0.2" stroke-dasharray="2 3"/>' +
          '<circle cx="' + x(i) + '" cy="' + y(c[4]) + '" r="3.2" fill="var(--panel)" stroke="var(--ink)" stroke-width="1.5"/>';
        readout(i);
      }
      function fromEvent(e) {
        var r = svg.getBoundingClientRect(), px = (e.clientX - r.left) * (W / r.width);
        return Math.max(a0, Math.min(C.length - 1, a0 + Math.floor((px - mL) / step)));
      }
      hit.addEventListener("pointermove", function (e) { mark(fromEvent(e)); });
      hit.addEventListener("pointerdown", function (e) { mark(fromEvent(e)); });
      hit.addEventListener("pointerleave", function () { mark(READ); });
      hit.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { mark(Math.max(a0, st.i - 1)); e.preventDefault(); }
        if (e.key === "ArrowRight") { mark(Math.min(C.length - 1, st.i + 1)); e.preventDefault(); }
      });
      mark(st.i >= a0 ? st.i : READ);
    }

    el.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        st.n = +b.dataset.n;
        el.querySelectorAll(".seg button").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        draw();
      });
    });
    el.querySelectorAll(".legend button").forEach(function (b) {
      b.addEventListener("click", function () {
        st[b.dataset.l] = !st[b.dataset.l];
        b.setAttribute("aria-pressed", String(st[b.dataset.l]));
        draw();
      });
    });
    onResize(draw);
    draw();
  };

  /* ---------- evidence for AXP's six flags ---------- */
  FIG["evidence-table"] = function (el) {
    var rows = [
      ["Sitting on support", 48, "7,761 past cases", "", "−0.54%"],
      ["Double bottom forming", 48, "6,050 past cases", "", "−0.57%"],
      ["Double top forming", 49, "6,070 past cases", "", "−0.54%"],
      ["RSI low for this stock", 53, "3,247 past cases", "", "−0.21%"],
      ["Closed below the lower Bollinger band", 52, "1,586 past cases", "", "+0.02%"],
      ["Below the lower volatility band", 53, "1,966 past cases", "", "−0.14%"]
    ];
    el.innerHTML = head("The six flags on AXP, and what the backtest says",
      "For each flag the desk replayed every past case and asked how often the stock beat the typical tracked stock over the next 20 sessions.") +
      '<div class="tally"><span><b>6</b>flags raised that morning</span><span><b>0</b>beat chance</span></div>' +
      coinBars(rows, { edge: true, labelHead: "Flag", barHead: "Left of the line: worse than a coin flip" }) +
      note("Same scale as the pattern chart above. Every bar stays within three points of the coin-flip line, and five of the six average edges are negative.");
    growCoin(el);
  };

  /* ---------- the specialists, one card at a time ---------- */
  FIG["agent-cards"] = function (el) {
    var cards = [
      ["Chart analyst", "Chart", "flat", "Mixed", "Sitting on support near 300.90, under all three averages, RSI low for this stock. The double bottom and double top run through the same swings, so neither counts."],
      ["Earnings and fundamentals reader", "Earnings", "up", "Counts in favour", "Beat on earnings and raised the forecast, but underlying profit grew only about 2% once tax, reserves and a one-off gain are set aside. Business intact, beat lower quality than the headline."],
      ["Sector check", "Sector", "flat", "Context", "Last week's drop belonged to the financials sector. Measured against its usual link to the sector fund, AXP did 3.5% better than expected."],
      ["News radar", "News", "down", "Counts against", "A proposed 10% cap on card interest rates got louder on Nov 21, and insiders sold about 122 million dollars of stock in early November."],
      ["Sentiment", "Sentiment", "up", "Counts in favour", "The retail crowd is neutral at 45 out of 100. Analysts are more positive, with an average target about 21% above the price and few investors betting against it."],
      ["Own study", "Own study", "flat", "Too few cases", "15 past cases like this one: higher 20 sessions later 64% of the time, but in 9 of 14 the price first slipped 2% or more under the level."],
      ["Lead verdict", "Verdict", "lead", "Watch, not act", "Two of five kinds of evidence agree. Below 301.03 the idea breaks, below 296.28 the floor has gone, above 313.24 the support held."]
    ];
    var i = 0;
    el.innerHTML = head("The morning read, one specialist at a time", "Each colored segment is a separate read: green counts in favour, pink counts against, grey is context. Pick one, or step through to the verdict.") +
      '<div class="strip" role="group" aria-label="Choose a read">' + cards.map(function (c, k) {
        return '<button type="button" class="' + c[2] + '" data-k="' + k + '" aria-label="' + esc(c[0]) + '"><i class="seg-bar"></i><span class="nm">' + esc(c[1]) + "</span></button>";
      }).join("") + '</div><div class="card" aria-live="polite"></div>' +
      '<div class="cards-nav"><button type="button" class="prev">Previous</button><span class="pos"></span><button type="button" class="next btn-primary">Next</button></div>';
    var card = el.querySelector(".card"), dots = el.querySelectorAll(".strip button");
    function show(k) {
      i = (k + cards.length) % cards.length;
      var c = cards[i];
      card.innerHTML = '<p class="role">' + esc(c[0]) + ' <span class="stance ' + c[2] + '">' + esc(c[3]) + '</span></p><p class="say">' + esc(c[4]) + "</p>";
      dots.forEach(function (d) { if (+d.dataset.k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      el.querySelector(".pos").textContent = (i + 1) + " of " + cards.length;
      el.querySelector(".next").textContent = i === cards.length - 1 ? "Start over" : "Next";
    }
    dots.forEach(function (d) { d.addEventListener("click", function () { show(+d.dataset.k); }); });
    el.querySelector(".prev").addEventListener("click", function () { show(i - 1); });
    el.querySelector(".next").addEventListener("click", function () { show(i + 1); });
    show(0);
  };

  /* ---------- sector link: the real scatter ---------- */
  FIG["sector-regression"] = function (el) {
    var X = window.AXP;
    if (!X) { el.remove(); return; }
    var P = X.scatter, beta = 1.26, wk = { "2026-11-16": 1, "2026-11-17": 1, "2026-11-18": 1, "2026-11-19": 1, "2026-11-20": 1 };
    el.innerHTML = head("How much of a move is the sector's?",
      "Each dot is one session over the last 250: the financials fund XLF across, American Express up. The line is the desk's fit. Drag the slider to see what it expects.") +
      '<div class="reg-row"><div class="sc"></div><div class="reg-side">' +
      '<div><label for="xlfmove">If XLF moves <b class="xv"></b> in a day</label><input id="xlfmove" type="range" min="-3" max="3" step="0.25" value="-1.5">' +
      '<span style="display:block;margin-top:.6rem">Expected AXP move</span><span class="big ev1"></span></div>' +
      '<div>Share of AXP\'s daily moves the fund explains<span class="big">About half</span></div>' +
      '<div>Last week, AXP against what the link expected<span class="big up">3.5% better</span></div>' +
      "</div></div>" +
      note("Dots in color are last week, Nov 16 to 20, when the whole sector fell. A stock that falls about as much as its sector predicts is mostly carrying sector news; the gap is the part that belongs to the company. Price data: Yahoo Finance.");
    var box = el.querySelector(".sc"), r = el.querySelector("input"), xv = el.querySelector(".xv"), e1 = el.querySelector(".ev1");
    function draw() {
      var W = 420, H = 360, m = 34, lim = 4, ylim = 6;
      var x = function (v) { return m + (Math.max(-lim, Math.min(lim, v)) + lim) / (2 * lim) * (W - 2 * m); };
      var y = function (v) { return H - m - (Math.max(-ylim, Math.min(ylim, v)) + ylim) / (2 * ylim) * (H - 2 * m); };
      var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Scatter of daily moves, American Express against the financials fund">';
      [-4, -2, 0, 2, 4].forEach(function (t) { s += '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="' + m + '" y2="' + (H - m) + '" stroke="var(--rule)"' + (t === 0 ? ' stroke-width="1.5"' : "") + '/><text class="muted" x="' + x(t) + '" y="' + (H - m + 14) + '" text-anchor="middle" font-size="10">' + (t > 0 ? "+" : "") + t + "%</text>"; });
      [-6, -3, 0, 3, 6].forEach(function (t) { s += '<line x1="' + m + '" x2="' + (W - m) + '" y1="' + y(t) + '" y2="' + y(t) + '" stroke="var(--rule)"' + (t === 0 ? ' stroke-width="1.5"' : "") + '/><text class="muted" x="' + (m - 5) + '" y="' + (y(t) + 3.5) + '" text-anchor="end" font-size="10">' + (t > 0 ? "+" : "") + t + "</text>"; });
      s += '<text class="muted" x="' + (W - m) + '" y="' + (H - 4) + '" text-anchor="end" font-size="10.5">XLF daily move</text>' +
        '<text class="muted" x="' + m + '" y="' + (m - 10) + '" font-size="10.5">AXP daily move</text>';
      s += '<line x1="' + x(-lim) + '" y1="' + y(-lim * beta) + '" x2="' + x(lim) + '" y2="' + y(lim * beta) + '" stroke="var(--accent)" stroke-width="2"/>';
      P.forEach(function (p) { if (!wk[p[2]]) s += '<circle cx="' + x(p[0]) + '" cy="' + y(p[1]) + '" r="2.6" fill="var(--dot)" opacity="0.75"/>'; });
      P.forEach(function (p) { if (wk[p[2]]) s += '<circle cx="' + x(p[0]) + '" cy="' + y(p[1]) + '" r="4.4" fill="var(--bot)" stroke="var(--panel)" stroke-width="1.2"><title>' + day(p[2]) + ": XLF " + sgn(p[0]) + "%, AXP " + sgn(p[1]) + "%</title></circle>"; });
      s += '<g class="probe"></g></svg>';
      box.innerHTML = s;
      upd();
      function upd() {
        var v = +r.value, e = v * beta, g = box.querySelector(".probe");
        xv.textContent = sgn(v, 2) + "%";
        e1.textContent = sgn(e) + "%";
        e1.className = "big ev1 " + (e < 0 ? "down" : e > 0 ? "up" : "");
        g.innerHTML = '<line x1="' + x(v) + '" x2="' + x(v) + '" y1="' + y(e) + '" y2="' + (H - m) + '" stroke="var(--ink)" stroke-dasharray="3 3" opacity="0.6"/>' +
          '<line x1="' + m + '" x2="' + x(v) + '" y1="' + y(e) + '" y2="' + y(e) + '" stroke="var(--ink)" stroke-dasharray="3 3" opacity="0.6"/>' +
          '<circle cx="' + x(v) + '" cy="' + y(e) + '" r="5" fill="var(--accent)" stroke="var(--panel)" stroke-width="2"/>';
      }
      r.oninput = upd;
    }
    draw();
  };

  /* ---------- the desk's own study ---------- */
  FIG["own-study"] = function (el) {
    el.innerHTML = head("The desk's own count: 15 past cases like this one", "Closed on a well-tested support while under both shorter averages, then measured 20 sessions later.") +
      '<div class="study-grid"><div><p class="sub">Higher 20 sessions later</p>' +
      coinBars([["These 15 cases", 64, "", "good"], ["Any 20 sessions on this stock", 56, "", ""]], { noHead: true }) +
      '</div><div><p class="sub">Median move after 20 sessions</p><div class="medbars">' +
      '<span>These 15 cases</span><span><i class="bar good" style="display:block" data-w="84%"></i></span><span class="num">+4.2%</span>' +
      '<span>Any 20 sessions</span><span><i class="bar" style="display:block" data-w="26%"></i></span><span class="num">+1.3%</span>' +
      '</div></div><div><p class="sub">But first, the dip: in 9 of 14 cases the price slipped 2% or more under the level</p>' +
      '<div class="dots14" role="img" aria-label="9 of 14 cases dipped first">' + Array.apply(null, Array(14)).map(function (_, k) { return '<span class="' + (k < 9 ? "on" : "") + '"></span>'; }).join("") + "</div></div></div>" +
      note("The desk's own conclusion: too few cases to lean on.");
    growCoin(el);
  };

  /* ---------- render ---------- */
  document.querySelectorAll(".fig[data-fig]").forEach(function (el) {
    var f = FIG[el.dataset.fig];
    if (!f) { el.remove(); return; }
    figNo++;
    f(el);
  });
})();
