import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArtIcon from "@/components/brand/ArtIcon"
import OnlineEnquiryForm from "@/components/contact/OnlineEnquiryForm"
import ArticleCard from "@/components/sections/ArticleCard"
import ConsultationSteps from "@/components/sections/ConsultationSteps"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import References from "@/components/sections/References"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { getArticlesBySlugs } from "@/data/articles"
import { getRelatedServices, getServiceBySlug, serviceCategories, services, topicFor } from "@/data/services"
import { faqEntities, ids, pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl, consultationFormat, person, serviceArea } from "@/lib/site"
import { waUrlForService } from "@/lib/whatsapp"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${slug}`, ownImage: true })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const category = serviceCategories.find((c) => c.id === service.category)
  const related = getRelatedServices(service)
  const relatedArticles = getArticlesBySlugs(service.articles)
  const path = `/services/${slug}`
  const topic = topicFor(service)
  const wa = waUrlForService(service.name)
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ]

  const jsonLd = webPageJson({
    path,
    name: service.metaTitle,
    description: service.metaDescription,
    crumbs,
    type: "MedicalWebPage",
    about: { "@id": `${absoluteUrl(path)}#service` },
    extra: [
      {
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#service`,
        name: service.name,
        serviceType: "Nutrition counselling",
        description: service.lede,
        url: absoluteUrl(path),
        provider: { "@id": ids.organization },
        areaServed: [
          { "@type": "City", name: serviceArea.inPerson },
          { "@type": "Country", name: "India" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#faq`,
        mainEntity: faqEntities(service.faqs),
      },
    ],
  })

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        crumbs={crumbs}
        eyebrow={category?.title}
        title={service.h1}
        lede={service.lede}
        aside={
          <div className="relative mx-auto max-w-sm">
            <ArtIcon name={service.art} tone={1} className="bob mx-auto h-48 w-48 sm:h-60 sm:w-60" />
            <div className="tilt-card mt-6 rotate-[1.5deg] p-6">
              <p className="hand text-2xl text-coral-deep">at a glance</p>
              <dl className="mt-3 space-y-2 text-[0.95rem]">
                <div className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="font-semibold">Format</dt>
                  <dd className="text-right text-ink-soft">Online, or in person in {serviceArea.inPerson}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="font-semibold">First session</dt>
                  <dd className="text-right text-ink-soft">Usually {consultationFormat.initial}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">With</dt>
                  <dd className="text-right text-ink-soft">{person.displayName}</dd>
                </div>
              </dl>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location={`service_${slug}`} className="btn btn-primary">
            <WhatsAppIcon className="h-5 w-5" />
            Ask about {topic}
          </a>
          <Link href="/consultation" className="btn btn-ghost">
            How it works
          </Link>
        </div>
      </PageHero>

      {/* Who it's for / what we work on */}
      <section aria-labelledby="who-title" className="bg-mint py-16 sm:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="who-title" className="text-display-m">Who this is for</h2>
            <ul className="mt-6 space-y-3 text-lg">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-2.5 h-2.5 w-2.5 flex-none rounded-full bg-coral" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] bg-paper p-7 sm:p-9">
            <h2 className="text-display-s">What we can work on together</h2>
            <ul className="mt-5 grid gap-3">
              {service.concerns.map((c) => (
                <li key={c} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 flex-none text-green" aria-hidden="true">
                    <path d="M3 11c2 1 4 3 5 5 2-5 5-9 9-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="wrap py-16 sm:py-24">
        <p className="eyebrow">The approach</p>
        <h2 id="approach-title" className="mt-4 max-w-2xl text-display-m">
          How {person.firstName} approaches {topic}
        </h2>
        <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {service.approach.map((a, i) => (
            <li key={a.title} className="reveal flex gap-5">
              <span className="font-display text-5xl font-extrabold leading-none text-coral" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl">{a.title}</h3>
                <p className="mt-2 text-ink-soft">{a.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Online enquiry form */}
      {slug === "online-consultation" && (
        <section id="enquiry" aria-labelledby="enquiry-title" className="bg-mint py-16 sm:py-20">
          <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Enquire</p>
              <h2 id="enquiry-title" className="mt-4 text-display-m">
                Request an online consultation
              </h2>
              <p className="mt-4 text-ink-soft">Tell us a little about your goal and when you&apos;re free. You&apos;ll hear back with available slots and fees.</p>
            </div>
            <div className="rounded-[2rem] bg-paper p-6 sm:p-9">
              <OnlineEnquiryForm />
            </div>
          </div>
        </section>
      )}

      {/* What a consultation involves (not shown for corporate sessions) */}
      {slug !== "corporate-wellness" && (
        <section aria-labelledby="steps-title" className="bg-cream-deep py-16 sm:py-20">
          <div className="wrap">
            <h2 id="steps-title" className="text-display-m">
              What happens next
            </h2>
            <div className="mt-8">
              <ConsultationSteps />
            </div>
          </div>
        </section>
      )}

      {/* FAQ + sources */}
      <section aria-labelledby="service-faq-title" className="wrap py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="service-faq-title" className="mt-4 text-display-m">
              Common questions about {topic}
            </h2>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <References items={service.references} />
          <aside className="rounded-3xl border-2 border-ink/10 p-6 text-sm text-ink-soft sm:p-8">
            <p className="font-display text-base font-bold text-ink">A note on this page</p>
            <p className="mt-2">
              This page explains how nutrition support works and is general information, not a diagnosis or treatment plan. Nutrition care
              works alongside your doctor&apos;s advice — never instead of it. Read the{" "}
              <Link href="/medical-disclaimer" className="underline underline-offset-4">
                medical disclaimer
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      {/* Related */}
      {(relatedArticles.length > 0 || related.length > 0) && (
        <section aria-labelledby="related-title" className="bg-paper py-16 sm:py-20">
          <div className="wrap">
            <h2 id="related-title" className="text-display-m">
              Keep exploring
            </h2>
            {relatedArticles.length > 0 && (
              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.slice(0, 3).map((a, i) => (
                  <ArticleCard key={a.slug} article={a} index={i} />
                ))}
              </div>
            )}
            {related.length > 0 && (
              <div className="mt-12">
                <h3 className="text-lg">Related services</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/services/${r.slug}`} className="chip">
                        {r.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" className="chip">
                      All services →
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaBand waHref={wa} location={`service_${slug}`} />
    </>
  )
}
