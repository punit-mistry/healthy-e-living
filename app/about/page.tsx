import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CurlyArrow, HappyPlate, Sparkle, Underline } from "@/components/brand/Motifs"
import Approach from "@/components/sections/Approach"
import CtaBand from "@/components/sections/CtaBand"
import InstagramStrip from "@/components/sections/InstagramStrip"
import Stories from "@/components/sections/Stories"
import Breadcrumbs from "@/components/ui-kit/Breadcrumbs"
import JsonLd from "@/components/ui-kit/JsonLd"
import { serviceCategories } from "@/data/services"
import { ids, pageMetadata, webPageJson } from "@/lib/seo"
import { confirmedClaims, person, qualifications, serviceArea, social } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"
import portraitFull from "@/public/images/irika-goyal-clinical-dietitian.jpg"

const title = "About Irika Goyal, Clinical Dietitian"
const description =
  "Meet Irika Goyal — a clinical dietitian and nutritionist who builds personalised, evidence-based nutrition plans around real life and Indian food. Online and in Mumbai."

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Meet Irika", path: "/about" },
]

const beliefs = [
  { title: "Real food, real life", body: "Your plan should look like your kitchen — dal, sabzi, rotis and all — and survive office lunches, weddings and late nights." },
  { title: "Evidence over trends", body: "Advice is grounded in current clinical guidelines, not whatever went viral this week. If something lacks evidence, I'll say so." },
  { title: "No guilt, no banned lists", body: "Food is culture, comfort and celebration. We work on patterns and portions, not shame." },
  { title: "Part of your care team", body: "Nutrition works alongside your doctor's treatment. I'll never ask you to stop medication or replace medical advice." },
]

export default function AboutPage() {
  const claims = confirmedClaims()
  return (
    <>
      <JsonLd data={webPageJson({ path: "/about", name: title, description, crumbs, type: "AboutPage", mainEntity: { "@id": ids.person } })} />

      <section className="relative overflow-hidden bg-cream">
        <div className="wrap pb-16 pt-8 sm:pt-10">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Meet Irika</p>
              <h1 className="mt-5 text-display-xl">
                Hi, I&apos;m{" "}
                <span className="relative inline-block">
                  Irika
                  <Underline className="draw-on-load absolute -bottom-3 left-0 h-5 w-full" />
                </span>
                .
              </h1>
              <p className="mt-8 max-w-xl text-lede text-ink-soft">
                I&apos;m a {person.jobTitle.toLowerCase()}, and I help people feel better through food — whether that means managing a health
                condition, reaching a goal, or simply enjoying eating again.
              </p>
              <div className="mt-8 space-y-5 text-lg">
                <p>
                  I specialise in helping people manage health conditions through personalised nutrition therapy. My approach combines
                  evidence-based science with compassionate, patient-centred care — because the best plan is the one you&apos;ll actually
                  follow.
                </p>
                <p>
                  I believe good nutrition should be practical, enjoyable and sustainable. Whether you&apos;re managing a chronic condition,
                  looking to lose weight or simply want to feel your best, I&apos;ll build a plan that fits your lifestyle, your preferences and
                  your family table.
                </p>
              </div>
              {claims.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-6">
                  {claims.map((c) => (
                    <li key={c.label}>
                      <span className="block font-display text-5xl font-extrabold text-green">{c.value}</span>
                      <span className="text-ink-soft">{c.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={waUrl("booking")} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location="about_hero" className="btn btn-primary">
                  Let&apos;s talk about your goals
                </a>
                <Link href="/services" className="btn btn-ghost">
                  How I can help
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:col-span-5">
              <HappyPlate className="absolute -right-8 -top-10 z-10 h-28 w-28 rotate-12" />
              <div className="relative rotate-[2deg] rounded-[1.5rem] border-[3px] border-ink bg-paper p-3 pb-14 shadow-[8px_8px_0_0_var(--color-green)]">
                <Image
                  src={portraitFull}
                  alt="Irika Goyal, clinical dietitian, standing outdoors among tropical plants"
                  placeholder="blur"
                  preload
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="h-auto w-full rounded-[1rem]"
                />
                <p className="hand absolute bottom-3 left-0 right-0 text-center text-2xl text-coral-deep">that&apos;s me — say hi!</p>
              </div>
              <CurlyArrow className="absolute -left-14 bottom-24 hidden h-16 w-20 -scale-x-100 lg:block" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="beliefs-title" className="bg-green py-20 text-cream sm:py-28">
        <div className="wrap">
          <p className="eyebrow text-butter!">What I believe</p>
          <h2 id="beliefs-title" className="mt-4 max-w-3xl text-display-l">
            Nutrition care should feel like a <span className="em text-butter">conversation</span>, not a lecture.
          </h2>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <li key={b.title} className="reveal flex gap-5">
                <Sparkle className="mt-1 h-7 w-7 flex-none" color={i % 2 ? "var(--color-coral)" : "var(--color-butter)"} />
                <div>
                  <h3 className="text-display-s">{b.title}</h3>
                  <p className="mt-2 text-lg text-cream/85">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {qualifications.length > 0 && (
        <section aria-labelledby="qualifications-title" className="wrap py-20">
          <p className="eyebrow">Qualifications</p>
          <h2 id="qualifications-title" className="mt-4 text-display-m">
            Training &amp; credentials
          </h2>
          <ul className="mt-8 divide-y-2 divide-ink/10 border-y-2 border-ink">
            {qualifications.map((q) => (
              <li key={q.title} className="flex flex-wrap justify-between gap-2 py-4">
                <span className="font-display text-xl font-bold">{q.title}</span>
                <span className="text-ink-soft">
                  {q.institution}
                  {q.year ? `, ${q.year}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="help-title" className="wrap py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <p className="eyebrow">How I can help</p>
            <h2 id="help-title" className="mt-4 text-display-m">
              Where I work with people most
            </h2>
            <p className="mt-4 text-ink-soft">
              {serviceArea.online} {serviceArea.inPersonNote}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {serviceCategories.map((c) => (
              <li key={c.id}>
                <Link href={`/services#${c.id}`} className="group block h-full rounded-3xl border-2 border-ink/10 bg-paper p-6 transition-colors hover:border-ink">
                  <span className="font-display text-xl font-bold group-hover:text-green">{c.title}</span>
                  <span className="mt-2 block text-ink-soft">{c.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Approach headingId="about-approach" />
      <Stories headingId="about-stories" />
      <InstagramStrip headingId="about-instagram" />

      <section aria-labelledby="elsewhere-title" className="wrap pb-4">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-butter-soft p-8">
          <h2 id="elsewhere-title" className="text-display-s">
            Irika&apos;s professional profile
          </h2>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            View on LinkedIn
          </a>
        </div>
      </section>

      <CtaBand waHref={waUrl("booking")} location="about" />
    </>
  )
}
