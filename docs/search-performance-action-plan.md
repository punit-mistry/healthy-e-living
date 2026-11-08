# Search performance: where we are and what moves the needle

Source: Search Console export, **Web (text-based), last 3 months, to 2026-11-07**
(`https___www.healthelivingwithirika.com_-Performance-on-Search-2026-11-07.xlsx`).
Written 2026-11-08. Re-run this analysis monthly against a fresh export.

---

## 1. The honest baseline

| | Value |
|---|---|
| Clicks | **8** |
| Impressions | **1,150** |
| CTR | **0.70 %** |
| Average position | **~33** |
| Queries with at least one click | **1** (`dietitian in borivali`) |
| Desktop | 4 clicks / 654 impressions / pos 37.1 |
| Mobile | 4 clicks / 484 impressions / pos 22.0 |

A 0.70 % CTR at average position 33 is exactly what position 33 produces.
**The snippet is not the problem — the position is.** No amount of title or
meta-description tuning changes a result nobody scrolls to. Everything below is
about moving positions, not polishing snippets.

### About "I want to be on page 1 for all of these"

The export carries **137 queries**. Ranking page 1 for all of them is not a
goal that can be delivered — they span five cities, a dozen conditions and
two completely different intents (local "dietitian near me" vs. informational
"besan benefits"), on a domain that is a few months old with 8 clicks.

What *is* deliverable is page 1 for the queries we are already close on, and a
realistic path for the rest. The queries sort into three buckets:

**Bucket A — already position 7–20. Page 1 is a few positions away.**

| Query | Impr. | Pos. |
|---|---|---|
| `online diet consultation` | 1 | 2.0 |
| `dietician in borivali west` | 1 | 7.0 |
| `home visit dietitian` | 1 | 10.0 |
| `paratha or naan healthier` | 3 | 10.0 |
| `dietician kandivali west` | 1 | 11.0 |
| `dietitian in andheri` | 17 | 12.9 |
| `nutritionist in borivali` | 12 | 16.0 |
| `dietitian in borivali` | 24 | 16.0 ← our only click |
| `does the gm diet work` | 1 | 16.0 |
| `indian fruits for weight loss` | 2 | 17.0 |
| `dietician andheri west` | 2 | 18.5 |
| `corporate nutrition mumbai` | 5 | 18.8 |

**Bucket B — position 20–50.** Mostly Mumbai/Thane/Navi Mumbai local terms and
`/services/pcos-diet`. Reachable in one or two quarters with better pages and a
few real links. This is where most of the impressions sit.

**Bucket C — position 50–100.** Every Kolkata query, `dietician for pcos`
(84.6), `best pcos dietitian` (63), `online pcos diet consultation india` (96),
`cancer nutrition services` (86). These are national/competitive terms or
cities with no real presence. Not winnable this year; chasing them is the
fastest way to waste the whole budget.

---

## 2. The biggest fixable loss in the data

**69 of the 125 URLs drawing impressions are legacy blog URLs that now 301 away.**
They carry **307 impressions** between them. Of those, **32 URLs (129 impressions)
redirect to the bare `/blog` listing** — see `lib/legacy-redirects.mjs`, where
any slug matching no topic rule falls through to `/blog`.

Google treats a specific page redirected to a generic listing as a soft 404:
it drops the destination's inherited ranking entirely. Several of these were
ranking genuinely well before the redesign:

| Legacy URL | Impr. | Pos. | Currently redirects to |
|---|---|---|---|
| `/blog/roti-vs-paratha-vs-naan-which-is-healthier` | 72 | **9.6** | `/blog/best-indian-diet-plan-for-weight-loss` |
| `/blog/sugar-free-indian-dessert-recipes` | 26 | 51.7 | `/blog` |
| `/blog/raisins-kishmish-health-benefits-and-uses` | 17 | 41.7 | `/blog` |
| `/blog/poha-healthy-breakfast-option` | 12 | **8.1** | `/blog/healthy-indian-breakfast-ideas…` |
| `/blog/besan-chickpea-flour-nutritional-benefits` | 10 | 49.2 | `/blog` |
| `/blog/cardamom-elaichi-benefits-and-uses` | 9 | 44.2 | `/blog` |
| `/blog/saffron-kesar-benefits-and-how-to-use` | 4 | **7.5** | `/blog` |
| `/blog/healthy-halwa-nutritious-indian-sweet-recipes` | 4 | **7.8** | `/blog` |
| `/blog/upma-nutritious-south-indian-breakfast` | 4 | **7.8** | `/blog/healthy-indian-breakfast-ideas…` |
| `/blog/garcinia-cambogia-for-weight-loss-a-review` | 5 | **6.2** | `/blog/best-indian-diet-plan-for-weight-loss` |

**The fix is to write the ~10 highest-value ones back as real articles** at
their original URLs, instead of redirecting them. `roti vs paratha vs naan`
alone is the single best-ranking piece of content the domain has ever had, and
right now it points at a page about a weight-loss diet plan.

Second-best fix, if writing is the bottleneck: change the `/blog` fallback in
`legacy-redirects.mjs` to the closest *service* page rather than the listing,
so at least the redirect is topically honest.

---

## 3. Live pages: where the impressions actually are

| Page | Impr. | Pos. | Clicks |
|---|---|---|---|
| `/locations/navi-mumbai` | 135 | 34.2 | 1 |
| `/locations/borivali` | 129 | **12.5** | 1 |
| `/locations/malad` | 111 | **13.8** | 1 |
| `/services/pcos-diet` | 93 | 59.7 | 0 |
| `/locations/thane` | 80 | 32.3 | 0 |
| `/locations/kolkata` | 68 | 53.0 | 0 |
| `/locations/andheri` | 60 | 22.5 | 0 |
| `/services/weight-loss` | 33 | 38.5 | 0 |
| `/` (homepage) | 25 | **4.2** | 2 |
| `/about` | 21 | **8.2** | 1 |

Two readings:

- **Borivali and Malad are 3–5 positions from page 1** on the biggest live
  impression pools we have. Highest-ROI on-page work on the whole site.
- **`/services/pcos-diet` has 93 impressions at position 60.** The demand is
  real (`pcos nutritionist in mumbai` 14, `dietician for pcos` 14,
  `best pcos dietitian` 10, `pcos dietician in mumbai` 4) and the page is not
  competing. It needs depth, not tweaks.
- **`/locations/navi-mumbai` has the largest pool (135) at position 34**, and
  the queries feeding it are all *condition + city*: PCOD (19), diabetic diet
  (15), weight loss (11), cancer (11), weight loss again (10). If that page
  does not have condition sections linking to `/services/pcos-diet`,
  `/services/diabetes-diet`, `/services/weight-loss` and
  `/services/cancer-nutrition-support`, that is the gap.

---

## 4. What to do, in order

### P0 — this week (Diwali window is days, not weeks)

1. **Request indexing for `/diwali-detox`** in Search Console → URL Inspection.
   Seasonal pages have to be crawled now or the season is gone.
2. **Create and verify a Google Business Profile for Mumbai.** `dietitian in
   borivali`, `dietitian in andheri`, `nutritionist in borivali`,
   `dietitian in thane` are local-intent queries — the map pack takes most of
   those clicks and an unlisted business cannot appear in it at all. This is
   the single highest-ROI item in this document and no amount of on-page work
   substitutes for it.
3. **Point every Diwali Instagram post, the bio link and the comment-to-DM
   auto-reply at `/diwali-detox`.** Social traffic will not rank the page by
   itself, but it gets it crawled, gives it engagement and feeds the WhatsApp
   funnel immediately.

### P1 — next 2–4 weeks (the page-1 push)

4. **`/locations/borivali` and `/locations/malad`** — add real local substance:
   the specific areas and landmarks covered, how in-person sessions work there,
   local food context, and 2–3 FAQs that only make sense for that area. Link
   each to the three services its queries ask for.
5. **`/locations/navi-mumbai`** — add the condition sections named above.
6. **`/services/pcos-diet`** — rebuild for depth, against the query set above.
7. **Rewrite the top ~10 legacy blog URLs** as real articles at their original
   slugs (section 2), starting with `roti-vs-paratha-vs-naan-which-is-healthier`.

### P2 — the quarter

8. **Consolidate thin location pages.** There are 55+ of them on a domain with
   8 clicks. Kolkata draws 7 queries at positions 44–60 and has no real
   presence; either make it a genuinely good online-consultation page or
   `noindex` it. A large set of thin near-duplicate pages is a site-wide
   quality signal, not a set of independent lottery tickets.
9. **Internal links from the ingredient articles to services.** The spice and
   ingredient posts rank 5–12. They are the cheapest conversion fix available
   and currently dead-end.
10. **Backlinks.** See `docs/backlink-strategy.md` and
    `docs/backlink-outreach-tracker.csv`. Nothing in Bucket B moves without
    them.

### What not to do

- Do not chase Kolkata, "celebrity nutritionist in mumbai" (pos 90.8) or
  national PCOS terms yet.
- Do not add more location pages.
- Do not rewrite titles and meta descriptions hoping for CTR. At position 33
  there is no CTR to win.

---

## 5. The Diwali detox page specifically

`/diwali-detox` (built 2026-11-08) targets a seasonal cluster with no existing
footprint: `diwali detox`, `diwali detox diet plan`, `post diwali detox`,
`detox after diwali`, `5 day detox diet plan indian`, `indian detox diet plan`.

In place:

- Indexable, canonical, in `sitemap.xml`, linked from the footer sitewide.
- `MedicalWebPage` + `Diet` + `FAQPage` JSON-LD, with `author`, `reviewedBy`
  and `lastReviewed` pointing at Dt. Irika Goyal.
- Its own OG card at `/diwali-detox/opengraph-image` (matters for WhatsApp and
  Instagram DM previews, which is how most of its traffic will arrive).
- Full plan text on the page, nothing gated — a lead magnet behind an email
  form would rank for nothing.
- WhatsApp CTAs carrying a `diwaliDetox` intent message, so bookings from this
  page are attributable.

Honest expectation: seasonal queries peak in the week *after* Diwali and the
page is brand new, so most of this year's value is the Instagram funnel, not
search. Its search value is next Diwali, when the URL has a year of history —
which is why the URL is `/diwali-detox` and not a dated slug. Refresh the copy
and bump `detoxPlan.updated` each year rather than creating a new page.
