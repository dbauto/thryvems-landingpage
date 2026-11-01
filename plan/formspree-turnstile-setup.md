# Secure public enquiry setup — Formspree + Cloudflare Turnstile

**Status:** Pending external service setup, owner approval, staging and real-mail verification. This document does **not** claim the forms work. The default public config is disabled.

## Architecture and scope
- Preserve the existing GitHub Pages static deployment on `thyncandthryve.com`, its UI and the separate company/product forms.
- Both forms use **one** Formspree form ID; each submission includes `source=company` or `source=thryvems`, validated input fields and `cf-turnstile-response`.
- Formspree is the receiving service and **must** verify the Turnstile token with its configured secret before accepting. No same-origin GitHub Pages endpoint exists.
- Only a public Formspree form ID and Turnstile **site key** belong in `site-inquiry-config.js`. **Never paste the Turnstile secret or any API token or mailbox password into GitHub or this chat.** The recipient business mailbox is set directly in the provider dashboard, not exposed in the site.
- This is a marketing website. No ThryveMS QMS client records, database, authentication, classification, roles or process scopes are accessed.

## Owner actions needed in provider dashboards
1. **Formspree:** sign in at https://formspree.io and create one form named *Thync & Thryve inquiries*. Set the existing designated business Gmail inbox as the notification destination. Complete any ownership confirmation Formspree itself requests and turn notifications on. In form settings, restrict to `thyncandthryve.com` and `www.thyncandthryve.com` if available, and enable spam/rate limiting.
2. **Cloudflare:** open https://dash.cloudflare.com → Turnstile on the **owning** account and create a *Managed* widget for `thyncandthryve.com` and `www.thyncandthryve.com` (add a separate test hostname only if staging). It may show a checkbox when it needs a challenge. Copy the **public site key** for the website. Do not send the secret through ChatGPT.
3. In **Formspree → form settings → CAPTCHA**, enable Cloudflare Turnstile and enter the **secret key there only**. Do not enable a browser-only checkbox without Formspree server verification. Reference: https://help.formspree.io/articles/form-and-project-settings/protecting-your-forms-with-cloudflare-turnstile
4. Record the **Formspree form ID** (the `XXXXXXXX` from `https://formspree.io/f/XXXXXXXX`) and the **public Turnstile site key** for frontend configuration. Those two identifiers may be provided for a review PR. No personal data or real customer details belong in tests.
5. Review provider privacy and retention terms, inbox permissions, notice and a suitable retention period under the Philippine Data Privacy Act. Confirm who can access enquiries. Keep marketing opt-in separate.
6. Test on an authorized HTTPS staging hostname. Verify an invalid/missing/expired token is rejected by Formspree; attempt one valid **synthetic** form submission and confirm the notification actually arrives in the designated mailbox. Also confirm the source value and reply-to email. No real client names or email addresses in test fixtures.
7. Only **after** the provider-side and live-mail checks pass and with owner release approval, set `enabled: true`, `formId: 'FORM_ID'`, and `turnstileSiteKey: 'PUBLIC_SITE_KEY'` in `site-inquiry-config.js` through a separate tested branch/PR. Never make this edit directly in production or bypass approvals.
8. Confirm the actual site is available via HTTPS, GitHub Pages settings show **Enforce HTTPS**, and test both contact forms on the public host after release. No submission should be advertised as delivered without provider/inbox confirmation.

## Runtime safeguards
- Source data: `company` or `thryvems`. Required name and email; bounded optional message, interest and organization; browser validation; double-submit guard.
- Submit uses only `https://formspree.io/f/{id}` with `FormData`, JSON acceptance header and `cf-turnstile-response`.
- A valid widget callback gates the button. Expired/error/used tokens disable submission; attempts to submit without a token do nothing. A server error disables the form until a fresh Turnstile token.
- Frontend only reports **submitted to provider** when Formspree returns HTTP success; actual inbox delivery is verified separately.
- Script fails closed without both public IDs, explicit `enabled: true`, or HTTPS production origin. No secrets or recipients in JavaScript.
- The website currently uses no optional analytics or advertising cookies; the existing cookie information page transparently notes planned security verification.

## Hosting blocker observed 1 Nov 2026
[GitHub Pages deploy 41292936738](https://github.com/dbauto/thryvems-landingpage/actions/runs/41292936738) built successfully but failed deployment because GitHub reports deployment `4d9f1a58cf3895ce8dd8d4835af40a8212e54bfa` **still in progress**. Retrying the failed job produced the same error. This is not a form-source regression. In GitHub → repository → Deployments/Environments, an authorized repo admin should inspect and resolve the stale deployment, then rerun the failed Pages job. Avoid force-push or blind changes to DNS or security settings. HTTPS public check remains unverified.

## Completion checklist
- [ ] Provider/recipient configured with owner authorization
- [ ] Turnstile site key and secret installed in correct places; server verification enabled
- [ ] Domain restriction, CAPTCHA abuse checks, rate limits and privacy/retention reviewed
- [ ] Missing, invalid, expired/replayed and failed provider requests rejected
- [ ] Staging and real inbox delivery test using synthetic values succeeded
- [ ] Latest Pages deployment verified successful and HTTPS works on apex/www
- [ ] Final enablement PR/CI/screenshots reviewed and owner approves merging
- [ ] Backend architecture change record and traceability updated/approved (currently Pending)

## Turnstile widget prepared — 1 Nov 2026
A **Managed** Cloudflare Turnstile widget named *Thync & Thryve public inquiry forms* was created in the connected Thync & Thryve Cloudflare account, restricted to the apex and `www` domains. Its **public** site key is now in `site-inquiry-config.js`. The secret is not in source or chat; retrieve it inside the owning Cloudflare account to configure Formspree directly. **Formspree recipient/secret verification and received email have not been configured or tested.** The form stays `enabled:false`, with no Formspree ID.
