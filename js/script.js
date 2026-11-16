// Small interactions only. Motion is reserved for the user's chosen typewriter and actual links.
const dateElement = document.getElementById('date');
if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
}
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinks) {
  const setMenuOpen = (open) => {
    navLinks.classList.toggle('open', open);
    mobileMenuBtn.classList.toggle('active', open);
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
  };
  mobileMenuBtn.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenuOpen(false); mobileMenuBtn.focus(); }
  });
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) setMenuOpen(false);
  });
}
const navbar = document.querySelector('.navbar');
if (navbar) {
  const update = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}
const typing = document.querySelector('.typing');
if (typing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fullText = typing.textContent.trim();
  // Keep a full, readable alternative for assistive technology.
  const accessibleText = document.createElement('span');
  accessibleText.className = 'sr-only-typing';
  accessibleText.textContent = fullText;
  const visualText = document.createElement('span');
  visualText.setAttribute('aria-hidden', 'true');
  typing.replaceChildren(visualText, accessibleText);
  let started = false;
  const startTyping = () => {
    if (started) return;
    started = true;
    typing.setAttribute('data-typing-active','');
    let idx = 0;
    const letters = Array.from(fullText);
    const step = () => {
      idx = Math.min(idx + 2, letters.length);
      visualText.textContent = letters.slice(0,idx).join('');
      if (idx < letters.length) window.setTimeout(step, 22);
      else typing.removeAttribute('data-typing-active');
    };
    step();
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) { startTyping(); observer.disconnect(); }
    }, { threshold: 0.05 });
    observer.observe(typing);
  } else startTyping();
}
