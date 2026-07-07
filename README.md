# Motion By Shiv — Studio Website

Premium static agency site for **Motion By Shiv**, a creative production studio (motion design, video editing, ad creative, AI-assisted campaigns). Built for **GitHub Pages** — no backend, no build step, optionally Supabase-connected.

Live at: https://motionbyshiv.github.io/

## Architecture

```
index.html                      Homepage (hero → problem → services → system → pricing → work → process → industries → voices → FAQ)
services/
  index.html                    Services overview
  motion-design.html            Motion Design & Animation
  video-editing.html            Video Editing & Short-Form
  ad-creative.html              Performance Ad Creative
  ai-production.html            AI-Assisted Campaign Production
industries/
  saas.html · ecommerce.html · web3.html
work/
  index.html                    Portfolio with industry filters
  saas-launch.html · ecommerce-engine.html · web3-content.html   Case studies
pricing/index.html              The Spectrum — full transparent pricing
process/index.html              End-to-end workflow (discovery → onboarding → loop → long-term)
about/index.html · faq/index.html · contact/index.html
free-ad/index.html              "Make a free ad in 10 minutes" lead-magnet wizard (self-contained,
                                4 steps → WhatsApp brief + optional Supabase insert)
404.html · sitemap.xml · robots.txt
assets/
  css/main.css                  Entire design system (dark/ember theme, tokens at the top)
  js/config.js                  ★ Single source of truth: brand, WhatsApp, email, Supabase keys
  js/main.js                    Shared header/footer/WhatsApp FAB injection, reveal animations,
                                counters, marquee, work filters, contact form
supabase-setup.sql              Optional: inquiries + subscribers tables with RLS
```

## Editing

- **Contact details / brand name** → edit `assets/js/config.js` only. Elements with `data-wa` / `data-email` pick it up automatically.
- **Navigation & footer** → one place: the `NAV` array and footer template in `assets/js/main.js`.
- **Colors, fonts, spacing** → CSS custom properties at the top of `assets/css/main.css`.
- **Page copy** → inline in each page's HTML (each page owns its own SEO meta + JSON-LD).

## Before launch — placeholders to replace

Search the repo for `PLACEHOLDER`:
1. **Brand marquee** (`index.html`) — swap in real client/brand names.
2. **Case studies** (`work/*.html` + teasers on `index.html`) — the three "Sample engagement" studies are labeled as representative; replace with real clients, assets, and metrics.
3. **Testimonials** (`index.html`) — clearly marked placeholder quotes.

## Supabase (optional)

1. Create a free project at supabase.com, run `supabase-setup.sql` in the SQL editor.
2. Put the project URL and anon key in `assets/js/config.js`.
3. The contact form then writes to `inquiries` (insert-only RLS). Without it, forms open WhatsApp with the message pre-filled — nothing breaks.

## Conventions

- Every page sets `<body data-root="./|../" data-page="...">` so the injected header/footer resolve links and highlight the active section.
- Design language: light/cream, one coral accent (`--accent`), Poppins + Fraunces-italic accent words (wrap a phrase in `<em>` inside any h1/h2). Work previews are one-color "poster" tiles (`.case-thumb` + `.thumb-coral/.thumb-cream`) — drop real thumbnails/video loops in later.
- CTA discipline: header button, floating WhatsApp chip (right), floating free-ad pill (left), and the footer CTA. Avoid adding per-section buttons — use `.link-arrow` text links instead.
- Animations respect `prefers-reduced-motion`; FAQ uses native `<details>`; nav is keyboard-accessible.
- Primary conversion path is WhatsApp (`+91 98057 80708`); the free-ad wizard is the low-friction alternative entry.
