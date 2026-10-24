# Google Search Console: what to do after launch

The site went live from `master` on **25 October 2026** (commit `222c9ca`). Follow these steps once Vercel shows the deployment as **Ready**. Allow about 30–45 minutes; then check back weekly.

Open <https://search.google.com/search-console> and sign in with the Google account that owns the property.

---

## Step 1 — Confirm you have the right property

The site is verified with the file `public/googlecc93d528db07d8ad.html`, which is kept in the new version. That method creates a **URL-prefix** property.

1. Top-left property menu → choose **`https://www.healthelivingwithirika.com/`**.
2. If you see "Verification failed" or no access, open `https://www.healthelivingwithirika.com/googlecc93d528db07d8ad.html` in a browser. It should load a one-line file. Then click **Settings → Ownership verification → Verify** again.
3. **Recommended:** also add a **Domain property** (`healthelivingwithirika.com`) using a DNS TXT record at your domain registrar. It covers `http`, `https`, `www` and non-`www` together, and it keeps working if the HTML file is ever deleted.

## Step 2 — Submit the new sitemap

1. Left menu → **Sitemaps**.
2. If an old sitemap is listed, leave it; Google simply re-reads it. (Don't click "Remove" — that doesn't speed anything up.)
3. In "Add a new sitemap", type `sitemap.xml` → **Submit**.
4. After it processes (minutes to a day), the status should read **Success** with **62 discovered pages**.

> The sitemap contains only pages that should be indexed. You won't see the 25 sub-area location pages, the journal topic pages or the five unreviewed articles in it — that's intentional.

## Step 3 — Ask Google to recrawl the most important pages

Google allows roughly **10–12 indexing requests per day**. Do these first, one at a time:

1. Paste the URL into the **search bar at the top** (URL Inspection).
2. Click **Test live URL**. Wait for "URL is available to Google".
3. Click **Request indexing**.

**Day 1:**

```
https://www.healthelivingwithirika.com/
https://www.healthelivingwithirika.com/services
https://www.healthelivingwithirika.com/about
https://www.healthelivingwithirika.com/locations/mumbai
https://www.healthelivingwithirika.com/locations/borivali
https://www.healthelivingwithirika.com/locations/kandivali
https://www.healthelivingwithirika.com/locations/malad
https://www.healthelivingwithirika.com/locations/dahisar
https://www.healthelivingwithirika.com/locations/bhayander
https://www.healthelivingwithirika.com/services/weight-loss
```

**Day 2:**

```
https://www.healthelivingwithirika.com/services/pcos-diet
https://www.healthelivingwithirika.com/locations/kandivali-west
https://www.healthelivingwithirika.com/locations/kandivali-east
https://www.healthelivingwithirika.com/locations/mira-road
https://www.healthelivingwithirika.com/locations/andheri
https://www.healthelivingwithirika.com/locations/thane
https://www.healthelivingwithirika.com/locations/delhi
https://www.healthelivingwithirika.com/locations/kharghar
https://www.healthelivingwithirika.com/services/diabetes-diet
https://www.healthelivingwithirika.com/contact
```

The rest get picked up from the sitemap automatically; there's no need to request them all.

While you're in **Test live URL**, click **View tested page → Screenshot** for the homepage once. You should see the hero ("Food should feel good. So should you."), not a loading screen. That confirms Google sees the real content.

## Step 4 — Check the Pages (indexing) report — after 3–7 days

Left menu → **Pages**. What you'll see, and what it means:

| What Search Console says | Pages | Is it a problem? |
|--------------------------|-------|------------------|
| **Indexed** | Should climb towards ~62 over a few weeks | ✅ Goal |
| **Excluded by 'noindex' tag** | Sub-area pages (e.g. Borivali West, Malad East), `/blog/category/*`, the 5 journal articles, the balanced-plate guide | ✅ Intentional |
| **Page with redirect** | `http://…` and non-`www` versions | ✅ Normal |
| **Alternate page with proper canonical tag** | Usually URLs with `?` parameters | ✅ Normal |
| **Not found (404)** | Old blog posts such as `/blog/roti-vs-paratha-vs-naan-which-is-healthier` may show here from the first launch day. They now **redirect** to the closest current page | Open the report → **Validate fix**. Any *other* 404s: send me the list |
| **Page with redirect** (old blog URLs) | ~300 retired auto-generated blog posts | ✅ Intentional — their value passes to the page they redirect to |
| **Crawled – currently not indexed** | Possible for some location/city pages at first | ⏳ Wait 2–4 weeks; Google is deciding. Don't resubmit repeatedly |
| **Discovered – currently not indexed** | Newer pages Google hasn't crawled yet | ⏳ Normal at launch |
| **Server error (5xx)** | Should be none | ⚠️ Tell me |

## Step 5 — Check enhancements and experience

Left menu, under **Enhancements** (appears once Google has processed the pages):

- **Breadcrumbs** — should show valid items, with no errors.
- **FAQ** — may or may not appear. Google shows FAQ rich results only for a small set of authority sites, so missing FAQ stars are normal.
- If any item shows **errors**, open it → copy the error message → send it to me.

Also check:
- **Core Web Vitals** — needs real-visitor data (Chrome users), so it can take 4+ weeks to appear. Aim for "Good" on mobile.
- **HTTPS** — should say all pages served over HTTPS.
- **Security & Manual Actions** — both should say "No issues detected".

## Step 6 — Settings to check once

- **Settings → Users and permissions:** make sure Irika (or the business owner) is an **Owner**. Remove anyone you don't recognise.
- **Settings → Crawl stats:** after a week, the average response time should be low (the site is static), with no spike in errors.
- **Settings → Associations:** link Google Analytics only if you later decide to use it (not needed — the site uses Vercel Analytics).

## Step 7 — Track local search progress — monthly

Left menu → **Performance → Search results**.

1. Set the date range to **Last 3 months**; later use **Compare → before/after 25 Oct 2026**.
2. Click **+ Add filter → Query → Queries containing** and try, one at a time:
   - `borivali`, `malad`, `dahisar`, `bhayander`, `mira road`, `kandivali`, `andheri`, `thane`
   - `dietitian mumbai`, `nutritionist mumbai`
   - `online dietitian`, `delhi`, `bengaluru`
3. Watch **Impressions** first (how often the site shows up), then **average position**, then **clicks**.
4. Switch to the **Pages** tab to see which location pages are getting traffic.

**Realistic timeline:** brand searches ("Irika Goyal dietitian") pick up first, usually within days. Local terms like "dietitian in Borivali" typically take **1–3 months** to move, and depend heavily on the next section.

## Step 8 — The thing that matters most for local search: Google Business Profile

For "dietitian near me" and the map results in Borivali, Malad, Dahisar and Bhayander, Google relies mostly on a **Google Business Profile**, not just the website.

- If Irika sees clients at a **real, fixed address** (a clinic or a consulting room in a shared clinic): create or claim the profile at <https://business.google.com>, use the category **Dietitian**, add the exact address and hours, and link to `https://www.healthelivingwithirika.com/`. Then tell me the address, and I'll add it to the website's structured data so the two match.
- If there's **no fixed address** (she travels, or only works online), set it up as a **service-area business**: hide the address and list areas served (Borivali, Malad, Dahisar, Bhayander, Mumbai…).
- **Never** use a fake or virtual address; Google suspends those profiles.
- Ask happy clients to leave **Google reviews** on the profile. Real reviews there are one of the strongest local ranking signals, and they're allowed, unlike reviews written into the website's own code.

## Step 9 — Bing (5 minutes)

<https://www.bing.com/webmasters> → **Import from Google Search Console**. It copies the property and sitemap. This also covers some AI search products that use Bing's index.

## Step 10 — When the journal articles are reviewed

When Irika has reviewed an article and the `review` field is filled in (see `docs/client-verification.md`) and deployed:
1. The article joins the sitemap automatically.
2. Use **URL Inspection → Request indexing** for each reviewed article URL.

---

### Quick weekly routine (5 minutes)
1. **Pages** — any new 404s or 5xx errors?
2. **Performance** — impressions trending up?
3. **Security & Manual Actions** — still clear?
