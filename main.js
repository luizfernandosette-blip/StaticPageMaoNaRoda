/* ============================================================
   MÃO NA RODA – JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ── Topbar height compensation for sticky header ──────────
  const topbar = document.querySelector('.topbar');
  const header = document.querySelector('#header');

  // ── Hamburger menu ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Header scroll shadow ──────────────────────────────────
  const onScroll = () => {
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back-to-top visibility
    const btt = document.getElementById('backToTop');
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 400);
    }

    // Active nav link highlight
    highlightNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Back to top ───────────────────────────────────────────
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Active nav link based on scroll position ──────────────
  function highlightNav() {
    const sections = document.querySelectorAll('section[id], .hero[id]');
    const navLinks  = document.querySelectorAll('.nav a[href^="#"]');

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - (header?.offsetHeight || 80) - 20;
      if (window.scrollY >= top) {
        current = '#' + sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === current);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (header?.offsetHeight || 80) + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Intersection Observer – fade-in on scroll ─────────────
  const fadeTargets = document.querySelectorAll(
    '.cat-card, .galeria-item, .info-card, .diferencial-item, .sobre-img, .sobre-text'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeTargets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // Add .visible handler via CSS equivalent
  const styleEl = document.createElement('style');
  styleEl.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(styleEl);

  // ── Init ──────────────────────────────────────────────────
  onScroll();
  highlightNav();

})();
