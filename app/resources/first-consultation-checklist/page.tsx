import type { Metadata } from "next"
import Link from "next/link"
import { HappyPlate } from "@/components/brand/Motifs"
import PageHero from "@/components/sections/PageHero"
import JsonLd from "@/components/ui-kit/JsonLd"
import PrintButton from "@/components/ui-kit/PrintButton"
import { getResource } from "@/data/resources"
import { formatDate } from "@/lib/format"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { site } from "@/lib/site"

const resource = getResource("first-consultation-checklist")!
const path = `/resources/${resource.slug}`

export const metadata: Metadata = pageMetadata({
  title: "First Dietitian Visit Checklist (Printable)",
  description: "A free, printable checklist for your first appointment with a dietitian — what to bring, what to think about, and what to expect.",
  path,
})

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "First consultation checklist", path },
]

const sections = [
  {
    title: "Gather these",
    items: [
      "Recent blood reports from the last 3–6 months, if you have them",
      "A list of every medicine and supplement you take, with doses",
      "Any diagnoses or letters from your doctor that are relevant",
      "Your height and weight, if you know them — and your waist measurement, if you'd like",
    ],
  },
  {
    title: "Jot down a few days of eating",
    items: [
      "Note what you eat and drink for 2–3 days, including one weekend day",
      "Photos are fine — no need to weigh anything",
      "Add rough timings, and where you ate (home, office, out)",
      "Don't change anything to look 'good'. Real is more useful",
    ],
  },
  {
    title: "Think about",
    items: [
      "What you'd most like to be different in three months",
      "What you've tried before — what helped, what didn't",
      "Your routine: work hours, sleep, travel, who cooks",
      "Foods you love and won't give up (we'll plan around them)",
      "Any cultural, religious or fasting practices",
    ],
  },
  {
    title: "On the day",
    items: [
      "Online: a quiet spot, a charged phone or laptop, and a stable connection",
      "In person: check the location and time in your booking message",
      "Keep your reports and notes handy",
      "Bring the person who cooks for you, if they'd like to join",
    ],
  },
  {
    title: "Afterwards",
    items: [
      "Save your plan somewhere easy to find",
      "Book your first follow-up before you forget",
      "Write down questions as they come up — and send them",
    ],
  },
]

export default function ChecklistPage() {
  return (
    <>
      <JsonLd data={webPageJson({ path, name: resource.title, description: resource.description, crumbs })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Printable checklist"
        title={resource.title}
        lede="Five minutes of preparation makes your first session far more useful. Tick things off as you go."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrintButton label="Print the checklist" />
          <span className="text-sm text-ink-soft">Last updated {formatDate(resource.updated)}</span>
        </div>
      </PageHero>

      <section aria-label="Checklist" className="wrap py-14">
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((s, i) => (
            <div key={s.title} className={`break-inside-avoid rounded-[2rem] p-7 sm:p-9 ${["bg-paper", "bg-mint", "bg-butter-soft", "bg-paper", "bg-coral-soft"][i]}`}>
              <h2 className="text-display-s">{s.title}</h2>
              <ul className="mt-5 space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-5 w-5 flex-none rounded-md border-2 border-ink bg-paper" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col justify-center rounded-[2rem] border-2 border-dashed border-ink/30 p-8">
            <HappyPlate className="h-16 w-16" />
            <p className="hand mt-3 text-3xl text-coral-deep">that&apos;s it — you&apos;re ready!</p>
            <p className="mt-2 text-ink-soft">
              From {site.name}. Book at healthelivingwithirika.com or{" "}
              <Link href="/consultation" className="font-semibold underline underline-offset-4">
                see how consultations work
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
