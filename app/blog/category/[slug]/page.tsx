import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostsByCategory, blogPostOutlines } from "@/data/blog-outlines"
import { blogCategories } from "@/data/blog-topics"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

interface Props {
  params: Promise<{ slug: string }>
}

function slugToCategory(slug: string): string | undefined {
  return blogCategories.find((c) => c.toLowerCase().replace(/\s+/g, "-") === slug)
}

export async function generateStaticParams() {
  return blogCategories.map((cat) => ({ slug: cat.toLowerCase().replace(/\s+/g, "-") }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = slugToCategory(slug)
  if (!category) return {}
  return {
    title: `${category} Articles | Nutrition Blog | Dt. Irika Goyal`,
    description: `Expert ${category.toLowerCase()} articles, diet tips, and health guides by Dt. Irika Goyal, clinical dietitian in Mumbai.`,
    alternates: { canonical: `/blog/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = slugToCategory(slug)
  if (!category) notFound()

  const posts = getBlogPostsByCategory(category)

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#6A431C]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[#6A431C]">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-[#6A431C] font-medium">{category}</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{category} Articles</h1>
            <p className="text-lg text-slate-600 max-w-3xl mb-8">
              Expert {category.toLowerCase()} nutrition articles, diet tips, and health guides by Dt. Irika Goyal.
            </p>
            <div className="flex flex-wrap gap-3">
              {blogCategories.map((cat) => {
                const catSlug = cat.toLowerCase().replace(/\s+/g, "-")
                return (
                  <Link
                    key={cat}
                    href={`/blog/category/${catSlug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      cat === category
                        ? "bg-[#6A431C] text-white"
                        : "bg-yellow-50 border border-yellow-200 text-[#6A431C] hover:bg-[#6A431C] hover:text-white"
                    }`}
                  >
                    {cat}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="p-6 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 rounded-2xl hover:shadow-lg hover:border-[#6A431C] transition-all group"
                >
                  <span className="text-xs font-semibold text-[#6A431C] uppercase tracking-wider">{post.category}</span>
                  <h2 className="font-semibold text-slate-900 group-hover:text-[#6A431C] transition-colors mt-2 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-2">{post.metaDescription}</p>
                  <span className="text-xs text-slate-400 mt-3 block">{post.wordCount} words</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
