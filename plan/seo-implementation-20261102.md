# Thync & Thryve — Philippine SEO plan and audit (2 Nov 2026)

**Status:** Implementation PR for technical fixes and initial published pages. Do not promise Google indexing, top-10 rankings, paid consultation, published course dates, accreditation or corporate location. Existing six-item nav, logo, palette, typography, motion, price calculator and protected contact form are preserved. No production merge without owner review.

## 1. Diagnosis ranked by likely effect

| Rank | Finding | Evidence | Next action |
|---|---|---|---|
| 1 | Discovery and indexing not proven | Public site was not accessible to external page fetch during audit; Search Console coverage inaccessible. No `sitemap.xml` or `robots.txt` previously in repo | Publish crawlable files and verify live HTTPS, Search Console Pages, URL Inspection, indexed status |
| 2 | Wrong canonical on ThryveMS | Prior product canonical pointed to `dbauto.github.io` despite custom domain | Set canonical to `https://thyncandthryve.com/thryvems.html` |
| 3 | One homepage attempts many unrelated intents | Standards are inside homepage accordion, with no separately indexable topic pages | Static standards, consultancy, training and article pages; links from homepage |
| 4 | Weak homepage query alignment | Generic title and slogan-only H1; no brand domain OG / Organization JSON-LD | Improve meta, add visibly scoped H1 qualifier, keep original hero slogan |
| 5 | Authority / local entity signals unverified | No access to GSC, backlinks account, registered NAP or GBP; cannot assert zero backlinks or missing listing | Verify GBP, real address/phone, track referring domains, reputable relevant citations |

**Rendering:** site is *static HTML*, not a client-only React SPA. Server-side generation/prerendering is already achieved by committing HTML pages to the GitHub Pages repository. Do not introduce SSR/Next.js or a framework rewrite.

**Ranking:** Google does not guarantee indexing or top ten. No authoritative keyword volumes, Google Search Console data, ranking or Ahrefs backlink index access exists in this audit. “Not found in search” may indicate lack of indexing, relevance/authority, search personalization, or an HTTPS response issue; diagnose in that order.

## 2. Keyword map

| Canonical page | Primary keyword | Secondary terms (target naturally; not repeated unnaturally) | Intent |
|---|---|---|---|
| `/` | ISO consultancy Philippines | ISO consulting services Philippines, ISO training consultancy | Brand / commercial |
| `/iso-consultancy-philippines/` | ISO consultancy Philippines | ISO consultant Philippines, ISO certification consultant | Commercial comparison |
| `/iso-9001-certification-philippines/` | ISO 9001 certification Philippines | ISO 9001 consultant Manila, ISO 9001:2026 requirements, quality management consultancy | Transactional / commercial |
| `/iso-14001-certification-philippines/` | ISO 14001 certification Philippines | ISO 14001 consultant, environmental management systems | Commercial |
| `/iso-45001-consultant-philippines/` | ISO 45001 consultant Philippines | occupational safety management system, ISO 45001 training | Commercial |
| `/iso-27001-consultant-philippines/` | ISO 27001 consultant Philippines | ISO/IEC 27001 certification Philippines, ISMS consultancy | Commercial |
| `/iso-22000-consultant-philippines/` | ISO 22000 consultant Philippines | food safety certification consulting, FSMS implementation | Commercial |
| `/trainings/iso-internal-auditor-training-philippines/` | internal auditor training Philippines | ISO training Philippines, ISO 9001 internal auditor training, audit course | Training research / booking |
| `/thryvems.html` | QMS software Philippines | document control software, ISO 9001 audit software, QMS platform | Software evaluation |
| `/learn/how-to-get-iso-certified-philippines/` | how to get ISO certified in the Philippines | steps for ISO certification, ISO 9001 implementation | Informational |
| `/learn/iso-certification-cost-philippines/` | ISO certification cost Philippines | ISO 9001 cost, consultant fees, certification audit cost | Informational / commercial |
| `/learn/iso-9001-requirements-philippines/` **[PROPOSED]** | ISO 9001 requirements Philippines | ISO 9001:2026 checklist, QMS clause interpretation | Informational |
| `/about/` and `/contact/` **[PROPOSED]** | ISO consultant company Philippines; ISO consultancy contact Philippines | location-specific keywords after genuine NAP confirmation | Navigational / local |

Keywords are **intent hypotheses**, not validated search-volume or position measurements. Avoid creating city-specific near-duplicate pages without an actual service-area connection and genuinely distinct local content. Existing `/#about` and `/#contact` remain the current URLs pending approved address/phone and booking facts. Existing `/thryvems.html` is retained as the software canonical to avoid broken external links. A later proposed `/solutions/thryvems/` route requires a documented 301 redirect/migration plan; no duplicate canonical was created.

## 3. URL and internal-link rules

- Keep existing navigation exactly: HOME, LEARN, TRAININGS, CONSULTANCY, SOLUTIONS, ABOUT US. Its anchors may continue pointing to the homepage; no menu redesign.
- Homepage links directly to **all published topic pages** in a new contextual resource section. Site root and product page retain their existing filenames and navigation.
- Every standard detail page links to consultancy, relevant other standards and ThryveMS, without claiming software certifies anyone.
- Every training and article page links back to one or more relevant commercially useful service pages using descriptive anchor text, and the homepage.
- Article-to-article links should go only to URLs that already exist. There are no broken placeholders or soft redirects.
- Article authorship and review credentials, company address and contact detail remain **[PLACEHOLDER]** until approved.
- Current generated pages are full HTML with primary text present without JavaScript and unique title/meta/canonical/H1, JSON-LD and visible FAQ.

### Current canonical URLs

`/`, `/thryvems.html`, `/iso-consultancy-philippines/`, `/iso-9001-certification-philippines/`, `/iso-14001-certification-philippines/`, `/iso-45001-consultant-philippines/`, `/iso-27001-consultant-philippines/`, `/iso-22000-consultant-philippines/`, `/trainings/iso-internal-auditor-training-philippines/`, `/learn/how-to-get-iso-certified-philippines/`, `/learn/iso-certification-cost-philippines/`.

### On-page implementation and structured data

- Company homepage: keyword-targeted title/meta/H1 qualifier, canonical, OG/Twitter, Organization, WebSite and ProfessionalService (without invented street, phone or review score).
- ThryveMS: current custom-domain canonical, software metadata, SoftwareApplication JSON-LD identifying it as *developing software*; no fabricated pricing ratings or launch guarantees.
- Standard pages: six original 700–900+ word static articles each with six visible FAQs, Service, BreadcrumbList, FAQPage JSON-LD.
- Training: one original >600-word static page and Course markup, without a falsely published date, attendance slot, fee or credential.
- Learning: two original >600-word article pages with FAQ and BreadcrumbList JSON-LD.
- Current phone, Viber URL, staffed address and postal address are **[PLACEHOLDER]**, and so is any live map embed. Do not add Business schema `address`/`telephone` or Google Maps iframe until verified.
- FAQ structured data is permitted but Google restricts FAQ rich results primarily to authoritative government/health sites: **no FAQ rich snippet is promised**.
- No `hreflang` tag is necessary for the current single language (`lang=en-PH`). Only add `hreflang` after real localized alternate URLs exist.

## 4. Technical SEO release and verification

1. Confirm **HTTP 200** for main page, product, every slash-terminated topic URL, `/sitemap.xml` and `/robots.txt` from the public custom domain. Confirm **valid TLS** for apex and www (prior HTTPS certificate problem may still exist; GitHub Pages workflow success alone is not TLS proof).
2. Confirm one preferred apex HTTPS URL. The sitemap uses `https://thyncandthryve.com/`, and the company/product canonicals use the same origin. If www or `dbauto.github.io` returns duplicate pages, verify one permanent 301 or Google's final chosen canonical in Search Console; do not invent redirect settings.
3. Inspect source HTML with JavaScript disabled; titles, H1, body, FAQ, JSON-LD and anchor links are still present.
4. New `robots.txt` allows crawling and points to the sitemap; `sitemap.xml` lists only **11** canonicals intended for indexation. The legal cookies page is `noindex,follow`; clean 404 page is `noindex`.
5. **Web performance:** run Lighthouse/PageSpeed Insights *on the live site* mobile/desktop and inspect CWV field data after traffic. Targets p75 LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms. Existing hero uses CSS/text and product motion: keep existing animations but test LCP/INP, font loading and reduced motion. New content pages have a width/height-defined brand logo, no layout-shifting illustration, and no content JS.
6. Future image work: compress **real, licensed or owned** photographs into `assets/iso-consultancy-philippines.webp`, `assets/iso-9001-audit-workshop.webp` or AVIF if supplied; provide factual alt text (e.g., “Facilitator reviewing a quality process map during an ISO training workshop”). Do not invent client photos, audit imagery or photographic evidence. Use `loading="lazy"` for below-fold media, `decoding="async"` and reserve intrinsic dimensions; do not lazy-load an actual LCP hero image.
7. Fonts: existing Inter/Montserrat from Google Fonts with `display=swap`; keep same typography. If file ownership and licensing permit, self-host optimized subsets only after performance measurement.
8. After release, test internal links from each section, mobile 390/768/1280/1920, keyboard focus, supported robots and sitemap, no JS errors and HTTP 404 for nonexistent pages. Check robots and meta do not block target URLs. **Do not mark metrics achieved without Lighthouse/CrUX tests.**

## 5. Local SEO rollout (requires company facts)

**Do not use the user's approximate device location as company address.** Obtain a legitimate office location with consent for public display, staffed/public-facing or service-area status, company-controlled phone/Viber, business hours, legal business name and list of areas actually served.

1. Visit https://business.google.com/ and check whether the business profile already exists. Claim rather than duplicate it.
2. Set the real business name **Thync & Thryve** and a Google-available primary business category matching actual services (likely business management consultant or consultant; check the current category list, do not invent a category). Add training and software as accurate services, not keyword stuffing.
3. Use a real staffed office and full publicly visible NAP *only if clients may visit during stated hours*. If service-area-only, hide residential/un-staffed address and specify real travel service areas. Google normally expects an individual service area to be reasonably reachable (roughly two hours from base); do not claim an implausible nationwide local service radius. Website itself may mention remote delivery across the Philippines after business confirms.
4. Verify profile via Google's available method, using authorized identity/business proof. Do not reuse competitors' locations, virtual offices or fake documents.
5. Link canonical homepage, add genuine business hours, accurate description, photos of actual staff/premises/training activity when consented, and service descriptions matching visible pages.
6. Ask actual clients **without incentives** for honest reviews; respond professionally, don't publish personal data. Do not write fake endorsements.
7. Post relevant training schedules, standard update guides, workshops or published resources monthly only after accurate approval.
8. Put the same confirmed NAP on homepage/contact/footer, Business Profile and every submitted listing. Keep a spreadsheet of variations. Add an embedded map only for a **verified, public staffed business address** (not hidden service-area residence). Prefer click-to-open Maps link or lazy-loaded iframe that does not create needless third-party tracking.

### Local citations and relationships to check

- [Google Business Profile](https://business.google.com/) — essential local listing.
- [Philippine Chamber of Commerce and Industry](https://www.philippinechamber.com/membership) and [PCCI local chambers](https://pcci.itcbs.net/local-chambers/) — membership and local chamber networks, not an automatic free directory.
- [Philippine Yellow Pages](https://www.yellow-pages.ph/) — check eligibility and listing policies.
- [BusinessList Philippines](https://www.businesslist.ph/) — verify listing accuracy and any current fee before submitting.
- [LinkedIn Company Pages](https://www.linkedin.com/company/setup/new/) — publish only an actual business-owned profile.
- Industry-specific association directories relevant to the confirmed industry and real membership, plus local LGU/chamber business lists where allowed.

Prioritize a handful of accurate, legitimate listings, not bulk directory automation. Some sites may charge fees or reject free listings.

## 6. Authority and ethical link earning

**No purchased links, private blog networks, fabricated case studies, review exchanges or unrelated directory blasts.**

- Week 1–2: document author expertise and a reviewed company profile with real credentials once provided. Add citations to standards publishers (ISO), DTI/PAB, official applicable regulations when discussing them.
- Week 3–5: offer a well-researched ISO 9001:2026 transition explanation to chambers, SME newsletters and relevant professional associations without requiring a dofollow link.
- Week 4–7: create one original practical template, e.g., a non-proprietary “QMS process map planning checklist”, with a clear source and licence. If training is held, publish non-confidential photos and recaps only with permission.
- Week 6–9: ask genuine training partners and certification bodies to link to factual, non-exclusive resource contributions **only if a real relationship exists**. Keep consultant/certifier independence transparent; do not imply accreditation or audit guarantee.
- Week 8–12: publish real, consented success stories with verifiable context; avoid publishing client identity, outcome percentages, ISO certificate screenshots or testimonial quotes without documented authorization.
- Monthly: track new referring domains, link relevance and branded search queries alongside qualified enquiry outcomes. Outreach is relationship-building, not paid rank manipulation.

## 7. 12-week LEARN content calendar (2 articles/week)

Each row is a proposed future article unless marked **PUBLISHED IN SEO PR**. Outlines and links are editorial instructions, not published claims. Internal links use existing pages only.

| Week | Proposed article (two weekly) | Primary keyword | Outline | Internal links |
|---|---|---|---|---|
| 1A | **How to get ISO certified in the Philippines** — PUBLISHED IN SEO PR | how to get ISO certified Philippines | choose standard; scope; gap; implement; internal audit; choose body | `/iso-consultancy-philippines/`, `/iso-9001-certification-philippines/` |
| 1B | **ISO certification cost in the Philippines** — PUBLISHED IN SEO PR | ISO certification cost Philippines | consultant vs auditor; sites; fees; surveillance; quote checklist | `/iso-consultancy-philippines/`, `/iso-9001-certification-philippines/` |
| 2A | ISO 9001:2026 requirements for Philippine SMEs | ISO 9001 requirements Philippines | new edition; process approach; leadership; documented information | `/iso-9001-certification-philippines/` |
| 2B | What ISO 9001 certification does and does not prove | ISO 9001 certification meaning | certification body; scope; PAB; surveillance | `/iso-9001-certification-philippines/` |
| 3A | Internal auditor training: course-selection checklist | internal auditor training Philippines | learning goals; sampling; assessment; provider verification | `/trainings/iso-internal-auditor-training-philippines/` |
| 3B | ISO 9001 document control explained | document control ISO 9001 | revisions; ownership; approval; obsolete records | `/thryvems.html`, `/iso-9001-certification-philippines/` |
| 4A | ISO 14001:2026 changes and transition questions | ISO 14001:2026 Philippines | environmental aspects; applicability; gap; audit | `/iso-14001-certification-philippines/` |
| 4B | Environmental aspects: examples by business process | environmental aspects ISO 14001 | energy; waste; suppliers; significant aspects | `/iso-14001-certification-philippines/` |
| 5A | ISO 45001 hazard identification for contractors | ISO 45001 contractor risk | scope; worker involvement; hazard review | `/iso-45001-consultant-philippines/` |
| 5B | ISO 45001 versus Philippine OSH compliance | ISO 45001 Philippines OSH | certification vs legal duties; risk ownership | `/iso-45001-consultant-philippines/` |
| 6A | ISO 27001 scope for a Philippine services company | ISO 27001 scope examples | data; processes; suppliers; exclusions | `/iso-27001-consultant-philippines/` |
| 6B | Risk treatment in an ISMS: business-friendly guide | ISO 27001 risk treatment | risks; owners; controls; evidence | `/iso-27001-consultant-philippines/` |
| 7A | ISO 22000 versus HACCP: what differs? | ISO 22000 vs HACCP | management system; hazards; prerequisites | `/iso-22000-consultant-philippines/` |
| 7B | How a food business tests traceability | food traceability ISO 22000 | product lots; mock recall; corrections | `/iso-22000-consultant-philippines/` |
| 8A | ISO management review agenda that leads to decisions | ISO management review agenda | inputs; leadership; actions; follow-up | `/iso-9001-certification-philippines/`, `/thryvems.html` |
| 8B | Internal audit findings: writing useful nonconformities | internal audit nonconformity | evidence; criteria; statement; follow-up | `/trainings/iso-internal-auditor-training-philippines/` |
| 9A | Supplier evaluation under ISO 9001 | ISO 9001 supplier evaluation | controls; supplier risk; review; reapproval | `/iso-9001-certification-philippines/` |
| 9B | How to prepare for ISO Stage 1 audit | ISO stage 1 audit Philippines | scope; documentation; readiness; next steps | `/iso-consultancy-philippines/` |
| 10A | How ISO certificates are checked for validity | verify ISO certification Philippines | issuer; scope; accreditation; dates | `/iso-consultancy-philippines/` |
| 10B | ISO audit planning across multiple sites | multi site ISO audit | head office; sampling; evidence; coordination | `/iso-9001-certification-philippines/` |
| 11A | QMS software versus SharePoint and spreadsheets | QMS software vs spreadsheet | controls; approvals; links; history | `/thryvems.html` |
| 11B | Corrective action: finding root causes without blame | ISO corrective action | containment; cause; action; effectiveness | `/iso-9001-certification-philippines/` |
| 12A | Preparing for customer and procurement ISO requirements | ISO supplier certification Philippines | buyer requirements; tender clauses; scope | `/iso-consultancy-philippines/` |
| 12B | ISO 9001 readiness checklist for a Philippine SME | ISO 9001 readiness checklist | scope; competence; process controls; audits | `/iso-9001-certification-philippines/`, `/thryvems.html` |

**Editorial rules:** Original, technically reviewed copy; at least one useful example per article; source legal/standard claims; visible author/reviewer only after providing real credentials and approval; no unverifiable promises. Publish gradually (not automatically) and expand internal links naturally.

## 8. Google Search Console and GA4

### Search Console (first priority)
1. Log into https://search.google.com/search-console with the owner Google account.
2. Add **Domain property** `thyncandthryve.com` and verify ownership using the exact DNS TXT Google supplies. **Do not change records without reviewing and approving the write.** Alternatively verify an HTTPS URL-prefix property through supported methods; it covers only that prefix.
3. Inspect homepage and `/thryvems.html`; read Indexing → Pages, Crawled/Discovered not indexed, and **Google-selected canonical**. Check HTTPS and manual actions/security issues.
4. After successful deployment and HTTP/TLS verification, submit `https://thyncandthryve.com/sitemap.xml` in Sitemaps. Inspect new service articles and request indexing where appropriate. Google says crawling may take days or weeks.
5. Save a baseline of Performance → Search results, Web, Philippines, last 28 days: branded vs unbranded queries, impressions, clicks, CTR, average position, landing pages, devices; do not interpret “site:” as exact index coverage.
6. Review weekly: failed sitemap fetches, page-exclusion reasons, canonical mismatches, 4xx/5xx, mobile performance, keyword/page matches and qualified enquiry counts. Compare 28-day windows, not daily fluctuations.

### Analytics 4 (only after tracking consent/privacy decision)
1. In https://analytics.google.com create/review the **business-owned** GA4 property and Web stream for the canonical domain. Do not invent a measurement ID.
2. Check lawful basis and the website's existing cookie notice: it currently states **no optional analytics cookies**; do **not** insert GA4 tags until the operator updates notices, applies necessary consent controls and approves their data handling.
3. Configure measurement for meaningful actions: `view_service`, `view_training`, `contact_form_start`, `contact_form_submit_success` **only after real verified delivery**, and `software_walkthrough_request` after product form validation.
4. Avoid collecting form fields, names, email addresses, free-text messages, Turnstile tokens or other personal details in analytics events. Mark the verified inquiry-success action as a key event.
5. Link GA4 and Search Console once correct owners authorize; use acquisition and landing page reports to understand search traffic and qualified inquiries, not only sessions.

### Useful weekly performance report

| KPI | Baseline | 30d | 60d | 90d |
|---|---|---|---|---|
| Canonical pages indexed / eligible 11 | [GSC DATA] | TBD | TBD | TBD |
| Non-brand PH impressions/clicks | [GSC DATA] | TBD | TBD | TBD |
| Top-20 / top-10 long-tail keywords | [TRACKING REQUIRED] | TBD | TBD | TBD |
| Qualified organic enquiries | [FORM NOT ACTIVE] | TBD | TBD | TBD |
| Referring domains from relevant organizations | [LINK AUDIT REQUIRED] | TBD | TBD | TBD |
| Mobile p75 LCP, INP, CLS | [CWV DATA] | TBD | TBD | TBD |

## 9. 30/60/90-day execution plan

**Days 1–30:** Confirm TLS, branch tests, owner review and deployment; verify robots, sitemap, canonical URLs and 11 200-status pages; claim GSC; submit sitemap and inspect top 3 pages; collect approved NAP and service areas, verify actual standard offerings; secure independent form activation and consent; start GBP verification if eligible; publish/verify first two articles.

**Days 31–60:** Validate 11 URLs' indexing and fix GSC exclusions; review keyword-to-URL mapping with real impressions; optimize sections based on actual user questions; confirm training dates/credentials before Course offers; create first 4–8 future articles through review; join relevant approved chambers and outreach; gather genuine photos and client-authorized stories; run live Lighthouse and remediate real LCP/INP/CLS issues.

**Days 61–90:** Continue two quality articles weekly only when reviewed; create service-area landing pages **only after confirming true geographic presence and unique local value**; source real associations and partner links; evaluate non-brand ranking growth, impressions, inquiries and conversion; strengthen underperforming articles rather than publishing near-duplicates; review GBP insights and legitimate customer feedback.

**Timelines are estimates, not promises:** technical indexing may improve within days/weeks after verification, long-tail visibility can take several months, and top-ten visibility for broad competitive national keywords can take six to eighteen months or longer depending on site authority, competition and actual execution. A new domain may have no top-ten result within 90 days. Don't treat SEO copy word count or structured-data presence as a ranking guarantee.

## Missing business facts: require confirmation before further publication

- [PHYSICAL OFFICE ADDRESS OR SERVICE-AREA BUSINESS STATUS] — never infer from device location.
- [CITY/REGION AND ACTUAL CLIENT SERVICE AREAS], [PHONE/VIBER], [PUBLIC BUSINESS EMAIL], [BUSINESS HOURS].
- [OFFICIAL REGISTERED BUSINESS NAME, DTI/SEC REGISTRATION APPROPRIATELY DISCLOSED].
- [CONFIRM ALL FIVE ISO CONSULTANCY/TRAINING AREAS: 9001, 14001, 45001, 27001, 22000]; existing homepage lists them, but authorization and trainer capacity remain to confirm.
- [AUTHORIZED CONSULTANTS, CERTIFICATES OR PROFESSIONAL MEMBERSHIPS] — never invent personal names, certificates, accreditation, partnerships or testimonials.
- [REAL TRAINING COURSES, SCHEDULES, FEES, FORMAT AND ACCEPTABLE CERTIFICATE WORDING].
- [CONSENTED CLIENT CASE STUDIES/PHOTOS], [REAL GBP PROFILE], [GSC PROPERTY], [GA4 WEB DATA STREAM ID], [ALLOWED TRACKING/PRIVACY REVIEW].
- [FREE CONSULTATION OFFER AND DELIVERY METHOD] — not currently confirmed. CTA deliberately points to company enquiry information without promising free consultation or active submission.

### References checked
- ISO official editions: https://www.iso.org/standard/9001 and https://www.iso.org/standard/14001
- Google SEO fundamentals: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google XML sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google recrawl: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google Business Profile guidelines: https://support.google.com/business/answer/3038177
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- FAQ rich result limitations: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- DTI accreditation context: https://www.dti.gov.ph/ and https://www.certificationinternational.ph/faq (verify directly with the DTI-PAB for authoritative accreditation information)
- Philippine Chamber: https://www.philippinechamber.com/membership
