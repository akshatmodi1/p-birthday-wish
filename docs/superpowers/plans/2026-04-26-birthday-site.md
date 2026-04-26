# Birthday Site — Purva Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, Netlify-ready single-page birthday website for Purva with 7 sections, pink/white theme, scroll animations, confetti, music toggle, and a lightbox gallery.

**Architecture:** Three files (`index.html`, `style.css`, `script.js`) plus an `assets/` folder. HTML provides semantic structure with data attributes for JS hooks. CSS handles all visual design including animation base states. JS handles Intersection Observer reveals, particles, lightbox, typewriter, confetti, music toggle, side nav, and surprise animation — all vanilla, no frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties, keyframes, Grid), Vanilla JS (ES6+), Google Fonts CDN (Playfair Display + Poppins), canvas-confetti CDN

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | All markup, section structure, CDN links, EDIT comments |
| `style.css` | All styles — design tokens as CSS vars, layout, animations, responsive breakpoints |
| `script.js` | Particles, IntersectionObserver reveals, lightbox, typewriter, confetti, floating hearts, music toggle, side nav dots |
| `assets/images/` | Placeholder image slots (picsum.photos URLs in HTML) |
| `assets/video/` | Placeholder video slot |
| `assets/music/` | Placeholder music slot |

---

## Task 1: Project Scaffold & CSS Design Tokens

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`
- Create: `assets/images/.gitkeep`
- Create: `assets/video/.gitkeep`
- Create: `assets/music/.gitkeep`

- [ ] **Step 1: Create the asset directories**

```bash
mkdir -p assets/images assets/video assets/music
touch assets/images/.gitkeep assets/video/.gitkeep assets/music/.gitkeep
```

- [ ] **Step 2: Create `index.html` with document shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday, Purva! 🎉</title>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <!-- canvas-confetti -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- sections go here in subsequent tasks -->
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `style.css` with design tokens and global reset**

```css
/* ─── Design Tokens ─────────────────────────────────────────── */
:root {
  --bg:          #FFF0F5;
  --pink:        #FF85A1;
  --pink-light:  #FFB6C1;
  --pink-pale:   #FFE4EE;
  --white:       #FFFFFF;
  --text:        #5C3D4E;
  --text-light:  #9B7389;
  --glow:        0 0 30px rgba(255, 133, 161, 0.35);
  --glow-strong: 0 0 50px rgba(255, 133, 161, 0.55);
  --radius-card: 20px;
  --radius-btn:  50px;
  --transition:  0.3s ease;
  --font-head:   'Playfair Display', serif;
  --font-body:   'Poppins', sans-serif;
}

/* ─── Reset ─────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }

/* ─── Scroll-reveal base state (JS adds .revealed) ─────────── */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.from-left  { transform: translateX(-40px); }
.reveal.from-right { transform: translateX(40px); }
.reveal.revealed   { opacity: 1; transform: translate(0); }
```

- [ ] **Step 4: Create `script.js` with Intersection Observer boilerplate**

```js
// ─── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});
```

- [ ] **Step 5: Open `index.html` in a browser and verify blank pink page loads with no console errors**

- [ ] **Step 6: Commit**

```bash
git init
git add index.html style.css script.js assets/
git commit -m "feat: scaffold — HTML shell, CSS tokens, reveal observer"
```

---

## Task 2: Side Nav Dots

**Files:**
- Modify: `index.html` — add nav dots markup inside `<body>` before sections
- Modify: `style.css` — add nav dot styles
- Modify: `script.js` — add `initNavDots()`

- [ ] **Step 1: Add nav dots markup to `index.html` (insert after `<body>` opening tag)**

```html
<!-- Side Navigation Dots -->
<nav class="side-nav" aria-label="Page sections">
  <a class="nav-dot" href="#hero"     aria-label="Hero"     data-section="hero"></a>
  <a class="nav-dot" href="#gallery"  aria-label="Gallery"  data-section="gallery"></a>
  <a class="nav-dot" href="#video"    aria-label="Video"    data-section="video"></a>
  <a class="nav-dot" href="#message"  aria-label="Message"  data-section="message"></a>
  <a class="nav-dot" href="#timeline" aria-label="Timeline" data-section="timeline"></a>
  <a class="nav-dot" href="#surprise" aria-label="Surprise" data-section="surprise"></a>
  <a class="nav-dot" href="#footer"   aria-label="Footer"   data-section="footer"></a>
</nav>
```

- [ ] **Step 2: Add nav dot styles to `style.css`**

```css
/* ─── Side Nav Dots ─────────────────────────────────────────── */
.side-nav {
  position: fixed;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pink-light);
  border: 2px solid var(--pink);
  transition: var(--transition);
  cursor: pointer;
}
.nav-dot.active {
  background: var(--pink);
  width: 13px;
  height: 13px;
  box-shadow: var(--glow);
}
@media (max-width: 600px) { .side-nav { right: 8px; } }
```

- [ ] **Step 3: Add `initNavDots()` to `script.js` and call it in `DOMContentLoaded`**

```js
// ─── Side Nav Dots ────────────────────────────────────────────
function initNavDots() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = Array.from(dots).map(d =>
    document.getElementById(d.dataset.section)
  ).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const dot = document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`);
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}
```

Inside the existing `DOMContentLoaded` callback, add `initNavDots();` after `initReveal();`.

- [ ] **Step 4: Verify in browser — 7 dots appear on right edge (they'll be visible even though sections don't exist yet)**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: side nav dots with IntersectionObserver highlight"
```

---

## Task 3: Hero Section

**Files:**
- Modify: `index.html` — add `<section id="hero">` and canvas
- Modify: `style.css` — hero styles + gradient animation + CTA button
- Modify: `script.js` — add `initParticles()`

- [ ] **Step 1: Add hero markup to `index.html` (after nav dots, before `</body>`)**

```html
<!-- ═══════════════════════════════════════════════════════════
     HERO SECTION
     EDIT: Change the subtext below to your own message
     ═══════════════════════════════════════════════════════════ -->
<section id="hero">
  <canvas id="particles-canvas"></canvas>
  <div class="hero-content">
    <p class="hero-eyebrow">🎀 It's your special day</p>
    <h1 class="hero-title">Happy Birthday,<br><span class="hero-name">Purva!</span> 🎉</h1>
    <!-- EDIT: Replace subtext with your own warm message -->
    <p class="hero-sub">Wishing you the most magical day — you deserve all of it and so much more! 💖</p>
    <a href="#gallery" class="btn btn-hero">See Your Surprise 💖</a>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles to `style.css`**

```css
/* ─── Hero ──────────────────────────────────────────────────── */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, #FFE4EE, #FFF0F5, #FFE9F3);
  background-size: 300% 300%;
  animation: gradientDrift 8s ease infinite;
}
@keyframes gradientDrift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

#particles-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 700px;
}
.hero-eyebrow {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--pink);
  margin-bottom: 1rem;
}
.hero-title {
  font-family: var(--font-head);
  font-size: clamp(2.6rem, 8vw, 4rem);
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 1.2rem;
}
.hero-name {
  color: var(--pink);
  font-style: italic;
}
.hero-sub {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: var(--text-light);
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

/* ─── Buttons ───────────────────────────────────────────────── */
.btn {
  display: inline-block;
  padding: 0.85rem 2.2rem;
  border-radius: var(--radius-btn);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: transform var(--transition), box-shadow var(--transition);
}
.btn:hover { transform: scale(1.05); }
.btn-hero {
  background: linear-gradient(135deg, var(--pink), #FF5C85);
  color: var(--white);
  box-shadow: var(--glow);
  animation: btnPulse 2.5s ease-in-out infinite;
}
@keyframes btnPulse {
  0%, 100% { box-shadow: var(--glow); }
  50%       { box-shadow: var(--glow-strong); }
}
```

- [ ] **Step 3: Add `initParticles()` to `script.js` and call it**

```js
// ─── Floating Particles ───────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: H + Math.random() * 100,
      r: Math.random() * 4 + 2,
      speed: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 28 }, makeParticle);
    particles.forEach(p => { p.y = Math.random() * H; });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 133, 161, ${p.opacity})`;
      ctx.fill();
      p.y  -= p.speed;
      p.x  += p.drift;
      if (p.y + p.r < 0) Object.assign(p, makeParticle(), { y: H + 10 });
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
}
```

Add `initParticles();` inside `DOMContentLoaded`.

- [ ] **Step 4: Open in browser — verify fullscreen pink gradient hero, floating dots, heading, and pulsing button**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: hero section with animated gradient, particles, CTA"
```

---

## Task 4: Music Toggle

**Files:**
- Modify: `index.html` — add music button before `</body>`
- Modify: `style.css` — music toggle styles
- Modify: `script.js` — add `initMusic()`

- [ ] **Step 1: Add music toggle markup to `index.html` (before `</body>`)**

```html
<!-- Music Toggle (fixed bottom-right) -->
<!-- EDIT: Replace assets/music/background-music.mp3 with your audio file -->
<audio id="bg-music" loop>
  <source src="assets/music/background-music.mp3" type="audio/mpeg" />
</audio>
<button class="music-btn" id="music-btn" aria-label="Toggle background music">
  <span class="music-icon">🎵</span>
  <span class="music-ring"></span>
</button>
```

- [ ] **Step 2: Add music toggle styles to `style.css`**

```css
/* ─── Music Toggle ──────────────────────────────────────────── */
.music-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: var(--white);
  box-shadow: var(--glow);
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition);
}
.music-btn:hover { transform: scale(1.1); }
.music-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--pink);
  opacity: 0;
  transition: opacity 0.3s;
}
.music-btn.playing .music-ring {
  opacity: 1;
  animation: ringPulse 1.5s ease-in-out infinite;
}
@keyframes ringPulse {
  0%, 100% { transform: scale(1);    opacity: 0.8; }
  50%       { transform: scale(1.25); opacity: 0.3; }
}
```

- [ ] **Step 3: Add `initMusic()` to `script.js` and call it**

```js
// ─── Music Toggle ─────────────────────────────────────────────
function initMusic() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  const icon  = btn.querySelector('.music-icon');
  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
        icon.textContent = '🔇';
      }).catch(() => {});
    } else {
      audio.pause();
      btn.classList.remove('playing');
      icon.textContent = '🎵';
    }
  });
}
```

Add `initMusic();` inside `DOMContentLoaded`.

- [ ] **Step 4: Verify button appears bottom-right, clicking it shows the ring pulse animation (audio will silently fail without the file — that's expected)**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: music toggle button with pulse ring"
```

---

## Task 5: Photo Gallery Section

**Files:**
- Modify: `index.html` — add `<section id="gallery">`
- Modify: `style.css` — gallery styles
- Modify: `script.js` — add `initLightbox()`

- [ ] **Step 1: Add gallery markup to `index.html` (after `#hero` section)**

```html
<!-- ═══════════════════════════════════════════════════════════
     PHOTO GALLERY
     EDIT: Replace each img src with your actual photo paths
     e.g. src="assets/images/photo-1.jpg"
     EDIT: Replace each alt text with a meaningful description
     ═══════════════════════════════════════════════════════════ -->
<section id="gallery" class="section">
  <div class="section-inner">
    <h2 class="section-title reveal">Our Beautiful Memories 📸</h2>
    <p class="section-sub reveal" data-delay="100">
      <!-- EDIT: Replace with your gallery intro text -->
      A few snapshots of the moments that made us smile the most.
    </p>
    <div class="gallery-grid">
      <!-- EDIT: Replace each src with your photo. Use picsum.photos for placeholders. -->
      <div class="gallery-item reveal" data-delay="0"  data-lightbox="https://picsum.photos/seed/p1/800/600">
        <img src="https://picsum.photos/seed/p1/400/300" alt="Memory 1 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 1</span></div>
      </div>
      <div class="gallery-item reveal" data-delay="100" data-lightbox="https://picsum.photos/seed/p2/800/600">
        <img src="https://picsum.photos/seed/p2/400/500" alt="Memory 2 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 2</span></div>
      </div>
      <div class="gallery-item reveal" data-delay="200" data-lightbox="https://picsum.photos/seed/p3/800/600">
        <img src="https://picsum.photos/seed/p3/400/350" alt="Memory 3 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 3</span></div>
      </div>
      <div class="gallery-item reveal" data-delay="300" data-lightbox="https://picsum.photos/seed/p4/800/600">
        <img src="https://picsum.photos/seed/p4/400/450" alt="Memory 4 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 4</span></div>
      </div>
      <div class="gallery-item reveal" data-delay="400" data-lightbox="https://picsum.photos/seed/p5/800/600">
        <img src="https://picsum.photos/seed/p5/400/300" alt="Memory 5 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 5</span></div>
      </div>
      <div class="gallery-item reveal" data-delay="500" data-lightbox="https://picsum.photos/seed/p6/800/600">
        <img src="https://picsum.photos/seed/p6/400/500" alt="Memory 6 — EDIT this alt text" loading="lazy" />
        <div class="gallery-overlay"><span>Memory 6</span></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add gallery styles to `style.css`**

```css
/* ─── Shared Section Styles ─────────────────────────────────── */
.section { padding: 6rem 1.5rem; }
.section-inner { max-width: 1100px; margin: 0 auto; }
.section-title {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: var(--text);
  text-align: center;
  margin-bottom: 0.6rem;
}
.section-sub {
  text-align: center;
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* ─── Gallery ───────────────────────────────────────────────── */
.gallery-grid {
  columns: 3;
  column-gap: 16px;
}
.gallery-item {
  position: relative;
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  border-radius: 14px;
  transition: transform 0.4s ease;
}
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(255,133,161,0.7) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--transition);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  border-radius: 14px;
}
.gallery-overlay span {
  color: var(--white);
  font-weight: 600;
  font-size: 0.9rem;
}
.gallery-item:hover img { transform: scale(1.07); box-shadow: var(--glow-strong); }
.gallery-item:hover .gallery-overlay { opacity: 1; }

@media (max-width: 900px) { .gallery-grid { columns: 2; } }
@media (max-width: 600px) { .gallery-grid { columns: 1; } }

/* ─── Lightbox ──────────────────────────────────────────────── */
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(92, 61, 78, 0.85);
  backdrop-filter: blur(6px);
  align-items: center;
  justify-content: center;
}
.lightbox.open { display: flex; }
.lightbox img {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  font-size: 2rem;
  color: var(--white);
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
```

- [ ] **Step 3: Add lightbox markup to `index.html` (before `</body>`)**

```html
<!-- Lightbox -->
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo lightbox">
  <button class="lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
  <img id="lightbox-img" src="" alt="Full size photo" />
</div>
```

- [ ] **Step 4: Add `initLightbox()` to `script.js` and call it**

```js
// ─── Lightbox ─────────────────────────────────────────────────
function initLightbox() {
  const box   = document.getElementById('lightbox');
  const img   = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');
  if (!box) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      img.src = item.dataset.lightbox;
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  close.addEventListener('click', closeLightbox);
  box.addEventListener('click', e => { if (e.target === box) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
```

Add `initLightbox();` inside `DOMContentLoaded`.

- [ ] **Step 5: Verify in browser — gallery shows 6 images in masonry, hover shows overlay, click opens lightbox, Escape closes it**

- [ ] **Step 6: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: photo gallery with masonry grid, hover glow, lightbox"
```

---

## Task 6: Video Section

**Files:**
- Modify: `index.html` — add `<section id="video">`
- Modify: `style.css` — video section styles

- [ ] **Step 1: Add video markup to `index.html` (after `#gallery` section)**

```html
<!-- ═══════════════════════════════════════════════════════════
     VIDEO SECTION
     EDIT option A: Replace the src below with your MP4 path
       e.g. src="assets/video/birthday-video.mp4"
     EDIT option B: Comment out the <video> block and uncomment
       the <iframe> block below for a YouTube embed
     ═══════════════════════════════════════════════════════════ -->
<section id="video" class="section section-alt">
  <div class="section-inner">
    <h2 class="section-title reveal">A Little Something Special 🎬</h2>
    <p class="section-sub reveal" data-delay="100">
      <!-- EDIT: Replace with your video intro text -->
      Press play — this one's made just for you.
    </p>
    <div class="video-wrap reveal" data-delay="200">
      <!-- OPTION A: Local video file -->
      <video controls poster="" width="100%">
        <!-- EDIT: Replace src with your video file path -->
        <source src="assets/video/birthday-video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <!-- OPTION B: YouTube embed — uncomment and fill in your video ID
      <iframe
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        title="Birthday video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      -->
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add video styles to `style.css`**

```css
/* ─── Section Alt Background ────────────────────────────────── */
.section-alt { background: var(--white); }

/* ─── Video ─────────────────────────────────────────────────── */
.video-wrap {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(255, 133, 161, 0.25);
}
.video-wrap video,
.video-wrap iframe {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
}
```

- [ ] **Step 3: Verify in browser — video section renders with card shape and pink shadow (video won't play without the file)**

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: video section with styled player, YouTube option commented"
```

---

## Task 7: Message Card Section

**Files:**
- Modify: `index.html` — add `<section id="message">`
- Modify: `style.css` — message card styles
- Modify: `script.js` — add `initTypewriter()`

- [ ] **Step 1: Add message markup to `index.html` (after `#video` section)**

```html
<!-- ═══════════════════════════════════════════════════════════
     MESSAGE CARD SECTION
     EDIT: Replace the entire message below with your own words
     The first sentence will have the typewriter effect applied.
     ═══════════════════════════════════════════════════════════ -->
<section id="message" class="section">
  <div class="section-inner">
    <h2 class="section-title reveal">A Note From the Heart 💌</h2>
    <div class="message-card reveal" data-delay="150">
      <span class="quote-mark open">"</span>
      <!-- EDIT: First sentence — typewriter effect plays on this line -->
      <p class="message-typewriter" data-text="Purva, you are one of those rare people who makes every room brighter just by being in it."></p>
      <!-- EDIT: Rest of message -->
      <p class="message-body">
        Your kindness, your laughter, and your heart are things this world is lucky to have.
        Every memory we've made together is something I treasure more than you know.
        Here's to you — on your day — and to all the incredible things still ahead.
        Happy Birthday, Purva. 🎉
      </p>
      <span class="quote-mark close">"</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add message card styles to `style.css`**

```css
/* ─── Message Card ──────────────────────────────────────────── */
.message-card {
  max-width: 780px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius-card);
  padding: 3.5rem 3rem;
  box-shadow: var(--glow);
  position: relative;
  text-align: center;
}
.quote-mark {
  font-family: var(--font-head);
  font-size: 6rem;
  color: var(--pink-light);
  line-height: 0;
  position: absolute;
  opacity: 0.6;
}
.quote-mark.open  { top: 2rem;  left: 2rem; }
.quote-mark.close { bottom: 0rem; right: 2rem; }

.message-typewriter {
  font-family: var(--font-head);
  font-size: clamp(1.1rem, 3vw, 1.35rem);
  font-style: italic;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  min-height: 2em;
}
.message-typewriter::after {
  content: '|';
  animation: blink 0.7s step-end infinite;
  color: var(--pink);
}
.message-typewriter.done::after { display: none; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.message-body {
  color: var(--text-light);
  line-height: 1.9;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .message-card { padding: 2.5rem 1.5rem; }
  .quote-mark { font-size: 4rem; }
}
```

- [ ] **Step 3: Add `initTypewriter()` to `script.js` and trigger it on scroll reveal**

```js
// ─── Typewriter Effect ────────────────────────────────────────
function initTypewriter() {
  const el = document.querySelector('.message-typewriter');
  if (!el) return;
  const text = el.dataset.text || '';
  let i = 0;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      function type() {
        if (i < text.length) {
          el.textContent = text.slice(0, ++i);
          setTimeout(type, 38);
        } else {
          el.classList.add('done');
        }
      }
      type();
    }
  }, { threshold: 0.5 });

  obs.observe(el);
}
```

Add `initTypewriter();` inside `DOMContentLoaded`.

- [ ] **Step 4: Verify in browser — card renders, scroll to it triggers typewriter on the first sentence, cursor blinks, then disappears when done**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: message card with typewriter effect on scroll reveal"
```

---

## Task 8: Memories Timeline Section

**Files:**
- Modify: `index.html` — add `<section id="timeline">`
- Modify: `style.css` — timeline styles

- [ ] **Step 1: Add timeline markup to `index.html` (after `#message` section)**

```html
<!-- ═══════════════════════════════════════════════════════════
     MEMORIES TIMELINE
     EDIT: Replace date, caption, and img src for each entry.
     Add or remove .timeline-item blocks as needed.
     ═══════════════════════════════════════════════════════════ -->
<section id="timeline" class="section section-alt">
  <div class="section-inner">
    <h2 class="section-title reveal">Our Story So Far ✨</h2>
    <p class="section-sub reveal" data-delay="100">
      <!-- EDIT: Replace with your timeline intro -->
      Every chapter better than the last.
    </p>
    <div class="timeline">
      <!-- Memory 1 — left -->
      <div class="timeline-item left reveal from-left" data-delay="0">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <!-- EDIT: Replace with your date -->
          <span class="timeline-date">📅 January 2023</span>
          <!-- EDIT: Replace with your photo -->
          <img src="https://picsum.photos/seed/t1/300/200" alt="Memory — EDIT alt text" loading="lazy" />
          <!-- EDIT: Replace with your caption -->
          <p>The day everything started — a memory worth keeping forever. 💛</p>
        </div>
      </div>
      <!-- Memory 2 — right -->
      <div class="timeline-item right reveal from-right" data-delay="100">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="timeline-date">📅 June 2023</span>
          <img src="https://picsum.photos/seed/t2/300/200" alt="Memory — EDIT alt text" loading="lazy" />
          <p>That one afternoon we couldn't stop laughing. Some days just feel golden. ✨</p>
        </div>
      </div>
      <!-- Memory 3 — left -->
      <div class="timeline-item left reveal from-left" data-delay="200">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="timeline-date">📅 December 2023</span>
          <img src="https://picsum.photos/seed/t3/300/200" alt="Memory — EDIT alt text" loading="lazy" />
          <p>The trip that turned into the best story we still tell. 🗺️</p>
        </div>
      </div>
      <!-- Memory 4 — right -->
      <div class="timeline-item right reveal from-right" data-delay="300">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="timeline-date">📅 Today 🎉</span>
          <img src="https://picsum.photos/seed/t4/300/200" alt="Memory — EDIT alt text" loading="lazy" />
          <p>And here we are — celebrating you, on your day. More chapters ahead. 🥂</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add timeline styles to `style.css`**

```css
/* ─── Timeline ──────────────────────────────────────────────── */
.timeline {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding: 1rem 0;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--pink-light), var(--pink), var(--pink-light));
}
.timeline-item {
  position: relative;
  width: 47%;
  margin-bottom: 3rem;
}
.timeline-item.left  { margin-left: 0;    margin-right: auto; }
.timeline-item.right { margin-left: auto; margin-right: 0;    }

.timeline-dot {
  position: absolute;
  top: 20px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--pink);
  box-shadow: var(--glow);
  border: 3px solid var(--white);
}
.timeline-item.left  .timeline-dot { right: -7%; }
.timeline-item.right .timeline-dot { left: -7%;  }

.timeline-card {
  background: var(--white);
  border-radius: var(--radius-card);
  padding: 1.4rem;
  box-shadow: 0 6px 24px rgba(255, 133, 161, 0.15);
  transition: box-shadow var(--transition), transform var(--transition);
}
.timeline-card:hover {
  box-shadow: var(--glow);
  transform: translateY(-4px);
}
.timeline-date {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--pink);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.6rem;
}
.timeline-card img {
  border-radius: 10px;
  margin-bottom: 0.8rem;
  width: 100%;
}
.timeline-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-light);
}

@media (max-width: 700px) {
  .timeline::before { left: 16px; }
  .timeline-item { width: 100%; padding-left: 44px; }
  .timeline-item.left  .timeline-dot,
  .timeline-item.right .timeline-dot { left: 9px; right: auto; top: 16px; }
}
```

- [ ] **Step 3: Verify in browser — alternating left/right cards with connecting line, scroll-reveal slides each card in from its side**

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: memories timeline with alternating cards and scroll reveal"
```

---

## Task 9: Surprise Animation Section

**Files:**
- Modify: `index.html` — add `<section id="surprise">`
- Modify: `style.css` — surprise section styles
- Modify: `script.js` — add `initSurprise()`

- [ ] **Step 1: Add surprise section markup to `index.html` (after `#timeline` section)**

```html
<!-- ═══════════════════════════════════════════════════════════
     SURPRISE ANIMATION SECTION
     No edits needed — this is purely interactive.
     ═══════════════════════════════════════════════════════════ -->
<section id="surprise" class="section surprise-section">
  <div class="section-inner surprise-inner">
    <h2 class="section-title reveal" style="color: var(--white);">Send Some Love to the Universe ✨</h2>
    <p class="section-sub reveal" data-delay="100" style="color: rgba(255,255,255,0.8);">
      Go on — the universe is listening.
    </p>
    <button class="btn btn-surprise reveal" id="surprise-btn" data-delay="200">
      Spread the Love 💖
    </button>
    <p class="surprise-msg" id="surprise-msg"></p>
  </div>
</section>
```

- [ ] **Step 2: Add surprise section styles to `style.css`**

```css
/* ─── Surprise Section ──────────────────────────────────────── */
.surprise-section {
  background: linear-gradient(135deg, #FF85A1, #FF5C85, #FFB6C1);
  background-size: 200% 200%;
  animation: gradientDrift 6s ease infinite;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.surprise-inner { position: relative; z-index: 1; }
.btn-surprise {
  background: var(--white);
  color: var(--pink);
  font-size: 1.1rem;
  padding: 1rem 2.8rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}
.btn-surprise:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.2); }

.surprise-msg {
  margin-top: 1.5rem;
  color: var(--white);
  font-size: 1.1rem;
  font-style: italic;
  min-height: 1.5em;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.surprise-msg.show { opacity: 1; }

/* Floating hearts spawned by JS */
.float-heart {
  position: fixed;
  pointer-events: none;
  font-size: 1.4rem;
  animation: floatUp 2.2s ease-out forwards;
  z-index: 9999;
}
@keyframes floatUp {
  0%   { transform: translateY(0) scale(1);   opacity: 1; }
  100% { transform: translateY(-70vh) scale(0.5); opacity: 0; }
}
```

- [ ] **Step 3: Add `initSurprise()` to `script.js` and call it**

```js
// ─── Surprise Animation ───────────────────────────────────────
function initSurprise() {
  const btn = document.getElementById('surprise-btn');
  const msg = document.getElementById('surprise-msg');
  if (!btn) return;

  const messages = [
    'The universe heard you! 🌟',
    'Love sent! Purva felt it! 💕',
    'Stars are dancing for you! ✨',
    'The world just got a little brighter! 🌸',
  ];

  btn.addEventListener('click', () => {
    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF85A1', '#FFB6C1', '#FFFFFF', '#FFD700', '#FF5C85'],
    });

    // Floating hearts
    const symbols = ['💖', '✨', '🌸', '⭐', '💕', '🌟'];
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('span');
      heart.className = 'float-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
      heart.style.top  = rect.top + 'px';
      heart.style.animationDelay = (Math.random() * 0.4) + 's';
      heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
      document.body.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove());
    }

    // Message
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.classList.remove('show');
    void msg.offsetWidth; // force reflow to restart transition
    msg.classList.add('show');
  });
}
```

Add `initSurprise();` inside `DOMContentLoaded`.

- [ ] **Step 4: Verify in browser — clicking the button triggers confetti, floating emojis fly upward, a random message fades in**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: surprise section with confetti burst and floating hearts"
```

---

## Task 10: Footer

**Files:**
- Modify: `index.html` — add `<footer id="footer">`
- Modify: `style.css` — footer styles

- [ ] **Step 1: Add footer markup to `index.html` (after `#surprise` section, before music button / lightbox)**

```html
<!-- ═══════════════════════════════════════════════════════════
     FOOTER
     EDIT: Optionally change the name below
     ═══════════════════════════════════════════════════════════ -->
<footer id="footer">
  <p>Made with <span class="heart">❤️</span> just for you, <strong>Purva</strong></p>
  <p class="footer-sub">Happy Birthday 🎉 Here's to many more wonderful years.</p>
</footer>
```

- [ ] **Step 2: Add footer styles to `style.css`**

```css
/* ─── Footer ────────────────────────────────────────────────── */
footer {
  background: var(--white);
  border-top: 3px solid var(--pink-light);
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--text-light);
  font-size: 1rem;
}
footer strong { color: var(--pink); }
.footer-sub {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: var(--pink-light);
}
.heart {
  display: inline-block;
  animation: heartbeat 1.4s ease-in-out infinite;
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%       { transform: scale(1.25); }
  28%       { transform: scale(1); }
  42%       { transform: scale(1.15); }
}
```

- [ ] **Step 3: Verify full page in browser — scroll end-to-end, check all 7 sections render, nav dots highlight correctly, footer is clean**

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: footer with heartbeat animation"
```

---

## Task 11: Final Polish & Responsive QA

**Files:**
- Modify: `style.css` — any remaining responsive fixes
- Modify: `index.html` — add `<meta>` tags for Netlify/sharing

- [ ] **Step 1: Add social meta tags to `<head>` in `index.html`**

```html
<!-- EDIT: Update content values for social sharing -->
<meta name="description" content="Happy Birthday, Purva! 🎉 A special surprise just for you." />
<meta property="og:title" content="Happy Birthday, Purva! 🎉" />
<meta property="og:description" content="A little something made just for you." />
<meta property="og:type" content="website" />
```

- [ ] **Step 2: Add `_redirects` file for clean Netlify routing**

```
# _redirects (place in project root, same level as index.html)
/*    /index.html   200
```

Create file at project root: `_redirects` with that single line.

- [ ] **Step 3: Resize browser to 375px width and verify**
  - No horizontal scroll
  - All sections stack cleanly
  - Gallery is 1-column
  - Timeline all left-aligned
  - Nav dots still visible on right
  - Music button not covering content
  - Hero text fits without overflow

- [ ] **Step 4: Resize to 768px and verify**
  - Gallery is 2-column
  - Timeline alternates left/right if viewport allows, else stacks
  - Video player fills nicely

- [ ] **Step 5: Test all interactions**
  - [ ] CTA "See Your Surprise" button scrolls to gallery
  - [ ] Gallery hover shows overlay
  - [ ] Gallery click opens lightbox; Escape and ✕ close it
  - [ ] Scroll reveals trigger on all sections
  - [ ] Typewriter fires when message card enters view
  - [ ] Timeline cards slide in from correct sides
  - [ ] Surprise button fires confetti + hearts + message
  - [ ] Nav dots highlight correct section while scrolling
  - [ ] Music button shows pulse ring when playing

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: final polish, meta tags, _redirects, responsive QA"
```

---

## Task 12: Deploy to Netlify

**Files:** None — deploy-only step

- [ ] **Step 1: Verify the folder structure is correct**

```bash
ls -1 /path/to/p-birthday-site
# Expected: index.html  style.css  script.js  assets/  docs/  _redirects
```

- [ ] **Step 2: Open https://app.netlify.com/drop in a browser**

- [ ] **Step 3: Drag the entire `p-birthday-site` folder onto the Netlify drop zone**

- [ ] **Step 4: Wait for deploy to complete (~10–30 seconds), then open the provided URL**

- [ ] **Step 5: Verify on mobile — open the Netlify URL on a phone, test all interactions**

- [ ] **Step 6: Optionally rename site in Netlify Site Settings → Domain → Change site name**

---

## Spec Coverage Checklist

| Spec requirement | Covered in task |
|-----------------|----------------|
| Pink/white theme + design tokens | Task 1 |
| Animated gradient hero | Task 3 |
| Floating particles | Task 3 |
| Side nav dots | Task 2 |
| CTA button with pulse | Task 3 |
| Music toggle with ring | Task 4 |
| Masonry photo gallery | Task 5 |
| Hover glow on photos | Task 5 |
| Lightbox on click | Task 5 |
| Video player + YouTube option | Task 6 |
| Message card with typewriter | Task 7 |
| Memories timeline alternating | Task 8 |
| Timeline scroll-reveal left/right | Task 8 |
| Surprise confetti + floating hearts | Task 9 |
| Footer with heartbeat | Task 10 |
| All EDIT comments for placeholders | Tasks 3–10 |
| Mobile-first responsive | Tasks 1–10 + Task 11 |
| Netlify deployment | Task 11–12 |
