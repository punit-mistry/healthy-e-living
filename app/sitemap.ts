import type { MetadataRoute } from "next"
import { articles, isReviewed } from "@/data/articles"
import { detoxPlan } from "@/data/diwali-detox"
import { locations } from "@/data/locations"
import { isResourceIndexable, resources } from "@/data/resources"
import { services } from "@/data/services"
import { absoluteUrl } from "@/lib/site"

/** Bump when page copy meaningfully changes, so lastmod stays truthful. */
const CONTENT_UPDATED = "2026-11-04"

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
    page("/pricing"),
    // Seasonal campaign landing page. Reviewed by Dt. Irika Goyal, so it is
    // indexable; refresh the copy and bump `detoxPlan.updated` each Diwali.
    page("/diwali-detox", detoxPlan.updated),
    // /blog and /resources are left out: both listings are all but empty
    // (no article is reviewed yet, and only one resource is indexable), so
    // they are dead ends for a crawler. The pages themselves still exist and
    // stay in the nav — add them back once their listings have something.
    ...articles.filter(isReviewed).map((a) => page(`/blog/${a.slug}`, a.updated)),
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
