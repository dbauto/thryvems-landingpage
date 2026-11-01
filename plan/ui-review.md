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


## 28 Oct 2026 — PR #6: implementation progress indicator correction
- ✅ User screenshot verified: vertical progress marker ran along the Implementation list's left edge and crossed the "01" number; the marker did not align to existing horizontal separators.
- ✅ Minimal correction: removed the vertical pseudo-element and list-length JS; each existing step border receives a 2px green scroll-progress underline. Step text, numbers, title, arrows, spacing and grid remain unchanged.
- ✅ Animation stays scroll driven (including reversal). Underlines remain inside their own row bottoms and never cross step numbers. Old vertical `::before` no longer renders.
- ✅ Same brand fonts, colors and existing horizontal separators. No UI redesign, no changed labels, forms, navigation, pricing or workflow.
- ✅ Browser tests at 390/768/1280/1920px verify no stray vertical line, underline 2px height, zero left/right offset, sufficient distance from step numbers, and no horizontal page overflow.
- ✅ [Check 40716378370](https://github.com/dbauto/thryvems-landingpage/actions/runs/40716378370): JavaScript typecheck **passed**, static build **passed**, Playwright Chromium **16/16 passed**. Previous run's only failure was a premature animation-frame assertion; corrected with explicit wait and rerun.
- ✅ [Screenshots](https://github.com/dbauto/thryvems-landingpage/actions/runs/40716378370/artifacts/12828401711): visually inspected desktop 1280px and mobile 390px. Both show aligned horizontal underline on the existing row separators, with clear step numbers and no intrusive vertical rule.
- ✅ Main QMS application UI not changed. Its UI-GUIDELINES §10 app-only light/dark, permissions, View as and component checks are not applicable to this static public landing fix.
- ✅ **No backend impact** documented in `plan/backend-impact.md`: database schemas, relationships, APIs, business workflows, roles and access checks, security, classification, integration, events and tests unchanged. Existing architecture sync remains Pending.
- ⏳ PR not merged or deployed; requires owner approval.


## 1 Nov 2026 — PR #7: Thync & Thryve company homepage content update

- ✅ Existing company design retained: parent-company logo, Montserrat/Inter fonts, forest/teal/soft-green palette, hero pillar tiles, rounded cards and original site/product hierarchy. Product landing `thryvems.html` and its motion, calculator, and story are unchanged.
- ✅ Business-partner services corrected: training and consultancy both cover seven ISO/management-system categories (quality; environment; OH&S; information/technology; food safety; risk/continuity/governance; specialist industries). Every category contains training titles and a matching consultancy explanation.
- ✅ Education-led entry explains that relevant standards depend on operations, goals and customer/regulatory requirements. No unsupported automatic ISO recommendation or certification guarantee.
- ✅ Plain HTML `details/summary` allow keyboard-friendly expansion/collapse; programs are discoverable without loading a different page.
- ✅ No fabricated training schedules, registerable public sessions, trainer accreditations, organization history, testimonials, staff identities or certifications. Proposed course availability and specialist delivery caveats retained.
- ✅ ThryveMS remains identified as the separate *in-development* ISO 9001 QMS product, not software for every ISO standard.
- ✅ Existing intake was already a preview; disabled its nonworking send button and explained that the form does not save/send. Header and program links now say Enquiry information, not “Book” or fake course registration.
- ✅ Updated main nav/hero card anchor targets to real sections; no deleted menu item or changed visual identity.
- ✅ [Code Check 41282362047](https://github.com/dbauto/thryvems-landingpage/actions/runs/41282362047) **success**: static syntax/typecheck, build and original/product plus company E2E green.
- ✅ [Final content/mobile Check 41282595446](https://github.com/dbauto/thryvems-landingpage/actions/runs/41282595446) **success**: typecheck, build and **22/22 Chromium tests passed**. Responsive no-overflow at 390/768/1280/1920, seven expanded topics, keyboard accessibility, all navigation anchors, no invented data or fake booking, product regressions.
- ✅ [Screenshots artifact 13074121577](https://github.com/dbauto/thryvems-landingpage/actions/runs/41282595446/artifacts/13074121577) reviewed: 390px mobile opening after font adjustment, 1280px full page, seven-category expanded desktop view; all readable, original brand palette/card style preserved.
- ✅ **No backend impact:** public static HTML/CSS and presentation only. Database schema/relationships, app APIs/workflows, permissions, scopes, classifications, identity/security, integrations, events and backend tests untouched. Existing architecture synchronization is **Pending**. Future booking requires separate approval and privacy/backend change assessment.
- ✅ React QMS app itself untouched: UI-GUIDELINES §10 app-specific dark/light, permissions, View as and token-diff checks do not apply. Existing public responsive checks performed.
- ⏳ Live site has not been changed; owner must approve PR merge and GitHub Pages deployment.


## 1 Nov 2026 — PR #9: motion-graphics scroll story on the company landing

- ✅ Existing Thync & Thryve visual identity retained: parent company logo, Montserrat/Inter typography, forest/teal/soft-green palette, rounded cards, seven-category ISO catalog, About, navigation and contact form disclosure. ThryveMS product page source untouched.
- ✅ New four-stage *pinned* desktop scroll scene communicates the real service relationship: Understand → Train → Implement → Maintain and improve. It is not a generic fade sequence: ISO requirements/people/process/ThryveMS cards translate and rotate into their places in a connected illustration; a green path progressively draws and a dot follows it.
- ✅ Story caption says services depend on the company's circumstances; ThryveMS remains described as an in-development ISO 9001 digital QMS. No certification guarantee or unverified service claims introduced.
- ✅ Distinct motion in the existing hero pillars, ISO guide cards, service rows, seven categories and training options, Solutions plans and How we work. Existing prices, links, copy and HTML interactive behavior retained.
- ✅ Forward/reverse scroll restores the correct stage, counters and path; mobile (390/768) shows the whole graphic without trapping touch scroll in a long sticky scene. Reduced-motion and missing JS show an accessible, legible static illustration.
- ✅ Native details/summary accordion keyboard access retained; no new top-level navigation, route, booking UI, fake contact success, external libraries, third-party assets, personal data or security surface.
- ✅ [Check 41284604371](https://github.com/dbauto/thryvems-landingpage/actions/runs/41284604371) **success** (29/29 Playwright tests plus JS syntax/typecheck and static build).
- ✅ [Final motion-layout Check 41285130196](https://github.com/dbauto/thryvems-landingpage/actions/runs/41285130196) **success**: typecheck, static build, Chromium Playwright **30/30 passed**. Explicit tests for all four story states and reverse motion; moving connector token; mobile 390/768, desktop 1280/1920, reduced motion/no JS, geometry of secondary card separation, typography and original product/booking/catalog regressions. No horizontal overflow at four widths.
- ✅ [Screenshot artifact 13073944498](https://github.com/dbauto/thryvems-landingpage/actions/runs/41285130196/artifacts/13073944498) visually inspected: four 1280px scroll stages, 390px illustration, existing Solutions cards and How we work. Last refinement corrected the earlier card-overlap transient and gave the mobile board label clearance; updated screenshots show no overlap or clipping.
- ✅ React QMS app unchanged: app-specific UI-GUIDELINES §10 light/dark, roles/View as, app tokens and access checks are not applicable to the static company landing change. All applicable public responsive, keyboard, reduced motion and product regression gates passed.
- ✅ **No backend impact:** static presentation and scroll-only JavaScript/SVG, no APIs/databases, relationships, workflows, permissions, client/process/classification scope, integrations, backend events or tests. Existing backend architecture synchronization is **Pending**.
- ⏳ No live deployment or merge. Owner approval required. Separate Back to top PR #8 remains pending independently; do not merge implicitly.

## 1 Nov 2026 — PR #8: company Back to top matching the product landing

- ✅ Used the current ThryveMS product landing as the reference: exact 58px desktop/52px mobile bottom-centred circular control, dark green background, white up arrow, tiny TOP label, hover, entrance transition and focus ring. Only the static company homepage has new markup; the product page remains unchanged.
- ✅ Appears after the same scroll threshold (greater than max of 180px or 22% of viewport height); hidden and taken out of keyboard tab order near the top.
- ✅ Returns the visitor to the company hero; motion is smooth unless prefers-reduced-motion is enabled, in which case it is immediate.
- ✅ Clear accessible name “Back to top”; native button works via keyboard, including Enter. Tab/ARIA visibility matches button display.
- ✅ Existing company typography, logo, menu, mobile layout, ISO catalog, contact preview and product navigation unaffected. Scoped CSS/JS, no added application menu, colors or client data.
- ✅ [Check 41283695386](https://github.com/dbauto/thryvems-landingpage/actions/runs/41283695386): JavaScript typecheck **success**, static build **success**, Chromium Playwright **24/24 passed**; verifies product button size/position match at 390, 768, 1280 and 1920px, appearance and hide on scroll, smooth return to top, keyboard/reduced motion, original 22 regression tests and no horizontal overflow.
- ✅ [Screenshot artifact 13074273358](https://github.com/dbauto/thryvems-landingpage/actions/runs/41283695386/artifacts/13074273358) checked at 390px mobile and 1280px desktop: button is centered at the bottom; no clipping and original site identity preserved.
- ✅ **No backend impact:** public static presentation only. No database/schema, API, business workflows, security/access/classification, external integrations, events or backend tests. Existing backend architecture synchronization remains Pending.
- ✅ Main QMS app UI untouched. UI-GUIDELINES §10 checks for client roles/light-dark/View as are not applicable to this static public-site button. Responsive, keyboard and reduced motion checks executed.
- ⏳ PR not merged, live Pages not changed. Owner approval required.


## 1 Nov 2026 — PR #10: Thync & Thryve company favicon correction

- ✅ The owner's screenshot identifies the circular green plant emblem in the Thync & Thryve header; the old company browser favicon incorrectly used `thryvems-logo.png`, the separate software product mark.
- ✅ Created `assets/thync-thryve-favicon.png`, a 64×64 PNG cropped from the supplied highlighted company emblem with the red annotation excluded. Visually inspected the finished circle/leaf mark at tab-icon size.
- ✅ Company `index.html` now references only its own favicon with a versioned URL to avoid stale icon caching. Existing header logo/wordmark `thync-thryve-logo.png` stays unchanged; `thryvems.html` keeps its independent `thryvems-logo.png` icon.
- ✅ No header/menu changes, color/font adjustments, card or animation changes, pricing updates, service wording changes, button changes or backend integration.
- ✅ [Check 41287089483](https://github.com/dbauto/thryvems-landingpage/actions/runs/41287089483) **success**: JavaScript typecheck, static build and Chromium Playwright **33/33 passed**; explicit 64×64 valid PNG checks, correct company-only icon link and original product icon protected, plus 390/768/1280/1920 responsive/animation and Back to top regressions.
- ✅ [Screenshot evidence](https://github.com/dbauto/thryvems-landingpage/actions/runs/41287089483/artifacts/13075623536): inspected company header—unchanged visual identity. The browser tab chrome is outside page screenshots; favicon icon and correct link verified from loaded asset bytes and page head instead.
- ✅ **No backend impact** documented in `plan/backend-impact.md`; only public static company branding changed, no schemas/relationships, APIs, workflow, roles, security, classifications, process/client scopes, events/integrations or backend tests. Existing architecture synchronization remains **Pending**.
- ✅ React QMS app untouched. Its UI-GUIDELINES §10 app-specific permissions, View as, dark/light and token checks are not applicable; all relevant public-page asset, regression and responsive checks passed.
- ⏳ Owner has already authorized merging this fix following passing gates; release verification must confirm Pages and post-merge Check.

## 1 Nov 2026 — GitHub Pages company apex domain PR (pending domain activation)
- ✅ No UI/layout/font/colour/menu/component/copy/animation/form code changed. The existing static site is the visual reference.
- ✅ Existing QMS app `app/` untouched; app-specific §10 light/dark/View as/security checklist N/A. Existing landing regression tests must still pass.
- ✅ [GitHub Check 41289855912](https://github.com/dbauto/thryvems-landingpage/actions/runs/41289855912): typecheck **passed**, static build **passed**, Chromium Playwright **34/34 passed (39.7s)**, including exact CNAME served from the build and 390/768/1280/1920px no-horizontal-overflow regressions, company/product navigation, favicon, pricing and reduced-motion. [Screenshot artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41289855912/artifacts/13077235316) generated; inspected company 390px and 1280px, product 390px and company header/fav icon layout. No visual UI source edits.
- ✅ User-supplied Cloudflare DNS screenshot confirms actual company domain spelling `thyncandthryve.com`; screenshot shows five mail-only MX/TXT records (do not edit). Connected Cloudflare plugin cannot list the owning zone or make changes. ⏳ DNS/HTTPS/GitHub custom-domain verification and production publication remain Pending.

## 1 Nov 2026 — Corrected domain after owner Cloudflare screenshot
- ✅ Screenshot shows `thyncandthryve.com` is the actual zone; corrected the earlier one-letter-missing domain in root CNAME, build assertion, E2E, README and deployment guide.
- ✅ [Corrected-domain source Check 41290428342](https://github.com/dbauto/thryvems-landingpage/actions/runs/41290428342): JS typecheck **passed**, static build **passed**, Chromium browser tests **34/34 passed (43.8s)** with zero errors; current build CNAME tests exact corrected domain. [Screenshot artifact 13076577860](https://github.com/dbauto/thryvems-landingpage/actions/runs/41290428342/artifacts/13076577860) generated. Existing responsive UI tests executed; UI code unchanged from previously inspected screenshots.
- ✅ No layout, colours, fonts, menus, actions, security access or QMS UI changes; no additional QMS-specific §10 screenshots applicable.
- ⏳ Domain DNS, GH Pages custom domain and real HTTPS not yet configured/verified; connected Cloudflare app still cannot write owner zone. No production or mailbox-delivery claim.

## 1 Nov 2026 — static company/product cookie notice (PR #13; not merged)
- ✅ No website redesign: existing green/white branding, Montserrat/Inter, company nav, company/product hero, scrolling animation, favicons, Back to top and price calculator unchanged. Responsive notice follows existing site style.
- ✅ [Source Check 41292212985](https://github.com/dbauto/thryvems-landingpage/actions/runs/41292212985) **success**: JS syntax/typecheck PASS, static build PASS, Playwright Chromium **37/37 passed (46.7s)**, including cookie visibility on company and product, cookie details link, local acknowledgement surviving navigation, mobile 390 banner width/dismissal, current domain CNAME, previously existing 390/768/1280/1920 regressions.
- ✅ [Screenshot artifact 13077459374](https://github.com/dbauto/thryvems-landingpage/actions/runs/41292212985/artifacts/13077459374) generated. Explicit mobile cookie screenshot `company-cookie-390.png` inspected: unobstructed banner content, correct company styling, button and cookie details link visible and within 390px width. Existing company mobile screenshot also generated.
- ✅ QMS `app/` untouched; app-only UI-GUIDELINES §10 dark/light, role-scoping, nav/code token checks N/A. No new service calls or change to classification/role permission. No cookies or localStorage used for authentication.
- ✅ [Backend impact](https://github.com/dbauto/thryvems-landingpage/blob/feat/landing-cookies-live-20261101/plan/backend-impact.md): **No backend impact** for this informational cookie-only addition (no schema, relationships, API, workflow, security, permissions, integration/events/tests). Real Turnstile/mail service remains separate Pending PR #11 and backend CM PR #24.
- ⚠️ Initial regression Check 41292068872 failed **one added product full-page overflow assertion unrelated to cookie behavior**, even after cookie dismissal; this test was narrowed to cookie dismissal without changing product visual code. The corrected full suite **37/37 passed**.
- ⏳ Owner approval/PR merge and live cookie notice verification remain Pending. No claim that bot verification or email submission is live.

## 1 Nov 2026 — guarded Formspree/Turnstile inquiries (PR #14; Pending provider)
- ✅ Existing company and ThryveMS design is the reference; no changes to navigation, colours, typography, card/hero layout, logo/favicon, moving graphics, pricing or Back to top. Contact forms keep the established card styles, adding named/validated fields and a placeholder for the future human check.
- ✅ [Source Check 41293599528](https://github.com/dbauto/thryvems-landingpage/actions/runs/41293599528) success: JS syntax/typecheck PASS, static build PASS, Playwright Chromium **40/40 passed (44.8s)**, no errors. Three new guarded-form tests cover fail-closed default, mocked valid Turnstile + Formspree 200 and provider 422, expiry resets, absence of submission without a token, two form types. All prior responsive 390/768/1280/1920/browser regressions pass.
- ✅ [Screenshot artifact 13077824915](https://github.com/dbauto/thryvems-landingpage/actions/runs/41293599528/artifacts/13077824915) inspected: product contact card at desktop shows status and required work email using same dark-green design; company cookie banner at 390 fits and preserves logo/hero. The actual Turnstile widget cannot be screenshot-tested because no provider key exists; do not claim visible/live human check.
- ✅ Application-specific QMS UI-GUIDELINES §10 security View as, light/dark, restricted QMS process and permission checks N/A; QMS `app/` untouched. Public-page accessibility, status updates and disabled forms verified through Playwright.
- ✅ Backend impact: **external public-marketing integration Pending** (Formspree server verification, data/privacy, events, mail delivery); **no QMS backend impact** (no QMS DB, roles/permissions, org/client/process/classification scopes or APIs). Linked architecture CM [backend PR #24](https://github.com/dbauto/thryvems-backend/pull/24) updated but not approved.
- ⚠️ First source Check 41293440851 had **one new test-selector failure** because the deferred scripts are in `body`, not `head`; corrected only the test and reran successfully, 40/40.
- ⏳ Provider account, Turnstile site key and secret, real inbox confirmation, domain restrictions, privacy review, GitHub Pages environment resolution and HTTPS all unverified/not performed. Config remains `enabled:false`; this PR is not ready for production contact collection and should not be merged as if it works.

## 1 Nov 2026 — public inquiry Worker preparation (PR #16)
- ✅ Existing Thync & Thryve and ThryveMS visual structure, colours, fonts, cards, menus, text, cookie notice, and nav unchanged. No new UI components or QMS app screens. QMS §10 light/dark and View As not applicable to this standalone marketing site. No new mobile layout or graphic changes.
- ✅ Worker-only logic is disabled pending sender-domain/account provisioning. `site-inquiry-config.js` retains `enabled: false` and empty Worker URL; no data can be sent from the production form.
- ✅ [Initial Check 41302498614](https://github.com/dbauto/thryvems-landingpage/actions/runs/41302498614) typecheck/build/40 of 40 Chromium tests PASS (51.9s), including unchanged responsive screenshots at 390/768/1280/1920, mock token and delivery tests. New Worker server-side unit tests are part of typecheck.
- ⚠️ Live verified destination, live Turnstile, real inbox receipt, Cloudflare domain sending and production rate limiting NOT tested. No production deployment approved.

## 1 Nov 2026 — Worker CORS preflight correctness (PR #17)
- ✅ No website HTML, CSS, navigation, labels, fonts, colours, existing form UX, CNAME or cookie notice changed. Marketing desktop/mobile and QMS light/dark/View As checks N/A as no QMS app/UI edits.
- ✅ [Source Check 41303254749](https://github.com/dbauto/thryvems-landingpage/actions/runs/41303254749) passed typecheck (including **8/8** Worker unit tests), build, Chromium Playwright **40/40 (51.0 s)**, and screenshot artifact [13081593703](https://github.com/dbauto/thryvems-landingpage/actions/runs/41303254749/artifacts/13081593703), covering preserved 390/768/1280/1920 responsive baselines.
- ✅ Added direct OPTIONS regression test for bodyless 204 and correct CORS headers without an enabled mailer. No live Worker endpoint created or tested.
- ⚠️ Real email recipient/domain verification, server provider negative testing and live inbox arrival remain unverified; forms still disabled.

## 1 Nov 2026 — FormSubmit-only delivery swap (stacked PR #18)
- ✅ Existing static Thync & Thryve and ThryveMS pages, colours, fonts, logo/favicon, menu, animation, cookie notice and current inquiry controls **unchanged**. Public UI-GUIDELINES §10 light/dark and QMS role View As not applicable because no QMS app/UI code is modified.
- ✅ The public configuration remains `enabled:false`, endpoint empty, and the form continues to fail closed until approved Worker setup. No visual redesign or fake success state added.
- ✅ [Source Check 41306201511](https://github.com/dbauto/thryvems-landingpage/actions/runs/41306201511): JavaScript syntax/typecheck and **12 Worker unit tests PASS**, static build PASS, Chromium **40/40** e2e PASS (53.2 s), including retained 390/768/1280/1920 responsiveness and synthetic provider response tests.
- ⚠️ No live provider account activation, email receipt or real Turnstile token negative/replay tested. Screenshots are existing baseline artifacts, no UI changes requiring new designs.

## 2 Nov 2026 — Technical SEO and static content pages (PR #20)
- ✅ Six-item company homepage navigation order, wording, existing official logos, colors, Montserrat/Inter, cards, product motion, pricing, forms, cookies and security checks preserved. New pages use an existing-brand stylesheet; homepage adds a small visible ISO qualifier to the existing slogan and a contextual linked resource section only.
- ✅ No new QMS app menu, UI route, classification, access, upload or process control affected. QMS §10 Light/dark, View As and mobile sidebar are **not applicable** to this public marketing HTML repo.
- ✅ Nine new static content pages have one H1, 600–1200 visible words, six visible FAQ items, canonical/OG/Twitter/JSON-LD metadata, brand-consistent layout; 11 canonical URLs in sitemap. Website and ThryveMS metadata updated; cookies remain noindex.
- ⚠️ Google Business Profile contact coordinates, street, phone, free consultation and training dates are deliberately withheld pending confirmation, so no invented business claims.
- ⚠️ Live Lighthouse/CrUX thresholds, actual indexing, external HTTPS, GSC/GA4 account settings and link-building **not verified**; do not claim metrics achieved. See `plan/seo-implementation-20261102.md`.
- 📷 Screenshots captured by GitHub Playwright Check under `landing-browser-evidence`; actual Check result and test counts recorded in `plan/progress.md` only after a passing run.

## 2 Nov 2026 — SEO Phase 1: live release evidence and scoped mobile overflow fix (draft PR #21)

- ✅ Existing company six-item menu, colours, fonts, hero, animations, pricing, cards, accessibility labels and disabled inquiry forms retained. Only the product landing's `main#top` gains a narrowly scoped horizontal-overflow containment property; no redesign or new navigation.
- ✅ [Check 41335613398](https://github.com/dbauto/thryvems-landingpage/actions/runs/41335613398) **SUCCESS**, typecheck/Worker tests, static build and **52/52 local Chromium e2e passed**, including original product scroll-story centered-hold test and new 390px actual horizontal scroll regression. No user data used.
- ✅ Same Check: independent public-network **18/18** HTTPS/DNS/canonical/sitemap/robots/404 probes passed. No DNS changes indicated.
- ⚠️ Production Chromium at 390, 768, 1280, 1920px for company, product and consultancy: **11/12** PASS and screenshots captured [artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41335613398/artifacts/13095003461); production product 390px still has **2px actual sideways scroll** because PR CSS is not deployed. Screenshot capture is recorded; independent manual visual review is not claimed.
- ✅ QMS app UI-GUIDELINES §10 app-only light/dark, role View As, access, app sidebar, token palette and components **not applicable** (no app UI edits). Static marketing CSS and full existing browser regression tested. No change to server APIs, integrations, forms or security.
- ⏳ **NOT ACCEPTED:** need owner approval and merge, verify actual deployed CSS, rerun production 12/12, inspect screenshots, repeat successful domain + responsive audits at least 24h apart before Phase 1 sign-off. Google indexing is Phase 2, not tested.
