// Theme toggle with persistence
(function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.documentElement.classList.add('light');
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  updateIcon();
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
  });
  function updateIcon() {
    const isLight = document.documentElement.classList.contains('light');
    btn.textContent = isLight ? '🌞' : '🌙';
  }
})();

// Mobile nav
(function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (!nav || !toggle || !list) return;
  toggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-expanded', String(!expanded));
  });
  list.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

// Smooth scroll for in-page anchors
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId.length === 1) return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetId);
    });
  });
})();

// Reveal on scroll
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('section, .project-card, .timeline-item, .card').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Demo contact submit
function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const msg = `Thanks, ${data.name}! I'll reach out at ${data.email}.`;
  alert(msg);
  form.reset();
  return false;
}


