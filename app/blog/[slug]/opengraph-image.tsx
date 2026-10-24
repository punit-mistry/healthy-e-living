import { articles, getArticle } from "@/data/articles"
import { ogContentType, ogSize, renderOg } from "@/lib/og"

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  return [
    {
      id: "card",
      size: ogSize,
      contentType: ogContentType,
      alt: `${article?.title ?? "Nutrition journal"} — from the Healthy E Living journal`,
    },
  ]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  return renderOg({
    eyebrow: `Journal · ${article?.category.name ?? "Nutrition"}`,
    title: article?.title ?? "The Healthy E Living journal",
    footer: "from the journal at healthelivingwithirika.com",
  })
}
