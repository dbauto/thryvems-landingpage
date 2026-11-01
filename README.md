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

Contact forms remain **disabled until the server-side intake service is verified**. Both pages now include a cookie notice and a safe inquiry client which only enables sending if `GET /api/inquiry/config` returns a verified ready state and Cloudflare Turnstile is completed. The future server must independently verify each Turnstile token and acknowledge actual mail acceptance; front-end-only verification is never sufficient. **No email is sent by this repository yet**. See [change management](https://github.com/dbauto/thryvems-backend/pull/24) for the required separate implementation, mail credentials and privacy review.

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

## Production launch status (1 November 2026)

**Pending, not deployed to the custom domain.** The connected invited Cloudflare account has accepted membership but cannot list the target DNS zone; listing Pages projects in the invited account returns HTTP 403. Domain ownership and the exact registered spelling need confirmation. Do not change DNS or enable forms until the release gates in [backend change management](https://github.com/dbauto/thryvems-backend/pull/24) have passed. The private receiving mailbox must be set as Cloudflare secret/configuration, never in source. Cookie details: `cookies.html`. Source includes no optional analytics/advertising scripts.
