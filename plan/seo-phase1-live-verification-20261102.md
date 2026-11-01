# SEO Phase 1 — production accessibility acceptance (2 Nov 2026)

## Goal and scope

Confirm that the existing public **Thync & Thryve** GitHub Pages website is accessible, secure, crawlable and consistent with the SEO files merged in PR #20. **Do not change its design, app, pricing, inquiry protections, DNS, email settings or production deployment without separate approval.**

**Status: PENDING — NOT ACCEPTED.** GitHub build and browser tests passing does not establish live-domain availability or Google indexing.

## Baseline evidence recorded on 2 Nov 2026

- [Merged SEO PR #20](https://github.com/dbauto/thryvems-landingpage/pull/20), merged to main at `65453897855581bd4d1203afc42642b6e5fa64ef`.
- [GitHub main Check 41331487971](https://github.com/dbauto/thryvems-landingpage/actions/runs/41331487971) **SUCCESS** for source checks. This is **not proof** the custom hostname resolves or is indexed.
- GitHub root `CNAME` currently specifies `thyncandthryve.com`; repo includes `robots.txt`, `sitemap.xml` and 11 intended canonical pages.
- Public website fetch attempts from the connected web checker returned inaccessible for `https://thyncandthryve.com/`, `/robots.txt` and `/sitemap.xml`. This tool response **does not establish** a global DNS failure or a specific HTTP status.
- DNS/HTTPS checks from the isolated execution container could not resolve even the unrelated `dbauto.github.io` hostname; **inconclusive**, not a valid external DNS verdict.
- Neither connected Cloudflare account can list a managed domain zone, so authoritative DNS record state, certificate status and web traffic configuration **cannot be verified or changed through those connections**.
- The owner's [domain configuration runbook](github-pages-domain.md) documents the previous lack of public web A/CNAME records at the time of the supplied DNS screenshot; that is historical, **not proof of current DNS state**.
- There is no evidence here of Search Console indexing or real visitor reachability.

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
| A1–A8 live production | **PENDING** | Web requester inaccessible; run networked script in the PR Check for specific results |
| A9 live mobile | **PENDING** | Prior local Playwright tests only |
| A10 24-hour repeat | **PENDING** | No two successful live probes |
| DNS account access | **BLOCKED** | Connected Cloudflare accounts returned no zones |
| Production deployment and GitHub Pages custom domain | **PENDING** | Must verify Settings → Pages domain, publishing source and Enforce HTTPS |
| Google indexing | Outside Phase 1 | Phase 2 via Search Console |

## Approved low-risk resolution order (no automatic DNS writes)

1. Determine **which Cloudflare account holds** the live `thyncandthryve.com` zone, or grant the existing connection zone visibility. Do not transfer zones or change nameservers.
2. Read current apex/www DNS records and GitHub → Settings → Pages (custom domain, HTTPS and publishing source), then reconcile with the [owner DNS runbook](github-pages-domain.md). **Preserve all existing MX, SPF, DKIM, DMARC, Workspace, verification and subdomain records.** Any DNS edit requires explicit owner approval based on current records.
3. Re-run `npm run audit:live` from a public-network GitHub runner and fix the **actual failed checks** in the responsible hosting layer. PR #20 already contains the 11 static pages; do not rewrite them to compensate for DNS.
4. Capture actual public browser screenshots for 390, 768, 1280 and 1920 px including company, product and one SEO detail page; check nav and horizontal overflow.
5. Repeat live audit at least 24 hours after first clean run. Log two artifact links, timestamp, commit SHA and a screenshot sheet. Mark Phase 1 **PASSED** only when all A1–A10 succeed. Never interpret a green CI run with a non-blocking probe as Phase 1 success.

## Backend impact

**No backend impact:** read-only site checks and documentation; no data tables/relations, APIs, QMS or marketing workflows, roles/permissions, tenant/process/classification controls, security policy, integrations/events or backend tests change. Existing unrelated [backend change-management PR #26](https://github.com/dbauto/thryvems-backend/pull/26) remains **Pending**.
