import type { Metadata } from "next"
import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import { HappyPlate } from "@/components/brand/Motifs"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { getServicesByCategory, serviceCategories, services } from "@/data/services"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const title = "Dietitian Services: Weight, PCOS & Diabetes"
const description =
  "Every nutrition service Irika Goyal offers — weight, heart, kidney and gut health, pregnancy, children, healthy ageing and sports. Online or in Mumbai."

export const metadata: Metadata = pageMetadata({ title, description, path: "/services" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]

const sectionTones = ["bg-cream", "bg-paper", "bg-mint", "bg-cream", "bg-butter-soft", "bg-paper"]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={webPageJson({
          path: "/services",
          name: title,
          description,
          crumbs,
          type: "CollectionPage",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
        })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title={
          <>
            Nutrition support for <span className="em text-green">every</span> chapter.
          </>
        }
        lede="Whatever brought you here — a diagnosis, a goal, or simply wanting to feel better — start with the area closest to you. Not sure? Message and ask."
        aside={<HappyPlate className="spin-slow ml-auto hidden h-56 w-56 lg:block" />}
      >
        <nav aria-label="Service categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {serviceCategories.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="chip">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {serviceCategories.map((cat, ci) => {
        const items = getServicesByCategory(cat.id)
        return (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} className={`${sectionTones[ci]} scroll-mt-24 py-16 sm:py-20`}>
            <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.5fr]">
              <div>
                <span className="hand text-4xl text-coral-deep" aria-hidden="true">
                  0{ci + 1}
                </span>
                <h2 id={`${cat.id}-title`} className="mt-1 text-display-m">
                  {cat.title}
                </h2>
                <p className="mt-4 max-w-sm text-ink-soft">{cat.blurb}</p>
              </div>
              <ul className="border-t-2 border-ink">
                {items.map((s, i) => (
                  <li key={s.slug} className="group relative border-b-2 border-ink">
                    <div className="flex items-center gap-5 py-5 sm:gap-7">
                      <ArtIcon name={s.art} tone={ci + i} className="h-14 w-14 flex-none transition-transform duration-300 group-hover:-rotate-12 sm:h-16 sm:w-16" />
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl">
                          <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 group-hover:text-green">
                            {s.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-ink-soft">{s.summary}</p>
                      </div>
                      <svg viewBox="0 0 24 24" className="hidden h-7 w-7 flex-none transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden="true">
                        <path d="M4 12c5-1 10 1 15 0M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )
      })}

      <CtaBand
        waHref={waUrl("discuss")}
        location="services"
        title={
          <>
            Not sure which one fits? <span className="em">That&apos;s</span> what the first chat is for.
          </>
        }
      />
    </>
  )
}
