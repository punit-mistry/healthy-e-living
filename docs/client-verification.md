# Client verification checklist

The redesign deliberately **does not publish** facts that couldn't be verified. Everything below needs a written answer from Irika (or the business owner) before relaunch. Most items are a one-line change once confirmed.

Status key: 🔴 blocks relaunch · 🟠 should confirm before relaunch · 🟢 nice to have

## 1. Credentials and claims

| # | Item | Where it lives | Current state | What to do |
|---|------|----------------|---------------|------------|
| 1 | 🔴 **Qualifications** — degree(s), institution, year, any registration (e.g. professional body membership number) | `lib/site.ts` → `qualifications` | Empty, so the Qualifications section is **hidden** | Add verified entries; the About page shows them automatically |
| 2 | 🟠 **"4+ years of clinical experience"** | `lib/site.ts` → `claims.experience` | Hidden (`confirmed: false`) | Confirm the figure and set `confirmed: true` |
| 3 | 🟠 **"100+ clients supported"** | `lib/site.ts` → `claims.clients` | Hidden (`confirmed: false`) | Confirm it's supported by records, then set `confirmed: true` |
| 4 | Removed | — | "95% client satisfaction" and "10+ specializations" | Removed: there was no measurement behind them. Re-add only with a real source (e.g. a survey) |
| 5 | Removed | Old `credentials.tsx` | "RDN, LDN, CSSD", "Academy of Nutrition and Dietetics", "licenses in multiple states" | US template text that doesn't describe an Indian practice. Removed |
| 6 | Removed | Old About page | "MS in Nutrition Science / Registered Dietitian" | Unverified. Removed until confirmed (see item 1) |
| 7 | 🟠 Pull quote: *"I believe good nutrition should be practical, enjoyable and sustainable."* | Homepage "Meet Irika" | Adapted from the old About page's first-person copy | Confirm Irika is happy to be quoted this way |

## 2. Testimonials

| # | Item | Current state | What to do |
|---|------|---------------|------------|
| 8 | 🔴 **Written consent** from Pulkit Agarwal and Namrata Jain to publish their names and words | Published unchanged, as on the previous site; star ratings removed | Get consent in writing (WhatsApp is fine) and keep a copy. If either declines, delete their entry from `data/testimonials.ts` |
| 9 | Removed | `aggregateRating` 4.8 / 50 reviews in structured data | Removed: there were no 50 visible reviews to back it, and Google treats self-serving review markup as spam |

## 3. Business details

| # | Item | Current value on site | Notes |
|---|------|----------------------|-------|
| 10 | 🟠 WhatsApp / phone | WhatsApp **+91 88790 43297** (updated on request, 2026-10-25); calls +91 98336 40891 | Confirm whether the call number should also change |
| 11 | 🟠 Email | health.e.living23@gmail.com | Unchanged (most recent commit) |
| 12 | 🟠 **LinkedIn URL** | `linkedin.com/in/irika-goyal-825183229/` | The project brief lists `linkedin.com/in/irika-goyal`; the site keeps the more specific URL the previous site used. Confirm which is correct |
| 13 | 🟠 Instagram | `@health.e.living` | Confirm the handle is still active |
| 14 | Removed | Twitter/X `@NutritionIrika` | No evidence this account belongs to the practice. Removed from metadata. Add back in `lib/seo.ts` only if it's real |
| 15 | 🟠 **Hours** | "Monday to Saturday, by appointment" | The old site contradicted itself (Mon–Fri 10–7 + Sat 10–4 on one page; "Monday to Saturday" on another). Confirm |
| 16 | 🟠 **Session lengths** | First 45–60 min, follow-ups 20–30 min, often every ~10 days then fortnightly | Taken from the old site's FAQ. Confirm |
| 17 | 🔴 **In-person location** | "In Mumbai — exact location shared when you book" | No address is published, and none should be invented. If there's a fixed clinic, share the address to unlock a Google Business Profile and LocalBusiness markup |
| 18 | 🟠 Online clients outside India | "Across India and abroad" | The old site said "across India and internationally". Confirm |
| 19 | 🟢 Languages | Structured data lists English and Hindi | Confirm (and add Marathi/Gujarati etc. if relevant) |
| 20 | 🟠 Fees | Not shown anywhere; "shared on WhatsApp before you book" | Fine as is. Publish prices only if the client wants to |

## 4. Services

All services from the previous site were kept (same URLs) and rewritten. Five were **added** because the client's own homepage listed them as conditions she helps with, but they had no page:

- `/services/heart-health`
- `/services/kidney-nutrition`
- `/services/cancer-nutrition-support`
- `/services/food-allergies-intolerances`
- `/services/bone-health`

| # | Item | What to do |
|---|------|------------|
| 21 | 🔴 Confirm Irika offers **each** of the 20 services, especially kidney disease and cancer support, which carry higher clinical responsibility | Remove any service she doesn't offer from `data/services.ts`, and add a redirect if that URL existed before |
| 22 | 🔴 Clinical review of every service page | The copy is written conservatively and cites guidelines, but Irika must read and approve it |
| 23 | 🟠 "Vegetarian, eggetarian, vegan, Jain or fasting days" (FAQ) | Confirm she plans around all of these |
| 24 | 🟠 "Questions between sessions over WhatsApp" (online consultations) | From the old site. Confirm it's still offered |
| 25 | 🟠 Corporate wellness: "individual consultations stay confidential between the employee and me" | Confirm this is the policy |

## 5. Health content review gate

The five journal articles and the balanced-plate guide were **rewritten from scratch**. The old versions were auto-generated template text ("{title} is an important topic in…"). Every claim is tied to a cited source, but **Irika has not reviewed them yet**. Until she does, each one:

- shows a visible "Awaiting clinical review" note,
- is served with `noindex`, and
- is left out of the sitemap.

**To publish after review**, set the `review` field:

```ts
// data/articles.ts
review: { by: "Irika Goyal", on: "2026-11-02" },

// data/resources.ts (balanced plate guide)
review: { on: "2026-11-02" },
```

The page then shows "Medically reviewed by Dt. Irika Goyal on …", becomes indexable, joins the sitemap, and gains `reviewedBy`/`lastReviewed` structured data, all automatically.

## 6. Brand decisions to approve

| # | Decision | Reversible? |
|---|----------|-------------|
| 26 | 🟠 New typographic lockup ("healthy e living" with the "e" set in a butter-yellow plate) and a Happy Plate mark replace the brown script logo in the header, favicon and social images | Yes. The original `public/brand-logo.PNG` is untouched |
| 27 | 🟠 New palette (cream, botanical green, tomato coral, butter yellow) | Tokens in `app/globals.css` |
| 28 | 🟠 Legal pages (privacy, terms, medical disclaimer) are plain-language drafts | Must be reviewed by the client and ideally a legal adviser |
| 29 | 🟠 Location pages: 15 Mumbai-region areas + 12 Indian cities indexable with local content; 27 sub-areas `noindex` (URLs still work) | Add local content in `data/locations.ts` to make more indexable — see `docs/seo-aeo.md` |
| 30 | 🟠 **Practice location.** Pages say in-person sessions are "in Mumbai, location shared on booking" | If the practice is physically in Borivali (or elsewhere), tell us: the copy and structured data can then say so truthfully, and a Google Business Profile becomes possible |
