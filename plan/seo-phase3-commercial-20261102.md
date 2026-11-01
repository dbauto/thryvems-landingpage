# SEO Phase 3 — Commercial content and trustworthy search intent

Date: 2 Nov 2026 (Asia/Manila) · Scope: public static Thync & Thryve site · **Status: technical PR in progress, rankings NOT verified**.

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
| C01 | One primary search intent per canonical page | Exactly **11/11 mapped**, no duplicate primary terms | `plan/seo-phase3-keyword-map.json`; `npm run audit:commercial-seo` | Await CI |
| C02 | Unique discoverable metadata | **11/11** distinct page titles and descriptions, title 15–72 chars, description 75–155 chars, exact canonical, one H1 | CI Phase 3 JSON and source checks | Await CI |
| C03 | Useful commercial content | **4/4** designated pages contain auditable buyer checklists and useful next steps; 600–1200 visible words on all 9 SEO detail pages | Explicit test fragments, build word-count test, editorial review | Await CI |
| C04 | Current authoritative technical fact | ISO 9001:2026 publication statement links to ISO's actual 16 Sep 2026 announcement | Source URL, checked edition against ISO | Source verified; CI pending |
| C05 | Honest certification separation | Consultant preparation and independent certification-body decision distinguished; **0 invented certificates, prices, testimonials, client names, credentials or service location claims** | Manual editorial spot-check + tests | Manual reviewer signoff pending |
| C06 | Working existing UI | All existing source checks, build, full Chromium e2e and live mobile 12/12 continue passing; design and six-item navigation unchanged | Exact-head GitHub Check and screenshots | Await CI |
| C07 | Security/backend boundary | **No** API, database, tenant/security, forms, cookie or backend workflow changes | Diff plus `plan/backend-impact.md` | Static content only; review pending |
| C08 | Approval and release | Owner review/approval and successful post-merge HTTP 200 + canonical/robots and links checks on production | GitHub merge/release and public checks | **Pending approval** |

**Implementation complete** only when C01–C08 are met with actual CI evidence, release checks and editorial approval; code checks alone cannot prove rankings or business outcomes.

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

- CI typecheck, build and browser results: **Pending**
- Phase 3 keyword mapping/metadata JSON: **Pending**
- Production deployment and rankings/Google Search Console: **Not run**
- UI appearance review: Same existing components and CSS; source-only edit; production 390/768/1280/1920 screens not retested for this PR yet.

Next after PR checks: request owner review, then only after owner-approved merge verify production. Phase 2 owner GSC setup and URL Inspection remain separate **Pending** requirements.
