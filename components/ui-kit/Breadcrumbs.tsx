import Link from "next/link"
import type { Crumb } from "@/lib/seo"

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by webPageJson(). */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-medium text-ink-soft">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="underline decoration-line underline-offset-4 hover:text-green hover:decoration-coral">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-coral-deep">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
