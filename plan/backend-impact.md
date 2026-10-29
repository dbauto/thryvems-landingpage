# ThryveMS public landing page impact assessment

27 Oct 2026 — design/thryvems-immersive-landing-20261027

**No backend impact.** This change replaces only the public static product landing page presentation.
- Database schemas and relationships: unchanged.
- APIs, access/permissions, process scope and classifications: unchanged; no requests to the app backend.
- Backend workflows, security, integrations, events and backend tests: unchanged.
- Existing subscription calculator amounts and annual discount: preserved (client-side presentation only).
- Contact: existing preview form remains unconnected; no lead submission, storage or new API.
- Frontend application (dbauto/afdhlskdfs-iqms-preview): no application code changed.
- Existing backend architecture synchronization PRs remain **Pending**; this PR does not change their status.

## 27 Oct 2026 — fixed navbar and parent brand typography (PR #2)

**No backend impact.** The ThryveMS public product landing page navigation is fixed to the viewport and its typography aligned with the existing Thync & Thryve parent website: Montserrat headings/navigation, Inter body. No changes to page content, pricing calculations, product application or data submission.

- Database schemas/relationships: no change.
- APIs, workflows, permissions, process scope, classifications, security, integrations, events and backend tests: no change.
- Contact remains an unconnected preview.
- Existing app and backend synchronization items remain **Pending**, without claiming completion.

## 27 Oct 2026 — product-focused hero + scroll story after hero (PR #3)

**No backend impact.** The hero of the static public ThryveMS landing is replaced with a product-focused introduction and synthetic dashboard illustration; the existing four-step UI narrative is moved directly after the hero. Pricing simulator, preview-only contact form, company navigation, and app functionality are unchanged.

- Database schemas, relationships and records: no change.
- APIs, app workflows, permissions, access rules, process scope, classifications and security: no change.
- Backend integrations, events, and tests: no change.
- This public page does not connect to the ThryveMS app backend, and the illustrative dashboard is explicitly synthetic.
- Backend architecture synchronization items already pending in the backend repository remain **Pending**; no backend PR is necessary for this UI-only marketing change.

## 28 Oct 2026 — scroll-story visual alignment with the existing hero (PR #4)

**No backend impact.** This change is restricted to the public static landing-page's scroll-story preview. It reuses the hero's illustrated browser frame, sidebar and dashboard card patterns for its four existing feature states, while retaining the existing scroll triggers, mobile selection and user-facing product story. All numbers, names and examples in the preview are synthetic.

- Database schemas and relationships: unchanged.
- APIs, workflows, permissions, access/security, client and process isolation, classification checks: unchanged.
- Integrations, events and backend tests: unchanged.
- Subscription calculator, contact submission behavior, authentication and app UI: unchanged.
- Existing backend architecture synchronization items remain **Pending**. There is no new backend implementation or backend documentation PR required.


## 28 Oct 2026 — rich motion after "The real problem" (PR #5)

**No backend impact.** Added a dedicated scroll-position animation layer to the existing public ThryveMS marketing site. The module cards, existing three pricing tiers and calculator presentation, Microsoft 365 diagram, four implementation steps, FAQ list and closing contact scene respond to scrolling. No content, records or business operations have changed.

- Database schemas, relationships, persistence, API calls: unchanged.
- Workflows, roles, permission checks, client/process isolation, classifications, access/security: unchanged.
- Integrations, event handling and backend tests: unchanged.
- Prices, user limits, calculator arithmetic, contact form behavior and sign-in: unchanged.
- No app code was changed. Existing architecture synchronization work stays **Pending**; a backend PR is unnecessary for static animations.

## 28 Oct 2026 — implementation progress-line correction (PR #6)

**No backend impact.** The public ThryveMS marketing site had a floating vertical scroll-progress pseudo-element that overlapped the Implementation step numbers. PR #6 replaces it with a progress underline along each existing row divider, removes the obsolete list-height calculation, and keeps all content, behavior, application links, pricing, and form handling unchanged.

- Database schemas/relationships, APIs and persistence: unchanged.
- Backend workflows, permissions, client/process scope, classifications and security: unchanged.
- Integrations, events, backend tests, and identity/auth: unchanged.
- No real user data; all examples remain synthetic.
- No backend PR required. Existing backend architecture synchronization remains **Pending**.
