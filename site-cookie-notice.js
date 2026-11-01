(() => {
  'use strict';
  const key = 'thync-thryve.cookie-notice.v1';
  try { if (localStorage.getItem(key) === 'acknowledged') return; } catch (_) { /* Browsers can block storage. */ }
  const banner = document.createElement('aside');
  banner.className = 'site-cookie-notice';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML = '<div><strong>Cookie notice</strong><p>We do not use optional analytics or advertising cookies. Your choice is saved on this device. Security services may use necessary cookies when active. <a href="./cookies.html">Cookie details</a></p></div><button type="button" class="site-cookie-dismiss">Got it</button>';
  banner.querySelector('button').addEventListener('click', () => {
    try { localStorage.setItem(key, 'acknowledged'); } catch (_) { /* Acknowledge for this page only. */ }
    banner.remove();
  });
  document.body.appendChild(banner);
})();