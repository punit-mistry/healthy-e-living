# Design system — "Happy Human Editorial"

The site should feel like meeting Irika: warm, cheerful and expressive, but clinically trustworthy. In practice that means mostly premium editorial layout, some playful hand-drawn detail, and a little experimental motion.

## Colour (`app/globals.css` → `@theme`)

| Token | Hex | Use |
|-------|-----|-----|
| `cream` | `#FFF6E8` | Default page background |
| `cream-deep` | `#F7E8CF` | Alternate section background |
| `paper` | `#FFFCF6` | Cards, quiet panels |
| `green` | `#28583E` | Primary buttons, emphasis text, trust strip (7.7:1 on cream) |
| `green-deep` | `#1D4230` | Footer, hover states |
| `coral` | `#F16A55` | Energy: CTA band, underlines, dots. **Not for body text** (2.8:1 on cream) |
| `coral-deep` | `#B93C29` | Coral when used *as text*, handwritten notes, focus ring (5.2:1) |
| `coral-soft` | `#FBD3C9` | Soft surfaces |
| `butter` | `#F3D66C` | Highlights, the "e" in the wordmark, sparkles |
| `butter-soft` | `#FAECB4` | Soft surfaces |
| `mint` | `#DDE9D6` | Calm surfaces, table headers |
| `ink` | `#252D27` | Text |
| `ink-soft` | `#4A544C` | Secondary text (7.3:1 on cream) |
| `line` | `#E6D5B8` | Hairlines and borders |
| `marigold` | `#E9A23B` | Festive gold for small decorative marks only (sparks, confetti). Never text |

Rules: one strong colour per section. Text on coral is always `ink`, never white (white on coral fails contrast).

## Type

| Role | Font | Class |
|------|------|-------|
| Display headings | Bricolage Grotesque (self-hosted, preloaded) | `text-display-xl/l/m/s` (fluid `clamp()` sizes) |
| Body and UI | DM Sans (self-hosted, preloaded) | default |
| Editorial italic: one word per heading, at most | Instrument Serif Italic | `.em` |
| Handwritten notes | Caveat | `.hand` |

Headline pattern: one emphasised word in `.em text-green`, e.g. "So should *you*."

## Signature motifs (`components/brand/Motifs.tsx`)

1. **The Happy Plate** — a hand-drawn plate rim that overshoots like a pen stroke, a coral smile, a butter dot, and optional sun rays. Used in the logo, loader, favicon, social cards, CTA band and 404.
2. **Scribbles** — `Underline` (a double hand-drawn line under a word) and `Loop` (a loose circle around a word).
3. **Annotations** — `CurlyArrow`, paired with a `.hand` note.
4. **Supporting** — `Sparkle`, `Sprig`.
5. **Illustrations** (`components/brand/ArtIcon.tsx`) — 20 line drawings on organic colour blobs, one per service or article topic.

All share a ~2.5–4 unit stroke with round caps. They're decorative, so always `aria-hidden`. **Use them sparingly:** at most one motif per section.

## Components

| Component | Purpose |
|-----------|---------|
| `site/Header`, `site/Footer`, `site/FloatingWhatsApp` | Persistent shell (in the root layout) |
| `sections/PageHero` | Inner-page opener: breadcrumbs, eyebrow, H1, underline, lede, aside |
| `sections/CtaBand` | Closing invitation (coral panel) |
| `sections/Approach`, `Stories`, `InstagramStrip`, `ConsultationSteps` | Reusable story sections |
| `sections/ArticleCard`, `ArticleBody`, `References`, `LegalPage` | Content templates |
| `ui-kit/FaqList` | Accessible accordion (native `<details>`) |
| `ui-kit/Breadcrumbs`, `JsonLd`, `RichText`, `PrintButton`, `WhatsAppIcon` | Utilities |
| `contact/ContactForm` | WhatsApp message composer (works without JS) |

CSS classes: `.wrap` (page container), `.btn` + `.btn-primary | -coral | -ghost | -cream`, `.chip`, `.eyebrow`, `.link-squiggle`, `.tilt-card`, `.faq-item`, `.prose-article`.

## Motion rules

- **All motion is CSS, and all of it switches off under `prefers-reduced-motion`.** Content is never hidden waiting for an animation; where scroll-driven animation isn't supported, things simply appear.
- **Loader (The Happy Plate):** plays only on a first visit that lands on the **homepage**, and never on slow connections or Data Saver. Opaque for ~0.56s, gone by ~0.76s; `pointer-events: none`, `aria-hidden`, and dismisses itself in CSS. It's this rare on purpose: measured under mobile throttling, an always-on full-screen loader pushed homepage LCP from ~2.9s to 4–5.7s, because Chrome doesn't count content as painted while it's covered.
- **Route transition:** a coral-then-green colour wipe with a hand-drawn trailing edge, ~0.6s, only on client-side navigation. Focus moves to `<main>`.
- **Reveals:** `.reveal` (fade-up on scroll), `.draw-on-view` / `.draw-on-load` (SVG stroke drawing).
- **Idle:** `.spin-slow`, `.bob`. Use on one element per view at most.

## Seasonal offer — Diwali ("Happy Diwali, happier you")

- **What:** `sections/DiwaliOffer` (the card: "only for you!" gift tag, rocket on a dotted trail, 50% OFF sticker, diya, anar, bursts — all inline SVG) inside `site/DiwaliOfferModal` (native `<dialog>`), homepage only. Behind the card, `DiwaliSky` fires rockets that burst around the screen for three rounds (~15–20s) after opening, then rests.
- **Filmy lines:** `sections/DiwaliFilmyLine` rotates `diwaliOffer.dialogues` every 8s (paused on hover/focus, off under reduced motion); the 🎬 clapperboard skips to the next one. Edit or add lines in `lib/site.ts` — keep them light, with no health claims.
- **Behaviour:** opens once, 5s after landing (kept off first paint for LCP and Google's mobile interstitial rules); bottom sheet on phones, centred from `sm`. ✕, Escape, backdrop or CTA closes it and snoozes it for 24h (`localStorage` key `hel-diwali-offer`). A "Diwali offer" pill bottom-left reopens it. Motion is `.diwali-*` in `globals.css`, all off under reduced motion.
- **Prices and copy** live in `diwaliOffer` (`lib/site.ts`); the discount % is calculated from them. The CTA opens WhatsApp with a pre-filled Diwali message (`waUrl("diwali")`) — there's no payment integration, so the offer is honoured by hand.
- **To retire it after Diwali:** set `diwaliOffer.active = false`. Nothing else renders.

## Content model — how to add things

| To add… | Edit | Notes |
|---------|------|-------|
| A service | `data/services.ts` (plus its phrase in `topics`) | Page, sitemap, OG image and links are generated. Cite references from `data/references.ts` |
| An article | `data/articles.ts` | Stays `noindex` until `review` is set |
| A location | `data/locations.ts` | Indexable only with genuine `local` content |
| An FAQ | `data/faqs.ts` | `/faq` gets the `FAQPage` markup |
| A testimonial | `data/testimonials.ts` | Only with written consent |
| A business fact | `lib/site.ts` | Numeric claims stay hidden until `confirmed: true` |
| A reference | `data/references.ts` | Check the URL resolves to the named document first |
