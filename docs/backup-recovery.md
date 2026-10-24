# Backup, recovery and incident response

## What needs protecting

| Asset | Where it lives | Backup |
|-------|----------------|--------|
| Source code, content, images, fonts | GitHub `punit-mistry/healthy-e-living` | Git history. **Add a second copy** — see below |
| Deployment configuration | `next.config.mjs` (in git) and Vercel project settings (domains, team) | Screenshot or export Vercel settings after any change and store them with the access register |
| Environment variables | **None needed.** The site reads only platform-provided `VERCEL_ENV`/`NODE_ENV` | — |
| Domain and DNS | Registrar | Export the DNS zone file (or screenshot every record) after any change |
| Analytics | Vercel Web Analytics | Not critical; aggregated only |
| Client records | **Not on this website** (WhatsApp, email, Irika's own records) | Outside the scope of this site. Irika should back up her WhatsApp Business chats and consultation notes separately |

There's no database or user-uploaded content, so the website can always be rebuilt entirely from the repository.

### Second copy of the code (recommended)
Git hosting is reliable, but a lost or compromised GitHub account is a single point of failure.

- **Monthly**, or before any major change: `git clone --mirror https://github.com/punit-mistry/healthy-e-living.git` and store the result in a separate location (for example an encrypted drive or a different cloud account), **not** using the same login as GitHub.
- Keep the last 3 monthly copies.
- **Test restoring once a quarter:** clone from the backup, run `npm ci && npm run build`, and confirm it builds.

## Known-good releases and rollback

- Vercel keeps every production deployment. **To roll back:** Vercel → Project → Deployments → pick the last good one → **Promote to Production** (or "Instant Rollback"). This takes seconds and needs no rebuild.
- Tag releases in git so a good version is easy to find: `git tag release-2026-11-01 && git push --tags`.
- **Always deploy through a preview first.** Open the PR, check the preview URL, run `npm run audit:site -- <preview-url>`, then merge.

## Monitoring (set up once)

- [ ] **Uptime monitor** on `https://www.healthelivingwithirika.com/`, checking every 5 minutes with alerts by email or WhatsApp. Free options: UptimeRobot, Better Stack, Cronitor.
- [ ] **Vercel deployment notifications** (Settings → Notifications) for failed builds.
- [ ] **Search Console email alerts** (on by default for verified owners) for indexing and security issues.
- [ ] **Domain and certificate expiry:** turn on auto-renew at the registrar and put the renewal date in a calendar. Vercel renews TLS certificates automatically, but only if DNS still points at Vercel.

## Incident runbooks

### Site is down or showing errors
1. Check <https://www.vercel-status.com/>. If Vercel has an incident, wait, and post on Instagram that WhatsApp booking still works: +91 88790 43297.
2. If a recent deploy caused it, **roll back** (above).
3. If the domain doesn't resolve, see "Domain or DNS problem".

### Bad or broken deploy
1. Roll back in Vercel immediately.
2. Reproduce locally: `npm ci && npm run build && npm run start`, then `npm run audit:site` and `npm run check:browser`.
3. Fix it, deploy to a preview, verify, and only then merge.

### Domain or DNS problem
1. Log in to the registrar: is the domain expired, transferred or locked? Are the nameservers and records unchanged (compare with your saved zone export)?
2. If records were changed without authorisation, treat it as an **account compromise** (below).
3. Restore the records from your export; Vercel → Domains shows which records it expects.

### Account compromise (GitHub, Vercel, registrar, Google)
1. Use the account-recovery route **from a clean device**. Change the password and revoke all sessions and tokens.
2. Re-enable MFA and generate new recovery codes.
3. Review: Vercel members and tokens, GitHub collaborators and deploy keys, registrar contacts, DNS records.
4. Compare the production deployment's git commit against your known-good tag; redeploy from a commit you trust.
5. If the site served malicious content, check Search Console → Security issues and request a review once it's clean.

### Defacement or unexpected content
1. Roll back to the last known-good deployment.
2. Find out how it happened: who pushed, which account, which commit (`git log`). Then follow "Account compromise".

### Traffic spike or DDoS
1. Vercel mitigates volumetric attacks automatically.
2. If the site is still slow: Vercel → Firewall → turn on **Attack Challenge Mode**, and add a temporary rate-limit rule. Turn both off afterwards, as they can affect real visitors and crawlers.
3. The site is static and cached, so most attacks just use up bandwidth rather than taking it down.

### WhatsApp links stop working (number changed or banned)
1. Update `contact` in `lib/site.ts`. Every WhatsApp link, the form and the structured data use it.
2. Deploy, then update Instagram, LinkedIn and Google profiles to match.

### Expired certificate
Vercel renews automatically while DNS points at Vercel. If a certificate error appears, check Vercel → Domains for a configuration warning (usually a DNS record changed).

## Secondary recovery option

If prolonged downtime would seriously hurt the business, the site can run anywhere Node.js does: `npm ci && npm run build && npm run start` on any VPS, or `next build` with `output: "export"` on any static host. **Netlify or Cloudflare Pages can host it within an hour by connecting the same GitHub repository.** Moving would only require changing DNS. Keep that option documented rather than running it in parallel; for a site this size, paying for a hot standby isn't worth it.
