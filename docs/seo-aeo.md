# Technical SEO, AEO and social metadata

## What's implemented

### Rendering and crawlability
- Every route is **statically generated** (`○`/`●` in `next build`). Primary content is in the HTML response; nothing depends on client-side JavaScript or on the loader finishing.
- The old homepage was a single `"use client"` tree whose framer-motion sections rendered with `opacity: 0` until hydration. All sections are now server components, and the motion is CSS-only progressive enhancement.
- Navigation uses real `<a href>` links (`next/link`). The mobile menu is a native `<details>`, so it's crawlable and works without JS.
- One `<h1>` per page, semantic landmarks (`header`, `nav`, `main`, `footer`), `lang="en-IN"`.

### Metadata (one helper: `lib/seo.ts → pageMetadata()`)
Every page has a unique title (≤ 65 characters including the `· Healthy E Living` suffix), a unique meta description, a self-referencing canonical on the `https://www.` host, Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image` + alt/size/type, `og:site_name`, `og:locale=en_IN`) and Twitter `summary_large_image` tags. `scripts/audit-site.mjs` enforces all of this.

The root layout deliberately has **no canonical**. The old layout set `canonical: "/"`, which every page without its own canonical would have inherited.

### Indexing rules

| Page type | Indexed? | Why |
|-----------|----------|-----|
| Home, About, Services hub, 20 service pages, How it works, Journal, Resources, Checklist, FAQ, Contact, Areas hub, legal pages | ✅ | Unique, useful content |
| 17 Mumbai-region area pages (Mumbai, Borivali, Kandivali, Kandivali West, Kandivali East, Malad, Goregaon, Andheri, Andheri West, Dahisar, Mira Road, Bhayander, Bandra, Powai, Thane, Navi Mumbai, Kharghar) | ✅ | Each has its own local intro, tips and FAQs |
| 12 city pages, online only (Delhi, Gurugram, Noida, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh) | ✅ | Each has city-specific food and lifestyle content; framed honestly as *online* consultations |
| Journal articles, balanced-plate guide | ⛔ until reviewed | Health content needs Irika's sign-off (`review` field) |
| Journal topic archives (`/blog/category/*`) | ⛔ `noindex, follow` | One or two posts each: thin archives |
| 25 sub-area location pages (e.g. Borivali West, Malad East, Colaba) | ⛔ `noindex, follow` | No distinct content yet; URLs kept so existing links don't break, and each links to its main area page |
| 404 | ⛔ | — |

The sitemap is generated from the **same flags**, so it can only contain canonical, indexable URLs. `lastmod` uses real content dates, not the build time (the old sitemap stamped `new Date()` on every URL at every build).

**To make another area indexable:** add a `local` entry for it in `data/locations.ts` (an intro and 3 tips genuinely specific to that place). The page, sitemap and indexing follow automatically. Don't copy another area's text with the name swapped — that's exactly what Google treats as doorway pages.

### Robots and staging protection
- `app/robots.ts` allows everything in production and **disallows everything on Vercel preview deployments** (`VERCEL_ENV=preview`).
- Previews also send `X-Robots-Tag: noindex, nofollow` (`next.config.mjs`).
- `metadataBase` is fixed to the production URL, so canonicals and `og:url` on a preview still point to production (the audit checks for `vercel.app`/`localhost` leaks).

### Canonical host and redirects (verified on the live site, 2026-10-24)
| Request | Result |
|---------|--------|
| `http://healthelivingwithirika.com/` | 308 → `https://healthelivingwithirika.com/` → 308 → `https://www.…` (**two hops**) |
| `https://healthelivingwithirika.com/` | 308 → `https://www.…` |
| `http://www.healthelivingwithirika.com/` | 308 → `https://www.…` |

These redirects are configured in **Vercel → Project → Domains**, not in code. To remove the two-hop chain, set the apex domain to redirect straight to `https://www.healthelivingwithirika.com` (Vercel's "Redirect to" option).

**No linked URL changed in the redesign.** All 81 URLs the previous site linked to (`scripts/legacy-urls.txt`) return 200, and the audit re-checks them on every run.

**Retired blog posts.** The previous site also rendered a page for *every* entry in its ~300-topic list (Next.js `dynamicParams`), even though it only linked to five, and Google indexed some of them (e.g. `/blog/roti-vs-paratha-vs-naan-which-is-healthier`, 17 impressions in Search Console). These were auto-generated boilerplate, so they weren't recreated. Instead, all **298** retired URLs (recovered from git history into `data/legacy-blog-posts.json`) **308-redirect to the most relevant current page**, matched by topic and then by category (`lib/legacy-redirects.mjs`); generic topics go to the journal. The audit checks every one of them. Two previously broken targets now exist: `/services` (linked from every service breadcrumb and JSON-LD) and `/locations`.

### Structured data (JSON-LD)
- **Site-wide** (root layout): `WebSite`, `Organization` (contact point, area served, Instagram) and `Person` (Irika; LinkedIn), each with a stable `@id`.
- **Per page**: `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`/`FAQPage`/`MedicalWebPage` linked to the site entities, plus a `BreadcrumbList` matching the visible breadcrumbs.
- **Services**: a `Service` (provider = Organization) plus an `FAQPage` with that page's own questions.
- **Articles**: a `BlogPosting` with `citation` URLs; after review, the page gains `reviewedBy` (Irika) and `lastReviewed`.
- **Removed**: the fabricated `aggregateRating`/`Review` markup, a `SearchAction` for a search that doesn't exist, `MedicalBusiness` with no address, and per-suburb `LocalBusiness` entities claiming an address in each suburb.
- **Not added on purpose**: `LocalBusiness` (no verified address), ratings, prices, opening-hours markup.

FAQ markup is valid, but Google currently shows FAQ rich results only for a small set of authoritative sites. Don't expect a visual change in search results from it.

### Social sharing
- `app/opengraph-image.tsx` generates the default 1200×630 card: cream background, a Bricolage headline, coral underline, the Happy Plate and Irika's portrait in the arch frame. It's re-encoded as a JPEG (~83 KB) because WhatsApp often drops previews above ~300 KB.
- Each service and journal article gets its **own card** whose headline is the page's actual H1 or title, so a preview never says anything the page doesn't. Each card has page-specific alt text.
- All image URLs are absolute `https://www.healthelivingwithirika.com/...` and need no authentication.

**After deploying**, refresh cached previews:
- Facebook / WhatsApp: <https://developers.facebook.com/tools/debug/> → "Scrape again" for `/` and a few service URLs
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- X: previews refresh on their own over time

### Images
- The 3024×4032 / 1.7 MB `header-img.jpg` was served raw through `<img>`. It's replaced by two crops with descriptive filenames (`public/images/irika-goyal-dietitian-smiling.jpg`, `…-clinical-dietitian.jpg`) served through `next/image`: AVIF/WebP, responsive `sizes`, intrinsic width and height (no layout shift), a blur placeholder, and preload for the hero.
- Every `<img>` has alt text. Decorative SVGs are `aria-hidden`; the plate diagram has `role="img"` with a title and description.

## Search Console and Bing setup (needs account access)

**Step-by-step guide: [google-search-console.md](google-search-console.md).** Summary:

1. **Google Search Console** — the property is already verified via `public/googlecc93d528db07d8ad.html` (kept). The old `verification: "YOUR_VERIFICATION_CODE"` meta tag was a placeholder and has been removed.
   - Sitemaps → submit `https://www.healthelivingwithirika.com/sitemap.xml`.
   - URL Inspection → "Request indexing" for `/`, `/services`, `/about` and a few service pages.
   - Watch Pages → "Excluded by noindex": you should see the 25 sub-area location pages, the topic archives and the unreviewed articles. That's expected.
2. **Bing Webmaster Tools** — "Import from Google Search Console" is the fastest route; then submit the same sitemap.
3. **Rich Results Test** (<https://search.google.com/test/rich-results>) and **Schema Markup Validator** (<https://validator.schema.org/>) — run them on `/`, a service page and an article once live. Locally, the audit only checks that the JSON-LD parses and contains no forbidden types; it can't confirm rich-result eligibility.

Nothing in this list has been done yet. It requires the account owner's access.

## AEO and AI search: what was done (and what wasn't)

What actually helps AI-assisted search is the same as what helps people: clear, quotable, well-sourced answers on crawlable pages.

- **Short answers first.** Each article opens with a "short answer" box: a direct, self-contained summary that can be quoted.
- **Question-shaped FAQs** on every service page, written to answer real pre-booking questions, not to repeat keywords.
- **Visible sources.** Every service and article lists its references. All were checked to resolve to the named document (PubMed IDs verified against NCBI's E-utilities API) on 2026-10-24.
- **Author and reviewer identity.** The review gate means no health article claims expert review until it has had one.
- **Consistent entity data.** Name, phone, email, socials and service area come from one file (`lib/site.ts`) and feed the pages, structured data and social cards.
- **`llms.txt` removed.** The old file contained claims the site no longer makes (100+ patients, in-person sessions in 42 areas, Academy of Nutrition and Dietetics guidelines), and no major search or AI system requires one.

## Content recommendations (prioritised)

1. **Get the review gate cleared.** Five well-sourced articles and the plate guide are ready the moment Irika reviews them.
2. **Add qualifications** (see `client-verification.md`). Credentials are the biggest missing trust signal for health content.
3. **One new article a month at most, each reviewed.** Strong candidates from the old topic list, chosen for evidence quality and search demand:
   - "Reading Indian food labels: a practical guide" (a link-worthy resource)
   - "Gestational diabetes: an Indian meal guide" (pairs with the pregnancy and diabetes services)
   - "Iron-rich vegetarian foods and how to absorb more iron"
   - "Eating well on Mumbai commutes: dabba and desk-lunch ideas" (local and distinctive)
   - "Low-FODMAP, explained for Indian kitchens" (pairs with gut health)
   Avoid the old backlog's weaker topics (seed cycling, detox, "lose belly fat fast"). They attract the wrong traffic and are hard to write honestly.
4. **Real photography.** One portrait carries the whole site. A short shoot (Irika consulting, cooking, a balanced thali, a WhatsApp-on-phone moment) would add warmth and give each service hero a photo.
5. **Google Business Profile** — only if there's a verifiable in-person location. Don't create a profile for an address that isn't a real place of business.
