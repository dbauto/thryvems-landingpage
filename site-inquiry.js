(() => {
  'use strict';
  const forms = [...document.querySelectorAll('[data-inquiry-form]')];
  if (!forms.length) return;

  // GitHub Pages serves static content. Never send without an explicitly
  // enabled HTTPS Worker endpoint AND a server-enforced Turnstile challenge.
  const status = (form, message, tone = '') => {
    const element = form.querySelector('[data-inquiry-status]');
    if (!element) return;
    element.textContent = message;
    element.dataset.state = tone;
  };
  const setButton = (button, enabled) => {
    button.disabled = !enabled;
    button.setAttribute('aria-disabled', String(!enabled));
  };
  for (const form of forms) {
    form.addEventListener('submit', event => event.preventDefault());
  }
  const config = window.ThyncPublicInquiry;
  if (config?.enabled !== true ||
      !(typeof config.endpoint === 'string' && /^https:\/\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9/_-]*$/.test(config.endpoint) && new URL(config.endpoint).hostname.endsWith('.workers.dev')) ||
      !/^[a-zA-Z0-9_-]{8,128}$/.test(config.turnstileSiteKey || '') ||
      (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1')) {
    return;
  }

  const loadTurnstile = () => new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('No Turnstile API'));
    script.onerror = () => reject(new Error('Turnstile unavailable'));
    document.head.appendChild(script);
  });

  const start = async () => {
    let turnstile;
    try {
      turnstile = await loadTurnstile();
    } catch (_) {
      forms.forEach(form => status(form, 'Human verification could not load. Please try again later.', 'error'));
      return;
    }
    forms.forEach(form => {
      const button = form.querySelector('[data-inquiry-submit]');
      const slot = form.querySelector('[data-human-check]');
      if (!button || !slot) return;
      let token = '';
      let sending = false;
      let widgetId;
      const formSource = form.dataset.inquiryForm === 'thryvems' ? 'thryvems' : 'company';
      const revoke = () => {
        token = '';
        setButton(button, false);
      };
      try {
        widgetId = turnstile.render(slot, {
          sitekey: config.turnstileSiteKey,
          action: formSource === 'thryvems' ? 'product_inquiry' : 'company_inquiry',
          callback: value => {
            token = typeof value === 'string' && value.length <= 2048 ? value : '';
            setButton(button, !!token && !sending);
          },
          'expired-callback': revoke,
          'error-callback': () => { revoke(); status(form, 'Human verification failed. Please try again.', 'error'); }
        });
      } catch (_) {
        status(form, 'Human verification could not load. Please try again later.', 'error');
        return;
      }
      if (formSource === 'company') {
        button.textContent = 'Send enquiry';
      }
      status(form, 'Complete the human verification before sending.');
      form.addEventListener('submit', async event => {
        event.preventDefault();
        if (sending || !token || !form.reportValidity()) return;
        const data = new FormData(form);
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const message = String(data.get('message') || '').trim();
        const company = String(data.get('company') || '').trim();
        const interest = String(data.get('interest') || '').trim();
        if (!name || name.length > 120 || !email || email.length > 254 ||
            company.length > 160 || interest.length > 80 || message.length > 3000) return;
        data.set('name', name);
        data.set('email', email);
        data.set('company', company);
        data.set('message', message);
        data.set('interest', interest);
        data.set('source', formSource);
        data.set('_subject', formSource === 'thryvems' ? 'ThryveMS walkthrough enquiry' : 'Thync & Thryve service enquiry');
        data.set('cf-turnstile-response', token);
        sending = true;
        setButton(button, false);
        status(form, 'Sending your enquiry…');
        try {
          const response = await fetch(config.endpoint, {
            method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({name,email,company,message,interest,source:formSource,token}), mode: 'cors', credentials: 'omit', cache: 'no-store'
          });
          if (!response.ok) throw new Error('The email service rejected the submission');
          form.reset();
          status(form, 'Your enquiry was submitted. We will respond to your work email.', 'success');
        } catch (_) {
          status(form, 'We could not submit your enquiry. Please try again later.', 'error');
        } finally {
          sending = false;
          revoke();
          try { turnstile.reset(widgetId); } catch (_) { /* Keep button disabled. */ }
        }
      });
    });
  };
  start();
})();
