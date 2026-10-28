/* Scroll-led polish for the existing sections after "The real problem".
   Intentionally uses existing elements, copy and colors; no section redesign.
   Runs only for motion-enabled browsers and respects reduced motion. */
(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches || typeof window.requestAnimationFrame !== 'function') return;

  const modules = [...document.querySelectorAll('#modules .module')];
  const pricingCards = [...document.querySelectorAll('#pricing > div:nth-child(2) > div')];
  const calculator = document.querySelector('#calculator');
  const serviceCard = document.querySelector('.section-crossover > div');
  const integrationVisual = document.querySelector('.integration-visual');
  const layers = integrationVisual ? [...integrationVisual.querySelectorAll('.stack-card')] : [];
  const processList = document.querySelector('.process-list');
  const steps = [...document.querySelectorAll('.process-step')];
  const faqItems = [...document.querySelectorAll('#faq .faq-item')];
  const contactCard = document.querySelector('#contact .contact-card');
  const contactCopy = contactCard?.querySelector('.contact-copy');
  const contactForm = contactCard?.querySelector('.contact-form');

  if (!modules.length || !pricingCards.length || !processList || !contactCard) return;

  const root = document.documentElement;
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = n => { const p = clamp(n); return p * p * (3 - 2 * p); };
  const set = (element, name, value) => {
    if (element) element.style.setProperty(name, clamp(value).toFixed(4));
  };
  const entering = (element, begin = .88, travel = .55) => {
    const rect = element.getBoundingClientRect();
    return clamp((window.innerHeight * begin - rect.top) / Math.max(1, window.innerHeight * travel));
  };

  let scheduled = false;
  let width = window.innerWidth;
  let height = window.innerHeight;

  const update = () => {
    scheduled = false;
    const desktop = window.innerWidth > 760;

    // Feature cards cascade into the four-column grid and retrace on upward scroll.
    modules.forEach((card, index) => {
      const stagger = (index % (desktop ? 4 : 2)) * (desktop ? .12 : .09);
      set(card, '--after-progress', smooth(entering(card, .94, .47) - stagger));
    });

    // Preserve the exact three tiers, prices, and calculator interactions.
    const pricingRow = pricingCards[0]?.parentElement;
    const cardEntry = pricingRow ? entering(pricingRow, .94, .60) : 1;
    pricingCards.forEach((card, i) =>
      set(card, '--after-progress', smooth((cardEntry - i * .10) / .76))
    );
    set(calculator, '--after-progress', smooth(entering(calculator, .93, .45)));
    set(serviceCard, '--after-progress', smooth(entering(serviceCard, .88, .52)));

    // The existing Microsoft 365 / ThryveMS / Quality Experience cards
    // converge into the existing diagram in sequence; nothing is added.
    const layerEntry = integrationVisual ? entering(integrationVisual, .94, .77) : 1;
    layers.forEach((card, i) =>
      set(card, '--after-progress', smooth((layerEntry - i * .16) / .68))
    );

    // A single vertical reading indicator follows the existing 4 process steps.
    const listRect = processList.getBoundingClientRect();
    const line = (window.innerHeight * .53 - listRect.top) /
      Math.max(1, listRect.height);
    set(processList, '--after-line', smooth(line));

    steps.forEach((step, index) => {
      const p = smooth(entering(step, .81, .43));
      set(step, '--after-progress', p);
      // Keep completed steps legible, mark the closest step as current.
      const rect = step.getBoundingClientRect();
      const midpoint = rect.top + rect.height * .5;
      const current = midpoint >= window.innerHeight * .25 &&
        midpoint <= window.innerHeight * .69;
      step.classList.toggle('after-step-current', current);
    });

    faqItems.forEach((item, i) =>
      set(item, '--after-progress', smooth(entering(item, .89, .28) - (i % 2) * .07))
    );

    const contactEntry = smooth(entering(contactCard, .93, .62));
    set(contactCopy, '--after-progress', contactEntry);
    set(contactForm, '--after-progress', smooth((contactEntry - .19) / .81));
    set(contactCard, '--after-progress', contactEntry);
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  root.classList.add('after-problem-motion');
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => {
    if (width !== innerWidth || height !== innerHeight) {
      width = innerWidth;
      height = innerHeight;
      schedule();
    }
  });
  window.addEventListener('pageshow', schedule);
})();
