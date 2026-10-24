import type { MetadataRoute } from "next"
import { articles, isReviewed } from "@/data/articles"
import { locations } from "@/data/locations"
import { isResourceIndexable, resources } from "@/data/resources"
import { services } from "@/data/services"
import { absoluteUrl } from "@/lib/site"

/** Bump when page copy meaningfully changes, so lastmod stays truthful. */
const CONTENT_UPDATED = "2026-10-24"

/**
 * Canonical, indexable URLs only. Anything rendered with `noindex`
 * (unreviewed articles, thin location pages, topic archives) is excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified = CONTENT_UPDATED) => ({ url: absoluteUrl(path), lastModified })

  return [
    page("/"),
    page("/about"),
    page("/services"),
    ...services.map((s) => page(`/services/${s.slug}`)),
    page("/consultation"),
    page("/blog"),
    ...articles.filter(isReviewed).map((a) => page(`/blog/${a.slug}`, a.updated)),
    page("/resources"),
    ...resources.filter(isResourceIndexable).map((r) => page(`/resources/${r.slug}`, r.updated)),
    page("/faq"),
    page("/contact"),
    page("/locations"),
    ...locations.filter((l) => l.indexable).map((l) => page(`/locations/${l.slug}`)),
    page("/privacy"),
    page("/terms"),
    page("/medical-disclaimer"),
  ]
}
