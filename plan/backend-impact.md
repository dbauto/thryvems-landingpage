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


## 1 Nov 2026 — parent company landing ISO catalog (PR #7)

**No backend impact.** The Thync & Thryve *public static homepage* now describes ISO guidance, seven training/consultancy subject categories, delivery options, company identity and the separate ThryveMS product. The enquiry button is explicitly disabled pending a separately approved and privacy-reviewed lead/booking integration.

- Database schemas, records, relationships and migrations: unchanged.
- APIs, sign-in, organization and process scope, data classifications, authorization and client isolation: unchanged.
- Backend workflows, audit events, notifications, security and integrations: unchanged; **no form submission or calendar integration added**.
- QMS product page, subscription calculator and React app: unchanged.
- Tests added only for static HTML, navigation, responsive presentation and truthful form disclosure. No backend tests or server behavior altered.
- Existing frontend/backend architecture synchronization remains **Pending**. A backend documentation PR is not needed for this static content update. Any future real booking/intake integration requires its own backend impact/privacy assessment before implementation.


## 1 Nov 2026 — company ISO service scroll-story graphics (PR #9)

**No backend impact.** The public Thync & Thryve company homepage gains a pinned four-chapter scroll explanation of the existing services, plus client-side object travel, a connector path and mild parallax/entrance motion on existing sections. All visual data is static decorative HTML/SVG and browser scroll position. The seven subject categories, training/consultancy scope, product links and disabled enquiry form are preserved.

- Database models/schemas/relationships, persistence, migrations: unchanged.
- API endpoints and backend workflows: unchanged; nothing is submitted or sent.
- Organization/client and process isolation, RBAC, information classifications, security/authentication: unchanged.
- Integrations, calendar/email/lead intake, server events, backend tests: unchanged.
- React QMS application and ThryveMS product landing: unchanged.
- A separate company Back to top change is pending in PR #8, with no merge/deployment approval inferred.
- Existing backend architecture synchronization work stays **Pending**. No backend PR is necessary for this static visual-only change.

## 1 Nov 2026 — company Back to top button (PR #8)

**No backend impact.** This change adds a bottom-centered Back to top button to the public, static Thync & Thryve company homepage, matching the product landing's appearance and scroll behavior. It uses a fixed-position styled button and browser scroll handling only, with no data submission or server calls.

- Database schemas, relationships, data storage, migrations: unchanged.
- APIs, workflows, user roles and permissions, organization/client and process access, information classification, authentication/security: unchanged.
- Integrations, backend events, server-side tests and QMS application: unchanged.
- No personal information captured. Company enquiry form remains inactive, and the ThryveMS product page and pricing are unchanged.
- Existing backend architecture synchronization remains **Pending**. No backend PR is needed for this static-only enhancement.


## 1 Nov 2026 — correct company favicon/logo (PR #10)

**No backend impact.** The Thync & Thryve public company page previously loaded the unrelated ThryveMS product PNG as its browser favicon. The change uses the plant-in-circle emblem highlighted in the owner's supplied screenshot as a 64×64 isolated favicon asset and updates only the company's `<link rel="icon">` reference. The header's original wordmark/logo and the ThryveMS product page's own favicon are intentionally preserved.

- Database schemas/relationships, client data, storage, migrations and APIs: unchanged.
- Workflows, permissions, process/client/classification checks, authentication and security: unchanged.
- Integrations, server events, booking flows, backend tests and data collection: unchanged.
- This is public static branding only. The backend architecture synchronization remains **Pending**; no backend PR needed.

## 1 Nov 2026 — company apex domain configuration for GitHub Pages (pending external DNS)
**No backend impact.** Add `CNAME` (`thyncandthryve.com`) and include it in the existing static build so GitHub Pages can recognize the proposed custom domain on the configured publishing branch. No changes to QMS schema, relationships, APIs, workflows, roles, permissions, security/access/classification or process scope, integrations, application events or backend tests. DNS/SSL is a **public website deployment configuration**, not a change to QMS app contracts. No backend PR is needed. Existing [public intake change management PR #24](https://github.com/dbauto/thryvems-backend/pull/24) remains Pending and unrelated to domain-only setup. Cloudflare's user-supplied screenshot confirms zone spelling and existing mail-only records, but the connected Cloudflare API accounts cannot access the zone. DNS changes, actual HTTPS and GitHub Pages custom-domain verification are not complete; do not mark the domain live.

## 1 Nov 2026 — public landing cookie notice only
**No backend impact.** Add an informational cookie notice to the static company and product pages, an accessible details page, local browser acknowledgement, plus static build/JS syntax/browser checks. No optional tracking, service submission, cookies used for authentication, server data, APIs, events or integrations. QMS database schemas, relationships, workflows, permissions, client/process scopes, classifications, access/security checks and backend tests remain unchanged. The planned real inquiry workflow and server-side Turnstile verification are *not* activated and remain **Pending** in [landing PR #11](https://github.com/dbauto/thryvems-landingpage/pull/11) and [backend CM PR #24](https://github.com/dbauto/thryvems-backend/pull/24); backend PR not required for this cookie-only change.

## 1 Nov 2026 — external Formspree + Turnstile guarded inquiry adapter (PR pending)
**External public-marketing backend impact: YES (pending service onboarding).** The frontend now includes a disabled-by-default public config, protected Company and ThryveMS inquiry fields, Formspree AJAX multipart endpoint and Cloudflare Turnstile token field. The external service must validate challenge tokens with the **secret only in Formspree**, enforce Formspree's domain restrictions and spam protection, and route to the owner-configured mailbox. Integration is not active, because no account, form ID, public site key, provider secret, or real inbox test has been provided or connected. The server-side implementation is provided by Formspree, not authored or deployed to the ThryveMS QMS backend.
**QMS impact: none.** No QMS database schemas, relationships, tenant organizations, process scope, information classification, APIs, internal permission/security rules, QMS workflows, or access checks changed. External events/metrics and protected submission tests are **pending** provider setup. Existing [thryvems-backend PR #24](https://github.com/dbauto/thryvems-backend/pull/24) must record this revised hosted-provider delivery option and remain **Pending** until approved/verified.

## 1 Nov 2026 — Cloudflare Worker direct inquiry plan (PR #16)
**Public backend impact: Pending.** Replace planned Formspree submission with an HTTPS Cloudflare Worker that validates bounded JSON and Turnstile server-side and uses an Email Service send binding to a verified fixed Gmail destination. **No QMS database/relationships/migrations, internal app APIs, RBAC, process scope, client isolation, classifications, auth or QMS workflows affected.** New public marketing API, outbound email integration, Turnstile verification, anti-spam controls, API and live sending tests require backend CM: [backend PR #26](https://github.com/dbauto/thryvems-backend/pull/26). Recipient created but not verified; both Cloudflare accounts have no managed `thyncandthryve.com` DNS zone, thus sender onboarding unavailable. No deployment, MX/DNS, payments, secrets or real test mails. Frontend remains disabled until delivery is proved. QMS backend sync **Pending**, not complete.

## 1 Nov 2026 — Worker preflight CORS correction (PR #17)
**Public API backend impact:** Correct the prepared Cloudflare inquiry Worker OPTIONS response to return a bodyless HTTP 204, as required by Fetch/HTTP. Browser CORS preflight otherwise throws before the protected POST can execute. Add a dedicated Worker API regression test; do not change security boundaries, allowed origins, Siteverify hostname/action, binding destination, rate limits or delivery. No QMS DB schema/relationships, internal APIs, workflows, roles/permissions, client/process scope, classifications, events, integrations or backend tests changed; public API documentation and traceability remain **Pending** in [backend PR #26](https://github.com/dbauto/thryvems-backend/pull/26). Worker un-deployed, user-facing inquiry config disabled, and destination/sender domain unavailable/unverified. No production runtime or DNS change.

## 1 Nov 2026 — FormSubmit-only email delivery provider change (stacked PR #18)

**Public marketing backend integration impact; QMS backend unchanged.** Replace the prepared Worker’s Cloudflare Email Service binding with FormSubmit AJAX on the **server side only**, called **after** existing Cloudflare Turnstile Siteverify checks pass. Source: [PR #18](https://github.com/dbauto/thryvems-landingpage/pull/18), stacked on tested preflight [PR #17](https://github.com/dbauto/thryvems-landingpage/pull/17); linked architecture CM [backend PR #26](https://github.com/dbauto/thryvems-backend/pull/26).

- **Database schemas/relationships:** none; no records persisted in QMS.
- **Public API/workflow:** existing Worker POST and strict Origin, method, max JSON payload and Turnstile hostname/action checks retained. Only downstream notification provider switches. Reject provider HTTP non-2xx, explicit failure, invalid JSON and timeouts. Recipient remains server-side runtime configuration.
- **Permissions/security:** no QMS RBAC, client organization or process access, confidentiality classification, internal login or authentication changes. Worker still fail-closed by explicit enabled flag, missing environment/secret, invalid/expired/replayed Turnstile; rate limits and live negative tests remain mandatory before activation.
- **Integrations/events:** remove Cloudflare send-email binding; add FormSubmit AJAX external notification service. One-time receiver mailbox confirmation is required. **No DNS/email sender domain change, paid plan or Cloudflare Email Sending access is required**.
- **Privacy:** FormSubmit documentation states **30-day retention**. Third-party processing, transfer and privacy notices need approval before activation.
- **Tests:** [Check 41306201511](https://github.com/dbauto/thryvems-landingpage/actions/runs/41306201511) passed Worker **12/12** unit tests (success, disabled, invalid origin/token/hostname/action, provider rejection/error/invalid recipient, CORS) and Chromium **40/40** e2e (53.2s), plus build. **Not run:** live FormSubmit deliverability/account activation, actual inbox, domain/Cloudflare Worker deployment, real provider abuse, load/rate-limit and production tests.
- **Status:** **Pending**, do not merge/deploy as live until provider activation, approved Worker secret and environment, security/privacy assessment and real Gmail receipt. The production site’s inquiry forms remain disabled.

## 2 Nov 2026 — Thync & Thryve technical/content SEO (PR #20)
**No backend impact.** This PR edits only public static HTML metadata, crawlable content, robots/sitemap/404 files, a shared branded CSS for **new** content pages, build-time copy/SEO validation, and browser tests. The existing inquiry Worker, Turnstile verification, email integration, cookies and production form enablement are **not changed**. There is no change to database schemas, table relationships, QMS APIs, process/workflow events, permissions, client isolation, confidentiality classifications, integrations, credentials, QMS backend tests or any other application backend architecture. The existing [backend CM #26](https://github.com/dbauto/thryvems-backend/pull/26) is separately merged for public inquiry delivery and is not altered by SEO work. No new backend change-management PR is necessary. The **only** integration references are inert Organization/Service/FAQ/Software/Course structured-data descriptions, with no address or phone claims pending real facts.

## 2 Nov 2026 — Phase 1 live SEO verification (PR pending)

**No QMS backend impact.** This change adds read-only live-site verification scripts, tests, CI evidence and a runbook, plus a narrowly scoped CSS containment rule on `main#top` to stop a measured 2px sideways scroll at 390px. Existing product design, navigation, pricing, motion intent, DNS, certificates, hosting, forms, APIs and data remain unchanged. Only the public marketing stylesheet is modified; no QMS or marketing backend contracts change. It sends only unauthenticated GET requests to the public company domain.

- Database schemas/relationships/migrations: unchanged.
- QMS and public inquiry APIs/workflows, roles/permissions, tenant/process scope, classification/security, authentication, integrations, backend events and tests: unchanged.
- Existing public marketing inquiry integration remains disabled. Unrelated backend change-management [PR #26](https://github.com/dbauto/thryvems-backend/pull/26) is **merged**; its pending implementation and production activation are **not changed** by this public SEO audit.
- No new backend architecture PR is necessary. Public GitHub Pages DNS and HTTPS have passed all 18 automated external checks, without access to or modifications of the Cloudflare zone. Production publication of this CSS fix still requires owner approval.

## 2 Nov 2026 — SEO Phase 2 Google discovery/indexing readiness (proposed PR)

**No backend impact.** This PR adds static source-level discovery checks, deterministic indexing-evidence validation, a publicly safe Google Search Console owner runbook, a metric acceptance table and CI reports. It does **not** activate a Google API integration, collect visitor data, enable tracking cookies, store Google verification TXT tokens, add production endpoints or change live inquiry handling.

- Schemas/relationships/migrations, QMS and marketing APIs, operations, workflow rules and events: **unchanged**.
- QMS client isolation, roles/permissions, process scope, confidential classifications, security boundaries: **unchanged**.
- External integrations: **no new integration**; Search Console setup is a documented owner-only step, not an automated connected account or API call.
- Existing backend CM PR #26 is merged; any unimplemented marketing intake work remains independently **Pending**. No linked backend architecture PR is needed for this read-only SEO QA effort.

## 2 Nov 2026 — Phase 3 ISO commercial SEO (PR proposed)

**No backend impact.** Changes are static text paragraphs inside four existing, already-public ISO landing pages, a source-controlled keyword intent map, CI-only checks, unit tests, and acceptance documentation. Existing page URLs, six-item navigation, branding, CSS, fonts, responsive components, forms, data collection, cookies, worker deployment, authentication and privacy controls are unchanged.

- Database schemas and relationships: unchanged.
- QMS/marketing APIs, workflows, permissions, tenant and process scope, classifications, security and events: unchanged.
- Integrations and backend tests: unchanged; linking to ISO's public news page is an ordinary hyperlink, not an integration.
- Existing backend architecture repository PRs #12, #27 and #28 represent separate pending implementation/synchronization work; this static text change does not resolve or modify them.
- No backend change-management PR is necessary. Editorial verification of actual commercial offerings, credentials, service areas and public contacts remains pending owner confirmation and must not be invented.

## 2 Nov 2026 — Phase 3 post-merge live proof (verification PR)

**No backend impact.** This is a read-only verification harness, its 3 deterministic unit tests, one non-blocking GitHub Actions production probe, release report and progress entry. It adds no public website content or UI, no user data collection and no new integration credentials. Production probes request only 4 public HTTPS URLs.

- Database schemas and relationships, APIs and business workflows: unchanged.
- Tenant/process scope, classification, role permissions, security and authentication: unchanged.
- Integration endpoints, events, backend queues and backend tests: unchanged.
- No backend change-management PR required; unrelated R1 backend PRs #12, #27 and #28 remain pending independently.

## 2 Nov 2026 — Phase 2 connected Google Search Console readout

**No backend impact.** This change records read-only Google Search Console reporting access and an acceptance-status update in project documents. It does not use Google Search Console write APIs, submit sitemaps, add OAuth credentials to code, install analytics tags, or alter website source, cookies, forms or hosting.

- Database schemas and relationships: unchanged.
- APIs, workflows, permissions, tenant/process/classification isolation, security, integrations and events: no **implementation** or contract changes; a connected reporting account is an external user authorization, not a backend service integration.
- Backend tests and infrastructure: unchanged; no new backend PR. Existing backend R1 change-management PRs #12, #27, #28 remain independently pending.

## 2 Nov 2026 — Phase 2 Google sitemap submission evidence (documentation only)

**No backend impact.** The user submitted an already published static sitemap through the Google Search Console UI; this PR documents the submission and updates an indexing evidence manifest. It introduces **no source-code, public site, DNS, API, database or authentication changes**. It does not create or alter Search Console credentials, tracking, event delivery or submission code.

- Database schemas/relationships and application APIs/workflows: unchanged.
- Tenant isolation, role permissions, process scope, document classifications and security: unchanged.
- Integrations/events/tests: unchanged; the existing externally connected reporting account only read public sitemap metrics.
- Backend architecture PRs #12, #27, #28 remain pending and unrelated. No new backend PR needed.
