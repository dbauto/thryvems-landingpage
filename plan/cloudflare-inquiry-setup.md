# Direct Gmail inquiries via Cloudflare — Pending

Use the existing company and product forms and Managed Turnstile widget. The Worker source is in `workers/inquiries/index.mjs` and is NOT deployed. No Formspree dependency is required after activation.

## Deployment gates

1. Cloudflare recipient `thync.thryve@gmail.com` was registered in the Thync & Thryve Cloudflare account (not yet verified); the mailbox owner must select Cloudflare's verification link.
2. Cloudflare's connected accounts currently show **no managed zone** for `thyncandthryve.com`. Cloudflare Email Service requires a domain onboarded to the account for outbound sender identity. The DNS administrator must establish appropriate authorized domain access and approve any email-service onboarding. **Do not replace existing MX records or disturb Google Workspace/email service.** Email Sending manages `cf-bounce` records; review DNS/SPF/DKIM/DMARC individually. Do not assume Cloudflare Email Routing must replace existing mail.
3. After sender domain verification, set `SENDER_EMAIL` to an authorized sender under that domain, `RECIPIENT_EMAIL` to the verified fixed recipient, `EMAIL_ENABLED=1`, and store `TURNSTILE_SECRET` as a Cloudflare Worker secret. Never put the secret in repo, the public website, or logs. Limit email binding destination to the verified recipient.
4. Configure a suitable HTTPS Worker URL and add only that public URL to the landing-site config in a separate PR; only then set `enabled:true`. Add strict CORS and per-IP rate limiting with Cloudflare rules; reject token replay/expiry and bad Origin/source/hostname/action. Verify actual receipt at the intended inbox using synthetic test data and prove invalid tokens reject with zero email.
5. Do not merge or deploy this branch or mark backend synchronization complete without reviewing backend architecture CM PR and user approval.

Cloudflare docs: https://developers.cloudflare.com/email-service/get-started/send-emails/ and https://developers.cloudflare.com/email-service/configuration/send-bindings/ and https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

**Backend impact:** This is a public landing inquiry API and outgoing mail integration, with server-side security, events and tests. No QMS schemas, relationships, authentication, roles, client isolation, process scope, classifications or internal APIs modified. Document the planned service and traceability through a separate backend PR. Status **Pending**.
