/* Same Back to top behavior as the ThryveMS landing, for the company page only. */
(() => {
  const button = document.querySelector('.company-back-to-top');
  if (!button) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const show = scrollTop > Math.max(180, window.innerHeight * .22);
    button.classList.toggle('visible', show);
    button.setAttribute('aria-hidden', show ? 'false' : 'true');
    button.tabIndex = show ? 0 : -1;
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  update();
})();
