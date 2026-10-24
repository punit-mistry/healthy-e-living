import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArticleCard from "@/components/sections/ArticleCard"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import { articleCategories, getArticlesByCategory } from "@/data/articles"
import { pageMetadata, webPageJson } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return articleCategories().map((c) => ({ slug: c.slug }))
}

function findCategory(slug: string) {
  return articleCategories().find((c) => c.slug === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) return {}
  return pageMetadata({
    title: `${category.name} articles`,
    description: `Journal articles about ${category.name.toLowerCase()} from the practice of clinical dietitian Irika Goyal.`,
    path: `/blog/category/${slug}`,
    // Small topic archives stay out of search results; the articles themselves are what should rank.
    noindex: true,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) notFound()
  const posts = getArticlesByCategory(slug)
  const path = `/blog/category/${slug}`
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/blog" },
    { name: category.name, path },
  ]

  return (
    <>
      <JsonLd data={webPageJson({ path, name: `${category.name} articles`, description: `Articles about ${category.name}.`, crumbs, type: "CollectionPage" })} />
      <PageHero crumbs={crumbs} eyebrow="Journal topic" title={category.name}>
        <nav aria-label="Journal topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {articleCategories().map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} aria-current={c.slug === slug ? "page" : undefined} className={`chip ${c.slug === slug ? "bg-butter!" : ""}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      <section aria-label={`${category.name} articles`} className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
        <Link href="/blog" className="link-squiggle mt-12 inline-block">
          Back to the journal
        </Link>
      </section>
    </>
  )
}
