import { blogTopics } from "./blog-topics"

export interface BlogPostOutline {
  title: string
  slug: string
  category: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  headings: string[]
  wordCount: number
  internalLinks: { text: string; href: string }[]
  keywords: string[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const blogPostOutlines: BlogPostOutline[] = blogTopics.map((topic) => {
  const slug = slugify(topic.title)
  return {
    title: topic.title,
    slug,
    category: topic.category,
    metaTitle: `${topic.title} | Dt. Irika Goyal`,
    metaDescription: topic.description,
    h1: topic.title,
    intro: `Discover everything you need to know about ${topic.title.toLowerCase()}. In this comprehensive guide, Dt. Irika Goyal, a leading clinical dietitian in Mumbai, shares expert insights, practical tips, and evidence-based recommendations.`,
    headings: [
      `What is ${topic.title}?`,
      `Why ${topic.category} Matters for Your Health`,
      `Key Benefits of ${topic.title}`,
      `Expert Tips from Dt. Irika Goyal`,
      "Common Mistakes to Avoid",
      "Frequently Asked Questions",
      "When to Consult a Dietitian",
    ],
    wordCount: 1500,
    internalLinks: [
      { text: "Book a consultation", href: "/contact" },
      { text: "About Dt. Irika Goyal", href: "/about" },
      { text: `${topic.category} Services`, href: `/services/${slugify(topic.category)}` },
    ],
    keywords: topic.keywords,
  }
})

export function getBlogPostBySlug(slug: string): BlogPostOutline | undefined {
  return blogPostOutlines.find((p) => p.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPostOutline[] {
  return blogPostOutlines.filter((p) => p.category === category)
}

export function getRecentBlogPosts(count: number = 10): BlogPostOutline[] {
  return blogPostOutlines.slice(0, count)
}
