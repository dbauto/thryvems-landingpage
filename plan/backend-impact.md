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
