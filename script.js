const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

$$('.faq-q').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    $$('.faq-a').forEach((item) => item.classList.remove('open'));
    $$('.faq-q span').forEach((span) => (span.textContent = '+'));
    if (!isOpen) {
      answer.classList.add('open');
      button.querySelector('span').textContent = '−';
    }
  });
});

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

$$('.reveal, section').forEach((element) => revealObserver.observe(element));
