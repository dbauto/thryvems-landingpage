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

## 28 Oct 2026 — PR #4: visually match scroll-story preview to approved hero

- ✅ Scope approved: **only** the sticky visual preview inside “Follow the work. See how it connects.” changed, not the hero or the four-step story structure.
- ✅ Uses the existing hero mockup’s ThryveMS browser frame, green logo/sidebar, light dashboard cards, progress/status indicators and synthetic example data.
- ✅ Readiness, Documents, Audits and Corrective actions use the same dashboard shell; scroll-based stage switching and mobile tap/keyboard selection preserved. Active route and sidebar indicator follow the stage.
- ✅ Existing product hero, company fonts, fixed navigation, copy, FAQ, pricing/calculator, backend, contact form and other sections preserved.
- ✅ Prevented panel overlays during state changes: only active preview is displayed; entrance motion is short and reduced-motion users see no animation.
- ✅ Removed premature fade of the sticky preview; added desktop scroll room for the last Actions stage; mobile selection brings the preview into view.
- ✅ [GitHub Check 40651637774](https://github.com/dbauto/thryvems-landingpage/actions/runs/40651637774) **success**: JavaScript syntax/typecheck passed, static build passed, **13/13 Chromium browser tests passed**, including pricing, four story states, mobile state selection and no horizontal overflow at **390/768/1280/1920px**.
- ✅ [Screenshot evidence](https://github.com/dbauto/thryvems-landingpage/actions/runs/40651637774/artifacts/12800555026) reviewed: desktop readiness preview, final Actions preview, mobile Actions preview, full-page responsive captures. All previews are bright, readable at their intended layout size, and clearly labeled as synthetic.
- ✅ Product-app UI guidelines §10: app/ source, nav, token palette, roles, permissions, View as, light/dark modes and classification checks untouched (no app-specific screen changed). This is a public static marketing-page refinement.
- ✅ **No backend impact** (plan/backend-impact.md): DB schemas/relationships, APIs, workflows, permissions, security, process/classification scope, integrations, events and backend tests unchanged. No backend PR. Existing backend sync remains **Pending**.
- ⏳ PR review/merge and GitHub Pages deployment require user approval. No production website changes made in this PR.


## 28 Oct 2026 — PR #5: post-problem scroll animation review

- ✅ Scoped to animations in existing public landing sections **after "The real problem"**; approved product hero, earlier readiness/documents/audits/actions scroll story, page structure, copy, brand palette and Montserrat/Inter fonts are preserved.
- ✅ Core capability cards stagger into the existing grid with gently alternating tilt and reversible scroll tracking.
- ✅ Base/Mid/Enterprise pricing cards, subscription calculator and consultancy/training cross-sell have distinct entrance motion. Pricing JavaScript SHA compared identical against main; full pricing calculator tests still passed.
- ✅ Microsoft 365 three-card illustration assembles with different layer paths; screenshot checked again after existing text reveals complete to ensure readable contrast.
- ✅ Implementation steps use a line that tracks scroll progress and readable text/arrow movement. No step names or instructions changed.
- ✅ FAQ items and final contact copy/form reveal at distinct rates; existing contact form remains explicitly preview-only and doesn't submit data.
- ✅ On mobile (<761px), tilts are removed and travel is reduced; native `prefers-reduced-motion` disables the enhancement. Visual reading is reversible on upward scroll.
- ✅ No new app menu, colors, components, data access, runtime permissions, product records, upload handlers or backend functionality. App UI-GUIDELINES §10 applies to the React QMS app, which remains untouched. The public landing matches its own existing product design.
- ✅ [Check 40712214726](https://github.com/dbauto/thryvems-landingpage/actions/runs/40712214726) **passed** typecheck, static build and all 15 Chromium browser tests, including forward/reverse scroll, mobile/reduced-motion, original calculator, fixed nav and no horizontal overflow at 390, 768, 1280 and 1920.
- ✅ [Check 40712816534](https://github.com/dbauto/thryvems-landingpage/actions/runs/40712816534) **passed** the same tests with improved end-of-reveal screenshot timing.
- ✅ [Screenshot evidence](https://github.com/dbauto/thryvems-landingpage/actions/runs/40712816534/artifacts/12826972381) visually inspected for intermediate/full modules, plan cards, Microsoft 365 stack, implementation track, closing CTA and mobile modules. Final integration and CTA captures are fully readable, with no unintended clipping.
- ✅ Verified main-branch HTML hero markup and module-grid markup unchanged; pricing JS byte-identical.
- ✅ **No backend impact** separately assessed; schemas, relationships, APIs, workflow, permissions, security, client/process classification, integrations, events and backend tests unchanged. Existing architecture sync **Pending**.
- ⏳ Owner approval still required before PR merge or live deployment. Live site has not been changed in this PR.
