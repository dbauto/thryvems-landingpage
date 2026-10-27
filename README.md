# Thync & Thryve website

Static landing pages for Thync & Thryve and its ThryveMS quality management software.

| Page | File |
|---|---|
| Company homepage (Home, Learn, Trainings, Consultancy, Solutions, About us) | `index.html` |
| ThryveMS solution page, with plans and pricing calculator | `thryvems.html` |
| Logos (transparent SVG and PNG, standard and reverse) | `assets/` |

No build step. Open `index.html` in a browser, or publish the folder with GitHub Pages (Settings › Pages › Deploy from branch › `main` / root).

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
