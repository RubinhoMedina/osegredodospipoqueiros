const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const menuBtn = $('[data-menu-btn]');
const nav = $('[data-nav]');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

$$('[data-scroll]').forEach(link => {
  link.addEventListener('click', evt => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = $(href);
    if (!target) return;
    evt.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sticky = $('[data-sticky-cta]');
const offer = $('#oferta');
if (sticky) {
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const offerTop = offer ? offer.getBoundingClientRect().top + y : Infinity;
    if (y > 650 && y < offerTop - 280) sticky.classList.add('show');
    else sticky.classList.remove('show');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// FAQ: deixa só uma pergunta aberta por vez no mobile
$$('.faq details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    $$('.faq details').forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

// Animação leve de entrada nos cards
const cards = $$('.pain-item, .secret-cards article, .feature-list div, .audience-grid article, .bonus-card, .phone-preview figure');
if ('IntersectionObserver' in window) {
  cards.forEach(card => card.classList.add('will-reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(card => obs.observe(card));
}

const style = document.createElement('style');
style.textContent = `.will-reveal{opacity:0;transform:translateY(14px);transition:opacity .45s ease,transform .45s ease}.will-reveal.revealed{opacity:1;transform:none}`;
document.head.appendChild(style);
