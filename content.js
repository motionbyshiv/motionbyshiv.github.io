/* ================================================================
   CONTENT.JS — ALL editable site copy lives in this object.
   Edit values here; no other file needs to change for copy updates.
   Render logic (do not edit casually) is at the bottom of the file.
   ================================================================ */

const CONTENT = {

  /* ---------- global links ---------- */
  links: {
    // PLACEHOLDER: replace with real booking link before launch
    bookCall: "https://cal.com/PLACEHOLDER-booking-link/15min",
    // Real WhatsApp number (+91 9805780708) — already wired in
    whatsapp: "https://wa.me/919805780708",
    // PLACEHOLDER: replace with real email before launch
    email: "mailto:hello@studio.example"
  },

  /* ---------- trust bar (under hero) ---------- */
  trustBar: [
    "Built for startups, ecommerce, and local businesses",
    "First delivery in 7 days",
    "Pause or cancel anytime"
  ],

  /* ---------- Chapter 01 — case studies ----------
     PLACEHOLDER: replace all three with real case studies before launch */
  caseStudies: [
    {
      thumbLabel: "16:9 · brand film loop",
      tag: "SaaS · launch",
      title: "DEMO — SaaS Client A",
      date: "March 2026",
      desc: "Product film + 12 ad variants for a self-serve launch.",
      metric: "+38% demo signups in 60 days",
      // PLACEHOLDER: link real case study
      href: "#work"
    },
    {
      thumbLabel: "16:9 · ad creative loop",
      tag: "Ecommerce · growth",
      title: "DEMO — Ecommerce Client B",
      date: "January 2026",
      desc: "Monthly creative engine across 3 paid channels.",
      metric: "3.2× blended ROAS in one quarter",
      // PLACEHOLDER: link real case study
      href: "#work"
    },
    {
      thumbLabel: "16:9 · social content loop",
      tag: "Local services · leads",
      title: "DEMO — Local Services Client C",
      date: "May 2026",
      desc: "Full social presence + lead-gen automation, built from zero.",
      metric: "2× qualified leads per month",
      // PLACEHOLDER: link real case study
      href: "#work"
    }
  ],

  /* ---------- Chapter 01 — client logos ----------
     PLACEHOLDER: replace grey demo boxes with real client logos before launch */
  logos: ["DEMO LOGO", "DEMO LOGO", "DEMO LOGO", "DEMO LOGO", "DEMO LOGO"],

  /* ---------- Chapter 01 — testimonials ----------
     PLACEHOLDER: replace all three with real client testimonials before launch */
  testimonials: [
    {
      quote: "They replaced a freelancer roster I spent half my week managing. Now one Slack message gets me launch-ready creative in two days.",
      name: "Jordan Meyer",
      role: "Head of Growth, DEMO SaaS Co."
    },
    {
      quote: "The first month paid for itself — our ad creative finally matches the quality of our product, and CPAs dropped within weeks.",
      name: "Priya Raman",
      role: "Founder, DEMO Ecommerce Brand"
    },
    {
      quote: "I don't think about marketing ops anymore. Content goes out, leads come in, and I get a report I actually read.",
      name: "Daniel Okafor",
      role: "Owner, DEMO Local Business"
    }
  ],

  /* ---------- Chapter 02 — the department pillars ---------- */
  pillars: [
    {
      num: "01",
      title: "Create",
      desc: "Every asset your brand needs, designed and shipped.",
      list: "Branding · design · motion and video · short-form · thumbnails"
    },
    {
      num: "02",
      title: "Grow",
      desc: "The channels that bring customers, managed end to end.",
      list: "Social · paid ad creative · strategy · leads · analytics"
    },
    {
      num: "03",
      title: "Automate",
      desc: "Systems that keep it all running while you sleep.",
      list: "Content systems · workflows · business systems · reporting"
    }
  ],

  /* ---------- Chapter 03 — the math ---------- */
  math: {
    linesHtml: "A designer, an editor, a social manager,<br>a media buyer, and a strategist — hired:<br><strong>around $28,000 a month.</strong>",
    ours: "Here: from $2,995.",
    footnote: "Based on 2026 average U.S. salaries for these 5 roles (Glassdoor). Actual market average is ~$33,150/mo — we use a conservative $28,000/mo estimate."
  },

  /* ---------- guarantee band ---------- */
  guarantee: {
    label: "Our guarantee",
    line: "First delivery within 7 days — or your first month is free.",
    sub: "New proof is earned monthly. Every case study on this site is real, dated, and verifiable."
  },

  /* ---------- founder bio (REAL copy — accurate as-is, not demo) ---------- */
  founderBio: "Built by Shiv Sharma — 8 years in motion design and animation, with a computer science engineering background. That combination is why the work here looks senior-agency-polished but ships with the speed and systems-thinking of an engineer, not just an artist.",

  /* ---------- Chapter 04 — pricing plans ---------- */
  plans: [
    {
      name: "Starter",
      price: "$1,495",
      per: "/mo",
      features: [
        "Create pillar",
        "Up to 10 assets/mo",
        "1 brand",
        "48h turnaround (avg. 2 business days per request)"
      ],
      featured: false
    },
    {
      name: "Growth",
      price: "$2,995",
      per: "/mo",
      features: [
        "Create + Grow",
        "Up to 20 assets/mo",
        "2 channels",
        "48h turnaround (avg. 2 business days per request)"
      ],
      featured: true
    },
    {
      name: "Scale",
      price: "$4,995",
      per: "/mo",
      features: [
        "All three pillars",
        "Up to 40 assets/mo",
        "4 channels + automation",
        "Priority 48h turnaround (avg. 2 business days per request)"
      ],
      featured: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      per: "",
      features: [
        "Multi-brand · white-label",
        "Dedicated pod",
        "SLA + priority lane"
      ],
      featured: false
    }
  ],

  /* Echoed directly under the pricing grid */
  guaranteeEcho: "Every plan carries the same guarantee: <strong>first delivery within 7 days — or your first month is free.</strong> Monthly billing, pause or cancel anytime.",

  ctaLabel: "Book a call",

  /* ---------- FAQ ---------- */
  faq: [
    {
      q: "Will the creative feel AI-generated?",
      a: "No. AI is how we move fast internally — every piece is directed, refined, and approved by a senior human before you see it. If it looks generated, it doesn't ship."
    },
    {
      q: "What's included each month?",
      a: "Your plan's pillars (Create, Grow, Automate), a set number of assets, and the channels we manage for you. You get a shared board, unlimited requests in the queue, and delivery in priority order — no per-project quotes, no hourly billing."
    },
    {
      q: "What does the 48h turnaround mean?",
      a: "Most individual asset requests are delivered within 48 hours — two business days — from the moment they reach the top of your queue. Larger pieces like brand films get a timeline up front before we start."
    },
    {
      q: "Can I pause or cancel?",
      a: "Yes, anytime, from your dashboard or with a single email. Pausing freezes your remaining days and keeps your board intact; cancelling stops the next billing cycle. No lock-in, no exit fees."
    },
    {
      q: "Who owns the work?",
      a: "You do — fully. Every delivered asset, source file, and system we build is yours, including if you cancel. We keep nothing hostage."
    },
    {
      q: "How does the 7-day guarantee work?",
      a: "If your first deliverable isn't in your hands within 7 days of onboarding, your first month is free. Simple as that — it keeps us honest and fast from day one."
    }
  ]
};

/* ================================================================
   RENDER LOGIC — hydrates the page from CONTENT above.
   You shouldn't need to touch anything below for copy edits.
   ================================================================ */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ----- trust bar ----- */
  $("trust-bar").innerHTML = CONTENT.trustBar
    .map((t) => `<span>${esc(t)}</span>`)
    .join("");

  /* ----- case studies ----- */
  $("case-grid").innerHTML = CONTENT.caseStudies
    .map(
      (c) => `
    <a class="case-card" href="${esc(c.href)}">
      <div class="case-thumb"><span>${esc(c.thumbLabel)}</span></div>
      <p class="case-tag">${esc(c.tag)} · ${esc(c.date)}</p>
      <h3 class="case-title">${esc(c.title)}</h3>
      <p class="case-desc">${esc(c.desc)}</p>
      <p class="case-metric">${esc(c.metric)}</p>
    </a>`
    )
    .join("");

  /* ----- logo strip ----- */
  $("logo-strip").innerHTML = CONTENT.logos
    .map((l) => `<div class="logo-box">${esc(l)}</div>`)
    .join("");

  /* ----- testimonials ----- */
  $("testimonial-grid").innerHTML = CONTENT.testimonials
    .map(
      (t) => `
    <figure class="testimonial">
      <blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote>
      <figcaption>${esc(t.name)} — ${esc(t.role)}</figcaption>
    </figure>`
    )
    .join("");

  /* ----- pillars ----- */
  $("pillar-grid").innerHTML = CONTENT.pillars
    .map(
      (p) => `
    <div class="pillar">
      <p class="pillar-num">${esc(p.num)}</p>
      <h3>${esc(p.title)}</h3>
      <p class="pillar-desc">${esc(p.desc)}</p>
      <p class="pillar-list">${esc(p.list)}</p>
    </div>`
    )
    .join("");

  /* ----- the math ----- */
  $("math-block").innerHTML = `
    <p class="math-lines">${CONTENT.math.linesHtml}</p>
    <p class="math-ours">${esc(CONTENT.math.ours)}</p>
    <p class="math-footnote">${esc(CONTENT.math.footnote)}</p>`;

  /* ----- guarantee band ----- */
  $("guarantee-band").innerHTML = `
    <p class="guarantee-label">${esc(CONTENT.guarantee.label)}</p>
    <p class="guarantee-line">${esc(CONTENT.guarantee.line)}</p>
    <p class="guarantee-sub">${esc(CONTENT.guarantee.sub)}</p>`;

  /* ----- founder bio ----- */
  $("founder-bio").textContent = CONTENT.founderBio;

  /* ----- pricing plans ----- */
  $("plan-grid").innerHTML = CONTENT.plans
    .map(
      (p) => `
    <div class="plan${p.featured ? " plan-featured" : ""}">
      <h3 class="plan-name">${esc(p.name)}</h3>
      <p class="plan-price">${esc(p.price)}<span class="per">${esc(p.per)}</span></p>
      <ul class="plan-features">
        ${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}
      </ul>
      <a class="btn btn-primary" href="${esc(CONTENT.links.bookCall)}">${esc(CONTENT.ctaLabel)}</a>
    </div>`
    )
    .join("");

  /* ----- guarantee echo under pricing ----- */
  $("guarantee-echo").innerHTML = CONTENT.guaranteeEcho;

  /* ----- FAQ (native <details> — accessible, works without extra JS) ----- */
  $("faq-list").innerHTML = CONTENT.faq
    .map(
      (f, i) => `
    <details class="faq-item"${i === 0 ? " open" : ""}>
      <summary><h3 style="font-size:inherit;font-weight:inherit;">${esc(f.q)}</h3></summary>
      <p class="faq-answer">${esc(f.a)}</p>
    </details>`
    )
    .join("");

  /* ================================================================
     THROUGHLINE SPINE — scroll-linked ember progress
     The gold fill tracks scroll; chapter dots light as it passes.
     ================================================================ */
  const fill = $("spine-fill");
  const labels = Array.from(document.querySelectorAll(".chapter-label"));
  let ticking = false;

  function updateSpine() {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    // fill reaches a point when that point crosses ~40% of the viewport
    const reach = Math.min(window.scrollY + window.innerHeight * 0.4, doc.scrollHeight);
    fill.style.transform = `scaleY(${max > 0 ? reach / doc.scrollHeight : 0})`;
    labels.forEach((label) => {
      label.classList.toggle("lit", label.getBoundingClientRect().top + window.scrollY <= reach);
    });
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateSpine);
    }
  }, { passive: true });
  window.addEventListener("resize", updateSpine);
  updateSpine();

  /* ================================================================
     MOBILE NAV TOGGLE
     ================================================================ */
  const toggle = $("nav-toggle");
  const menu = $("nav-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // close the menu after a link is chosen
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
