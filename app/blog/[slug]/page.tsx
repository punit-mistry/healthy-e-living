import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getRecentBlogPosts } from "@/data/blog-outlines"
import { services } from "@/data/services"
import { locations } from "@/data/locations"
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
        images: [{ url: "https://healthy-e-living.vercel.app/brand-logo.PNG", width: 1200, height: 630 }],
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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Related Services</h4>
                <div className="flex flex-wrap gap-2">
                  {services.slice(0, 5).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="text-xs px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-[#6A431C] hover:bg-[#6A431C] hover:text-white transition-colors"
                    >
                      {s.shortName}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Available in</h4>
                <div className="flex flex-wrap gap-2">
                  {locations.slice(0, 6).map((l) => (
                    <Link
                      key={l.slug}
                      href={`/locations/${l.slug}`}
                      className="text-xs px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-[#6A431C] hover:bg-[#6A431C] hover:text-white transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
