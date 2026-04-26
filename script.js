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

// ─── Marquee — clone track for seamless infinite loop ─────────
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.removeAttribute('tabindex');
    track.appendChild(clone);
  });
}

// ─── Lightbox ─────────────────────────────────────────────────
function initLightbox() {
  const box   = document.getElementById('lightbox');
  const img   = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');
  if (!box) return;
  if (!close) return;

  document.querySelectorAll('.marquee-item').forEach(item => {
    const open = () => {
      if (!item.dataset.lightbox) return;
      img.src = item.dataset.lightbox;
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
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
  const el   = document.querySelector('.message-typewriter');
  const card = document.querySelector('.message-card');
  if (!el || !card) return;
  const text = el.dataset.text || '';
  let i = 0;
  let started = false;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
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
  }, { threshold: 0.3 });

  obs.observe(card);
}

// ─── Splash Screen + Autoplay ────────────────────────────────
function initSplash() {
  const splash = document.getElementById('splash');
  const btn    = document.getElementById('splash-btn');
  const audio  = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const icon   = musicBtn ? musicBtn.querySelector('.music-icon') : null;
  if (!splash || !btn) return;

  btn.addEventListener('click', () => {
    splash.classList.add('hide');
    setTimeout(() => { splash.style.display = 'none'; }, 650);

    if (audio) {
      audio.play().then(() => {
        if (musicBtn) musicBtn.classList.add('playing');
        if (icon) icon.textContent = '🎵';
      }).catch(() => {});
    }
  });
}

// ─── Music Toggle ─────────────────────────────────────────────
function initMusic() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;
  const icon  = btn.querySelector('.music-icon');

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
        icon.textContent = '🎵';
      }).catch(() => {});
    } else {
      audio.pause();
      btn.classList.remove('playing');
      icon.textContent = '🔇';
    }
  });
}

// ─── Pause music while any video is playing ───────────────────
function initVideoAudioSync() {
  const audio  = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const icon   = musicBtn ? musicBtn.querySelector('.music-icon') : null;
  if (!audio) return;

  let wasPlayingBeforeVideo = false;

  document.querySelectorAll('.video-card-player video').forEach(video => {
    video.addEventListener('play', () => {
      if (!audio.paused) {
        wasPlayingBeforeVideo = true;
        audio.pause();
        if (musicBtn) musicBtn.classList.remove('playing');
        if (icon) icon.textContent = '🔇';
      }
    });

    video.addEventListener('pause', () => {
      if (wasPlayingBeforeVideo) {
        wasPlayingBeforeVideo = false;
        audio.play().then(() => {
          if (musicBtn) musicBtn.classList.add('playing');
          if (icon) icon.textContent = '🎵';
        }).catch(() => {});
      }
    });

    video.addEventListener('ended', () => {
      if (wasPlayingBeforeVideo) {
        wasPlayingBeforeVideo = false;
        audio.play().then(() => {
          if (musicBtn) musicBtn.classList.add('playing');
          if (icon) icon.textContent = '🎵';
        }).catch(() => {});
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initReveal();
  initNavDots();
  initParticles();
  initMusic();
  initVideoAudioSync();
  initMarquee();
  initLightbox();
  initTypewriter();
});
