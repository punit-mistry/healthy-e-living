import { Metadata } from "next"
import Link from "next/link"
import { locations, getLocationBySlug, getNearbyLocations } from "@/data/locations"
import { services } from "@/data/services"
import { getRecentBlogPosts } from "@/data/blog-outlines"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://healthy-e-living.vercel.app/locations/${slug}`,
      siteName: "Nutrition by Irika Goyal",
      images: [{ url: "https://healthy-e-living.vercel.app/brand-logo.PNG", width: 1200, height: 630 }],
    },
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) notFound()

  const nearby = getNearbyLocations(slug)

  const locationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://healthy-e-living.vercel.app/locations/${slug}#business`,
        name: `Nutrition by Irika Goyal - ${location.name}`,
        description: location.description,
        url: `https://healthy-e-living.vercel.app/locations/${slug}`,
        image: "https://i.ibb.co/SwK5zdZh/logo.jpg",
        areaServed: { "@type": "City", name: location.name },
        address: {
          "@type": "PostalAddress",
          addressLocality: location.name,
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://healthy-e-living.vercel.app/locations/${slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://healthy-e-living.vercel.app/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://healthy-e-living.vercel.app/locations" },
          { "@type": "ListItem", position: 3, name: location.name },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }} />
      <div className="min-h-screen bg-white overflow-hidden">
        <Header />
        <main>
          <section className="pt-28 pb-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="mb-8 text-sm text-slate-500">
                <Link href="/" className="hover:text-[#6A431C]">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-[#6A431C] font-medium">{location.name}</span>
              </nav>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6">{location.h1}</h1>
              <p className="text-lg text-slate-600 max-w-3xl mb-8">{location.intro}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/919833640891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium"
                >
                  Book Consultation in {location.name}
                </a>
                <a
                  href="tel:+919833640891"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
                >
                  Call Now
                </a>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Our Services in {location.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.slice(0, 9).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="p-6 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 rounded-2xl hover:shadow-lg hover:border-[#6A431C] transition-all group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#6A431C] transition-colors mb-2">
                      {service.shortName} in {location.name}
                    </h3>
                    <p className="text-sm text-slate-600">{service.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {nearby.length > 0 && (
            <section className="py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Nearby Locations</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {nearby.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/locations/${n.slug}`}
                      className="p-4 bg-white border border-slate-200 rounded-xl hover:border-[#6A431C] hover:shadow-md transition-all text-center"
                    >
                      <span className="font-medium text-slate-900">{n.name}</span>
                      <p className="text-xs text-slate-500 mt-1">Dietitian in {n.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {getRecentBlogPosts(3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="p-5 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 rounded-xl hover:shadow-md transition-all"
                  >
                    <span className="text-xs font-semibold text-[#6A431C] uppercase">{post.category}</span>
                    <p className="text-sm font-medium text-slate-900 mt-1 line-clamp-2">{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#6A431C] text-white text-center">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="font-serif text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
              <p className="text-yellow-100 mb-8">Book your consultation with Dt. Irika Goyal today and start your journey to better health.</p>
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
