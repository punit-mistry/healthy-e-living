import type { Metadata } from "next"
import Link from "next/link"
import { Sparkle, Sprig } from "@/components/brand/Motifs"
import ArticleCard from "@/components/sections/ArticleCard"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { articleCategories, articles } from "@/data/articles"
import { detoxDays } from "@/data/diwali-detox"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl, person } from "@/lib/site"
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
        {/* Seasonal, so it sits above the evergreen articles rather than
            inside the grid — it is a plan to follow, not something to read. */}
        <article className="group relative overflow-hidden rounded-[2rem] bg-butter-soft p-8 sm:p-10 lg:p-12">
          <Sparkle className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-70 sm:h-36 sm:w-36" color="var(--color-marigold)" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="eyebrow">Free 5-day plan · this season</p>
              <h2 className="mt-3 text-display-m">
                <Link href="/diwali-detox" className="after:absolute after:inset-0 group-hover:text-green">
                  Diwali detox: a 5-day festive reset
                </Link>
              </h2>
              <p className="mt-4 max-w-xl text-lede text-ink-soft">
                Four reset days and one day back to balance, written by {person.displayName}. Indian home food, nothing to buy, no sign-up — and a
                printable tracker at the end.
              </p>
              <p className="mt-6 font-bold text-green">Open the plan →</p>
            </div>
            <ol className="rounded-[1.5rem] border-2 border-ink/10 bg-paper p-6">
              {detoxDays.map((day) => (
                <li key={day.n} className="flex gap-3 border-b border-line py-2 last:border-0">
                  <span className="font-display font-extrabold text-coral-deep">{day.n}</span>
                  <span className="font-semibold">{day.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </article>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
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
