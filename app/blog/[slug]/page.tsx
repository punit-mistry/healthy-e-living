import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getRecentBlogPosts } from "@/data/blog-outlines"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getRecentBlogPosts(5).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://healthy-e-living.vercel.app/blog/${slug}`,
      siteName: "Nutrition by Irika Goyal",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <article className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#6A431C]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[#6A431C]">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-[#6A431C] font-medium">{post.title}</span>
            </nav>

            <span className="text-xs font-semibold text-[#6A431C] uppercase tracking-wider">{post.category}</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-6">{post.h1}</h1>
            <p className="text-lg text-slate-600 mb-8">{post.intro}</p>

            <div className="prose prose-slate max-w-none">
              {post.headings.map((heading, i) => (
                <div key={i} className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">{heading}</h2>
                  <p className="text-slate-600 leading-relaxed">
                    {post.title} is an important topic in {post.category.toLowerCase()} nutrition. 
                    Dt. Irika Goyal provides expert guidance on this subject, helping you make informed 
                    decisions about your health and dietary choices. This section covers key aspects 
                    that you need to understand for better health outcomes.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Need Personalized Guidance?</h3>
              <p className="text-slate-600 mb-4">
                Book a one-on-one consultation with Dt. Irika Goyal for a personalized nutrition plan tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919833640891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium text-sm"
                >
                  Book Consultation
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
