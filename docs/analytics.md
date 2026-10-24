# Analytics and measurement

## What's installed

**Vercel Web Analytics** (already used by the previous site, via `<Analytics />` in `app/layout.tsx`). It's cookieless, aggregate-only and served from the site's own domain, so no cookie banner is needed for it. Google Analytics is **not** installed and isn't needed for a site this size.

> ⚠️ **Check once:** Vercel → Project → **Analytics** tab → make sure Web Analytics is **enabled**. If it isn't, the script at `/_vercel/insights/script.js` returns 404 and no data is collected (it fails silently; the site keeps working).

## Events sent (privacy-safe)

Clicks on elements carrying `data-track` are sent by `components/site/TrackClicks.tsx`. **Only the event name, a location label and the page path are sent — never form contents, names, phone numbers or health information.**

| Event | Fired when | `location` values (examples) |
|-------|-----------|------------------------------|
| `whatsapp_click` | Any WhatsApp button or link | `header`, `home_hero`, `floating_button`, `footer`, `service_pcos-diet`, `location_borivali`, `cta_home`, `contact_methods` |
| `contact_form_submit` | Contact form "Continue in WhatsApp" | `contact_page` |
| `phone_click` | Phone number tapped | `contact_methods` |
| `email_click` | Email tapped | `contact_methods` |
| `instagram_click` | Instagram section | `instagram_section`, `instagram_photo` |

> Custom events require a Vercel **Pro** (or Enterprise) plan. On the free Hobby plan, page views are still counted but these events are silently ignored. Nothing breaks either way.

## What to look at (monthly)

1. **Visitors and top pages** — which services and location pages people actually visit.
2. **`whatsapp_click` by location** — which pages and buttons start conversations. That's the business's real conversion.
3. **Referrers** — Google, Instagram, direct, and any sites linking in (see `backlink-strategy.md`).
4. **Search Console → Performance** for search queries; Vercel doesn't show those (see `google-search-console.md`, Step 7).

A WhatsApp click isn't a booking. To measure real outcomes, ask new clients "How did you find me?" and keep a simple tally alongside the analytics.

## Rules for adding anything else

- Don't add trackers (Meta Pixel, Hotjar, Google Analytics) without the client's approval, a privacy-policy update and, where required, a consent banner.
- Never send personal or health information to any analytics tool.
- Any new third-party script also needs a Content-Security-Policy update in `next.config.mjs`. Otherwise it will be blocked, by design.
