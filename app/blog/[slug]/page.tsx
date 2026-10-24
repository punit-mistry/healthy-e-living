import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArtIcon from "@/components/brand/ArtIcon"
import ArticleBody from "@/components/sections/ArticleBody"
import ArticleCard from "@/components/sections/ArticleCard"
import CtaBand from "@/components/sections/CtaBand"
import References from "@/components/sections/References"
import Breadcrumbs from "@/components/ui-kit/Breadcrumbs"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import { articles, getArticle, isReviewed, readingMinutes } from "@/data/articles"
import { getServiceBySlug } from "@/data/services"
import { formatDate } from "@/lib/format"
import { faqEntities, ids, pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl, person } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return pageMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    // Health content is only offered to search engines once a qualified
    // professional has reviewed it.
    noindex: !isReviewed(article),
    ownImage: true,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const path = `/blog/${slug}`
  const url = absoluteUrl(path)
  const reviewed = isReviewed(article)
  const headings = article.body.filter((b) => b.type === "h2")
  const relatedServices = article.relatedServices.map(getServiceBySlug).filter((s) => s !== undefined)
  const more = articles.filter((a) => a.slug !== slug).slice(0, 3)
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/blog" },
    { name: article.title, path },
  ]

  const jsonLd = webPageJson({
    path,
    name: article.metaTitle,
    description: article.description,
    crumbs,
    type: "MedicalWebPage",
    mainEntity: { "@id": `${url}#article` },
    pageProps: article.review ? { reviewedBy: { "@id": ids.person }, lastReviewed: article.review.on } : undefined,
    extra: [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: `${url}/opengraph-image/card`,
        datePublished: article.published,
        dateModified: article.updated,
        inLanguage: "en-IN",
        articleSection: article.category.name,
        author: { "@id": ids.organization },
        publisher: { "@id": ids.organization },
        citation: article.references.map((r) => r.url),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqEntities(article.faqs),
      },
    ],
  })

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        <header className="bg-cream">
          <div className="wrap pb-12 pt-8 sm:pb-16 sm:pt-10">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <Link href={`/blog/category/${article.category.slug}`} className="chip">
                  {article.category.name}
                </Link>
                <h1 className="mt-5 text-display-l">{article.title}</h1>
                <p className="mt-6 max-w-2xl text-lede text-ink-soft">{article.description}</p>
                <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-ink-soft">
                  <span>
                    Published <time dateTime={article.published}>{formatDate(article.published)}</time>
                  </span>
                  {article.updated !== article.published && (
                    <span>
                      Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                    </span>
                  )}
                  <span>{readingMinutes(article)} min read</span>
                </p>
              </div>
              <ArtIcon name={article.art} tone={2} className="bob mx-auto hidden h-56 w-56 lg:block" />
            </div>
          </div>
        </header>

        <div className="wrap grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            {reviewed && article.review ? (
              <p className="flex flex-wrap items-center gap-2 rounded-2xl bg-mint px-5 py-4 text-[0.95rem]">
                <svg viewBox="0 0 20 20" className="h-5 w-5 text-green" aria-hidden="true">
                  <path d="M3 11c2 1 4 3 5 5 2-5 5-9 9-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <span>
                  Medically reviewed by{" "}
                  <Link href="/about" className="font-bold underline underline-offset-4">
                    {person.displayName}
                  </Link>
                  , {person.jobTitle}, on <time dateTime={article.review.on}>{formatDate(article.review.on)}</time>.
                </span>
              </p>
            ) : (
              <p className="rounded-2xl border-2 border-dashed border-coral-deep/60 bg-paper px-5 py-4 text-[0.95rem]">
                <strong>Awaiting clinical review.</strong> This article is being reviewed by {person.displayName} and is shared as general
                information in the meantime.
              </p>
            )}

            <section aria-labelledby="short-answer" className="mt-8 rounded-[1.75rem] bg-butter p-6 sm:p-8">
              <h2 id="short-answer" className="hand text-3xl text-ink">
                the short answer
              </h2>
              <p className="mt-2 text-lg leading-relaxed">{article.shortAnswer}</p>
            </section>

            <div className="mt-10">
              <ArticleBody blocks={article.body} />
            </div>

            <section aria-labelledby="article-faq" className="mt-16">
              <h2 id="article-faq" className="mb-6 text-display-s">
                Frequently asked questions
              </h2>
              <FaqList faqs={article.faqs} />
            </section>

            <div className="mt-14">
              <References items={article.references} />
            </div>

            <p className="mt-8 text-sm text-ink-soft">
              This article is general, educational information and not personal medical advice. If you have a health condition, are pregnant or
              take medication, please speak to your doctor or a qualified dietitian before changing your diet. See the{" "}
              <Link href="/medical-disclaimer" className="underline underline-offset-4">
                medical disclaimer
              </Link>
              .
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-labelledby="toc-title" className="rounded-3xl bg-paper p-6">
              <h2 id="toc-title" className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-green">
                In this article
              </h2>
              <ol className="mt-4 space-y-2.5 text-[0.95rem]">
                {headings.map((h) =>
                  h.type === "h2" ? (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="hover:text-green hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ) : null,
                )}
              </ol>
            </nav>
            {relatedServices.length > 0 && (
              <div className="mt-6 rounded-3xl bg-mint p-6">
                <p className="font-display text-lg font-bold">Want help putting this into practice?</p>
                <ul className="mt-3 space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="font-semibold text-green underline underline-offset-4">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>

      <section aria-labelledby="more-title" className="bg-cream-deep py-16 sm:py-20">
        <div className="wrap">
          <h2 id="more-title" className="text-display-m">
            More from the journal
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {more.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand waHref={waUrl("discuss")} location={`article_${slug}`} />
    </>
  )
}
