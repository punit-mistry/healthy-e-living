/**
 * Security headers are tuned to what this site actually loads:
 * - scripts, styles, fonts and images are all same-origin (fonts are
 *   self-hosted by next/font; Vercel Web Analytics is served from
 *   /_vercel/insights on the same origin);
 * - the only external form target is WhatsApp (no-JS contact fallback).
 *
 * 'unsafe-inline' remains in script-src because statically generated Next.js
 * pages ship inline bootstrapping scripts, and nonces would force every page
 * to render dynamically. See docs/security.md for the nonce-based upgrade path.
 *
 * HSTS is sent by Vercel for every custom domain (max-age=63072000), so it is
 * not duplicated here.
 */

import { legacyBlogRedirects } from "./lib/legacy-redirects.mjs"

const isDev = process.env.NODE_ENV === "development"
const isPreview = process.env.VERCEL_ENV === "preview"

// Vercel's preview toolbar (preview deployments only).
const toolbar = isPreview
  ? {
      script: " https://vercel.live",
      connect: " https://vercel.live wss://ws-us3.pusher.com",
      img: " https://vercel.live https://vercel.com",
      frame: " https://vercel.live",
      style: " https://vercel.live",
      font: " https://vercel.live https://assets.vercel.com",
    }
  : { script: "", connect: "", img: "", frame: "", style: "", font: "" }

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${toolbar.script}`,
  `style-src 'self' 'unsafe-inline'${toolbar.style}`,
  `img-src 'self' data: blob:${toolbar.img}`,
  `font-src 'self'${toolbar.font}`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${toolbar.connect}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.whatsapp.com https://web.whatsapp.com https://wa.me whatsapp:",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=()",
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  // Retired blog URLs → the most relevant current page (see lib/legacy-redirects.mjs).
  async redirects() {
    return legacyBlogRedirects
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Belt and braces: preview deployments must never be indexed.
      ...(isPreview ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
    ]
  },
}

export default nextConfig
