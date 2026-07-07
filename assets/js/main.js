/* ================================================================
   MAIN.JS — shared chrome (header / footer / floating WhatsApp),
   animation system, nav behaviour, forms.
   Every page sets  <body data-root="./">  or  data-root="../"
   so links resolve from any depth.
   ================================================================ */
(function () {
  "use strict";

  var S = window.SITE;
  var root = document.body.getAttribute("data-root") || "./";
  var page = document.body.getAttribute("data-page") || "";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ================================================================
     1. HEADER
     ================================================================ */
  var NAV = [
    {
      label: "Services", href: "services/", key: "services",
      children: [
        { label: "All services", href: "services/" },
        { label: "Motion Design & Animation", href: "services/motion-design.html" },
        { label: "Video Editing & Short-Form", href: "services/video-editing.html" },
        { label: "Performance Ad Creative", href: "services/ad-creative.html" },
        { label: "AI-Assisted Campaign Production", href: "services/ai-production.html" }
      ]
    },
    {
      label: "Industries", href: "industries/saas.html", key: "industries",
      children: [
        { label: "SaaS & Tech", href: "industries/saas.html" },
        { label: "Ecommerce & DTC", href: "industries/ecommerce.html" },
        { label: "Web3 & Fintech", href: "industries/web3.html" }
      ]
    },
    { label: "Work", href: "work/", key: "work" },
    { label: "Pricing", href: "pricing/", key: "pricing" },
    { label: "Process", href: "process/", key: "process" },
    { label: "About", href: "about/", key: "about" }
  ];

  function navItem(item) {
    var current = page === item.key ? ' aria-current="page"' : "";
    if (!item.children) {
      return '<li><a class="nav-link" href="' + root + item.href + '"' + current + ">" + esc(item.label) + "</a></li>";
    }
    var sub = item.children.map(function (c) {
      return '<li><a href="' + root + c.href + '">' + esc(c.label) + "</a></li>";
    }).join("");
    return (
      '<li class="has-dropdown">' +
      '<button class="nav-link nav-drop-btn" type="button" aria-expanded="false"' + current + ">" +
      esc(item.label) + '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>' +
      '<ul class="dropdown">' + sub + "</ul></li>"
    );
  }

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="header-inner">' +
    '<a class="brand" href="' + root + '" aria-label="' + esc(S.brand) + ' — home">' +
    '<span class="brand-mark" aria-hidden="true"></span>' +
    '<span class="brand-name">Motion<em>By</em>Shiv</span></a>' +
    '<nav class="site-nav" aria-label="Primary"><ul id="nav-menu" class="nav-menu">' +
    NAV.map(navItem).join("") +
    '<li class="nav-cta-item"><a class="btn btn-wa btn-sm" href="' + S.whatsappLink + '" target="_blank" rel="noopener">' +
    waIcon() + "Start on WhatsApp</a></li>" +
    "</ul></nav>" +
    '<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">' +
    "<span></span><span></span><span></span></button></div>" +
    '<div class="scroll-progress" aria-hidden="true"><span id="scroll-progress-fill"></span></div>';
  document.body.prepend(header);

  function waIcon() {
    return '<svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';
  }

  /* mobile toggle */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  /* dropdowns: click to toggle (works for touch + keyboard) */
  document.querySelectorAll(".nav-drop-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var wasOpen = li.classList.contains("open");
      document.querySelectorAll(".has-dropdown.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".nav-drop-btn").setAttribute("aria-expanded", "false");
      });
      li.classList.toggle("open", !wasOpen);
      btn.setAttribute("aria-expanded", String(!wasOpen));
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".has-dropdown.open").forEach(function (o) {
      o.classList.remove("open");
      o.querySelector(".nav-drop-btn").setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".has-dropdown.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".nav-drop-btn").setAttribute("aria-expanded", "false");
      });
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    }
  });

  /* header shadow + scroll progress */
  var progressFill = document.getElementById("scroll-progress-fill");
  var ticking = false;
  function onScroll() {
    ticking = false;
    header.classList.toggle("scrolled", window.scrollY > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progressFill.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ================================================================
     2. FOOTER
     ================================================================ */
  var year = new Date().getFullYear();

  /* closing CTA — its own section, and the only CTA button in the last two screens */
  var closing = document.createElement("section");
  closing.className = "closing-cta";
  closing.setAttribute("aria-label", "Start a project");
  closing.innerHTML =
    '<div class="container"><div class="footer-cta reveal">' +
    "<h2>Let&rsquo;s make something your audience <em>stops for.</em></h2>" +
    "<p>One WhatsApp message starts it. We reply within one working day &mdash; usually much faster &mdash; with honest advice on scope, tier, and timeline. No pitch deck required on your side.</p>" +
    '<div class="btn-row" style="justify-content:center;">' +
    '<a class="btn btn-wa" href="' + S.whatsappLink + '" target="_blank" rel="noopener">' + waIcon() + "Message us on WhatsApp</a>" +
    "</div></div></div>";
  document.body.appendChild(closing);

  /* footer — plain text links only, no buttons */
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="container">' +
    '<div class="footer-grid" style="border-top:0;padding-top:0;">' +
    '<div class="footer-col footer-about">' +
    '<a class="brand" href="' + root + '"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">Motion<em>By</em>Shiv</span></a>' +
    "<p>A creative production studio pairing senior motion design with an AI production system &mdash; agency-grade creative, shipped in days, at a fraction of agency cost.</p>" +
    '<p class="footer-contact"><a href="' + S.whatsappLink + '" target="_blank" rel="noopener">+91 98057 80708 (WhatsApp)</a><br>' +
    '<a href="' + S.emailLink + '">' + esc(S.email) + "</a></p></div>" +
    '<nav class="footer-col" aria-label="Services"><h3>Services</h3><ul>' +
    '<li><a href="' + root + 'services/motion-design.html">Motion Design &amp; Animation</a></li>' +
    '<li><a href="' + root + 'services/video-editing.html">Video Editing &amp; Short-Form</a></li>' +
    '<li><a href="' + root + 'services/ad-creative.html">Performance Ad Creative</a></li>' +
    '<li><a href="' + root + 'services/ai-production.html">AI-Assisted Campaigns</a></li>' +
    '<li><a href="' + root + 'industries/saas.html">For SaaS &amp; Tech</a></li>' +
    '<li><a href="' + root + 'industries/ecommerce.html">For Ecommerce &amp; DTC</a></li>' +
    '<li><a href="' + root + 'industries/web3.html">For Web3 &amp; Fintech</a></li>' +
    "</ul></nav>" +
    '<nav class="footer-col" aria-label="Studio"><h3>Studio</h3><ul>' +
    '<li><a href="' + root + 'work/">Work &amp; Case Studies</a></li>' +
    '<li><a href="' + root + 'pricing/">Pricing</a></li>' +
    '<li><a href="' + root + 'process/">Our Process</a></li>' +
    '<li><a href="' + root + 'about/">About Us</a></li>' +
    '<li><a href="' + root + 'faq/">FAQs</a></li>' +
    '<li><a href="' + root + 'contact/">Contact</a></li>' +
    '<li><a href="' + root + 'free-ad/">Get a free sample ad</a></li>' +
    "</ul></nav>" +
    '<div class="footer-col"><h3>Good to know</h3><ul class="footer-facts">' +
    "<li>First delivery within 7 days &mdash; or your first month is free</li>" +
    "<li>You own every asset and source file, permanently</li>" +
    "<li>Pause or cancel any month, no lock-in</li>" +
    "<li>Replies within one working day</li>" +
    "</ul></div></div>" +
    '<div class="footer-bottom"><p>&copy; ' + year + " " + esc(S.brand) + ". All rights reserved.</p>" +
    '<p>Founded by ' + esc(S.founder) + " &middot; 8 years in motion design &amp; animation</p></div></div>";
  document.body.appendChild(footer);

  /* ================================================================
     3. FLOATING WHATSAPP BUTTON
     ================================================================ */
  var fab = document.createElement("a");
  fab.className = "wa-fab";
  fab.href = S.whatsappLink;
  fab.target = "_blank";
  fab.rel = "noopener";
  fab.setAttribute("aria-label", "Chat with us on WhatsApp");
  fab.innerHTML = waIcon() + '<span class="wa-fab-label">Chat with us</span>';
  document.body.appendChild(fab);

  /* floating lead magnet — Vissoo-style pill that opens the ad wizard */
  var pill = document.createElement("a");
  pill.className = "freead-pill";
  pill.href = root + "free-ad/";
  pill.innerHTML = "<em>Free sample ad</em>&nbsp;&middot; 10-min brief";
  document.body.appendChild(pill);

  /* ================================================================
     4. REVEAL-ON-SCROLL + COUNTERS
     Add class="reveal" (or reveal-group for staggered children).
     ================================================================ */
  var revealTargets = document.querySelectorAll(".reveal, .reveal-group > *");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement.classList.contains("reveal-group")
          ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(siblings * 90, 450) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* animated counters: <span data-count="7" data-suffix="-day"> */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var end = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (reduceMotion) { el.textContent = prefix + end + suffix; return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ================================================================
     5. MARQUEE — duplicate track content for a seamless loop
     ================================================================ */
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    var dup = track.cloneNode(true);
    dup.setAttribute("aria-hidden", "true");
    dup.classList.add("marquee-dup");
    track.parentElement.appendChild(dup);
  });

  /* ================================================================
     6. WORK FILTER  (work/index.html)
     Buttons: [data-filter="saas"] · Cards: [data-cat="saas"]
     ================================================================ */
  var filterBtns = document.querySelectorAll("[data-filter]");
  if (filterBtns.length) {
    var cards = document.querySelectorAll("[data-cat]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        cards.forEach(function (card) {
          card.hidden = f !== "all" && card.getAttribute("data-cat") !== f;
        });
      });
    });
  }

  /* ================================================================
     6b. SERVICES × INDUSTRIES MATRIX — open grid on desktop,
     single-open accordion on mobile
     ================================================================ */
  var matrixCols = document.querySelectorAll(".matrix-col");
  if (matrixCols.length) {
    var matrixMq = window.matchMedia("(min-width: 768px)");
    var syncMatrix = function () {
      matrixCols.forEach(function (d, i) {
        if (matrixMq.matches) {
          d.removeAttribute("name");
          d.open = true;
        } else {
          d.setAttribute("name", "matrix");
          d.open = i === 0;
        }
      });
    };
    syncMatrix();
    if (matrixMq.addEventListener) matrixMq.addEventListener("change", syncMatrix);
    else matrixMq.addListener(syncMatrix);
    /* single-open fallback for browsers without <details name> support */
    matrixCols.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open && !matrixMq.matches) {
          matrixCols.forEach(function (o) { if (o !== d) o.open = false; });
        }
      });
    });
  }

  /* ================================================================
     6c. TIER CAROUSEL DOTS (mobile scroll-snap indicators)
     ================================================================ */
  document.querySelectorAll(".tier-grid").forEach(function (grid) {
    var tiers = grid.querySelectorAll(".tier");
    if (tiers.length < 2) return;
    var dots = document.createElement("div");
    dots.className = "carousel-dots";
    dots.setAttribute("aria-label", "Pricing tiers");
    tiers.forEach(function (t, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Tier " + (i + 1));
      b.setAttribute("aria-current", String(i === 0));
      b.addEventListener("click", function () {
        grid.scrollTo({ left: t.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
      });
      dots.appendChild(b);
    });
    grid.insertAdjacentElement("afterend", dots);
    var dotTicking = false;
    grid.addEventListener("scroll", function () {
      if (dotTicking) return;
      dotTicking = true;
      requestAnimationFrame(function () {
        dotTicking = false;
        var center = grid.scrollLeft + grid.clientWidth / 2;
        var nearest = 0, best = Infinity;
        tiers.forEach(function (t, i) {
          var d = Math.abs(t.offsetLeft + t.offsetWidth / 2 - center);
          if (d < best) { best = d; nearest = i; }
        });
        dots.querySelectorAll("button").forEach(function (b, i) {
          b.setAttribute("aria-current", String(i === nearest));
        });
      });
    }, { passive: true });
  });

  /* ================================================================
     7. CONTACT FORM — Supabase-ready with WhatsApp fallback
     ================================================================ */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        company: form.company ? form.company.value.trim() : "",
        budget: form.budget ? form.budget.value : "",
        message: form.message.value.trim(),
        page: location.pathname
      };
      if (!data.name || !data.email || !data.message) {
        status.textContent = "Please fill in your name, email, and a short message.";
        status.className = "form-status err";
        return;
      }
      if (S.supabase.url && S.supabase.anonKey) {
        status.textContent = "Sending…";
        status.className = "form-status";
        fetch(S.supabase.url + "/rest/v1/inquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: S.supabase.anonKey,
            Authorization: "Bearer " + S.supabase.anonKey,
            Prefer: "return=minimal"
          },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          status.textContent = "Thanks — your inquiry is in. We reply within one working day.";
          status.className = "form-status ok";
        }).catch(function () {
          openWhatsAppFallback(data, status);
        });
      } else {
        openWhatsAppFallback(data, status);
      }
    });
  }

  function openWhatsAppFallback(data, status) {
    var msg =
      "Hi, I’m " + data.name +
      (data.company ? " from " + data.company : "") + ".\n" +
      (data.budget ? "Budget: " + data.budget + "\n" : "") +
      data.message + "\n(Reply email: " + data.email + ")";
    window.open("https://wa.me/" + S.whatsappNumber + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    status.textContent = "We’ve opened WhatsApp with your message pre-filled — just press send.";
    status.className = "form-status ok";
  }

  /* ================================================================
     8. DYNAMIC CONTACT LINKS — any element with [data-wa] / [data-email]
     gets the configured href, so numbers live in config.js only.
     ================================================================ */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = S.whatsappLink;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-email]").forEach(function (a) { a.href = S.emailLink; });
})();
