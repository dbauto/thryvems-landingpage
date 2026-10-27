# ThryveMS landing redesign — UI review

27 Oct 2026 · [PR #1](https://github.com/dbauto/thryvems-landingpage/pull/1)

## Design review
- ✅ Owner explicitly requested adaptation of the iQMS landing theme and authorized a redesign of this **public product landing page**.
- ✅ ThryveMS product name and official SVG wordmark; links back to Thync & Thryve company page.
- ✅ Base, Mid, Enterprise business content preserved and the pricing calculator works with its existing source amounts/formulas.
- ✅ Scroll-led assembly, centered puzzle hold, centered problem statement hold, bottom-center back-to-top and reduced-motion support.
- ✅ Responsive layouts: 390, 768, 1280, 1920px validated in Chromium with no horizontal scroll.
- ✅ Screenshot evidence inspected: hero, centered puzzle, centered problem statement, pricing / calculator and 390px mobile opening.
- ✅ No new application routes, roles, permissions, data operations, or database access.
- ✅ App UI guidelines §10 not altered: `app/src`, its menu, tokens, wording, light/dark appearance and View as behavior remain unchanged in the separate application repository. These app-only checks are not applicable to this public, static landing page.
- ✅ UI copy uses **ThryveMS**; the page has no iQMS/2015 or hidden-count wording.
- ✅ Contact form explicitly says it is a preview and does not send or store leads.

## Verification evidence
- [Check run 40474406632](https://github.com/dbauto/thryvems-landingpage/actions/runs/40474406632): typecheck **passed**, build **passed**, Playwright **8/8 passed** on the code+README head.
- [Screenshots (GitHub artifact)](https://github.com/dbauto/thryvems-landingpage/actions/runs/40474406632/artifacts/12719204569): `landing-390.png`, `landing-768.png`, `landing-1280.png`, `landing-1920.png`, `puzzle-held-desktop.png`, `problem-held-desktop.png`.

## Not verified
- Live GitHub Pages is not changed or tested; merge and deployment require the owner's explicit approval.
- The contact form has no external intake endpoint or user-data submission. Integration requires its own security/privacy review.
- Plan prices and features are retained as provided in the original page; this design PR does not verify fulfillment or launch readiness of the products.

## 27 Oct 2026 — PR #2: fixed navigation and Thync & Thryve fonts
- ✅ The public ThryveMS page navigation is fixed in the same position on desktop and mobile while scrolling.
- ✅ Menu links and company-home relationship remain unchanged; mobile menu still opens and closes.
- ✅ Matched the parent website’s confirmed font families: Montserrat headings/navigation, Inter body.
- ✅ Existing hero, animations, module sections, pricing calculator, contact form, product mark and colors retained. Hero replacement is intentionally **Pending client design approval**.
- ✅ Typecheck, build, Playwright **9/9 passed**: [Check run 40482362462](https://github.com/dbauto/thryvems-landingpage/actions/runs/40482362462).
- ✅ Screenshots inspected: [desktop/mobile navbar evidence](https://github.com/dbauto/thryvems-landingpage/actions/runs/40482314750/artifacts/12723512120); no visible clipping or horizontal overflow.
- ✅ Main React QMS app untouched; its UI-GUIDELINES §10 app-only permission, token, dark/light and View as checks are not applicable to this static marketing page.
- ✅ Backend impact recorded separately as **No backend impact**, no backend PR.
- ⏳ The client-approved replacement hero, PR merge and live deployment are not done.
