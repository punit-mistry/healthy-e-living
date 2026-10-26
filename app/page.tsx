import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import { CurlyArrow, HappyPlate, Loop, Sparkle, Sprig, Underline } from "@/components/brand/Motifs"
import Approach from "@/components/sections/Approach"
import ArticleCard from "@/components/sections/ArticleCard"
import CtaBand from "@/components/sections/CtaBand"
import DiwaliOffer from "@/components/sections/DiwaliOffer"
import Stories from "@/components/sections/Stories"
import InstagramStrip from "@/components/sections/InstagramStrip"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import DiwaliOfferModal from "@/components/site/DiwaliOfferModal"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { articles } from "@/data/articles"
import { homeFaqs } from "@/data/faqs"
import { featuredCities, featuredMumbaiAreas } from "@/data/locations"
import { getServicesByCategory, serviceCategories } from "@/data/services"
import { ids, pageMetadata, webPageJson } from "@/lib/seo"
import { confirmedClaims, diwaliOffer, person, serviceArea, site } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"
import portrait from "@/public/images/irika-goyal-dietitian-smiling.jpg"

const description =
  "Personalised, Indian food-first nutrition with clinical dietitian Irika Goyal for weight, PCOS, diabetes, gut health and more. Online, or in person in Mumbai."

export const metadata: Metadata = pageMetadata({
  title: "Healthy E Living: Dietitian Irika Goyal, Mumbai & Online",
  absoluteTitle: true,
  description,
  path: "/",
  ownImage: true,
})

const trust = [
  "Clinical dietitian & nutritionist",
  "Indian, food-first plans",
  "Online across India & abroad",
  `In person in ${serviceArea.inPerson}`,
  "Works alongside your doctor",
]

const helpCategories = serviceCategories.filter((c) => c.id !== "formats")

export default function HomePage() {
  const claims = confirmedClaims()
  const [featured, ...rest] = articles

  return (
    <>
      <JsonLd data={webPageJson({ path: "/", name: site.name, description, about: { "@id": ids.organization } })} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden" aria-labelledby="hero-title">
        <div className="wrap grid items-center gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="relative z-10 lg:col-span-7">
            <p className="eyebrow">Clinical dietitian · Mumbai &amp; online</p>
            <h1 id="hero-title" className="mt-6 text-display-xl">
              Food should{" "}
              <span className="relative inline-block whitespace-nowrap">
                feel good
                <Underline className="draw-on-load absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5" />
              </span>
              .<br />
              So should <span className="em text-green">you</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lede text-ink-soft">
              Personalised nutrition that fits your real life, your preferences and your health goals — built around the food you actually
              love to eat.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={waUrl("booking")} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location="home_hero" className="btn btn-primary">
                <WhatsAppIcon className="h-5 w-5" />
                Let&apos;s talk about your goals
              </a>
              <Link href="/about" className="btn btn-ghost">
                Meet Irika
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Popular services">
              {[
                ["Weight loss", "/services/weight-loss"],
                ["PCOS", "/services/pcos-diet"],
                ["Diabetes", "/services/diabetes-diet"],
                ["Gut health", "/services/gut-health"],
                ["Pregnancy", "/services/pregnancy-nutrition"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="chip">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="absolute -left-6 -top-4 z-20 w-28 sm:-left-10 sm:w-36" aria-hidden="true">
              <HappyPlate className="spin-slow" />
            </div>
            <div className="absolute -right-4 bottom-16 h-40 w-40 rounded-full bg-butter sm:h-52 sm:w-52" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] border-[3px] border-ink bg-mint">
              <Image
                src={portrait}
                alt="Irika Goyal, clinical dietitian, smiling in a garden"
                preload
                placeholder="blur"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 92vw"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-6 left-4 z-20 rotate-[-4deg] rounded-2xl border-2 border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0_var(--color-ink)] sm:left-[-1.5rem]">
              <p className="hand text-2xl leading-none text-coral-deep">hi, I&apos;m {person.firstName}!</p>
              <p className="mt-1 text-sm font-semibold">{person.jobTitle}</p>
            </div>
            <CurlyArrow className="absolute -bottom-2 left-44 hidden h-14 w-16 rotate-[200deg] sm:block" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Trust strip */}
      <section aria-label="About the practice" className="bg-green text-cream">
        <ul className="wrap flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-[0.95rem] font-semibold sm:justify-between">
          {claims.map((c) => (
            <li key={c.label} className="flex items-center gap-2">
              <span className="font-display text-xl font-extrabold text-butter">{c.value}</span> {c.label}
            </li>
          ))}
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Sparkle className="h-3.5 w-3.5" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------- Who I help */}
      <section aria-labelledby="help-title" className="wrap py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Who I help</p>
            <h2 id="help-title" className="mt-4 text-display-l">
              Real bodies, real lives, <span className="em text-green">real</span> food.
            </h2>
            <p className="mt-6 max-w-md text-lede text-ink-soft">
              From blood sugar to bloating, first trimester to first marathon — here&apos;s where nutrition support can help. Not sure where you
              fit? Just ask.
            </p>
            <Link href="/services" className="link-squiggle mt-8 inline-block text-lg">
              See every service
            </Link>
          </div>

          <ol className="border-t-2 border-ink">
            {helpCategories.map((cat, i) => {
              const items = getServicesByCategory(cat.id)
              return (
                <li key={cat.id} className="reveal group border-b-2 border-ink py-7 transition-colors sm:py-8">
                  <div className="flex gap-5 sm:gap-8">
                    <span className="hand pt-1 text-3xl text-coral-deep sm:text-4xl" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-display-s">
                          <Link href={`/services#${cat.id}`} className="hover:text-green">
                            {cat.title}
                          </Link>
                        </h3>
                        <ArtIcon name={items[0].art} tone={i} className="h-14 w-14 flex-none transition-transform duration-300 group-hover:rotate-12 sm:h-16 sm:w-16" />
                      </div>
                      <p className="mt-2 max-w-lg text-ink-soft">{cat.blurb}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {items.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="chip">
                              {s.shortName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- Meet Irika */}
      <section aria-labelledby="meet-title" className="relative overflow-hidden bg-mint py-20 sm:py-28">
        <Sprig className="draw-on-view pointer-events-none absolute -bottom-6 right-16 hidden h-64 w-44 opacity-70 lg:block" />
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Meet Irika</p>
            <h2 id="meet-title" className="mt-4 text-display-m">
              The person on the other side of your plan.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <blockquote className="relative">
              <p className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
                &ldquo;I believe good nutrition should be{" "}
                <span className="relative inline-block">
                  practical
                  <Loop className="draw-on-view absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)]" />
                </span>
                , enjoyable and sustainable.&rdquo;
              </p>
              <footer className="hand mt-4 text-2xl text-green-deep">— {person.displayName}</footer>
            </blockquote>
            <div className="mt-10 grid gap-6 text-lg sm:grid-cols-2">
              <p>
                Irika is a clinical dietitian and nutritionist who helps people manage health conditions and feel better through personalised,
                evidence-based nutrition — without giving up the food and family meals they love.
              </p>
              <p>
                Whether you&apos;re managing a diagnosis, chasing a goal or simply want to feel more like yourself, she&apos;ll meet you where you
                are and build a plan around your real week.
              </p>
            </div>
            <Link href="/about" className="btn btn-primary mt-10">
              Read Irika&apos;s story
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Approach */}
      <Approach />

      {/* ---------------------------------------------------------- Stories */}
      <Stories />

      {/* -------------------------------------------------------- Instagram */}
      <InstagramStrip />

      {/* ---------------------------------------------------------- Journal */}
      <section aria-labelledby="journal-title" className="bg-cream-deep py-20 sm:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">From the journal</p>
              <h2 id="journal-title" className="mt-4 text-display-l">
                Good nutrition doesn&apos;t need to feel <span className="em text-green">complicated</span>.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog" className="btn btn-ghost">
                Read the journal
              </Link>
              <Link href="/resources" className="btn btn-coral">
                Free resources
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <ArticleCard article={featured} size="lg" />
            <div className="grid gap-10">
              {rest.slice(0, 2).map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section aria-labelledby="faq-title" className="wrap py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <p className="eyebrow">Before you book</p>
            <h2 id="faq-title" className="mt-4 text-display-m">
              Questions people ask first.
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">Can&apos;t see yours? Ask on WhatsApp — there&apos;s no such thing as a silly question here.</p>
            <Link href="/faq" className="link-squiggle mt-6 inline-block">
              All frequently asked questions
            </Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      {/* ------------------------------------------------------------ Where */}
      <section aria-labelledby="where-title" className="wrap pt-4">
        <div className="grid gap-10 rounded-[2rem] bg-paper p-8 sm:p-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <p className="eyebrow">Where I work</p>
            <h2 id="where-title" className="mt-4 text-display-m">
              In person in Mumbai. <span className="em text-green">Online</span> everywhere.
            </h2>
            <p className="mt-4 text-ink-soft">{serviceArea.inPersonNote}</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg">Across Mumbai &amp; nearby</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {featuredMumbaiAreas.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className="chip">
                      Dietitian in {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg">Online across India</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {featuredCities.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className="chip">
                      {l.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/locations" className="chip">
                    All areas →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand waHref={waUrl("booking")} location="home" />

      {diwaliOffer.active && (
        <DiwaliOfferModal>
          <DiwaliOffer />
        </DiwaliOfferModal>
      )}
    </>
  )
}
