# SEO Phase 2 — Google discovery and indexing: measurable acceptance

Date: 2 Nov 2026 (Asia/Manila) · Site: https://thyncandthryve.com/ · Status: **IN PROGRESS / NOT ACCEPTED**.

## Baseline and known limits

- SEO PR #20 published 11 intended canonical pages. Phase 1 PR #21 merged at `cc1c449`; public-network DNS/HTTPS/crawlability previously passed 18/18. Phase 1 **remains pending** its post-merge production mobile 12/12 confirmation and a repeat successful live audit at least 24 h later.
- [Source Check 41338610182](https://github.com/dbauto/thryvems-landingpage/actions/runs/41338610182) measured **11/11 pages reachable from the homepage in one click**, source metadata/canonical/sitemap **PASS**, 22/22 audit-related new and existing unit tests (12 existing Worker, 5 Phase 1, 5 Phase 2) and 52/52 existing Chromium e2e PASS. Public domain audit 18/18 and live mobile 12/12 passed in that run. A green build or public search query **cannot confirm Google indexing**.
- **Update, 2 Nov 2026:** Windsor.ai's Google Search Console connector now exposes **`sc-domain:thyncandthryve.com`**, so the domain-property data connection is accessible. However, connector data access **does not establish GSC owner-level permissions**, whether a sitemap was submitted/accepted, Google Page indexing state, latest crawl, Google-selected canonical, or real organic search visits. Source manifest remains all 11 `NOT_VERIFIED`, and indexed-page counts must not be inferred from an empty Search Analytics response.
- Do not infer company location from device/account data. Do not publish or commit verification TXT values, Google passwords, personal email addresses or token-bearing Search Console links.
- Search results using `site:` are diagnostic only and **not** the acceptance source. Use the Google Search Console *Page indexing* and *URL Inspection* results to determine actual Google status.

## Phase 2 technical and Google metrics

| ID | Measurement | Completion target | Evidence required | Current |
| --- | --- | --- | --- | --- |
| I01 | Source internal-link discovery | All 11/11 pages linked from home in at most 2 clicks | `npm run audit:indexing-readiness`, CI JSON | **PASS: 11/11, max 1 click** |
| I02 | Static indexability signals | 11/11 intended HTML pages have one H1, matching canonical and no `noindex`; robots/sitemap enumerate exact 11 | CI JSON | **PASS: 11/11** |
| I03 | Search Console property ownership | Verified `sc-domain:thyncandthryve.com` property covering apex and www | Owner-approved GSC screenshot/date or access-verified GSC report link | **PARTIAL: connector account visible; owner-level permissions NOT VERIFIED** |
| I04 | Sitemap in Search Console | `https://thyncandthryve.com/sitemap.xml` submitted; Google status **Success**; discovered URLs recorded | GSC → Sitemaps screenshot/report | **PARTIAL: submission confirmed, 11 discovered, Google download and 0 errors/warnings confirmed; processing status column not verified** |
| I05 | Google URL inspection coverage | 11/11 canonical URLs inspected using URL Inspection, with dated Google indexing/crawl/canonical status | 11 evidence rows, no invented `INDEXED` values | **PENDING: connector does not expose URL Inspection; 0/11 inspected** |
| I06 | Preventable Google indexing blockers | 0 unresolved issues under publisher control (e.g. 403/404, robots/noindex, wrong canonical, broken HTML/sitemap, redirect loops) | URL Inspection live check and Page indexing report | **Pending** |
| I07 | Evidence validity | Each non-`NOT_VERIFIED` row has date, report type and non-secret HTTPS evidence link; no duplicate/unrecognized paths | `npm run audit:indexing-readiness` | **PASS: 11/11 placeholders valid; 0/11 Google statuses verified** |

**Technical completion:** I01, I02, I07 pass in CI. **Full Phase 2 implementation acceptance:** I01–I07 pass, and owner explicitly reviews Google evidence. The owner may accept the configuration even if Google has not yet indexed every page; Google's indexing decision is a separate outcome. **As of 2 Nov 2026, I01/I02/I07 passed; I03 has a connected property but owner rights unverified; I04 submission/download confirmed, though its exact Google processing status is not visible; I05–I06 remain PENDING**, so Phase 2 full acceptance is **not** reached.

## Google success targets, measured separately

| Result | Target | When / how measured |
| --- | --- | --- |
| S01 — branded homepage | Homepage indexed in Google's index and URL Inspection reports “URL is on Google” | Review at days 7, 14, 30 |
| S02 — priority Google coverage | Aim for **8/11 indexed by day 60** (target, not guaranteed) | URL Inspection status per exact URL, dated |
| S03 — discovery | 11/11 URLs known to Google via submitted sitemap or URL Inspection | Review day 14 and day 30; distinguish “discovered” from “indexed” |
| S04 — relevant impressions | Establish first Search Console Search results baseline; zero is valid | First available 28-day period; compare equal future periods |
| S05 — diagnosed exclusions | All “Crawled – currently not indexed”, “Discovered – currently not indexed”, duplicate canonical and other exclusions have recorded corrective action or justified exception | Weekly review until stable |

Google states sitemap submission and recrawl requests **do not guarantee indexing or rankings**. Do not mark S01/S02 successful without actual GSC evidence.

## Verified source evidence

- [Phase 2 source Check #41338610182](https://github.com/dbauto/thryvems-landingpage/actions/runs/41338610182): source readiness PASS, 11/11 homepage-reachable in max 1 click; 22/22 unit tests (12 Worker, 5 Phase 1, 5 Phase 2), 52/52 Chromium tests PASS; 18/18 public HTTP/DNS checks and 12/12 live responsive checks PASS.
- [CI JSON and screenshot artifacts](https://github.com/dbauto/thryvems-landingpage/actions/runs/41338610182/artifacts/13095834801).
- [Google index evidence manifest](google-indexing-evidence.json) remains 11 `NOT_VERIFIED` entries, not indexed claims. Search Console is connected for reporting, but **owner-level permission, sitemap acceptance and individual URL indexing require separate verification**.
- [2 Nov 2026 Search Console readout](seo-phase2-gsc-connection-20261102.md) now includes the **subsequent successful sitemap submission**: the user-provided GSC screenshot displayed “Sitemap submitted successfully” and **11 discovered pages**; the Search Console connector independently returned 1 row for the sitemap with 11 submitted, 0 errors, 0 warnings, and Google last-downloaded timestamp **2026-11-02 08:12:49 UTC**. The UI's processing status column was covered by a dialog and the connector has no status field; do not claim **Google processing status: Success** until directly verified.

## Owner-authorized Search Console setup, without website design changes

1. Open [Google Search Console](https://search.google.com/search-console) in the **company-controlled Google account**, select the **existing** Domain property `thyncandthryve.com`. Its reporting connection is visible, so **do not create a duplicate property or touch DNS without a demonstrated ownership problem**.
2. Check owner permissions for that property inside Search Console (a connected read-only reporting account is not evidence of owner rights). Keep verification tokens and Google user addresses out of the repository.
3. **Submitted on 2 Nov 2026.** Under **Indexing → Sitemaps**, dismiss the submission confirmation popup and verify the submitted row's Google **Status** column explicitly says **Success**. The user screenshot and reporting connector confirm 11 discovered/submitted pages and 0 warnings/errors, but not the exact label in that hidden status column. Do not submit a duplicate sitemap; `robots.txt` already points to its canonical location.
4. Inspect the homepage first through **URL Inspection**, then the 10 other exact sitemap URLs. Record each Google index state, last crawl and Google-selected canonical where available. If necessary, use **Test live URL** and **Request indexing** for eligible key pages; requests must come from a verified owner/full GSC user and may be rate-limited. Do not repeat requests unnecessarily.
5. Record public-safe evidence link, review date, and Google report in `plan/google-indexing-evidence.json` through a **separate PR**. Avoid saving verification codes, staff identities, user contact details or customer data. Update only verified outcomes.
6. Review at days 7, 14, 30 and 60; capture impressions, clicks, Google coverage, URL inspection reasons and action owner. Escalate any preventable technical issue with a scoped PR. Do not automatically change page canonicals or remove low-traffic pages.

## Safeguards and backend impact

All automated *repository* tooling remains source-level/CI QA. The separately connected **read-only** Windsor.ai Search Console connector now retrieves (currently empty) reporting rows; it cannot submit a sitemap, inspect a URL or request indexing. No automated Google write was performed. This documentation only records those read results and does not activate analytics or change web hosting configuration. No privacy-consent or visitor tracking change.

**No backend impact.** Database schemas, relationships, QMS APIs, workflows, permissions, security, tenant/process/classification checks, integrations/events and backend tests are unchanged; no backend CM PR required. Existing backend marketing-email deployment work remains separate.

## Sources

- [Google: Technical requirements for indexing](https://developers.google.com/search/docs/essentials/technical)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Ask for a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: URL inspection and troubleshooting](https://support.google.com/webmasters/answer/12482179)
