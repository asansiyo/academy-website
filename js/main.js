/* NAV scroll */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

/* Mobile toggle */
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => links.classList.remove('open')));
}

/* Active link */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(l => {
  if (l.getAttribute('href') === page || (page==='' && l.getAttribute('href')==='index.html')) l.classList.add('active');
});

/* Scroll reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.07) + 's';
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Counter */
function runCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const step = target / (dur / 16);
  let cur = 0;
  const iv = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(iv); }
    el.textContent = Math.floor(cur).toLocaleString() + suffix;
  }, 16);
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); }});
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

/* Lightbox */
const lb = document.getElementById('lightbox');
if (lb) {
  document.querySelectorAll('.gal-item[data-src]').forEach(item => {
    item.addEventListener('click', () => { lb.querySelector('img').src = item.dataset.src; lb.classList.add('open'); });
  });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
}
