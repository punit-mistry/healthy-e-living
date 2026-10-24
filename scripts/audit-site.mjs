#!/usr/bin/env node
/**
 * Site audit: crawls a running build and checks SEO, structured data,
 * links and legacy-URL preservation.
 *
 *   npm run build && npm run start -- -p 3100
 *   npm run audit:site                       # defaults to http://localhost:3100
 *   npm run audit:site -- https://preview-url.vercel.app
 *
 * Exits non-zero if any check fails.
 */
import { readFileSync } from "node:fs"

const BASE = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "")
const PROD = "https://www.healthelivingwithirika.com"

const failures = []
const warnings = []
const fail = (msg) => failures.push(msg)
const warn = (msg) => warnings.push(msg)

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")

function meta(html, attr, name) {
  const re = new RegExp(`<meta[^>]+${attr}="${name}"[^>]*>`, "i")
  const tag = html.match(re)?.[0]
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? "") : null
}

function parsePage(html) {
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "")
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null
  const h1s = (html.match(/<h1[\s>]/gi) ?? []).length
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const links = [...html.matchAll(/<a[^>]+href="(\/[^"#?]*)[^"]*"/g)].map((m) => decode(m[1]))
  const imgsMissingAlt = [...html.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)].length
  return {
    title,
    canonical,
    h1s,
    jsonLd,
    links,
    imgsMissingAlt,
    description: meta(html, "name", "description"),
    robots: meta(html, "name", "robots"),
    ogTitle: meta(html, "property", "og:title"),
    ogImage: meta(html, "property", "og:image"),
    ogUrl: meta(html, "property", "og:url"),
    twitterCard: meta(html, "name", "twitter:card"),
    lang: html.match(/<html[^>]+lang="([^"]+)"/i)?.[1] ?? null,
  }
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" })
  const type = res.headers.get("content-type") ?? ""
  const body = type.includes("text") || type.includes("xml") || type.includes("json") ? await res.text() : ""
  return { status: res.status, type, body, headers: res.headers }
}

// ---------------------------------------------------------------- crawl
const sitemapXml = (await get("/sitemap.xml")).body
const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(PROD, "") || "/")
const legacy = readFileSync(new URL("./legacy-urls.txt", import.meta.url), "utf8")
  .split(/\r?\n/)
  .filter((l) => l && !l.startsWith("#"))

const queue = [...new Set(["/", ...sitemapPaths])]
const seen = new Set(queue)
const pages = new Map()

while (queue.length) {
  const batch = queue.splice(0, 8)
  await Promise.all(
    batch.map(async (path) => {
      const r = await get(path)
      if (r.status !== 200) {
        fail(`${path} → HTTP ${r.status}`)
        return
      }
      if (!r.type.includes("text/html")) return
      const p = parsePage(r.body)
      pages.set(path, p)
      for (const link of p.links) {
        const clean = link.length > 1 ? link.replace(/\/$/, "") : link
        if (!seen.has(clean)) {
          seen.add(clean)
          queue.push(clean)
        }
      }
    }),
  )
}

// ------------------------------------------------------------ page checks
const indexable = [...pages].filter(([, p]) => !(p.robots ?? "").includes("noindex"))
const titles = new Map()
const descriptions = new Map()

for (const [path, p] of pages) {
  const isNoindex = (p.robots ?? "").includes("noindex")
  const is404 = p.title.startsWith("Page not found")
  if (is404) continue
  const expectedCanonical = PROD + (path === "/" ? "" : path)
  if (!p.title) fail(`${path}: missing <title>`)
  if (p.title.length > 65) warn(`${path}: title is ${p.title.length} chars ("${p.title}")`)
  if (!p.description) fail(`${path}: missing meta description`)
  else if (p.description.length < 70 || p.description.length > 170) warn(`${path}: description is ${p.description.length} chars`)
  if (p.canonical !== expectedCanonical && p.canonical !== expectedCanonical + "/") fail(`${path}: canonical is ${p.canonical}, expected ${expectedCanonical}`)
  if (p.h1s !== 1) fail(`${path}: has ${p.h1s} <h1> elements`)
  if (!p.ogTitle) fail(`${path}: missing og:title`)
  if (!p.ogImage) fail(`${path}: missing og:image`)
  else if (!p.ogImage.startsWith(PROD + "/")) fail(`${path}: og:image is not an absolute production URL (${p.ogImage})`)
  if (p.ogUrl && !p.ogUrl.startsWith(PROD)) fail(`${path}: og:url leaks a non-production host (${p.ogUrl})`)
  if (p.twitterCard !== "summary_large_image") fail(`${path}: twitter:card is ${p.twitterCard}`)
  if (p.lang !== "en-IN") fail(`${path}: html lang is ${p.lang}`)
  if (p.imgsMissingAlt) fail(`${path}: ${p.imgsMissingAlt} <img> without alt`)
  if (p.jsonLd.length === 0) fail(`${path}: no JSON-LD`)
  for (const block of p.jsonLd) {
    let data
    try {
      data = JSON.parse(block)
    } catch (e) {
      fail(`${path}: invalid JSON-LD (${e.message})`)
      continue
    }
    const text = JSON.stringify(data)
    if (/aggregateRating|"Review"/.test(text)) fail(`${path}: JSON-LD contains review/rating markup`)
    if (/localhost|vercel\.app/.test(text)) fail(`${path}: JSON-LD leaks a non-production host`)
    if (/LocalBusiness|PostalAddress/.test(text)) fail(`${path}: JSON-LD claims a LocalBusiness/address`)
  }
  if (!isNoindex) {
    if (titles.has(p.title)) fail(`Duplicate title on ${path} and ${titles.get(p.title)}`)
    titles.set(p.title, path)
    if (descriptions.has(p.description)) fail(`Duplicate description on ${path} and ${descriptions.get(p.description)}`)
    descriptions.set(p.description, path)
  }
}

// --------------------------------------------------------- sitemap checks
for (const path of sitemapPaths) {
  const p = pages.get(path)
  if (!p) continue
  if ((p.robots ?? "").includes("noindex")) fail(`sitemap lists noindex page ${path}`)
}
for (const [path] of indexable) {
  if (pages.get(path)?.title.startsWith("Page not found")) continue
  if (!sitemapPaths.includes(path)) warn(`indexable page not in sitemap: ${path}`)
}

// ------------------------------------------------------- legacy URLs
const legacyResults = await Promise.all(legacy.map(async (path) => [path, (await get(path)).status]))
for (const [path, status] of legacyResults) if (status !== 200) fail(`legacy URL ${path} → HTTP ${status}`)

// Retired blog posts (the old site served ~300 auto-generated topics) must
// permanently redirect to a live, relevant page — never 404.
const retired = JSON.parse(readFileSync(new URL("../data/legacy-blog-posts.json", import.meta.url), "utf8"))
const destinations = new Map()
for (let i = 0; i < retired.length; i += 20) {
  await Promise.all(
    retired.slice(i, i + 20).map(async ({ slug }) => {
      const r = await get(`/blog/${slug}`)
      const to = r.headers.get("location")
      if (r.status !== 308 || !to) return fail(`retired /blog/${slug} → HTTP ${r.status} (expected 308 redirect)`)
      const target = new URL(to, BASE).pathname
      destinations.set(target, (destinations.get(target) ?? 0) + 1)
    }),
  )
}
for (const target of destinations.keys()) {
  const status = (await get(target)).status
  if (status !== 200) fail(`redirect target ${target} → HTTP ${status}`)
}

// ---------------------------------------------------------- robots / 404
const robots = (await get("/robots.txt")).body
if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots)) warn(`robots.txt:\n${robots}`)
if (!robots.includes(`${PROD}/sitemap.xml`)) fail("robots.txt does not reference the sitemap")
const missing = await get("/this-page-does-not-exist")
if (missing.status !== 404) fail(`unknown URL returned ${missing.status}, expected 404`)

// --------------------------------------------------------------- headers
const home = await get("/")
for (const h of ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options"]) {
  if (!home.headers.get(h)) fail(`missing response header: ${h}`)
}
if (home.headers.get("x-powered-by")) fail("x-powered-by header is exposed")

// ---------------------------------------------------------------- report
console.log(`Audited ${pages.size} HTML pages (${indexable.length} indexable), ${sitemapPaths.length} sitemap URLs, ${legacy.length} legacy URLs, ${retired.length} retired blog redirects → ${destinations.size} live pages.`)
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ` + warnings.join("\n  "))
if (failures.length) {
  console.log(`\nFAILURES (${failures.length}):\n  ` + failures.join("\n  "))
  process.exit(1)
}
console.log("\nAll checks passed.")
