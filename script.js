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

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavDots();
});
