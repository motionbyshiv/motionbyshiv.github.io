// ================================================================
// Supabase config — leave blank to use the local projects.js data.
// Find these in Supabase: Project Settings → API.
// The anon key is safe to expose in front-end code (read-only via RLS).
// ================================================================
const SUPABASE_URL = '';      // e.g. 'https://abcdefgh.supabase.co'
const SUPABASE_ANON_KEY = ''; // e.g. 'eyJhbGciOi...'

// ---------------- Data loading ----------------
async function loadProjects() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/projects?select=*&order=sort_order.asc,created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
      const rows = await res.json();
      if (rows.length) {
        // Map snake_case DB columns to the shape the renderer expects
        return rows.map((r) => ({
          title: r.title,
          description: r.description || '',
          tags: r.tags || [],
          platform: r.platform,
          videoId: r.video_id,
          featured: !!r.featured,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local data:', err);
    }
  }
  return typeof LOCAL_PROJECTS !== 'undefined' ? LOCAL_PROJECTS : [];
}

// ---------------- Video helpers ----------------
function thumbnailUrl(p) {
  return p.platform === 'vimeo'
    ? `https://vumbnail.com/${p.videoId}.jpg`
    : `https://i.ytimg.com/vi/${p.videoId}/hqdefault.jpg`;
}

function embedUrl(p) {
  return p.platform === 'vimeo'
    ? `https://player.vimeo.com/video/${p.videoId}?autoplay=1`
    : `https://www.youtube-nocookie.com/embed/${p.videoId}?autoplay=1&rel=0`;
}

// ---------------- Rendering ----------------
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  projects.forEach((p) => {
    const card = document.createElement('article');
    card.className = `card reveal${p.featured ? ' card-wide' : ''}`;

    const tags = (p.tags || [])
      .map((t) => `<span>${escapeHtml(t)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="video-frame">
        <button class="video-facade" aria-label="Play ${escapeHtml(p.title)}">
          <img src="${thumbnailUrl(p)}" alt="" loading="lazy" />
          <span class="play-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
        </button>
      </div>
      <div class="card-body">
        <div class="card-tags">${tags}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
      </div>
    `;

    // Click-to-play: swap the thumbnail facade for the real iframe
    card.querySelector('.video-facade').addEventListener('click', () => {
      const frame = card.querySelector('.video-frame');
      frame.innerHTML = `
        <iframe
          src="${embedUrl(p)}"
          title="${escapeHtml(p.title)}"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowfullscreen
        ></iframe>
      `;
    });

    grid.appendChild(card);
  });

  observeReveals(grid.querySelectorAll('.reveal'));
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------- Reveal on scroll ----------------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals(els) {
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    io.observe(el);
  });
}

// ---------------- Particle constellation background ----------------
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let w, h, points;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 22000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    const LINK = 130;

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.fillStyle = 'rgba(46, 230, 107, 0.35)';
      ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          ctx.strokeStyle = `rgba(46, 230, 107, ${0.12 * (1 - dist / LINK)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
}

// ---------------- Page setup ----------------
document.getElementById('year').textContent = new Date().getFullYear();

initParticles();
observeReveals(document.querySelectorAll('.reveal'));

loadProjects().then(renderProjects);
