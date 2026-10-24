# Security

## The actual attack surface

Knowing what the site *is* keeps the security work proportionate:

- **Hosting:** Vercel (confirmed from live response headers: `server: Vercel`, `x-vercel-id: bom1::…`). Vercel terminates TLS, serves a global CDN, and applies platform-level DDoS mitigation.
- **Application:** fully static Next.js 16 pages. **No database, no API routes, no server actions, no authentication, no file uploads, no admin area.**
- **User input:** one contact form, which composes a WhatsApp message *in the browser*. Nothing is posted to this site.
- **Third parties:** Vercel Web Analytics (same-origin, cookieless) and outbound links to WhatsApp, Instagram and LinkedIn.
- **Secrets:** none. The repository has no `.env` files and the code reads only `VERCEL_ENV` and `NODE_ENV`. `.env*.local` is git-ignored.

So the realistic risks are: **account takeover** (GitHub, Vercel, domain registrar), **DNS hijacking**, **a malicious dependency**, and **defacement through a compromised deploy**. Injection, broken access control and CSRF have no surface here today.

## Implemented in code

### Response headers (`next.config.mjs`)

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.whatsapp.com https://web.whatsapp.com https://wa.me whatsapp:; frame-ancestors 'none'; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests` | Only same-origin resources can load; no plugins; no framing; forms can only target this site or WhatsApp |
| `X-Content-Type-Options` | `nosniff` | Stops MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends no full URLs to third parties |
| `X-Frame-Options` | `DENY` | Clickjacking protection for older browsers (CSP `frame-ancestors` covers modern ones) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the browsing context |
| `Permissions-Policy` | camera, microphone, geolocation, payment, USB, sensors and Topics all disabled | Least privilege for browser features |
| `X-Powered-By` | removed (`poweredByHeader: false`) | Less fingerprinting |
| `Strict-Transport-Security` | sent by Vercel: `max-age=63072000` | Not duplicated in code. `includeSubDomains` and `preload` are deliberately **not** added — see below |

The deprecated `X-XSS-Protection` header was removed (modern guidance is to omit it).

**Verified:** the CSP was built from an audit of what the pages load (everything is same-origin; fonts are self-hosted by `next/font`; Vercel Analytics loads from `/_vercel/insights`). `scripts/browser-check.mjs` loads 21 pages at 4 viewport sizes in real Chrome and reports **zero CSP violations or console errors**. Vercel's preview toolbar origins are allowed on preview deployments only.

**Why `'unsafe-inline'` remains in `script-src`:** statically generated Next.js pages include inline bootstrap scripts. Removing `'unsafe-inline'` requires per-request nonces, which forces every page to render dynamically: no CDN caching and slower pages. With no user-generated content, no HTML injection sinks (`dangerouslySetInnerHTML` is used only for our own JSON-LD, serialised with `<` escaped, and one constant script) and no third-party scripts, the practical XSS risk is low. **Upgrade path** if the site gains user-generated content or third-party scripts: add `proxy.ts` that generates a nonce per request, pass it to `<Script nonce>`, and switch `script-src` to `'self' 'nonce-…' 'strict-dynamic'`. Ship it first as `Content-Security-Policy-Report-Only` with a reporting endpoint, then enforce.

**HSTS:** Vercel already sends a two-year HSTS policy. Don't add `includeSubDomains` or submit to the preload list until every subdomain of `healthelivingwithirika.com` (mail, any future booking tool) is confirmed to serve HTTPS; preload is very hard to undo.

### Application
- **Contact form:** length limits (`maxLength`, plus truncation in code), the message is URL-encoded with `encodeURIComponent`, opens WhatsApp with `opener` nulled, and has a no-JS fallback. A notice asks people **not** to share medical history in the form. No data reaches this site, so there's nothing to store, leak or rate-limit.
- **Output encoding:** all content is rendered through React, which escapes by default. Article inline links are parsed from a tiny `[text](/path)` syntax that **only** produces internal links (`components/ui-kit/RichText.tsx`); no HTML is injected.
- **External links:** `target="_blank"` always pairs with `rel="noopener noreferrer"` (checked by the browser test).
- **Error handling:** `app/error.tsx` shows a friendly message only. Next.js strips stack traces in production.
- **Analytics privacy:** custom events send only an event name, a location label and the path, never form contents or personal or health data (`components/site/TrackClicks.tsx`).

### Dependencies
- **Runtime dependencies cut from 50 to 4:** `next`, `react`, `react-dom`, `@vercel/analytics`. Removed: framer-motion, motion, lenis, ~25 Radix packages, recharts, zod, react-hook-form and others, none of which the site used after the rebuild.
- **Next.js upgraded 16.1.6 → 16.4.2** (exact pin). 16.1.6 was affected by advisories including GHSA-673q-mjm6-r5xr (critical: RCE in `use cache`), request smuggling in rewrites, image-optimizer DoS and RSC cache poisoning.
- `npm audit` after changes: **0 vulnerabilities**.
- `package-lock.json` is committed; use `npm ci` for reproducible installs.

## Requires account-owner action

These can't be done from the repository. Each is a short, one-time task.

### Accounts (highest priority)
- [ ] **Domain registrar:** enable MFA (prefer a passkey or authenticator app over SMS); turn on **registrar lock / transfer lock**; check that the recovery email is one the owner controls; note the renewal date and enable auto-renew.
- [ ] **Vercel:** MFA for every member; remove people who no longer need access; use the least privilege that works (Viewer/Developer rather than Owner); review **Settings → Tokens** and revoke unused ones.
- [ ] **GitHub** (`punit-mistry/healthy-e-living`): MFA for everyone with push access; **branch protection** on `main` (require a pull request; block force-pushes); enable **Dependabot alerts and security updates** (Settings → Code security).
- [ ] **Google account** used for Search Console and `health.e.living23@gmail.com`: MFA plus recovery codes stored offline. Long term, consider a custom-domain mailbox (e.g. `hello@healthelivingwithirika.com`).
- [ ] Use separate personal accounts, never a shared admin login. Keep a list of who has access to what (template below).

### DNS
- [ ] Review DNS records and delete anything unrecognised (old verification TXT records, dangling CNAMEs to services no longer used; dangling CNAMEs enable subdomain takeover).
- [ ] If email is ever sent from the domain, add SPF, DKIM and DMARC records. If no mail is sent, publish `v=spf1 -all` and a `p=reject` DMARC record to stop spoofing.

### Edge, WAF and DDoS on Vercel
Vercel applies DDoS mitigation automatically. With no forms or APIs posting to the site, aggressive WAF rules would mostly risk blocking real visitors and search crawlers. Recommended:
- [ ] **Vercel Firewall → Attack Challenge Mode:** know where it is; switch it on only *during* an attack.
- [ ] Optional custom rule: rate-limit `/_next/image` (the only CPU-heavy endpoint) per IP. Test that Googlebot isn't affected.
- [ ] **Don't put Cloudflare's proxy in front of Vercel** unless there's a specific need. Double proxying breaks Vercel's caching and analytics, and Vercel doesn't recommend it. Since there's no separate origin server, "restricting origin access" isn't applicable.

## Access register (template, keep it outside the repo)

| System | Owner | Others with access | MFA? | Recovery method | Last reviewed |
|--------|-------|--------------------|------|-----------------|---------------|
| Domain registrar | | | | | |
| Vercel | | | | | |
| GitHub | | | | | |
| Google (Search Console / Gmail) | | | | | |
| Instagram / LinkedIn | | | | | |
| WhatsApp Business | | | | | |

## What this does *not* mean

No website is "fully secure" or impossible to take down. These measures shrink the attack surface, make account takeover much harder and make recovery quick — see `backup-recovery.md`.
