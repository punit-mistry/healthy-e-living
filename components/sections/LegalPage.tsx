import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { formatDate } from "@/lib/format"
import { webPageJson } from "@/lib/seo"

interface LegalPageProps {
  path: string
  title: string
  description: string
  updated: string
  children: React.ReactNode
}

export default function LegalPage({ path, title, description, updated, children }: LegalPageProps) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ]
  return (
    <>
      <JsonLd data={webPageJson({ path, name: title, description, crumbs })} />
      <PageHero crumbs={crumbs} eyebrow="The small print, in plain words" title={title} lede={description}>
        <p className="mt-6 text-sm font-semibold text-ink-soft">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </PageHero>
      <div className="wrap py-14">
        <div className="prose-article max-w-3xl">{children}</div>
      </div>
    </>
  )
}
