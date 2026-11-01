# Thync & Thryve website

Static landing pages for Thync & Thryve and its ThryveMS quality management software.

| Page | File |
|---|---|
| Company homepage (Home, Learn, Trainings, Consultancy, Solutions, About us) | `index.html` |
| ThryveMS solution page, with plans and pricing calculator | `thryvems.html` |
| Logos (transparent SVG and PNG, standard and reverse) | `assets/` |

The live GitHub Pages root stays static. Open `index.html` for the company homepage and `thryvems.html` for the product page. Deployment remains owner-controlled; this PR does not change the live branch.

## Immersive ThryveMS product page

The redesigned `thryvems.html` borrows the scroll-driven editorial presentation and puzzle motion developed in the iQMS landing reference while preserving this site's **ThryveMS branding**, the company's separate homepage and service links, **Base / Mid / Enterprise plans**, and the pre-existing PHP estimator logic.

- `thryvems-motion.css` and `thryvems-motion.js`: product landing appearance, responsive behavior, scroll scenes, reduced-motion fallback, back-to-top.
- `thryvems-pricing.js`: original Base/Mid/annual pricing calculations extracted unchanged.
- `plan/backend-impact.md`: impact review; no app backend changes.
- `npm run typecheck`: JavaScript syntax validation (this static site has no TypeScript).
- `npm run build`: assert essential sections and pricing constants, then build a static `dist/` preview.
- `npm run e2e`: Playwright tests and screenshots. The Check workflow runs all three on a PR.

Contact forms are a **preview only** and do not send personal data. A proper intake integration requires separate approval and privacy review.

To run the checks locally: `npm install`, `npx playwright install chromium`, then `npm run typecheck && npm run build && npm run e2e`.

## Pricing calculator

The calculator in `thryvems.html` uses these plans:

| Plan | Monthly | Users included | Each added user | Plan limit |
|---|---|---|---|---|
| Base | ₱4,000 | 15 | ₱300 | 25 users |
| Mid | ₱6,500 | 25 | ₱260 | 75 users |
| Enterprise | Not shown, "Talk to sales" | 40 | — | Unlimited |

Annual billing takes 20% off the whole monthly total, added users included. To change prices, edit the `P` object in the script at the bottom of `thryvems.html`, plus the price text in the plan cards and the homepage plans teaser.

## Still to fill in

- Training dates and course descriptions
- About us copy and credentials
- VAT wording under the calculator
- Contact forms are not connected yet; wire them to email, a CRM or a form service before launch
- A high-resolution Thync & Thryve logo


## Proposed company custom domain
The company apex `thyncandthryve.com` is staged in root `CNAME` for the existing branch-based GitHub Pages deployment. It **is not confirmed live**: The registered spelling was confirmed by the user's Cloudflare dashboard screenshot. Cloudflare DNS API access and HTTPS verification are outstanding. The site owner needs to complete the non-destructive DNS/Pages checks in [plan/github-pages-domain.md](plan/github-pages-domain.md). No changes to any existing email DNS or QMS app/backend.

## Cookie notice on the public company and product pages
The public pages display an informational cookie banner (acknowledgement stored locally). The full notice is at `cookies.html`. There are **no optional analytics or advertising cookies**, so no opt-in tracking controls are enabled. This cookie-only change does not activate contact forms or human verification; those require separate configured provider-side protection as documented in [public inquiry PR #11](https://github.com/dbauto/thryvems-landingpage/pull/11) and [backend CM PR #24](https://github.com/dbauto/thryvems-backend/pull/24).

## Prepared guarded contact forms (not enabled)
The public site remains static on GitHub Pages. Company and ThryveMS inquiries use a **disabled-by-default** Cloudflare Worker with strict server-side Turnstile verification. The Worker now delegates only **email delivery** to FormSubmit, a free provider that does not need a Cloudflare sender domain or Formspree account. No actual submissions occur while `site-inquiry-config.js` has `enabled: false` or an empty Worker `endpoint`. The existing form's `source` value distinguishes company and product requests.

Follow [plan/cloudflare-inquiry-setup.md](plan/cloudflare-inquiry-setup.md) for recipient activation, Worker secrets, anti-abuse checks, provider's 30-day retention disclosure and real inbox verification **before enabling**. The visitor's inquiry is sent to FormSubmit **only after** a valid server-verified Turnstile token. No recipient address or secret belongs in this public repo; a FormSubmit success response is **not** proof of actual inbox delivery. Historical Formspree instructions are superseded.
