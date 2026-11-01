# GitHub Pages custom domain — Thync & Thryve (pending external DNS)

Date: 1 Nov 2026. Repository: `dbauto/thryvems-landingpage`.

## Intended domain
**`thycandthryve.com`** — chosen from the previously supplied company subdomain `thryems.thycandthryve.com` and earlier owner instructions. **Domain ownership/spelling and actual Cloudflare zone are NOT yet independently verified.** Do not merge or change public DNS if this spelling is incorrect. Company homepage remains `index.html`, and `thryvems.html` is the separate ThryveMS product landing. No site redesign or form activation is part of this PR.

## Current state and deployment
- Pages build and deployment already ran successfully on `main` via GitHub Pages' existing branch-based publishing (last observed public GitHub Pages deployment Check successful at source commit `4aaa3f0`).
- New `CNAME` at repository root points to company apex and will be picked up when merged into the existing publishing branch.
- The repo's `npm run build` also copies `CNAME` into `dist/` for matching test output. Do not switch publishing source or add an Actions deployment workflow just for this task.
- This PR **does not itself connect the domain, create an SSL certificate or touch Cloudflare DNS**.

## Owner's manual Cloudflare records, only after confirming actual registered domain
In Cloudflare Dashboard → select the account **that contains the domain's zone** → DNS → Records. Add these **only where no conflicting records exist**:

| Type | Name | IPv4 / target | Proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | dbauto.github.io | DNS only |

If preexisting apex or www records conflict, review them instead of overwriting blindly. **Do not touch** MX, SPF, DKIM, DMARC, Google Workspace, Microsoft 365, mail verification, other subdomains, existing HTTPS settings or nameservers. Do not add a wildcard record. No Cloudflare Pages deployment is necessary.

## GitHub Pages completion
1. Verify domain ownership for GitHub Pages under the domain owner's GitHub account when possible (GitHub recommends this to prevent domain takeover).
2. Merge this PR only once the correct domain has been confirmed and PR checks passed, with owner approval.
3. In GitHub → this repo → Settings → Pages, verify **Deploy from a branch / main / root** remains the publishing source and **Custom domain** shows `thycandthryve.com`; if it does not, enter and Save. GitHub's branch-based Pages uses the `CNAME` in the source root.
4. After owner updates Cloudflare, verify public DNS for apex (4 A records) and www (CNAME) and GitHub Pages' domain check.
5. Once certificate is issued, select **Enforce HTTPS**. Confirm apex and www HTTPS redirect, landing pages, favicon, links, and mobile navigation against real domain. Domain or HTTPS propagation can take up to 24 hours.
6. Contact forms remain preview-only on current `main`. Separate [landing inquiry PR #11](https://github.com/dbauto/thryvems-landingpage/pull/11) and [backend change-management PR #24](https://github.com/dbauto/thryvems-backend/pull/24) are pending. Do not claim email intake works or merge that PR as part of this domain-only change.

## Verified vs pending
**Previously verified:** GitHub Pages branch hosting emitted a successful deployment workflow; the company and product pages are structurally present and published on GitHub Pages. **Not verified:** domain's ownership/spelling and registered zone, external DNS, HTTPS/custom-domain GitHub settings, real inbound enquiry delivery. Connected Cloudflare users see zero DNS zones and the invited account's Pages API returns HTTP 403.

Links: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
