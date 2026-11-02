# Company navigation and dedicated menu pages — 3 Nov 2026

## Verified design gap

Before this change, HOME and SOLUTIONS had real pages, while LEARN, TRAININGS and ABOUT US linked to sections on the company homepage. CONSULTANCY linked inconsistently: a homepage section from HOME and a standalone ISO-consultant guide from detailed pages. Users moving from one page to another did not have a consistent six-part menu.

## Minimal approved fix

Retain the **same labels and order** without redesigning the homepage or the product's specialized internal navigation.

| Menu | Route | Page status |
| --- | --- | --- |
| HOME | `/` | Existing company homepage |
| LEARN | `/learn/` | New resource overview; links to certification process and costs |
| TRAININGS | `/trainings/` | New training-topic overview; links to internal auditor guide |
| CONSULTANCY | `/consultancy/` | New standards/service directory; links to existing ISO consultancy and specific standards |
| SOLUTIONS | `/thryvems.html` | Existing ThryveMS product landing; internal product section navigation remains |
| ABOUT US | `/about/` | New factual company overview; no fabricated credentials, people, location, testimonials |

The current homepage scrolling/storytelling sections, motion, 7 ISO topic expansions, and disabled enquiry forms remain. Existing long SEO detail pages remain unchanged except for their six header destinations and relevant breadcrumb links. Their 11 canonical URLs are unchanged. The new four overview pages use the established static `seo-service.css` visual system.

## Metrics and release acceptance

| Gate | Target | Status |
| --- | --- | --- |
| NAV-01 | All six top menu labels have stable dedicated destinations; no renamed/reordered menu | **PASS local: six links and unchanged order** |
| NAV-02 | Exactly four new, distinct pages, 200 in local build and after approved deployment | **PASS local 4/4; live post-merge PENDING** |
| NAV-03 | Navigation on homepage and existing 9 detail pages points to the same six destinations | **PASS source and browser regression** |
| NAV-04 | Four overview pages each have unique title, description, canonical, one H1, structured data, real explanatory content, five FAQs | **PASS source and browser QA; 15/15 mapped pages** |
| NAV-05 | Local browser tests at 390, 768, 1280, 1920px: 16 overview screenshots, no horizontal scroll, header active state, link click to correct route | **PASS: 16/16 screenshot cases; reviewed 390px and 1280px for all 4 pages** |
| NAV-06 | Original tests, typecheck, build, full Chromium e2e and `Check` workflow pass | **PASS on code+docs head: 30/30 unit, 55/55 Chromium, Check success** |
| NAV-07 | `sitemap.xml` includes all 15 URLs with 4 new `NOT_VERIFIED` GSC entries; existing 11 index statuses not falsely claimed | **PASS in source/CI; Google discovery still PENDING** |
| NAV-08 | Owner review and approval before PR merge/deploy; follow-up live page audit proves 4/4 published | Pending |

**Google Search Console:** Google had previously accepted a sitemap with 11 pages, and PR #27 records their direct URL Inspection observations (11 initially unknown to Google, indexing requested). This navigation PR proposes adding four *new* canonical URLs. Neither their inclusion in a GitHub branch nor source CI proves Google has crawled/indexed them. Avoid resubmitting duplicate indexing requests for the original 11. Coordinate the approved sitemap's new 15-page version with the existing Search Console records only after deployment and confirm Google discovered the additional four. Do not silently overwrite PR #27's pending observations during a merge.

**No backend impact:** no schemas, relationships, QMS APIs, workflows, roles, security, access/classification rules, cloud integrations, events, or backend tests changed. Static website navigation and SEO only; no backend PR.

**Verified test evidence:** [GitHub Check #41483047524](https://github.com/dbauto/thryvems-landingpage/actions/runs/41483047524) **SUCCESS** after fixing an outdated 11→15 unique URL unit assertion. JS/typecheck 30/30 units, static build, **55/55 local Chromium e2e (58.5 seconds)**, 15/15 source discovery (max 1 click) and commercial keyword mapping (zero duplicate titles) PASS. [Screenshot and JSON artifact 13161115204](https://github.com/dbauto/thryvems-landingpage/actions/runs/41483047524/artifacts/13161115204): **16 new menu page screenshots**. I manually viewed representative 390px and 1280px captures for all four hubs; font, header, active-page highlight and body width match the current brand, with no mobile horizontal overflow.

**Live production gate remains PENDING:** 17/22 public SEO checks passed on the old deployed site. Four new routes return not-yet-deployed results and the sitemap still lists 11 on production, as expected before a merge. The green CI job **does not** establish production 15/15, sitemap acceptance or Google's indexing. [Post-approval] merge/deploy, then rerun the production audit expecting **22/22**, mobile **12/12**, and verify four new URLs directly.

**Pending owner approval:** NAV-08 and any merge/deployment. Pending PR #27 on the original 11 Search Console results must be reconciled without overwriting its evidence.
