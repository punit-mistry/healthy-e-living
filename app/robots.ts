import type { MetadataRoute } from "next"
import { isPublicProduction } from "@/lib/env"
import { absoluteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  if (!isPublicProduction) {
    // Preview deployments: keep them out of search indexes entirely.
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }
  return {
    // Nothing on this site is private, so nothing is disallowed; pages that
    // shouldn't be indexed use a noindex meta tag instead.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
