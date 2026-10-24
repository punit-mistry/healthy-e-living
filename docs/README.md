# Healthy E Living: redesign handover

**Live:** <https://www.healthelivingwithirika.com/> · deployed from `master` on Vercel, 25 October 2026.

## Documents

| Document | What it's for |
|----------|---------------|
| [client-verification.md](client-verification.md) | **Start here.** Facts Irika must confirm before anything gated can be published |
| [google-search-console.md](google-search-console.md) | Step-by-step Search Console, Bing and Google Business Profile actions |
| [seo-aeo.md](seo-aeo.md) | Technical SEO, structured data, social cards, AEO, content recommendations |
| [security.md](security.md) | Headers, CSP, dependencies, account-security checklist |
| [backup-recovery.md](backup-recovery.md) | Backups, rollback, monitoring and incident runbooks |
| [analytics.md](analytics.md) | What's measured and how, privacy rules |
| [backlink-strategy.md](backlink-strategy.md) + [tracker CSV](backlink-outreach-tracker.csv) | Ethical link-building plan |
| [design-system.md](design-system.md) | Colours, type, motifs, components, motion rules, and how to add content |

## Running the checks

```bash
npm ci
npm run lint && npm run typecheck
npm run build && npm run start -- -p 3100     # in one terminal
npm run audit:site                            # SEO, links, legacy URLs, headers
npm run check:browser                         # real-Chrome QA (needs Google Chrome)
npm run audit:site -- https://www.healthelivingwithirika.com   # against production
```

---

## Implementation report

Status key:
- ✅ **Implemented and verified** (on the live site unless stated)
- 🟡 **Implemented, not production-verified**
- 🔑 **Needs client or account access**
- 🔭 **Recommended future work**

### 1. Website and design
| Item | Status |
|------|--------|
| New design system ("Happy Human Editorial"): palette, Bricolage/DM Sans + editorial italic + handwriting, Happy Plate and scribble motifs, 20 illustrations | ✅ |
| Homepage: hero with Irika's portrait, trust strip, who-I-help index, Meet Irika, four-step approach, client stories, **Instagram section**, journal, FAQ, **Where I work**, CTA | ✅ |
| About, Services hub (new), 20 service pages (5 new), How it works (new), FAQ (new), Contact, Journal + 5 rewritten articles, Resources (new, 2 printables), Privacy/Terms/Medical disclaimer (new), custom 404/error | ✅ |
| Locations: hub (new) + **15 Mumbai-region pages and 12 Indian city pages** with local content (indexable) + 27 sub-area pages kept live (`noindex`) | ✅ |
| WhatsApp updated to +91 88790 43297 everywhere (links, form, structured data) | ✅ |
| Happy Plate loader: first homepage visit only, skipped on slow connections, ~0.76s, CSS-only, non-blocking | ✅ |
| Colour-wipe route transition with focus management and history support | ✅ |
| Fix: pages opened mid-page after client-side navigation | ✅ (regression-tested) |
| Legal pages reviewed by an adviser | 🔑 |
| Professional photo shoot to replace single-portrait reliance | 🔭 |

### 2. SEO, AEO and social
| Item | Status |
|------|--------|
| Unique titles/descriptions, self-canonicals, OG + Twitter on every page | ✅ (audit on production) |
| Generated social cards: default (with portrait, 83 KB JPEG) + one per service and article | ✅ |
| JSON-LD: WebSite/Organization/Person graph, breadcrumbs, Service, FAQPage, BlogPosting; fabricated rating markup removed | ✅ (parses, no forbidden types) |
| Sitemap (60 URLs) + robots generated from the same indexing rules; previews noindexed | ✅ |
| All 81 previous URLs still return 200 | ✅ (production) |
| Rich Results Test / Schema validator on live URLs | 🔑 (quick manual check — see seo-aeo.md) |
| Sitemap submission, indexing requests, Bing import, Google Business Profile | 🔑 [google-search-console.md](google-search-console.md) |
| Journal articles + balanced-plate guide indexable | 🔑 after Irika's review (one field each) |
| Apex → www redirect in a single hop | 🔑 Vercel Domains setting |

### 3. Security
| Item | Status |
|------|--------|
| CSP, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP; `X-Powered-By` removed | ✅ (production headers) |
| Zero CSP violations / console errors across 23 pages × 4 viewports | ✅ |
| Next.js 16.1.6 → 16.4.2; runtime deps 50 → 4; `npm audit`: 0 vulnerabilities | ✅ |
| Contact form: no data stored, length limits, no-JS fallback, medical-history warning | ✅ |
| MFA, registrar lock, branch protection, Dependabot, DNS review, uptime monitor | 🔑 [security.md](security.md) |
| Nonce-based strict CSP | 🔭 only if user content or third-party scripts are added |

### 4. Accessibility and performance
See "Test results" below.

---

## Test results (actual, 25 October 2026)

### Automated SEO audit (`npm run audit:site`)
Run against **production**: **all checks passed, 0 warnings**. 97 HTML pages crawled, 60 indexable, 60 sitemap URLs, 81 legacy URLs, all 200. Checks unique titles/descriptions, lengths, canonicals, a single H1, OG/Twitter tags, `lang`, image alt text, JSON-LD validity, sitemap ↔ noindex consistency, robots, 404 handling and security headers.

### Browser QA (`npm run check:browser`, real headless Chrome)
**23/23 passed** on the final build; 22/22 on production before the last loader change. Covers:
loader behaviour (first homepage visit, no replay, never on inner-page landings, never blocks input); client-side navigation, wipe, focus to `<main>`, title update, back/forward, scroll reset to top; skip link with visible focus; keyboard FAQ; accessible names; mobile menu (open, Escape, close on navigate); the WhatsApp form's URL and number; reduced motion; no horizontal overflow at 360/414/820/1440px on 23 pages; no console errors or CSP violations.

### Build quality
`next build` with type-checking enabled (previously disabled via `ignoreBuildErrors`): ✅. `tsc --noEmit`: 0 errors. ESLint (Next Core Web Vitals + TypeScript rules): 0 errors, 0 warnings.

### Performance (Lighthouse 13.5, lab)
Measured against a local production build. Mobile uses Lighthouse's simulated slow 4G and 4× CPU slowdown.

| Page | Device | Perf | A11y | Best pr. | SEO | FCP | LCP | TBT | CLS |
|------|--------|-----:|-----:|---------:|----:|----:|----:|----:|----:|
| Home | Desktop | 99 | 100 | 96* | 100 | 0.3s | 0.8s | 0ms | 0 |
| Home | Mobile | 85 | 100 | 96* | 100 | 1.3s | **3.7s** | 240ms | 0 |
| PCOS service | Desktop | 100 | 100 | 96* | 100 | 0.3s | 0.8s | 10ms | 0 |
| PCOS service | Mobile | 91 | 100 | 96* | 100 | 1.2s | **3.4s** | 110ms | 0 |
| Kandivali | Desktop | 100 | 100 | 96* | 100 | 0.3s | 0.7s | 0ms | 0 |
| Kandivali | Mobile | 93 | 100 | 96* | 100 | 1.2s | **3.3s** | 50ms | 0 |

\* The only best-practices deduction is a 404 for `/_vercel/insights/script.js`, which exists only on Vercel's network (it returns 200 in production).

**Honest read:**
- Accessibility 100 and SEO 100 everywhere; CLS 0 everywhere; desktop LCP under 1s.
- **Mobile lab LCP (3.3–3.7s) is above the 2.5s target** under Lighthouse's deliberately harsh slow-4G emulation. The LCP element is headline text, and the page is already light: 13 KB CSS, about 150 KB JS, 27 KB brotli HTML, 91ms TTFB in production. A direct Chrome measurement found the old always-on loader added 1–3s, which is why it now shows only on first homepage visits over decent connections. That cut homepage first-visit LCP from 4.1–5.7s to 3.0–3.2s under the same throttling.
- Google ranks on **field data** from real visitors, not lab scores. Check Search Console → Core Web Vitals after about 4 weeks. If mobile LCP isn't "Good" there, the next steps are dropping the handwriting font from above the fold (51 KB) and trimming the hero.

### Not tested
- Real-device testing on iOS Safari and Android (only emulated in Chrome).
- Screen-reader walkthrough with NVDA/VoiceOver (structure, names and focus were tested automatically; a manual pass is still worthwhile).
- Field Core Web Vitals (CrUX). These need real-visitor data and appear in Search Console after a few weeks.
- Social preview rendering on WhatsApp/LinkedIn/Facebook (needs the debuggers listed in seo-aeo.md).
