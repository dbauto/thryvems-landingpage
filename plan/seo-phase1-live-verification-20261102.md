# SEO Phase 1 — production accessibility acceptance (2 Nov 2026)

## Goal and scope

Confirm that the existing public **Thync & Thryve** GitHub Pages website is accessible, secure, crawlable and consistent with the SEO files merged in PR #20. **Do not change its design, app, pricing, inquiry protections, DNS, email settings or production deployment without separate approval.**

**Status: PENDING — NOT ACCEPTED.** The 18 automated DNS/HTTPS/crawlability checks pass in public CI. The earlier live mobile audit observed a 2px root scroll-width surplus on one page; whether it actually permits horizontal scrolling is being checked. The 24-hour repeat check is still pending. Green source CI does not establish Google indexing.

## Baseline evidence recorded on 2 Nov 2026

- [Merged SEO PR #20](https://github.com/dbauto/thryvems-landingpage/pull/20), merged to main at `65453897855581bd4d1203afc42642b6e5fa64ef`.
- [GitHub main Check 41331487971](https://github.com/dbauto/thryvems-landingpage/actions/runs/41331487971) **SUCCESS** for source checks. This is **not proof** the custom hostname resolves or is indexed.
- GitHub root `CNAME` currently specifies `thyncandthryve.com`; repo includes `robots.txt`, `sitemap.xml` and 11 intended canonical pages.
- Public website fetch attempts from the connected web checker returned inaccessible for `https://thyncandthryve.com/`, `/robots.txt` and `/sitemap.xml`. This tool response **does not establish** a global DNS failure or a specific HTTP status.
- DNS/HTTPS checks from the isolated execution container could not resolve even the unrelated `dbauto.github.io` hostname; **inconclusive**, not a valid external DNS verdict.
- Neither connected Cloudflare account can list a managed domain zone, so authoritative DNS record state, certificate status and web traffic configuration **cannot be verified or changed through those connections**.
- The owner's [domain configuration runbook](github-pages-domain.md) documents the previous lack of public web A/CNAME records at the time of the supplied DNS screenshot; that is historical, **not proof of current DNS state**.
- **Independent public-network proof now available:** [PR Check 41333953855](https://github.com/dbauto/thryvems-landingpage/actions/runs/41333953855), source SHA `0004bd6bd90eb1426422bc7e1db9726e1e78cab1`, ran at 2 Nov 2026, 01:57 Asia/Manila: **18/18 live production checks PASSED** (apex four A targets; www CNAME; apex HTTPS and www 301 redirects; 11/11 URLs HTTP 200 with canonicals and trusted TLS; robots and sitemap HTTP 200, 11 URLs; true 404). [Raw report and Playwright artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41333953855/artifacts/13094616424). This confirms live reachability from GitHub Actions, contrary to the earlier web-checking environment failure; it does **not** establish Google indexing.
- There is no direct evidence here of Search Console indexing. Public browser-mobile evidence and independent 24-hour repetition remain outstanding.

## Automated production acceptance metrics

Run `npm run audit:live` in a networked runtime (Node 22). It writes `phase1-live-audit.json`, prints each result, and exits nonzero if any check fails. The regular CI Check runs this probe **non-blocking**, stores its JSON alongside screenshots, and continues typecheck/build/e2e so DNS outages cannot mask source quality. An audit result of FAIL must still be treated as failed production acceptance.

| Metric | Requirement | Audit evidence |
| --- | --- | --- |
| A1 apex DNS | Exactly four approved GitHub Pages A targets resolvable from public DNS | `dns-apex` |
| A2 www DNS | CNAME resolves to `dbauto.github.io` (no change to unrelated records) | `dns-www` |
| A3 HTTP redirect | `http://thyncandthryve.com/` permanently redirects to `https://thyncandthryve.com/` | `redirect-http` |
| A4 www canonicalization | `https://www.thyncandthryve.com/` permanently redirects to the HTTPS apex | `redirect-www` |
| A5 TLS / page availability | 11/11 intended HTTPS URLs return 200 with trusted TLS, intended canonical, visible H1, language and no `noindex` | `url-*` (11 checks) |
| A6 crawler rules | `/robots.txt` returns 200; allows public crawl and declares the sitemap | `robots` |
| A7 sitemap | `/sitemap.xml` returns 200 with exactly 11 unique intended canonical URLs | `sitemap` |
| A8 true missing page | Nonsense path returns HTTP 404, not a soft-404 page with HTTP 200 | `real-404` |
| A9 responsive production | Live 390/768/1280/1920 px checks show no horizontal overflow or broken navigation | **Manual browser evidence pending**; local Playwright is not a substitute |
| A10 consistency & repeatability | Capture two **independent live runs at least 24 h apart**, both meeting A1–A9; source SHA and artifacts identified | **Pending** |

**Script score:** 18/18 PASS is required for A1–A8. A9 and A10 are additional mandatory gates, not included in the script's numeric result. HTTPS server trust is checked by Node fetch; the script does not claim a separate certificate issuer/expiry audit, full TLS posture or real Core Web Vitals.

### Current acceptance matrix

| Criterion | Current verified status | Evidence |
| --- | --- | --- |
| Codebase build / SEO page presence | PASS (source only) | Main Check 41331487971 and PR #20 |
| A1–A8 live production | **PASS — 18/18** | GitHub Actions public-runner Check 41333953855, audit 01:57 PHT 2 Nov 2026 |
| A9 live mobile | **RECHECK IN PROGRESS** | [Prior diagnostic Check 41334662058](https://github.com/dbauto/thryvems-landingpage/actions/runs/41334662058): 11/12 by document-width metric; 390px software was 392px scrollWidth, but CSS already specifies horizontal clipping. Consultancy passed 4/4 after waiting for styles and fonts. New run tests **actual horizontal scrollX** after attempting to scroll sideways, while still reporting geometric width; no site CSS changes were retained. |
| A10 24-hour repeat | **PENDING** | No two successful live probes |
| DNS account access | **UNAVAILABLE (no change needed based on current audit)** | Both connected Cloudflare accounts returned no zones; public DNS nevertheless passed all targets |
| Production deployment and GitHub Pages custom domain | **LIVE HTTP/TLS verified; settings review pending** | Public response checks passed; private Pages configuration could not be inspected |
| Google indexing | Outside Phase 1 | Phase 2 via Search Console |

## Approved low-risk resolution order (no automatic DNS writes)

1. Public DNS/HTTPS now passes: **no DNS remediation is indicated by this audit**. If future changes are necessary, first determine which Cloudflare account manages the zone and get approval; do not transfer zones, change nameservers or touch mail settings.
2. Read current apex/www DNS records and GitHub → Settings → Pages (custom domain, HTTPS and publishing source), then reconcile with the [owner DNS runbook](github-pages-domain.md). **Preserve all existing MX, SPF, DKIM, DMARC, Workspace, verification and subdomain records.** Any DNS edit requires explicit owner approval based on current records.
3. Keep `npm run audit:live` as a regression check, document any future actual failures and repair only their demonstrated root causes. PR #20 already contains the 11 static pages; do not rewrite them to compensate for DNS.
4. Actual public mobile screens are now captured in [GitHub Check 41334662058 artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41334662058/artifacts/13094468011): 11/12 passed after waiting for CSS/fonts; 390px product page overflowed by 2px. The product's existing `overflow-x: hidden` may already prevent actual sideways scrolling despite a 2px width measurement. An experimental root-clip rule was **reverted** because it coincided with a failing scroll-story test. The final proposal changes **tests only** and checks actual sideways scroll, with no CSS or site redesign.
5. Repeat live audit at least 24 hours after first clean run. Log two artifact links, timestamp, commit SHA and a screenshot sheet. Mark Phase 1 **PASSED** only when all A1–A10 succeed. Never interpret a green CI run with a non-blocking probe as Phase 1 success.

## Backend impact

**No backend impact:** read-only site checks and documentation; no data tables/relations, APIs, QMS or marketing workflows, roles/permissions, tenant/process/classification controls, security policy, integrations/events or backend tests change. Existing unrelated [backend change-management PR #26](https://github.com/dbauto/thryvems-backend/pull/26) remains **Pending**.
