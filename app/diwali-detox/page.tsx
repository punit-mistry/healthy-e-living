import type { Metadata } from "next"
import Link from "next/link"
import CtaBand from "@/components/sections/CtaBand"
import { Diya } from "@/components/sections/DiwaliOffer"
import PageHero from "@/components/sections/PageHero"
import References from "@/components/sections/References"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import PrintButton from "@/components/ui-kit/PrintButton"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { detoxChecklist, detoxDays, detoxFaqs, detoxPlan } from "@/data/diwali-detox"
import { refs } from "@/data/references"
import { formatDate } from "@/lib/format"
import { faqEntities, ids, pageMetadata, webPageJson } from "@/lib/seo"
import { absoluteUrl, contact, person, site } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const path = "/diwali-detox"

const title = "Diwali Detox: Free 5-Day Indian Reset Plan"
const description =
  "A free 5-day post-Diwali detox diet plan by clinical dietitian Dt. Irika Goyal — day-by-day Indian meals, hydration and a reset checklist. No crash dieting."

/**
 * Search intent this page is written for — kept here, not in a spreadsheet, so
 * it is obvious what the copy has to serve if it is ever rewritten:
 * "diwali detox", "diwali detox diet plan", "post diwali detox",
 * "detox after diwali", "5 day detox diet plan indian",
 * "indian detox diet plan", "festive detox diet plan".
 * (No `keywords` meta tag: Google has ignored it since 2009.)
 */
export const metadata: Metadata = pageMetadata({ title, description, path, ownImage: true })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Diwali detox", path },
]

const tones: Record<string, string> = {
  mint: "bg-mint",
  butter: "bg-butter-soft",
  coral: "bg-coral-soft",
  paper: "bg-paper",
}

const steps = [
  { n: "1", title: "You commented, we sent the link", body: "This page is that link. Everything Dt. Irika wrote is here — nothing gated, no email needed." },
  { n: "2", title: "Follow it for five days", body: "Four reset days, then one day back to normal balanced eating. Print it or keep this page open on your phone." },
  { n: "3", title: "Want one built for you?", body: "If you'd like a plan around your own routine, reports and food preferences, message on WhatsApp and we'll take it from there." },
]

/** The honest framing, kept near the top because it is the point of the plan. */
const isNot = [
  "Starving yourself, or making up for what you ate over Diwali",
  "A juice cleanse, detox tea or any product you need to buy",
  "A weight-loss programme — five days changes habits, not body fat",
]
const isFor = [
  "Getting back to regular, structured meals after a week of grazing",
  "Hydration, fibre, protein and vegetables at every meal",
  "Easing back into normal eating, instead of swinging to another extreme",
]

/** Plan schema: a Diet is a schema.org MedicalEntity, which fits better than a recipe. */
const dietNode = {
  "@type": "Diet",
  name: "Diwali Detox — 5-Day Festive Reset",
  description,
  url: absoluteUrl(path),
  author: { "@id": ids.person },
  dietFeatures: "Vegetarian, home-cooked Indian meals across five days: four reset days and one day of normal balanced eating.",
  expertConsiderations: `Written by ${person.displayName} (${person.credentials}), ${person.jobTitle}. General guidance for healthy adults only. People with diabetes, PCOS, thyroid or kidney conditions, and those who are pregnant, breastfeeding or on regular medication, should have the plan adjusted for them.`,
  physiologicalBenefit: "Supports a return to regular meal timing, hydration, fibre and protein intake after a festive period.",
  risk: "Not suitable without modification during pregnancy or breastfeeding, or alongside diabetes, kidney disease or other conditions needing medical nutrition therapy.",
}

export default function DiwaliDetoxPage() {
  return (
    <>
      <JsonLd
        data={webPageJson({
          path,
          name: title,
          description,
          crumbs,
          type: "MedicalWebPage",
          about: dietNode,
          pageProps: {
            datePublished: detoxPlan.updated,
            dateModified: detoxPlan.updated,
            author: { "@id": ids.person },
            reviewedBy: { "@id": ids.person },
            lastReviewed: detoxPlan.reviewed,
            inLanguage: site.language,
          },
          extra: [{ "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`, mainEntity: faqEntities(detoxFaqs) }],
        })}
      />

      <PageHero
        crumbs={crumbs}
        tone="butter"
        eyebrow="Free 5-day plan · no sign-up"
        title={
          <>
            Diwali detox: a <span className="em whitespace-nowrap text-green">5-day</span> festive reset.
          </>
        }
        lede="A little reset. A little balance. A healthier festive you. Five days to get back to mindful eating, steadier meals and proper hydration — built around food already in your kitchen."
        aside={
          <nav aria-label="Jump to a day" className="no-print tilt-card mx-auto w-full max-w-sm rotate-[1.5deg] border-2 border-ink/10 p-6 sm:p-7 lg:mr-0">
            <p className="flex items-center gap-2.5">
              <Diya className="h-7 w-8 shrink-0" />
              <span className="hand text-[1.7rem] leading-none text-coral-deep">your diwali detox</span>
            </p>
            <p className="mt-1.5 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-ink-soft">5 days, in order</p>
            <ol className="mt-4">
              {detoxDays.map((day) => (
                <li key={day.n} className="border-b border-line last:border-0">
                  <a href={`#day-${day.n}`} className="group flex gap-3 py-3">
                    <span className="font-display text-lg font-extrabold leading-tight text-coral-deep">{day.n}</span>
                    <span>
                      <span className="block font-semibold leading-tight group-hover:text-green">{day.title}</span>
                      <span className="mt-0.5 block text-[0.85rem] leading-snug text-ink-soft">{day.blurb}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Plan at a glance">
          {[
            `${detoxPlan.duration} · ${detoxPlan.structure}`,
            "Vegetarian",
            "Indian home food",
            "Nothing to buy",
          ].map((chip) => (
            <li key={chip} className="rounded-full border-2 border-ink/15 bg-paper px-3.5 py-1.5 text-[0.9rem] font-semibold">
              {chip}
            </li>
          ))}
        </ul>

        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a href="#day-1" className="btn btn-primary w-full sm:w-auto">
            Start with Day 1
          </a>
          <PrintButton label="Print the plan" />
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
          <Diya className="h-5 w-6 shrink-0" />
          <span>
            Written and reviewed by{" "}
            <Link href="/about" className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-coral">
              {person.displayName}, {person.credentials}
            </Link>{" "}
            · {person.jobTitle}
          </span>
          <span aria-hidden="true">·</span>
          <span>Last updated {formatDate(detoxPlan.updated)}</span>
        </p>
      </PageHero>

      {/* ---------------------------------------------- how you got here */}
      <section aria-labelledby="steps-heading" className="no-print wrap py-14">
        <h2 id="steps-heading" className="sr-only">
          How this works
        </h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-[1.75rem] border-2 border-ink/10 bg-paper p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-coral font-display text-lg font-extrabold text-ink">{s.n}</span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------ what it is / isn't */}
      <section aria-labelledby="honest-heading" className="bg-paper py-14">
        <div className="wrap">
          <h2 id="honest-heading" className="text-display-m">
            First, the honest bit
          </h2>
          <p className="mt-4 max-w-3xl text-lg">
            Detox is not about starving yourself or compensating for festive indulgences. Your body already has its own detoxification systems —
            primarily the liver and the kidneys. The focus of this plan is to bring back structure, hydration, balanced meals and mindful eating.
          </p>
          <div className="mt-9 grid break-inside-avoid gap-5 md:grid-cols-2">
            <div className="break-inside-avoid rounded-[1.75rem] border-2 border-ink/10 bg-mint p-7">
              <h3 className="text-display-s">What these 5 days are for</h3>
              <ul className="mt-4 space-y-2.5">
                {isFor.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 font-bold text-green">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="break-inside-avoid rounded-[1.75rem] border-2 border-ink/10 bg-coral-soft p-7">
              <h3 className="text-display-s">What they are not</h3>
              <ul className="mt-4 space-y-2.5">
                {isNot.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 font-bold text-coral-deep">
                      ✕
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- the plan */}
      <section aria-labelledby="plan-heading" className="wrap py-14">
        <h2 id="plan-heading" className="text-display-m">
          The 5-day plan, day by day
        </h2>
        <p className="mt-4 max-w-3xl text-ink-soft">
          {detoxPlan.structure}. Portions are a starting point for an average healthy adult — if you are very active, much larger or much smaller
          than average, or managing a health condition, they need adjusting for you.
        </p>

        <div className="mt-10 space-y-8">
          {detoxDays.map((day) => (
            <article
              key={day.n}
              id={`day-${day.n}`}
              className={`scroll-mt-28 break-inside-avoid rounded-[2rem] border-2 border-ink/10 p-6 sm:p-9 ${tones[day.tone]}`}
            >
              <header className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper font-display text-2xl font-extrabold leading-none"
                >
                  {day.n}
                </span>
                <div>
                  <p className="text-[0.9rem] font-bold uppercase tracking-[0.16em] text-coral-deep">Day {day.n}</p>
                  <h3 className="text-display-s">{day.title}</h3>
                </div>
              </header>
              <p className="mt-3 text-ink-soft">{day.blurb}</p>

              <dl className="mt-6 divide-y-2 divide-ink/10 border-t-2 border-ink/10">
                {day.meals.map((m) => (
                  <div key={m.slot} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-display font-bold tracking-[-0.02em]">{m.slot}</dt>
                    <dd>{m.food}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- checklist */}
      <section aria-labelledby="checklist-heading" className="bg-paper py-14">
        <div className="wrap">
          <h2 id="checklist-heading" className="text-display-m">
            Your 5-day reset checklist
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">Make these small habits part of every day of the plan — and, ideally, of the weeks after it.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {detoxChecklist.map((item) => (
              <li key={item} className="flex break-inside-avoid gap-4 rounded-2xl border-2 border-ink/10 bg-cream p-5">
                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-ink/40 bg-paper" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQs */}
      {/* Screen only: the FAQs are an accordion you have to click open, which
          is meaningless on paper. The printed plan stays the plan. */}
      <section aria-labelledby="faq-heading" className="no-print wrap py-14">
        <h2 id="faq-heading" className="text-display-m">
          Questions people ask about the Diwali detox
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqList faqs={detoxFaqs} />
        </div>
      </section>

      {/* -------------------------------------------------- note + sources */}
      <section aria-labelledby="note-heading" className="wrap pb-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="break-inside-avoid rounded-[2rem] bg-butter-soft p-7 sm:p-9">
            <h2 id="note-heading" className="text-display-s">
              A note from Health E Living
            </h2>
            <p className="mt-4">
              Enjoy your festivities. Nourish your body. Celebrate your health. Five mindful days will do more for you than a week of guilt — and
              what you eat in the weeks after Diwali matters far more than what you ate during it.
            </p>
            <p className="hand mt-6 text-2xl text-coral-deep">Eat better. Move better. Live better.</p>
            <p className="mt-1 font-semibold">— Team Health E Living</p>

            <p className="print-only mt-6 text-sm">
              Want a plan built around your own routine and reports? WhatsApp {contact.whatsappDisplay} — or visit{" "}
              {site.url.replace("https://www.", "")}/diwali-detox
            </p>

            <div className="no-print mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={waUrl("diwaliDetox")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="diwali_detox_note"
                className="btn btn-primary w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get a plan made for you
              </a>
              <Link href="/resources/indian-balanced-plate" className="btn btn-ghost w-full sm:w-auto">
                The balanced plate guide
              </Link>
            </div>
          </div>

          <References items={[refs.ninGuidelines, refs.whoHealthyDiet, refs.nhsBalancedDiet, refs.whoPhysicalActivity]} />
        </div>

        {/* Print only. The last printed page was mostly empty, and something
            you can tick off on the fridge is worth more there than more prose. */}
        <section aria-labelledby="tracker-heading" className="print-only mt-10 break-inside-avoid">
          <h2 id="tracker-heading" className="text-display-s">
            Track your five days
          </h2>
          <p className="mt-1 text-sm text-ink-soft">Tick each box as you go. Five honest days beat one perfect one.</p>
          <table className="mt-4 w-full border-collapse text-[0.8rem]">
            <thead>
              <tr>
                <th scope="col" className="border-2 border-ink/25 bg-cream p-2 text-left align-bottom">
                  Day
                </th>
                {["Meals as planned", "Water", "30–45 min activity", "7–8 h sleep", "How I felt"].map((h) => (
                  <th key={h} scope="col" className="border-2 border-ink/25 bg-cream p-2 text-left align-bottom font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detoxDays.map((day) => (
                <tr key={day.n}>
                  <th scope="row" className="border-2 border-ink/25 p-2 text-left align-top font-semibold">
                    Day {day.n}
                    <span className="block font-normal text-ink-soft">{day.title}</span>
                  </th>
                  {[0, 1, 2, 3].map((i) => (
                    <td key={i} className="h-12 border-2 border-ink/25 p-2 text-center align-middle">
                      <span className="inline-block h-4 w-4 border-2 border-ink/40" />
                    </td>
                  ))}
                  <td className="h-12 w-[28%] border-2 border-ink/25 p-2" />
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="mt-6 text-base font-bold">What I want to carry into next week</h3>
          <div className="mt-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="mt-5 block border-b border-ink/30" />
            ))}
          </div>
        </section>

        <p className="mt-10 max-w-3xl text-sm text-ink-soft">
          General information only, not personal medical advice. This plan is written for healthy adults. If you are pregnant or breastfeeding, or
          you live with diabetes, PCOS, a thyroid condition, kidney disease or any condition needing medical nutrition therapy, please have it
          adjusted for you — see{" "}
          <Link href="/services" className="font-semibold underline underline-offset-4">
            what a personalised plan covers
          </Link>{" "}
          or read our{" "}
          <Link href="/medical-disclaimer" className="font-semibold underline underline-offset-4">
            medical disclaimer
          </Link>
          .
        </p>
      </section>

      {/* Screen only: on paper the "note from Health E Living" block above
          already carries the WhatsApp invitation, and this band is a
          full-bleed coral panel that would eat a page and a lot of ink. */}
      <div className="no-print">
        <CtaBand
          waHref={waUrl("diwaliDetox")}
          location="diwali_detox"
          title={
            <>
              Loved the reset? Let&apos;s build the <span className="em">next five weeks</span>.
            </>
          }
          body="Five days is a good start. A plan built around your routine, your reports and the food you actually enjoy is what makes it stick. Send a message with a line about your goals."
        />
      </div>
    </>
  )
}
