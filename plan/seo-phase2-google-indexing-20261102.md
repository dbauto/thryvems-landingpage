# SEO Phase 2 — Google discovery and indexing: measurable acceptance

Date: 2 Nov 2026 (Asia/Manila) · Site: https://thyncandthryve.com/ · Status: **IN PROGRESS / NOT ACCEPTED**.

## Baseline and known limits

- SEO PR #20 published 11 intended canonical pages. Phase 1 PR #21 merged at `cc1c449`; public-network DNS/HTTPS/crawlability previously passed 18/18. Phase 1 **remains pending** its post-merge production mobile 12/12 confirmation and a repeat successful live audit at least 24 h later.
- The initial offline source review found **11/11 pages reachable within 2 links from the homepage** (10 one click; software within two clicks), but a green build or public search query **cannot confirm Google indexing**.
- Search Console is **not connected or verifiably authorized** in this workflow. No GSC owner status, sitemap processing, individual Google Index results, crawl dates, Google-selected canonicals, impressions or rankings are currently verified. `plan/google-indexing-evidence.json` intentionally starts all rows `NOT_VERIFIED`.
- Do not infer company location from device/account data. Do not publish or commit verification TXT values, Google passwords, personal email addresses or token-bearing Search Console links.
- Search results using `site:` are diagnostic only and **not** the acceptance source. Use the Google Search Console *Page indexing* and *URL Inspection* results to determine actual Google status.

## Phase 2 technical and Google metrics

| ID | Measurement | Completion target | Evidence required | Current |
| --- | --- | --- | --- | --- |
| I01 | Source internal-link discovery | All 11/11 pages linked from home in at most 2 clicks | `npm run audit:indexing-readiness`, CI JSON | Await CI |
| I02 | Static indexability signals | 11/11 intended HTML pages have one H1, matching canonical and no `noindex`; robots/sitemap enumerate exact 11 | CI JSON | Await CI |
| I03 | Search Console property ownership | Verified `sc-domain:thyncandthryve.com` property covering apex and www | Owner-approved GSC screenshot/date or access-verified GSC report link | **Pending owner/GSC access** |
| I04 | Sitemap in Search Console | `https://thyncandthryve.com/sitemap.xml` submitted; Google status **Success**; discovered URLs recorded | GSC → Sitemaps screenshot/report | **Pending** |
| I05 | Google URL inspection coverage | 11/11 canonical URLs inspected using URL Inspection, with dated Google indexing/crawl/canonical status | 11 evidence rows, no invented `INDEXED` values | **Pending** |
| I06 | Preventable Google indexing blockers | 0 unresolved issues under publisher control (e.g. 403/404, robots/noindex, wrong canonical, broken HTML/sitemap, redirect loops) | URL Inspection live check and Page indexing report | **Pending** |
| I07 | Evidence validity | Each non-`NOT_VERIFIED` row has date, report type and non-secret HTTPS evidence link; no duplicate/unrecognized paths | `npm run audit:indexing-readiness` | Await CI |

**Technical completion:** I01, I02, I07 pass in CI. **Full Phase 2 implementation acceptance:** I01–I07 pass, and owner explicitly reviews Google evidence. The owner may accept the configuration even if Google has not yet indexed every page; Google's indexing decision is a separate outcome.

## Google success targets, measured separately

| Result | Target | When / how measured |
| --- | --- | --- |
| S01 — branded homepage | Homepage indexed in Google's index and URL Inspection reports “URL is on Google” | Review at days 7, 14, 30 |
| S02 — priority Google coverage | Aim for **8/11 indexed by day 60** (target, not guaranteed) | URL Inspection status per exact URL, dated |
| S03 — discovery | 11/11 URLs known to Google via submitted sitemap or URL Inspection | Review day 14 and day 30; distinguish “discovered” from “indexed” |
| S04 — relevant impressions | Establish first Search Console Search results baseline; zero is valid | First available 28-day period; compare equal future periods |
| S05 — diagnosed exclusions | All “Crawled – currently not indexed”, “Discovered – currently not indexed”, duplicate canonical and other exclusions have recorded corrective action or justified exception | Weekly review until stable |

Google states sitemap submission and recrawl requests **do not guarantee indexing or rankings**. Do not mark S01/S02 successful without actual GSC evidence.

## Owner-authorized Search Console setup, without website design changes

1. Open [Google Search Console](https://search.google.com/search-console) in the **company-controlled Google account**, and **look for an existing property first**. Claim/use that property; do not create unnecessary duplicates.
2. If none exists, add the **Domain** property `thyncandthryve.com` (no `https://`). Google normally requires a DNS TXT verification record. The domain's managing Cloudflare account is **not visible** to either currently connected Cloudflare connection. An authorized domain owner must add Google's **exact** verification value in the true domain DNS zone after confirming it will not conflict with existing records. Never replace or delete existing MX/SPF/DKIM/DMARC, name servers or other records. Google verification is an external account action; do not commit the TXT value.
3. After GSC marks ownership **Verified**, go to **Indexing → Sitemaps** and submit `sitemap.xml`. Record Google status and discovered count. `robots.txt` already includes its canonical location.
4. Inspect the homepage first through **URL Inspection**, then the 10 other exact sitemap URLs. Record each Google index state, last crawl and Google-selected canonical where available. If necessary, use **Test live URL** and **Request indexing** for eligible key pages; requests must come from a verified owner/full GSC user and may be rate-limited. Do not repeat requests unnecessarily.
5. Record public-safe evidence link, review date, and Google report in `plan/google-indexing-evidence.json` through a **separate PR**. Avoid saving verification codes, staff identities, user contact details or customer data. Update only verified outcomes.
6. Review at days 7, 14, 30 and 60; capture impressions, clicks, Google coverage, URL inspection reasons and action owner. Escalate any preventable technical issue with a scoped PR. Do not automatically change page canonicals or remove low-traffic pages.

## Safeguards and backend impact

All automated tooling is source-level/CI QA. It does not connect to Search Console, submit URLs via Google's API, activate analytics or change web hosting configuration. No privacy-consent or visitor tracking change.

**No backend impact.** Database schemas, relationships, QMS APIs, workflows, permissions, security, tenant/process/classification checks, integrations/events and backend tests are unchanged; no backend CM PR required. Existing backend marketing-email deployment work remains separate.

## Sources

- [Google: Technical requirements for indexing](https://developers.google.com/search/docs/essentials/technical)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Ask for a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: URL inspection and troubleshooting](https://support.google.com/webmasters/answer/12482179)
