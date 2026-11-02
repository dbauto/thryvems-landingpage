# SEO Phase 3 — Commercial content and trustworthy search intent

Date: 2 Nov 2026 (Asia/Manila) · Scope: public static Thync & Thryve site · **Status: Phase 3 source content merged and released; post-release checks PASS. Google indexing/rankings and qualified organic inquiries NOT verified.**

## Objective

Make the existing pages more useful for Philippine buyers comparing **ISO consultancy**, **ISO 9001 certification preparation**, and **certification costs**, while keeping the existing site visuals and avoiding fabricated consulting credentials, certifications, office addresses, service areas, staff names, prices, reviews, published training dates or guaranteed certification claims.

**Content improvements without redesign:**

1. [ISO consultancy](/iso-consultancy-philippines/) — specific buyer questions about gap assessments, process owners, training, review work products, independent audit fees and client responsibilities.
2. [ISO 9001](/iso-9001-certification-philippines/) — real sample order/supplier/complaint evidence checks for audit readiness, plus the official [ISO announcement of ISO 9001:2026 published 16 September 2026](https://committee.iso.org/news/2026/09/ISO9001-2026). This confirms the edition but does not claim any client's certification/transition dates.
3. [ISO certification costs](/learn/iso-certification-cost-philippines/) — apples-to-apples quotation checks: consultancy versus external certification, Stage 1/2, taxes, travel, follow-up and surveillance; **no unverified peso amounts**.
4. [Certification steps](/learn/how-to-get-iso-certified-philippines/) — explains that consultancy prepares organizations but cannot issue ISO certification, with links to the commercial guide.

The approved six-item menu, existing Montserrat/Inter, colours, cards, responsive CSS, motion, page structure and disabled protected enquiry forms are unchanged. No new pages, city-specific landing pages, menu items, contact channels, tracking or software features are added.

## Measurable acceptance metrics

| ID | Completion criterion | Pass target | Evidence | Current |
| --- | --- | --- | --- | --- |
| C01 | One primary search intent per canonical page | Exactly **11/11 mapped**, no duplicate primary terms | `plan/seo-phase3-keyword-map.json`; `npm run audit:commercial-seo` | **PASS: 11/11** |
| C02 | Unique discoverable metadata | **11/11** distinct page titles and descriptions, title 15–72 chars, description 75–155 chars, exact canonical, one H1 | CI Phase 3 JSON and source checks | **PASS: 11/11** |
| C03 | Useful commercial content | **4/4** designated pages contain auditable buyer checklists and useful next steps; 600–1200 visible words on all 9 SEO detail pages | Explicit test fragments, build word-count test, editorial review | **PASS: automated 4/4, 9/9; published copy approved by owner, no unsupported organization-specific claims added** |
| C04 | Current authoritative technical fact | ISO 9001:2026 publication statement links to ISO's actual 16 Sep 2026 announcement | Source URL, checked edition against ISO | **PASS: source and link validated** |
| C05 | Honest certification separation | Consultant preparation and independent certification-body decision distinguished; **0 invented certificates, prices, testimonials, client names, credentials or service location claims** | Manual editorial spot-check + tests | **PASS: reviewed published wording; certification body separated, no unverified client/credential/pricing claims** |
| C06 | Working existing UI | All existing source checks, build, full Chromium e2e and live mobile 12/12 continue passing; design and six-item navigation unchanged | Exact-head GitHub Check and screenshots | **PASS: 53/53 e2e; 12/12 live; 16 new screenshots** |
| C07 | Security/backend boundary | **No** API, database, tenant/security, forms, cookie or backend workflow changes | Diff plus `plan/backend-impact.md` | **PASS: changes limited to static content/tests/docs** |
| C08 | Approval and release | Owner review/approval and successful post-merge HTTP 200 + canonical/robots and links checks on production | GitHub merge/release and public checks | **PASS: owner approved; [PR #23](https://github.com/dbauto/thryvems-landingpage/pull/23) merged, [Pages deployment](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405365398) successful, independent [live release check](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405690060) 4/4 PASS** |

**Phase 3 implementation/release acceptance: PASS (C01–C08).** The owner explicitly approved merging and proceeding; the public GitHub Pages deployment succeeded, and four targeted live page checks (HTTP 200, release content, exact canonical, H1, no noindex) passed. This is **not** proof of Google indexing, rankings or leads. Official service credentials/location/real case studies remain unpublished until source facts are confirmed.

## Measured Google outcomes — not acceptance of code quality

These are **targets, not guarantees**; a Search Console baseline is mandatory before measuring growth.

| ID | Metric | Measurement method | Proposed target |
| --- | --- | --- | --- |
| G01 | Brand search impressions | GSC query `Thync & Thryve`, trailing 28 days | Establish actual nonzero or zero baseline |
| G02 | Non-brand commercial impressions | GSC queries containing `iso consultancy`, `iso consultant`, `iso certification`, `iso 9001` (segment intent and company brand terms) | Target positive trend over two comparable 28-day windows after indexing |
| G03 | Commercial clicks | GSC Search results → pages (11 canonicals), clicks by 28-day window | Track real counts; do not calculate % increase from a zero baseline |
| G04 | Commercial keyword rank | Search Console query + landing-page position and impressions in Philippines (where sufficient observations) | Track 8 priority intent groups; long-term top 20 then top 10, not a PR completion gate |
| G05 | Inquiries from organic visitors | Only with approved working channel and privacy-compliant attribution | **Not measurable** while production enquiry forms remain disabled |
| G06 | Crawling/indexing progress | GSC Page indexing and URL Inspection records from Phase 2 | Target 8/11 indexed in 60 days, subject to Google's decision |

Do not fabricate volumes, keyword rankings, local presence or expert qualifications. Technical completion doesn't mean indexed, ranked or lead-generating.

## Open factual inputs before public business-identity enhancement

The following require owner confirmation **before adding claims**: the exact ISO standards the consultancy actively delivers, consultant credentials/experience that may be advertised, verified company office or service-area details, public contact/Viber number and permission to publish actual case studies or reviews. Until then, no map pack, FAQ, Google Business Profile, local office or testimonial markup is added.

Google's own [Search Essentials](https://developers.google.com/search/docs/essentials) and [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) prioritize useful, reliable content, clear search intent and crawlable links, **not keyword repetition**. The new pages maintain distinction between independent certification and consultancy.

## Backend impact and synchronization

**No backend impact:** no changes to database schemas, relationships, APIs, processes, workflows, permissions, QMS security, client isolation, classifications, integrations, events or backend tests. All changes are static content and QA. No backend architecture PR is needed; existing backend PRs #12, #27 and #28 remain independently pending and not resolved by this change.

## Evidence links (fill only after actual runs)

- [CI code+docs Check #41339949123](https://github.com/dbauto/thryvems-landingpage/actions/runs/41339949123): **SUCCESS**, syntax/typecheck, **27/27 unit tests** (12 Worker, 5 Phase 1, 5 Phase 2, 5 Phase 3), build, **53/53 Chromium tests (52.5s)** including 16 responsive screenshots from the four edited pages; public domain **18/18** and live responsive **12/12**. Phase 2 source discovery **11/11**.
- Phase 3 keyword map and metadata audit: **PASS 11/11**, 4/4 buyer-guide sections, zero duplicate titles and descriptions.
- [GitHub screenshot + JSON artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41339949123/artifacts/13096389855); representative 390/1280 snapshots were visually reviewed and showed retained existing layout. The original Phase 3 Pages release **deployed**; Google rankings/Search Console still **not verified**.
- UI appearance review: Same existing components and CSS; local modified-page 390/768/1280/1920 browser checks and screenshots **PASS**; current production site 12/12 PASS and all four revised content markers published (4/4 live PASS).

**Release verification 2 Nov 2026:** [PR #23 merged](https://github.com/dbauto/thryvems-landingpage/pull/23) at `96ec6654c68e33073bc11e5ec7d9aa06bd0b1b3a`; [GitHub Pages deployment 41405365398](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405365398) successful. [Main Check 41405365781](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405365781) successful: 18/18 DNS/HTTPS/source page probes, 12/12 live responsive tests and SEO source checks. [Independent Phase 3 live-content Check 41405690060](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405690060): four of four public pages responded HTTP 200 and contain the new guide section, expected canonical, exactly one H1 and no noindex. Its 3/3 new unit tests, build and 53/53 Chromium checks also pass. [Evidence artifact](https://github.com/dbauto/thryvems-landingpage/actions/runs/41405690060/artifacts/13123835911).

**Remaining external measurement:** Google Search Console Domain verification, index coverage, impressions, rankings and real attributable organic inquiries are **Pending** and cannot be inferred from CI. Phase 2 owner setup and Phase 1 24h repeat sign-off remain separate pending tasks.
