/* A scroll-driven illustration of Thync & Thryve's existing service journey.
   No business logic, requests, media dependencies or new navigation. */
(() => {
  const story = document.querySelector('.company-motion-story');
  const graphic = story?.querySelector('.company-motion-board');
  const chapters = story ? [...story.querySelectorAll('[data-motion-chapter]')] : [];
  const objects = story ? [...story.querySelectorAll('[data-motion-object]')] : [];
  const path = story?.querySelector('.company-motion-route-drawn');
  const traveler = story?.querySelector('.company-motion-traveler');
  const counter = story?.querySelector('.company-motion-current');
  if (!story || !graphic || chapters.length !== 4 || objects.length !== 4 || !path || !traveler) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
  const root = document.documentElement;
  const routeLength = path.getTotalLength();
  const revealTargets = [
    ...document.querySelectorAll('.company-step, #services > div[id], .company-standard, .company-delivery-card, .company-solution-plans > a, .company-work-steps > div')
  ];
  const heroCards = [...document.querySelectorAll('#top .company-hero-tiles > a')];
  let ticking = false;

  const paint = () => {
    ticking = false;
    if (motionPreference.matches) return;

    const narrow = window.innerWidth <= 860;
    const viewport = Math.max(1, window.innerHeight);
    const bounds = story.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - viewport);
    const progress = narrow ? 1 : clamp(-bounds.top / travel);
    story.style.setProperty('--story-progress', progress.toFixed(4));

    // Each tile moves in along its own path as the reading stage advances.
    objects.forEach((tile, i) => {
      const arrival = narrow ? 1 : (i === 0 ? 1 : smooth((progress - (i - .6) * .23) / .19));
      tile.style.setProperty('--arrival', arrival.toFixed(4));
    });
    const active = narrow ? 0 : Math.min(3, Math.floor(progress * 4));
    chapters.forEach((chapter, i) => chapter.classList.toggle('is-active', i === active));
    if (counter) counter.textContent = String(active + 1).padStart(2, '0');

    // Draw the real connector and move its dot through the four tiles.
    path.style.strokeDasharray = String(routeLength);
    path.style.strokeDashoffset = String(narrow ? 0 : routeLength * (1 - progress));
    const point = path.getPointAtLength(routeLength * progress);
    traveler.setAttribute('cx', point.x.toFixed(2));
    traveler.setAttribute('cy', point.y.toFixed(2));

    // Existing page elements respond to the user's scroll instead of
    // all using the same entrance fade.
    const heroTravel = Math.max(0, Math.min(window.scrollY, 380));
    heroCards.forEach((card, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      card.style.setProperty('--hero-lift', (direction * heroTravel * .09).toFixed(2) + 'px');
      card.style.setProperty('--hero-tilt', (direction * heroTravel * .007).toFixed(2) + 'deg');
    });
    revealTargets.forEach((target, i) => {
      const rect = target.getBoundingClientRect();
      const stagger = (i % 3) * .06;
      const progress = smooth((viewport * (.93 - stagger) - rect.top) / (viewport * .48));
      target.style.setProperty('--scene-reveal', progress.toFixed(4));
    });
  };
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paint);
  };

  if (!motionPreference.matches) root.classList.add('company-motion-enabled');
  paint();
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  motionPreference.addEventListener?.('change', () => {
    root.classList.toggle('company-motion-enabled', !motionPreference.matches);
    if (!motionPreference.matches) schedule();
  });
})();
