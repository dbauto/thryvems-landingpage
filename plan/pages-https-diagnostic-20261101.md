# Custom-domain HTTPS diagnosis — 1 November 2026

**Status: confirmed blocker, corrective action pending owner GitHub Pages settings access.** This PR is read-only, not for merge.

From GitHub-hosted runner, [Check 41295388737](https://github.com/dbauto/thryvems-landingpage/actions/runs/41295388737), the script `scripts/diagnose-https.mjs` checked DNS records, certificate and direct HTTPS/HTTP on both company hosts. The authenticated GitHub Pages API was queried with read-only `pages:read` permissions.

| Check | Observed result |
|---|---|
| Apex DNS A | All four expected GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| Apex DNS AAAA | No record (acceptable; optional) |
| Apex CAA | No record (acceptable; no restriction observed) |
| WWW DNS CNAME | `dbauto.github.io` (correct) |
| WWW CAA | `letsencrypt.org` explicitly permitted |
| Apex HTTP | 200, `server: GitHub.com` |
| WWW HTTP | 301 to `http://thyncandthryve.com/` |
| Apex/WWW HTTPS | TLS handshake returns default certificate `*.github.io`, **not valid** for company domain; `ERR_TLS_CERT_ALTNAME_INVALID`; HTTPS client rejects |
| GitHub Pages API (200) | `cname: thyncandthryve.com`, `https_enforced:false`, `https_certificate:null` |
| Source CI | Typecheck, build, diagnostic and browser regression **37/37 passed (44.1 s)** |

**Diagnosis:** Public DNS records, site routing, repository custom domain and web pages are working, but GitHub has not created/attached a TLS certificate for the custom domain. Enforce HTTPS cannot provide valid TLS until this is resolved. This is not a JavaScript/assets issue; no DNS changes should be made based on the evidence above.

## Minimal corrective action in GitHub's browser UI
1. Open https://github.com/dbauto/thryvems-landingpage/settings/pages as an account with repository admin rights.
2. Under **Custom domain**, ensure exactly `thyncandthryve.com`. GitHub's documentation directs that if certificate creation remains stuck, click **Remove**, then re-enter the **same domain** and **Save** to restart certificate provisioning. This may temporarily affect custom-domain routing; schedule carefully. Do not remove the `CNAME` file from the repository, delete DNS, disable the site or touch email records.
3. Check DNS validation and certificate state in Pages. After a valid certificate is issued, enable **Enforce HTTPS** and save.
4. Verify `https://thyncandthryve.com/`, `https://www.thyncandthryve.com/`, and `https://thyncandthryve.com/thryvems.html` with a valid certificate and secure redirection. If certificate remains absent after provisioning window, raise a GitHub Support ticket with this runner evidence.
5. The connected GitHub app does not expose Pages settings update or the certificate provisioning UI; this PR deliberately uses a read-only token and does not attempt unauthorised writes or change production configuration.

Documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

**Backend impact:** None, read-only hosted-site diagnosis. QMS security/permissions/classification/organizations/client scopes/APIs/DB untouched. Public inquiry backend PR #24 remains separate and Pending.
