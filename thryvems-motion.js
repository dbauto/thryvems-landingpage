(() => {
  const root = document.documentElement;
  const progress = document.querySelector('.scroll-progress span');
  const backToTop = document.querySelector('.back-to-top');
  const problemSection = document.querySelector('.problem');
  const problemScroll = document.querySelector('.problem-scroll');
  const problemStatement = document.querySelector('.big-statement');
  const problemKicker = problemSection?.querySelector('.statement-kicker, .eyebrow');
  const problemWords = [];
  const menuBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const storyItems = Array.from(document.querySelectorAll('.story-item'));
  const panels = Array.from(document.querySelectorAll('.demo-panel'));
  const demoTitle = document.querySelector('.demo-top h4');
  const demoPill = document.querySelector('.demo-pill');
  const demoNavItems = Array.from(document.querySelectorAll('.demo-nav span'));
  const storyTitles = ['ISO 9001 readiness', 'Documents in review', 'Audit management', 'Corrective actions'];
  const storyDescriptions = ['Open by clause', 'Revision control', 'Audit schedule', 'Assigned actions'];
  const storyNavIndices = [0, 2, 3, 4];
  let selectedMobileStory = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };

  menuBtn?.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Turn the problem statement into individually scroll-scrubbed words while
  // preserving the italic emphasis already in the markup.
  if (problemStatement) {
    const wrapProblemWords = (node, inheritedItalic = false) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const fragment = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(part));
              return;
            }

            const span = document.createElement('span');
            span.className = 'problem-word' + (inheritedItalic ? ' problem-word-italic' : '');
            span.textContent = part;
            span.setAttribute('aria-hidden', 'true');
            fragment.appendChild(span);
            problemWords.push(span);
          });
          child.replaceWith(fragment);
          return;
        }

        if (child.nodeType === Node.ELEMENT_NODE) {
          wrapProblemWords(child, inheritedItalic || child.tagName === 'EM');
        }
      });
    };

    wrapProblemWords(problemStatement);
    problemStatement.classList.add('problem-animated');
    problemStatement.setAttribute('aria-label', 'When quality lives across folders, spreadsheets, chats, emails, and memory, compliance becomes detective work.');
  }

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => revealObserver.observe(el));

  // On smaller screens the narrative cards are tappable, not an inaccessible
  // off-screen automatic sequence.
  storyItems.forEach((item, index) => {
    item.setAttribute('role', 'button');
    item.tabIndex = 0;
    item.addEventListener('click', () => {
      selectedMobileStory = index;
      updateScroll();
    });
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      selectedMobileStory = index;
      updateScroll();
    });
  });

  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';

    if (backToTop) {
      const shouldShow = scrollTop > Math.max(180, window.innerHeight * .22);
      backToTop.classList.toggle('visible', shouldShow);
      backToTop.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
      backToTop.tabIndex = shouldShow ? 0 : -1;
    }

    if (problemScroll && problemWords.length) {
      const rect = problemScroll.getBoundingClientRect();
      const travel = Math.max(1, problemScroll.offsetHeight - window.innerHeight);
      const rawProblem = Math.max(0, Math.min(1, -rect.top / travel));
      const wordCount = Math.max(1, problemWords.length - 1);

      const smooth = (value, start, end) => {
        const n = Math.max(0, Math.min(1, (value - start) / Math.max(.001, end - start)));
        return n * n * (3 - 2 * n);
      };

      // Phase 1: reveal the full sentence early.
      // Phase 2: hold the fully readable, centered sentence for ~1 viewport.
      // Phase 3: release it upward only near the end of the pinned scene.
      const revealProgress = smooth(rawProblem, .02, .34);
      const releaseProgress = smooth(rawProblem, .80, .98);

      problemWords.forEach((word, index) => {
        const isItalic = word.classList.contains('problem-word-italic');
        const wordPosition = index / wordCount;
        const staggerStart = wordPosition * .20 + (isItalic ? .018 : 0);
        const local = Math.max(0, Math.min(1, (revealProgress - staggerStart) / .28));
        const eased = local * local * (3 - 2 * local);

        const y = 34 * (1 - eased);
        const x = isItalic ? 20 * (1 - eased) : 0;
        const blur = 7 * (1 - eased);
        const releaseY = -72 * releaseProgress;

        word.style.opacity = String((.10 + eased * .90) * (1 - releaseProgress * .78));
        word.style.transform =
          'translate3d(' + x + 'px,' + (y + releaseY) + 'px,0)';
        word.style.filter = 'blur(' + blur + 'px)';
      });

      if (problemKicker && !reduceMotion) {
        const kp = smooth(rawProblem, .01, .10);
        problemKicker.style.opacity = String((.28 + kp * .72) * (1 - releaseProgress * .7));
        problemKicker.style.transform =
          'translateY(' + ((16 * (1 - kp)) - 52 * releaseProgress) + 'px)';
      }

      const hint = problemSection?.querySelector('.problem-scroll-hint');
      if (hint) {
        const hintIn = smooth(rawProblem, .02, .10);
        const hintOut = smooth(rawProblem, .18, .28);
        hint.style.opacity = String(.62 * hintIn * (1 - hintOut));
      }
    }

    let activeIndex = 0;
    storyItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      if (center < window.innerHeight * .68) activeIndex = i;
    });
    if (window.innerWidth <= 1100 && selectedMobileStory !== null) activeIndex = selectedMobileStory;
    storyItems.forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
      item.setAttribute('aria-pressed', i === activeIndex ? 'true' : 'false');
    });
    panels.forEach((panel, i) => panel.classList.toggle('active', i === activeIndex));
    if (demoTitle) demoTitle.textContent = storyTitles[activeIndex] || storyTitles[0];
    if (demoPill) demoPill.textContent = storyDescriptions[activeIndex] || storyDescriptions[0];
    demoNavItems.forEach((nav, index) => nav.classList.toggle('active', index === storyNavIndices[activeIndex]));
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateScroll);

  updateScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  });

  document.querySelectorAll('.faq-q').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(x => {
        x.classList.remove('open');
        x.querySelector('.faq-q')?.setAttribute('aria-expanded','false');
        const symbol = x.querySelector('.faq-q b');
        if (symbol) symbol.textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded','true');
        const symbol = button.querySelector('b');
        if (symbol) symbol.textContent = '−';
      }
    });
  });

  document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const success = document.querySelector('.form-success');
    if (success) success.classList.add('show');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();