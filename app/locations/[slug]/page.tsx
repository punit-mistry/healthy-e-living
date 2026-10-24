import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArtIcon from "@/components/brand/ArtIcon"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { getLocationBySlug, getNearbyLocations, isOnlineOnly, locations, type LocationInfo } from "@/data/locations"
import { getServiceBySlug } from "@/data/services"
import { faqEntities, ids, pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl, consultationFormat, contact, serviceArea } from "@/lib/site"
import { waUrlWithText } from "@/lib/whatsapp"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

function copyFor(location: LocationInfo) {
  const { name } = location
  if (isOnlineOnly(location)) {
    return {
      title: `Online Dietitian for ${name}`,
      h1: `An online dietitian for ${name}`,
      description: `Looking for a dietitian in ${name}? Online video consultations with clinical dietitian Irika Goyal — Indian food-first plans for weight, PCOS, diabetes and more.`,
      lede: `Personalised nutrition care over video, from anywhere in ${name}. The same assessment, planning and follow-ups as in person — without the travel.`,
      eyebrow: "Online across India",
    }
  }
  if (location.slug === "mumbai") {
    return {
      title: "Dietitian in Mumbai: Online & In Person",
      h1: "A dietitian for Mumbai life — online, or in person",
      description:
        "Personalised nutrition consultations with clinical dietitian Irika Goyal in Mumbai — in person or online. Weight, PCOS, diabetes, gut health, pregnancy and more.",
      lede: `${serviceArea.inPersonNote} Prefer not to travel? Online consultations give you the same personalised care from home or the office.`,
      eyebrow: "Mumbai",
    }
  }
  return {
    title: name.length > 12 ? `Dietitian for ${name}, Mumbai` : `Dietitian for ${name}: Online & In Person`,
    h1: `A dietitian for ${name}`,
    description: `Looking for a dietitian in ${name}? Online consultations from home, or in-person sessions in Mumbai, with clinical dietitian Irika Goyal.`,
    lede: `Talk online from home in ${name}, or meet in person in Mumbai — the exact location is shared when you book.`,
    eyebrow: location.district === "Thane" || location.district === "Raigad" ? "Mumbai region" : "Mumbai",
  }
}

function faqsFor(location: LocationInfo) {
  const { name } = location
  if (isOnlineOnly(location)) {
    return [
      { question: `Can I consult a dietitian online from ${name}?`, answer: `Yes. Consultations happen over video, so you can join from home or work in ${name}. Your plan is shared digitally, and follow-ups happen online too.` },
      { question: "Which time zone are sessions in?", answer: `Sessions are scheduled in Indian Standard Time (IST), ${contact.hours}. You'll be offered slots to choose from when you message.` },
      { question: "Will the plan suit my local food?", answer: `Yes. Plans are built around what you actually eat — including the dishes you cook at home in ${name}, eating out and festivals.` },
    ]
  }
  return [
    { question: `Do you offer in-person consultations near ${name}?`, answer: `In-person sessions are held in Mumbai, and the exact location is shared when you book. Many people in ${name} also choose online sessions to save travel time.` },
    { question: "How long is the first consultation?", answer: `Usually ${consultationFormat.initial}, online or in person. Follow-ups usually take ${consultationFormat.followUp}.` },
    { question: "How do I book?", answer: "Send a WhatsApp message with a line about what you'd like help with. You'll get available times and current fees before anything is booked." },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}
  const copy = copyFor(location)
  return pageMetadata({ title: copy.title, description: copy.description, path: `/locations/${slug}`, noindex: !location.indexable })
}

const popular = ["weight-loss", "pcos-diet", "diabetes-diet", "thyroid-diet", "gut-health", "pregnancy-nutrition", "heart-health", "sports-nutrition"]
  .map(getServiceBySlug)
  .filter((s) => s !== undefined)

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) notFound()
  const copy = copyFor(location)
  const online = isOnlineOnly(location)
  const parent = location.parent ? getLocationBySlug(location.parent) : undefined
  const nearby = getNearbyLocations(location)
  const faqs = faqsFor(location)
  const path = `/locations/${slug}`
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas we serve", path: "/locations" },
    { name: location.name, path },
  ]
  const wa = waUrlWithText(`Hi Irika! I'm based in ${location.name} and I'd like to know more about ${online ? "an online" : "a"} nutrition consultation.`)

  return (
    <>
      <JsonLd
        data={webPageJson({
          path,
          name: copy.title,
          description: copy.description,
          crumbs,
          extra: [
            {
              "@type": "Service",
              "@id": `${absoluteUrl(path)}#service`,
              name: `${online ? "Online nutrition consultations" : "Nutrition consultations"} for ${location.name}`,
              serviceType: "Nutrition counselling",
              provider: { "@id": ids.organization },
              areaServed: { "@type": "City", name: location.name, containedInPlace: { "@type": "Country", name: "India" } },
              availableChannel: [
                { "@type": "ServiceChannel", name: "Online video consultation", serviceUrl: absoluteUrl("/services/online-consultation") },
                ...(online ? [] : [{ "@type": "ServiceChannel", name: "In-person consultation in Mumbai", serviceUrl: absoluteUrl("/services/offline-consultation") }]),
              ],
            },
            ...(location.indexable ? [{ "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`, mainEntity: faqEntities(faqs) }] : []),
          ],
        })}
      />

      <PageHero crumbs={crumbs} eyebrow={copy.eyebrow} title={copy.h1} lede={copy.lede}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location={`location_${slug}`} className="btn btn-primary">
            <WhatsAppIcon className="h-5 w-5" />
            {online ? "Book an online consultation" : "Ask about a consultation"}
          </a>
          <Link href="/consultation" className="btn btn-ghost">
            How it works
          </Link>
        </div>
        {parent && (
          <p className="mt-6 text-ink-soft">
            Part of{" "}
            <Link href={`/locations/${parent.slug}`} className="font-semibold text-green underline underline-offset-4">
              {parent.name}
            </Link>
            {" "}— see the {parent.name} page for local tips.
          </p>
        )}
      </PageHero>

      {location.local && (
        <section aria-labelledby="local-title" className="bg-green py-16 text-cream sm:py-24">
          <div className="wrap">
            <p className="hand text-3xl text-butter">eating well in {location.name}</p>
            <h2 id="local-title" className="mt-2 max-w-3xl text-display-m">
              A plan that understands how {location.name} eats
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-cream/85">{location.local.intro}</p>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {location.local.tips.map((t) => (
                <li key={t.title} className="reveal">
                  <h3 className="text-display-s text-butter">{t.title}</h3>
                  <p className="mt-2 text-lg text-cream/85">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="ways-title" className="wrap py-16 sm:py-20">
        <h2 id="ways-title" className="text-display-m">
          {online ? "How online consultations work" : "Two ways to work together"}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href="/services/online-consultation" className="group flex gap-5 rounded-[2rem] bg-butter-soft p-7 transition-transform hover:-translate-y-1">
            <ArtIcon name="screen" tone={1} className="h-16 w-16 flex-none" />
            <span>
              <span className="block font-display text-2xl font-bold group-hover:text-green">Online</span>
              <span className="mt-1 block text-ink-soft">Video consultations from {location.name} or anywhere else. Plans shared digitally, follow-ups online.</span>
            </span>
          </Link>
          {online ? (
            <div className="flex gap-5 rounded-[2rem] bg-mint p-7">
              <ArtIcon name="pin" tone={0} className="h-16 w-16 flex-none" />
              <span>
                <span className="block font-display text-2xl font-bold">Visiting Mumbai?</span>
                <span className="mt-1 block text-ink-soft">In-person sessions are held in Mumbai, so you can meet face to face when you&apos;re in town.</span>
              </span>
            </div>
          ) : (
            <Link href="/services/offline-consultation" className="group flex gap-5 rounded-[2rem] bg-mint p-7 transition-transform hover:-translate-y-1">
              <ArtIcon name="pin" tone={0} className="h-16 w-16 flex-none" />
              <span>
                <span className="block font-display text-2xl font-bold group-hover:text-green">In person in Mumbai</span>
                <span className="mt-1 block text-ink-soft">Face-to-face sessions. The exact location is shared when you book.</span>
              </span>
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="popular-title" className="wrap pb-16 sm:pb-20">
        <h2 id="popular-title" className="text-display-m">
          What people in {location.name} often ask about
        </h2>
        <ul className="mt-8 grid gap-x-8 border-t-2 border-ink sm:grid-cols-2">
          {popular.map((s, i) => (
            <li key={s.slug} className="border-b-2 border-ink">
              <Link href={`/services/${s.slug}`} className="group flex items-center gap-4 py-4">
                <ArtIcon name={s.art} tone={i} className="h-12 w-12 flex-none" />
                <span>
                  <span className="block font-display text-xl font-bold group-hover:text-green">{s.name}</span>
                  <span className="text-sm text-ink-soft">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/services" className="link-squiggle mt-8 inline-block">
          See all services
        </Link>
      </section>

      <section aria-labelledby="loc-faq" className="bg-paper py-16 sm:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
          <h2 id="loc-faq" className="text-display-m">
            Questions from {location.name}
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-title" className="wrap pt-16">
          <h2 id="nearby-title" className="text-display-s">
            {online ? "Other cities" : "Nearby areas"}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link href={`/locations/${n.slug}`} className="chip">
                  {n.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="chip">
                All areas →
              </Link>
            </li>
          </ul>
        </section>
      )}

      <CtaBand waHref={wa} location={`location_${slug}`} />
    </>
  )
}
