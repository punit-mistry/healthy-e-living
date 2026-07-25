import { Metadata } from "next"
import Link from "next/link"
import { services, getServiceBySlug, getRelatedServices } from "@/data/services"
import { getRecentBlogPosts } from "@/data/blog-outlines"
import { locations } from "@/data/locations"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://healthy-e-living.vercel.app/services/${slug}`,
      siteName: "Nutrition by Irika Goyal",
      images: [{ url: "https://healthy-e-living.vercel.app/brand-logo.PNG", width: 1200, height: 630 }],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = getRelatedServices(slug)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `https://healthy-e-living.vercel.app/services/${slug}#service`,
        name: service.name,
        description: service.description,
        url: `https://healthy-e-living.vercel.app/services/${slug}`,
        provider: { "@id": "https://healthy-e-living.vercel.app/#person" },
        areaServed: { "@type": "City", name: "Mumbai" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://healthy-e-living.vercel.app/services/${slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://healthy-e-living.vercel.app/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://healthy-e-living.vercel.app/services" },
          { "@type": "ListItem", position: 3, name: service.name },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `https://healthy-e-living.vercel.app/services/${slug}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="min-h-screen bg-white overflow-hidden">
        <Header />
        <main>
          <section className="min-h-[calc(100vh-4rem)] pt-32 pb-24 bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="mb-8 text-sm text-slate-500">
                <Link href="/" className="hover:text-[#6A431C]">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/services" className="hover:text-[#6A431C]">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-[#6A431C] font-medium">{service.name}</span>
              </nav>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{service.h1}</h1>
                  <p className="text-lg text-[#6A431C] font-medium mb-4">{service.tagline}</p>
                  <p className="text-lg text-slate-600 mb-8">{service.intro}</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://wa.me/919833640891"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium"
                    >
                      Book {service.shortName} Consultation
                    </a>
                    <a
                      href="tel:+919833640891"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#6A431C]/10 to-yellow-100 border border-yellow-200 overflow-hidden flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-[#6A431C] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <p className="font-serif text-2xl font-bold text-[#6A431C]">{service.name}</p>
                      <p className="text-slate-500 mt-2">Personalized nutrition care</p>
                      <div className="mt-6 flex flex-wrap gap-2 justify-center">
                        {service.benefits.slice(0, 3).map((b, i) => (
                          <span key={i} className="px-3 py-1 bg-white/80 text-xs text-slate-700 rounded-full border border-slate-200">
                            {b.split(" ").slice(0, 3).join(" ")}...
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-50 rounded-full -z-10 border border-yellow-100" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-50 rounded-full -z-10 border border-orange-100" />
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4 text-center">Benefits</h2>
              <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">What you get with our {service.shortName.toLowerCase()} program</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-5 bg-gradient-to-r from-white to-yellow-50 border border-yellow-200 rounded-xl hover:shadow-md transition-all">
                    <div className="w-7 h-7 bg-[#6A431C] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="max-w-3xl space-y-4">
                {service.faqs.map((faq, i) => (
                  <details key={i} className="bg-white border border-slate-200 rounded-xl p-6 group">
                    <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                      {faq.question}
                      <svg className="w-5 h-5 text-[#6A431C] group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Related Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="p-6 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 rounded-2xl hover:shadow-lg hover:border-[#6A431C] transition-all group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#6A431C] transition-colors mb-2">{r.shortName}</h3>
                    <p className="text-sm text-slate-600">{r.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl">
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Related Articles</h2>
                  <div className="space-y-3">
                    {getRecentBlogPosts(5).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block text-sm text-slate-600 hover:text-[#6A431C] transition-colors"
                      >
                        → {post.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl">
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Available Locations</h2>
                  <div className="flex flex-wrap gap-2">
                    {locations.slice(0, 10).map((l) => (
                      <Link
                        key={l.slug}
                        href={`/locations/${l.slug}`}
                        className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-[#6A431C] hover:text-white transition-colors"
                      >
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#6A431C] text-white text-center">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="font-serif text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-yellow-100 mb-8">Book your {service.shortName.toLowerCase()} consultation with Dt. Irika Goyal today.</p>
              <a
                href="https://wa.me/919833640891"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#6A431C] rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
              >
                Book Your Consultation
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
