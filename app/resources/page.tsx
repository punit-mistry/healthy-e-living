import type { Metadata } from "next"
import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { resources } from "@/data/resources"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { waUrl } from "@/lib/whatsapp"

const title = "Free Nutrition Resources & Printables"
const description = "Free, printable nutrition resources from Healthy E Living — a first-consultation checklist and a practical guide to the Indian balanced plate."

export const metadata: Metadata = pageMetadata({ title, description, path: "/resources" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={webPageJson({ path: "/resources", name: title, description, crumbs, type: "CollectionPage" })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Free resources"
        tone="mint"
        title={
          <>
            Little helpers for your <span className="em text-green">fridge</span> door.
          </>
        }
        lede="Simple, printable guides you can use today — and share with anyone who'd find them useful."
      />
      <section aria-label="Resources" className="wrap grid gap-8 py-16 md:grid-cols-2">
        {resources.map((r, i) => (
          <article key={r.slug} className={`group relative rounded-[2rem] p-8 sm:p-10 ${i % 2 ? "bg-coral-soft" : "bg-butter-soft"}`}>
            <ArtIcon name={r.art} tone={i + 1} className="h-24 w-24 transition-transform duration-300 group-hover:rotate-6" />
            <h2 className="mt-5 text-display-s">
              <Link href={`/resources/${r.slug}`} className="after:absolute after:inset-0 group-hover:text-green">
                {r.title}
              </Link>
            </h2>
            <p className="mt-3 text-ink-soft">{r.description}</p>
            <p className="mt-5 font-bold text-green">Open &amp; print →</p>
          </article>
        ))}
      </section>
      <CtaBand waHref={waUrl("discuss")} location="resources" />
    </>
  )
}
