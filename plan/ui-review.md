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

## 27 Oct 2026 — PR #3: product-focused hero, scrolling product story afterwards
- ✅ Explicit owner design direction: **product-focused static hero** with **scroll-driven product storytelling in the next section**. Client-rejected puzzle hero removed, not recolored or reused.
- ✅ Parent-company hierarchy visible: Thync & Thryve → Solutions → ThryveMS; product uses Montserrat/Inter from PR #2.
- ✅ Static illustrative ThryveMS overview (synthetic examples labeled), headline and two clear CTAs. No fabricated live metrics or third-party media.
- ✅ Four-stage scroll story moved immediately after hero: readiness, documents, audits, corrective actions. The demo sidebar and title update with the active stage. Mobile allows tap/keyboard stage selection.
- ✅ "Real problem" follows product story with original text animation; no content lost from modules, pricing, estimator, integrations, FAQ or contact.
- ✅ Existing sticky nav (PR #2) and bottom-center scroll-to-top kept.
- ✅ Browser evidence checked: [Check run 40487486198](https://github.com/dbauto/thryvems-landingpage/actions/runs/40487486198) **success** — JavaScript syntax, static build, Playwright **11/11 passed**.
- ✅ [Screenshots](https://github.com/dbauto/thryvems-landingpage/actions/runs/40487486198/artifacts/12725682665) captured for product hero, readiness/audit scroll stages, mobile stage and 390/768/1280/1920 full layouts; visually inspected desktop hero, mobile opening and feature story.
- ✅ E2E confirms no horizontal overflow at the four prescribed widths, no leftover puzzle in rendered HTML, full pricing calculation, fixed nav and accessible reduced-motion ordering.
- ✅ No modifications to the React client app: permissions, tokens, app menu, dark mode, View as and classification checks remain untouched (application UI-GUIDELINES §10 not applicable to this marketing-only page).
- ✅ Explicit **No backend impact** assessment recorded; no new API or upload.
- ⏳ PR #2 must be approved and merged before the stacked hero PR can target main. Neither PR has owner approval to merge/deploy yet.
