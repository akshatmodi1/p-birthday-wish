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

// ─── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

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

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavDots();
  initParticles();
  initMusic();
  initLightbox();
  initTypewriter();
});
