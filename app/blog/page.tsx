import type { Metadata } from "next"
import Link from "next/link"
import { Sprig } from "@/components/brand/Motifs"
import ArticleCard from "@/components/sections/ArticleCard"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { articleCategories, articles } from "@/data/articles"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const title = "Nutrition Journal: Practical Guides"
const description =
  "Practical, evidence-based nutrition guides with Indian food in mind — weight, PCOS, protein, breakfasts and more — from the practice of clinical dietitian Irika Goyal."

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Journal", path: "/blog" },
]

export default function BlogIndexPage() {
  const [lead, ...rest] = articles
  return (
    <>
      <JsonLd
        data={webPageJson({
          path: "/blog",
          name: title,
          description,
          crumbs,
          type: "CollectionPage",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/blog/${a.slug}`), name: a.title })),
          },
        })}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="The journal"
        tone="butter"
        title={
          <>
            Food thoughts, <span className="em text-green">minus</span> the fads.
          </>
        }
        lede="Clear, practical guides built around Indian kitchens — with sources, so you can see where the advice comes from."
        aside={<Sprig className="draw-on-load ml-auto hidden h-56 w-40 lg:block" />}
      >
        <nav aria-label="Journal topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {articleCategories().map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label="Articles" className="wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard article={lead} size="lg" />
          <div className="rounded-[2rem] bg-green p-8 text-cream sm:p-10">
            <p className="hand text-3xl text-butter">free to print</p>
            <h2 className="mt-2 text-display-s">Resources for your fridge door</h2>
            <p className="mt-3 text-cream/85">A first-consultation checklist and a guide to building a balanced Indian plate — simple, printable and free.</p>
            <Link href="/resources" className="btn btn-cream mt-6">
              Browse resources
            </Link>
          </div>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {rest.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i + 1} />
          ))}
        </div>
      </section>

      <CtaBand waHref={waUrl("discuss")} location="blog" />
    </>
  )
}
