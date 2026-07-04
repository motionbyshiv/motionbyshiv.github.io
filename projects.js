// ---------------------------------------------------------------
// Local fallback data — used when Supabase is not configured.
// Replace these with your real reels:
//   platform: 'youtube' or 'vimeo'
//   videoId:  YouTube → the part after watch?v= (works for unlisted)
//             Vimeo   → the number in the video URL
// ---------------------------------------------------------------
const LOCAL_PROJECTS = [
  {
    title: 'Brand Launch Reel — Nova',
    description: 'Fast-cut product launch reel with kinetic typography. 2.1M views in the first week.',
    tags: ['Reel', 'Motion Graphics'],
    platform: 'youtube',
    videoId: 'aqz-KE-bpKQ', // ← replace with your video ID
    featured: true,
  },
  {
    title: 'Travel Series — Ep. 03',
    description: 'Cinematic travel edit with speed ramps and sound design.',
    tags: ['Cinematic', 'Color Grade'],
    platform: 'youtube',
    videoId: 'M7lc1UVf-VE', // ← replace with your video ID
    featured: false,
  },
  {
    title: 'Podcast Clips — Founder Talks',
    description: 'Short-form clip package: captions, b-roll, and hook-first editing.',
    tags: ['Short-form', 'Captions'],
    platform: 'vimeo',
    videoId: '76979871', // ← replace with your Vimeo ID
    featured: false,
  },
  {
    title: 'Music Video — Echo',
    description: 'Beat-synced edit with glitch transitions and film emulation.',
    tags: ['Music Video'],
    platform: 'youtube',
    videoId: 'aqz-KE-bpKQ', // ← replace with your video ID
    featured: false,
  },
  {
    title: 'Client Showreel 2026',
    description: 'A minute of my favorite cuts from the past year — ads, reels, docs, and everything in between.',
    tags: ['Showreel', 'Mixed'],
    platform: 'youtube',
    videoId: 'M7lc1UVf-VE', // ← replace with your video ID
    featured: true,
  },
];
