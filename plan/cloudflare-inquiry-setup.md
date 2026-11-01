# Public inquiries through Cloudflare Turnstile + FormSubmit — Pending

**Scope:** Change **only email delivery** from a Cloudflare Email Service binding to FormSubmit. Keep the existing company and ThryveMS forms, the Cloudflare Worker, Managed Turnstile widget, strict Origin check, bounded input and fail-closed default.

The Worker in `workers/inquiries/index.mjs` calls `https://formsubmit.co/ajax/{configuredRecipient}` **server-side**, only after Turnstile Siteverify returns success with the expected hostname and action. The recipient comes from the Worker runtime environment (`RECIPIENT_EMAIL`); it is not published in frontend JavaScript. The API success is checked explicitly; provider errors/timeouts do not show success.

## Provider and privacy

- FormSubmit is free and needs **no account** or domain ownership. The first synthetic submission sends a one-time activation email to the recipient. The mailbox owner must confirm the activation link; until then, receipt is not verified.
- FormSubmit states that it retains submissions for **30 days**. Inform visitors of this third-party processing and review privacy/legal disclosures **before activation**.
- FormSubmit has its own spam protection and may block server-to-server calls or require CAPTCHA under certain conditions. This is **not tested**. No provider access, inbox readback, or guarantee of successful delivery yet.
- FormSubmit docs: https://formsubmit.co/ , https://formsubmit.co/ajax-documentation and https://formsubmit.co/documentation .
- Sending to this single verified recipient does not require granting Cloudflare control of the website domain, purchasing a plan, changing MX/SPF/DKIM/DMARC or verifying a sender domain.

## Deployment and security gates

1. Keep the production static configuration `site-inquiry-config.js` as `enabled:false` and `endpoint:''` until approved; **no current user inquiry can send**.
2. Deploy the Cloudflare Worker only after separate owner approval and choose the approved `.workers.dev` HTTPS URL. Set `TURNSTILE_SECRET` via Cloudflare Worker Secrets (never in git or public client). Set `RECIPIENT_EMAIL` securely as a Worker environment value, and `EMAIL_ENABLED=1` only at the end of qualification.
3. Protect the public Worker route with an abuse/rate-limit rule. Require validated Origin, server-side Siteverify, expected hostname/action, bounded input and reject missing, stale and reused challenge tokens.
4. Send a **synthetic** first message to initiate FormSubmit email activation, and have the mailbox owner confirm the activation email. Verify an actual synthetic accepted message in the inbox, plus negative token and blocked origin tests. Confirm what FormSubmit returns before activation, and test for possible origin/IP blocking or double captcha.
5. Update privacy and cookie/verification disclosures with provider and retention facts; review third-party personal-data transfer and any response retention obligations.
6. Only after all gates pass, open a **separate** reviewed enablement PR for the public Worker URL. Merge/production deploy only with the owner's explicit approval.
7. Keep backend CM [PR #26](https://github.com/dbauto/thryvems-backend/pull/26) marked **Pending** until architecture, traceability and security acceptance are verified and approved.

**No QMS backend impact:** database schema/relationships, QMS APIs, tenant/client and process scope, permissions, classifications and internal workflows stay unchanged. The **public marketing inquiry** email-delivery integration changes, so backend CM documentation is mandatory.
