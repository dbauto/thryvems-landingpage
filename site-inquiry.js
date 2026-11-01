(() => {
  'use strict';
  const forms = [...document.querySelectorAll('[data-inquiry-form]')];
  if (!forms.length) return;
  // Fail closed: a live server must expose its readiness and public Turnstile
  // site key. Never interpret a static page or a client-side check as delivery.
  const setStatus = (form, text, state = '') => {
    const status = form.querySelector('[data-inquiry-status]');
    if (!status) return;
    status.textContent = text;
    status.dataset.state = state;
  };
  const loadTurnstile = () => new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile not available'));
    script.onerror = () => reject(new Error('Turnstile not available'));
    document.head.appendChild(script);
  });
  const start = async () => {
    let config;
    try {
      const response = await fetch('/api/inquiry/config', { credentials:'same-origin', cache:'no-store' });
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) return;
      config = await response.json();
    } catch (_) { return; }
    if (config?.ready !== true || typeof config.sitekey !== 'string' ||
        !/^[a-zA-Z0-9_-]{8,128}$/.test(config.sitekey)) return;
    let turnstile;
    try { turnstile = await loadTurnstile(); } catch (_) { return; }
    for (const form of forms) {
      const submit = form.querySelector('[data-inquiry-submit]');
      const slot = form.querySelector('[data-human-check]');
      if (!submit || !slot) continue;
      let token = '', sending = false, widgetId;
      widgetId = turnstile.render(slot, {
        sitekey: config.sitekey,
        callback: (value) => { token = value; submit.disabled = !value; submit.setAttribute('aria-disabled', String(!value)); },
        'expired-callback': () => { token = ''; submit.disabled = true; submit.setAttribute('aria-disabled','true'); },
        'error-callback': () => { token = ''; submit.disabled = true; submit.setAttribute('aria-disabled','true'); setStatus(form,'Human verification could not load. Try again.','error'); },
      });
      setStatus(form, 'Complete the human verification to enable sending.');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (sending || !token || !form.reportValidity()) return;
        const data = new FormData(form);
        const payload = {
          source: form.dataset.inquiryForm,
          name: String(data.get('name') || '').trim().slice(0,120),
          email: String(data.get('email') || '').trim().slice(0,254),
          company: String(data.get('company') || '').trim().slice(0,160),
          interest: String(data.get('interest') || '').trim().slice(0,80),
          message: String(data.get('message') || '').trim().slice(0,3000),
          turnstileToken: token,
        };
        sending = true;
        submit.disabled = true;
        setStatus(form, 'Sending your enquiry…');
        try {
          const response = await fetch('/api/inquiry', {
            method:'POST', credentials:'same-origin', cache:'no-store',
            headers:{'content-type':'application/json','accept':'application/json'},
            body: JSON.stringify(payload)
          });
          const result = response.headers.get('content-type')?.includes('application/json') ? await response.json() : null;
          if (!response.ok || result?.accepted !== true) throw new Error('Delivery not confirmed');
          form.reset();
          setStatus(form, 'Your enquiry was received. We will respond to your work email.', 'success');
        } catch (_) {
          setStatus(form, 'We could not confirm delivery. Please try again later.', 'error');
        } finally {
          token = '';
          sending = false;
          submit.disabled = true;
          submit.setAttribute('aria-disabled','true');
          try { turnstile.reset(widgetId); } catch (_) { /* No false ready state. */ }
        }
      });
    }
  };
  start();
})();