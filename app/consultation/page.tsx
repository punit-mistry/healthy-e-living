import type { Metadata } from "next"
import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import Approach from "@/components/sections/Approach"
import CtaBand from "@/components/sections/CtaBand"
import Pricing from "@/components/sections/Pricing"
import PageHero from "@/components/sections/PageHero"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { faqGroups } from "@/data/faqs"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { consultationFormat, contact, serviceArea } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const title = "How Nutrition Consultations Work"
const description =
  "What to expect from a nutrition consultation with Irika Goyal — booking on WhatsApp, online or in-person sessions in Mumbai, what to bring, session length and follow-ups."

export const metadata: Metadata = pageMetadata({ title, description, path: "/consultation" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "How it works", path: "/consultation" },
]

const formats = [
  {
    art: "screen" as const,
    title: "Online",
    body: serviceArea.online,
    points: ["Video call from home, work or anywhere", "Plan shared digitally", "Ideal outside Mumbai or with a busy schedule"],
    href: "/services/online-consultation",
    wa: waUrl("online"),
  },
  {
    art: "pin" as const,
    title: `In person in ${serviceArea.inPerson}`,
    body: serviceArea.inPersonNote,
    points: ["Face-to-face conversation", "Family members welcome to join", "Mix with online follow-ups if that's easier"],
    href: "/services/offline-consultation",
    wa: waUrl("inPerson"),
  },
]

const bring = [
  "Recent blood reports, if you have them (for example HbA1c, lipid profile, thyroid or vitamin levels)",
  "A list of medicines and supplements you take",
  "A rough idea of a typical day's eating — a few days of notes or photos is even better",
  "Your questions, however small",
  "Anyone who cooks for you, if they'd like to join",
]

export default function ConsultationPage() {
  const bookingFaqs = faqGroups.flatMap((g) => g.faqs).filter((f) => !f.question.startsWith("Do you offer online"))
  return (
    <>
      <JsonLd data={webPageJson({ path: "/consultation", name: title, description, crumbs })} />

      <PageHero
        crumbs={crumbs}
        eyebrow="How it works"
        tone="mint"
        title={
          <>
            Booking should be the <span className="em text-green">easy</span> part.
          </>
        }
        lede="No forms, no waiting rooms full of paperwork. Send a message, pick a time, and we take it from there — online or in person."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waUrl("booking")} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location="consultation_hero" className="btn btn-primary">
            <WhatsAppIcon className="h-5 w-5" />
            Message to book
          </a>
          <a href="#first-session" className="btn btn-ghost">
            What to bring
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="formats-title" className="wrap py-16 sm:py-24">
        <h2 id="formats-title" className="text-display-m">
          Two ways to meet
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {formats.map((f, i) => (
            <article key={f.title} className={`reveal rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-butter-soft md:-rotate-1" : "bg-coral-soft md:rotate-1 md:translate-y-6"}`}>
              <ArtIcon name={f.art} tone={i} className="h-20 w-20" />
              <h3 className="mt-4 text-display-s">{f.title}</h3>
              <p className="mt-2 text-ink-soft">{f.body}</p>
              <ul className="mt-5 space-y-2">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-ink" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={f.wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location={`consultation_${i === 0 ? "online" : "in_person"}`} className="btn btn-primary">
                  Book {i === 0 ? "online" : "in person"}
                </a>
                <Link href={f.href} className="link-squiggle self-center">
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="first-session" aria-labelledby="first-session-title" className="scroll-mt-24 bg-paper py-16 sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Your first session</p>
            <h2 id="first-session-title" className="mt-4 text-display-m">
              What to expect
            </h2>
            <dl className="mt-8 divide-y-2 divide-ink/10 border-y-2 border-ink text-lg">
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-semibold">First consultation</dt>
                <dd className="text-ink-soft">Usually {consultationFormat.initial}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-semibold">Follow-ups</dt>
                <dd className="text-ink-soft">Usually {consultationFormat.followUp}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-semibold">How often</dt>
                <dd className="max-w-sm text-ink-soft sm:text-right">{consultationFormat.cadence}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-semibold">Availability</dt>
                <dd className="text-ink-soft">{contact.hours}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-semibold">Fees</dt>
                <dd className="max-w-sm text-ink-soft sm:text-right">From ₹3,500 — see pricing below</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-display-s">Helpful to have ready</h3>
            <ul className="mt-6 space-y-3 text-lg">
              {bring.map((b) => (
                <li key={b} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-1.5 h-5 w-5 flex-none text-green" aria-hidden="true">
                    <path d="M3 11c2 1 4 3 5 5 2-5 5-9 9-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/resources/first-consultation-checklist" className="btn btn-coral mt-8">
              Print the checklist
            </Link>
          </div>
        </div>
      </section>

      <Pricing location="consultation" />

      <Approach headingId="consultation-approach" />

      <section aria-labelledby="consult-faq" className="wrap py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <h2 id="consult-faq" className="text-display-m">
            Booking questions
          </h2>
          <FaqList faqs={bookingFaqs.slice(0, 6)} />
        </div>
      </section>

      <CtaBand waHref={waUrl("booking")} location="consultation" secondary={{ href: "/services", label: "Browse services" }} />
    </>
  )
}
