import type { Metadata } from "next"
import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { districts, locations } from "@/data/locations"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { serviceArea } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const title = "Dietitian in Mumbai & Online Across India"
const description =
  "Nutrition consultations with Irika Goyal: in person in Mumbai, and online everywhere else — Thane, Navi Mumbai, Delhi, Bengaluru, Pune and across India."

export const metadata: Metadata = pageMetadata({ title, description, path: "/locations" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Areas we serve", path: "/locations" },
]

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={webPageJson({ path: "/locations", name: title, description, crumbs, type: "CollectionPage" })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Areas we serve"
        title={
          <>
            Mumbai in person. <span className="em text-green">Everywhere</span> online.
          </>
        }
        lede={`${serviceArea.inPersonNote} ${serviceArea.online}`}
        aside={<ArtIcon name="pin" tone={2} className="bob ml-auto hidden h-52 w-52 lg:block" />}
      />
      <div className="wrap space-y-14 py-16">
        {districts.map((d) => {
          const items = locations.filter((l) => l.district === d.id).sort((a, b) => Number(b.indexable) - Number(a.indexable))
          if (items.length === 0) return null
          return (
            <section key={d.id} aria-labelledby={`d-${d.id}`}>
              <h2 id={`d-${d.id}`} className="text-display-s">
                {d.title}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className={`chip ${l.indexable ? "bg-butter-soft! font-bold" : ""}`}>
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
        <p className="max-w-2xl text-ink-soft">
          Don&apos;t see your area? It doesn&apos;t matter — <Link href="/services/online-consultation" className="font-semibold text-green underline underline-offset-4">online consultations</Link> work from anywhere.
        </p>
      </div>
      <CtaBand waHref={waUrl("booking")} location="locations" />
    </>
  )
}
