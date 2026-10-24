#!/usr/bin/env node
/**
 * Browser QA: drives a real headless Chrome over the DevTools Protocol.
 *
 *   npm run build && npm run start -- -p 3100
 *   npm run check:browser                       # http://localhost:3100
 *   CHROME_PATH="/path/to/chrome" npm run check:browser -- https://preview.example
 *
 * Checks: horizontal overflow at phone/tablet/desktop widths, console errors
 * and CSP violations, the brand loader, route transitions + focus handling,
 * browser history, keyboard access, FAQ accordions, the mobile menu, the
 * WhatsApp contact form, and prefers-reduced-motion. Optionally saves
 * screenshots with SCREENSHOTS=dir.
 */
import { spawn } from "node:child_process"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const BASE = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "")
const CHROME =
  process.env.CHROME_PATH ??
  (process.platform === "win32"
    ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
    : process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : "google-chrome")
const SHOTS = process.env.SCREENSHOTS
// Optional comma-separated subset of paths to screenshot, e.g. SHOT_PAGES=/,/about
const SHOT_PAGES = process.env.SHOT_PAGES?.split(",")
const PORT = 9333

const PAGES = [
  "/", "/about", "/services", "/services/pcos-diet", "/services/online-consultation", "/consultation",
  "/blog", "/blog/10-best-protein-sources-for-vegetarians-in-india", "/blog/category/pcos", "/resources",
  "/resources/first-consultation-checklist", "/resources/indian-balanced-plate", "/faq", "/contact",
  "/locations", "/locations/mumbai", "/locations/borivali", "/locations/borivali-west", "/locations/delhi", "/privacy", "/terms", "/medical-disclaimer", "/no-such-page",
]
const VIEWPORTS = [
  { name: "phone", width: 360, height: 780, mobile: true, scale: 2 },
  { name: "phone-l", width: 414, height: 896, mobile: true, scale: 2 },
  { name: "tablet", width: 820, height: 1180, mobile: true, scale: 2 },
  { name: "desktop", width: 1440, height: 900, mobile: false, scale: 1 },
]

const results = []
const record = (ok, name, detail = "") => {
  results.push({ ok, name, detail })
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`)
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// ------------------------------------------------------------- Chrome + CDP
const profile = mkdtempSync(join(tmpdir(), "hel-chrome-"))
const chrome = spawn(CHROME, [`--remote-debugging-port=${PORT}`, "--headless=new", "--no-first-run", "--no-default-browser-check", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" })

let version
for (let i = 0; i < 50 && !version; i++) {
  try {
    version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
  } catch {
    await wait(200)
  }
}
if (!version) throw new Error("Chrome did not start — set CHROME_PATH")

const ws = new WebSocket(version.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener("open", r, { once: true }))
let nextId = 1
const pending = new Map()
const listeners = []
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) reject(new Error(msg.error.message))
    else resolve(msg.result)
  } else if (msg.method) {
    for (const l of listeners) l(msg)
  }
})
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++
    const timer = setTimeout(() => {
      pending.delete(id)
      reject(new Error(`CDP ${method} timed out after 30s`))
    }, 30000)
    pending.set(id, {
      resolve: (v) => (clearTimeout(timer), resolve(v)),
      reject: (e) => (clearTimeout(timer), reject(e)),
    })
    ws.send(JSON.stringify({ id, method, params, sessionId }))
  })

async function newPage() {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" })
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true })
  const s = (m, p) => send(m, p, sessionId)
  const errors = []
  listeners.push((msg) => {
    if (msg.sessionId !== sessionId) return
    if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text)
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") errors.push(msg.params.args.map((a) => a.value ?? a.description).join(" "))
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") errors.push(`${msg.params.entry.source}: ${msg.params.entry.text} ${msg.params.entry.url ?? ""}`)
  })
  await s("Page.enable")
  await s("Runtime.enable")
  await s("Log.enable")
  const evaluate = async (expression) => {
    const r = await s("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text)
    return r.result.value
  }
  const goto = async (path) => {
    const loaded = new Promise((r) => {
      const l = (msg) => msg.sessionId === sessionId && msg.method === "Page.loadEventFired" && (listeners.splice(listeners.indexOf(l), 1), r())
      listeners.push(l)
    })
    await s("Page.navigate", { url: BASE + path })
    await Promise.race([loaded, wait(15000)])
    await wait(400)
  }
  const viewport = (v) => s("Emulation.setDeviceMetricsOverride", { width: v.width, height: v.height, deviceScaleFactor: v.scale, mobile: v.mobile })
  return { s, evaluate, goto, viewport, errors, targetId }
}

const page = await newPage()

// ------------------------------------------------------------ 1. Loader
await page.viewport(VIEWPORTS[3])
await page.goto("/")
const loaderEarly = await page.evaluate(`getComputedStyle(document.querySelector('.hel-loader')).display`)
await wait(1200)
const loaderLate = await page.evaluate(`getComputedStyle(document.querySelector('.hel-loader')).visibility`)
record(loaderEarly === "grid" && loaderLate === "hidden", "Loader shows on first visit and hides itself", `display=${loaderEarly}, visibility after 1.6s=${loaderLate}`)
const blocksClicks = await page.evaluate(`getComputedStyle(document.querySelector('.hel-loader')).pointerEvents`)
record(blocksClicks === "none", "Loader never blocks pointer input")
const h1InHtml = await page.evaluate(`document.querySelector('h1')?.textContent`)
record(Boolean(h1InHtml), "Real content is in the server-rendered HTML beneath the loader", h1InHtml)
await page.goto("/")
const seen = await page.evaluate(`getComputedStyle(document.querySelector('.hel-loader')).display`)
record(seen === "none", "Loader does not replay on later page loads in the same tab", `display=${seen}`)
// A search visitor landing straight on a service page (fresh tab) gets content, not an intro.
const lander = await newPage()
await lander.viewport(VIEWPORTS[0])
await lander.goto("/services/pcos-diet")
const landerLoader = await lander.evaluate(`getComputedStyle(document.querySelector('.hel-loader')).display`)
record(landerLoader === "none", "No loader when a first visit lands on an inner page", `display=${landerLoader}`)
// Background tabs are throttled by Chrome — close the extra tab and refocus the main one.
await send("Target.closeTarget", { targetId: lander.targetId })
await send("Target.activateTarget", { targetId: page.targetId })

// ---------------------------------------------- 2. Client-side navigation
await page.goto("/")
await page.evaluate(`window.__navMarker = 1`)
await page.evaluate(`document.querySelector('header a[href="/services"]').click()`)
await wait(120)
const wipeVisible = await page.evaluate(`Boolean(document.querySelector('.route-wipe'))`)
await wait(1200)
const nav = await page.evaluate(`({ path: location.pathname, marker: window.__navMarker, focus: document.activeElement?.id, wipe: Boolean(document.querySelector('.route-wipe')), h1: document.querySelector('h1')?.textContent, title: document.title })`)
record(nav.path === "/services" && nav.marker === 1, "Header link navigates client-side (no full reload)", nav.path)
record(wipeVisible && !nav.wipe, "Route wipe plays and then removes itself")
record(nav.focus === "main", "Focus moves to <main> after navigation", `activeElement=#${nav.focus}`)
record(/Services/.test(nav.title) && Boolean(nav.h1), "Title and heading update after navigation", nav.title)
await page.evaluate(`history.back()`)
await wait(1200)
const back = await page.evaluate(`location.pathname`)
record(back === "/", "Browser back button returns to the previous page", back)
await page.evaluate(`history.forward()`)
await wait(1200)
record((await page.evaluate(`location.pathname`)) === "/services", "Browser forward button works")
// Regression: new pages must start at the top, not animate in from mid-page.
await page.evaluate(`window.scrollTo(0, 1500)`)
await wait(300)
await page.evaluate(`document.querySelector('header a[href="/about"]').click()`)
await wait(250)
const landedAt = await page.evaluate(`Math.round(scrollY)`)
record(landedAt === 0, "Client-side navigation starts the new page at the top", `scrollY 250ms after click = ${landedAt}`)

// ------------------------------------------------------------- 3. Keyboard
await page.goto("/faq")
await page.s("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 })
await page.s("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 })
const firstTab = await page.evaluate(`({ text: document.activeElement?.textContent?.trim(), outline: getComputedStyle(document.activeElement).outlineStyle, top: document.activeElement.getBoundingClientRect().top })`)
record(firstTab.text === "Skip to content" && firstTab.outline !== "none" && firstTab.top >= 0, "First Tab reaches a visible 'Skip to content' link", JSON.stringify(firstTab))
await page.evaluate(`document.querySelector('.faq-item summary').focus()`)
await page.s("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" })
await page.s("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 })
await wait(150)
record(await page.evaluate(`document.querySelector('.faq-item').open`), "FAQ item opens with the keyboard (Enter)")
const focusables = await page.evaluate(`[...document.querySelectorAll('a[href],button,summary,input,select,textarea')].filter(e=>e.offsetParent!==null).filter(e=>!(e.textContent.trim()||e.getAttribute('aria-label')||e.getAttribute('title')||e.labels?.length)).map(e=>e.outerHTML.slice(0,80))`)
record(focusables.length === 0, "Every visible interactive element has an accessible name", focusables.join(" | "))

// ---------------------------------------------------------- 4. Mobile menu
await page.viewport(VIEWPORTS[0])
await page.goto("/")
await page.evaluate(`document.querySelector('header details summary').click()`)
await wait(150)
const menu = await page.evaluate(`({ open: document.querySelector('header details').open, links: [...document.querySelectorAll('header details nav a')].filter(a=>a.offsetParent).length })`)
record(menu.open && menu.links >= 5, "Mobile menu opens and shows navigation links", JSON.stringify(menu))
for (const type of ["keyDown", "keyUp"]) await page.s("Input.dispatchKeyEvent", { type, key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 })
await wait(100)
record(!(await page.evaluate(`document.querySelector('header details').open`)), "Escape closes the mobile menu")
await page.evaluate(`document.querySelector('header details summary').click()`)
await page.evaluate(`document.querySelector('header details nav a[href="/contact"]').click()`)
await wait(1200)
record((await page.evaluate(`location.pathname + ':' + document.querySelector('header details').open`)) === "/contact:false", "Mobile menu closes after navigating")

// --------------------------------------------------------- 5. Contact form
await page.goto("/contact")
const wa = await page.evaluate(`(() => {
  let opened = null; window.open = (u) => { opened = u; return { opener: 1 } }
  const f = document.querySelector('main form'); const set = (el, v) => { const p = Object.getPrototypeOf(el); Object.getOwnPropertyDescriptor(p, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })) }
  set(f.querySelector('input[name=name]'), 'Asha'); set(f.querySelector('textarea'), 'Help with tiffin ideas')
  return new Promise(r => setTimeout(() => { f.requestSubmit(); setTimeout(() => r(opened), 200) }, 100))
})()`)
const decoded = wa ? decodeURIComponent(wa) : ""
record(Boolean(wa?.startsWith("https://wa.me/918879043297?text=")) && decoded.includes("Asha") && decoded.includes("tiffin"), "Contact form composes a WhatsApp message", decoded.replace(/\n/g, " ⏎ ").slice(0, 140))
const waLinks = await page.evaluate(`[...document.querySelectorAll('a[href*="wa.me"]')].every(a => a.href.startsWith('https://wa.me/918879043297') && a.rel.includes('noopener'))`)
record(waLinks, "All WhatsApp links use the right number and rel=noopener")

// ------------------------------------------------------ 6. Reduced motion
await page.s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] })
const rm = await newPage()
await rm.s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] })
await rm.viewport(VIEWPORTS[3])
await rm.goto("/")
const rmState = await rm.evaluate(`({ loader: getComputedStyle(document.querySelector('.hel-loader')).display, smooth: getComputedStyle(document.documentElement).scrollBehavior, reveal: getComputedStyle(document.querySelector('.reveal')).animationName })`)
await rm.evaluate(`document.querySelector('header a[href="/about"]').click()`)
await wait(150)
const rmWipe = await rm.evaluate(`document.querySelector('.route-wipe') ? getComputedStyle(document.querySelector('.route-wipe')).display : 'none'`)
record(rmState.loader === "none" && rmState.smooth === "auto" && rmState.reveal === "none" && rmWipe === "none", "prefers-reduced-motion disables loader, wipe, reveals and smooth scroll", JSON.stringify({ ...rmState, wipe: rmWipe }))
await page.s("Emulation.setEmulatedMedia", { features: [] })
await send("Target.closeTarget", { targetId: rm.targetId })
await send("Target.activateTarget", { targetId: page.targetId })

// ------------------------------------------- 7. Layout overflow + errors
if (SHOTS) mkdirSync(SHOTS, { recursive: true })
const overflowIssues = []
for (const v of VIEWPORTS) {
  await page.viewport(v)
  for (const path of PAGES) {
    page.errors.length = 0
    await page.goto(path)
    await wait(300)
    const o = await page.evaluate(`(() => {
      const w = document.documentElement.clientWidth
      const offenders = [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect(); if (r.width === 0 || r.right <= w + 1) return false
        if (!el.checkVisibility({ visibilityProperty: true })) return false // e.g. inside a closed <details>
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (s.overflowX !== 'visible' || s.position === 'fixed') return false }
        return getComputedStyle(el).position !== 'fixed'
      }).slice(0, 3).map(el => el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.'))
      return { scroll: document.documentElement.scrollWidth, w, offenders }
    })()`)
    if (o.scroll > o.w + 1 || o.offenders.length) overflowIssues.push(`${v.name} ${path}: scrollWidth ${o.scroll} > ${o.w} ${o.offenders.join(", ")}`)
    // /_vercel/insights only exists on Vercel's network, so it 404s on localhost.
    const errs = page.errors.filter((e) => !/favicon/.test(e) && !/_vercel\/insights/.test(e) && !(path === "/no-such-page" && /404/.test(e)))
    if (errs.length) record(false, `No console errors on ${path} (${v.name})`, errs.join(" | ").slice(0, 300))
    if (SHOTS && (v.name === "phone" || v.name === "desktop") && (!SHOT_PAGES || SHOT_PAGES.includes(path))) {
      try {
        const { cssContentSize } = await page.s("Page.getLayoutMetrics")
        const height = Math.min(Math.ceil(cssContentSize.height), 7000)
        // A viewport as tall as the page, so scroll-driven reveals are in their end state.
        await page.viewport({ ...v, height })
        await wait(900)
        const shot = await page.s("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: v.width, height, scale: v.mobile ? 0.5 : 1 } })
        await page.viewport(v)
        writeFileSync(join(SHOTS, `${v.name}${path.replace(/\//g, "_") || "_home"}.png`), Buffer.from(shot.data, "base64"))
      } catch (e) {
        console.log(`  (screenshot skipped for ${path}: ${e.message})`)
      }
    }
  }
}
record(overflowIssues.length === 0, `No horizontal overflow on ${PAGES.length} pages × ${VIEWPORTS.length} viewports`, overflowIssues.join(" | ").slice(0, 600))
if (!results.some((r) => r.name.startsWith("No console errors") && !r.ok)) record(true, "No console errors or CSP violations on any page/viewport")

// ------------------------------------------------------------------ done
ws.close()
chrome.kill()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} browser checks passed.`)
process.exit(failed.length ? 1 : 0)
