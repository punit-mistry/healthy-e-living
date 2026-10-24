import type { Metadata } from "next"
import Link from "next/link"
import { HappyPlate, Sparkle } from "@/components/brand/Motifs"
import ContactForm from "@/components/contact/ContactForm"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { ids, pageMetadata, webPageJson } from "@/lib/seo"
import { contact, serviceArea, social } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const title = "Contact & Book a Consultation"
const description =
  "Book a nutrition consultation with clinical dietitian Irika Goyal on WhatsApp, by phone or by email. Online across India and in person in Mumbai."

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]

export default function ContactPage() {
  const methods = [
    { label: "WhatsApp", value: contact.whatsappDisplay, href: waUrl("default"), note: "The quickest way to book", external: true, track: "whatsapp_click" },
    { label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneE164}`, note: contact.hours, external: false, track: "phone_click" },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, note: "For longer questions and corporate enquiries", external: false, track: "email_click" },
  ]
  return (
    <>
      <JsonLd data={webPageJson({ path: "/contact", name: title, description, crumbs, type: "ContactPage", about: { "@id": ids.organization } })} />

      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title={
          <>
            Say hello. <span className="em text-green">Seriously</span>, any question.
          </>
        }
        lede="Tell me a little about what you'd like help with, and you'll get available times and current fees — no pressure to book."
        aside={<HappyPlate className="bob ml-auto hidden h-48 w-48 lg:block" />}
      />

      <section aria-labelledby="methods-title" className="wrap pb-6">
        <h2 id="methods-title" className="sr-only">
          Ways to get in touch
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {methods.map((m, i) => (
            <li key={m.label}>
              <a
                href={m.href}
                target={m.external ? "_blank" : undefined}
                rel={m.external ? "noopener noreferrer" : undefined}
                data-track={m.track}
                data-track-location="contact_methods"
                className={`group flex h-full flex-col rounded-[1.75rem] border-2 border-ink p-6 transition-transform hover:-translate-y-1 ${
                  ["bg-green text-cream", "bg-paper", "bg-butter-soft"][i]
                }`}
              >
                <span className={`hand text-3xl ${i === 0 ? "text-butter" : "text-coral-deep"}`}>{m.label}</span>
                <span className="mt-2 break-all font-display text-xl font-bold">{m.value}</span>
                <span className={`mt-1 text-sm ${i === 0 ? "text-cream/80" : "text-ink-soft"}`}>{m.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="form-title" className="wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-[2rem] bg-paper p-6 sm:p-10">
            <h2 id="form-title" className="flex items-center gap-3 text-display-s">
              <WhatsAppIcon className="h-7 w-7 text-green" />
              Write your message here
            </h2>
            <p className="mt-2 text-ink-soft">Fill this in and it&apos;ll open WhatsApp with your message ready to send.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-mint p-8">
              <h2 className="text-display-s">Where</h2>
              <p className="mt-3">{serviceArea.online}</p>
              <p className="mt-3">{serviceArea.inPersonNote}</p>
              <Link href="/consultation" className="link-squiggle mt-5 inline-block">
                How consultations work
              </Link>
            </div>
            <div className="rounded-[2rem] border-2 border-ink/10 p-8">
              <h2 className="text-display-s">When</h2>
              <p className="mt-3">{contact.hours}.</p>
              <p className="mt-2 text-sm text-ink-soft">Messages are answered as soon as possible during working hours.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Sparkle className="h-6 w-6" />
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                Instagram {social.instagramHandle}
              </a>
              <span aria-hidden="true">·</span>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                LinkedIn
              </a>
            </div>
            <p className="rounded-2xl bg-coral-soft/60 p-5 text-sm">
              <strong>In an emergency</strong>, please don&apos;t message here — contact your doctor or local emergency services straight away.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
