import type { Metadata } from "next"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import Pricing from "@/components/sections/Pricing"
import JsonLd from "@/components/ui-kit/JsonLd"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { waUrl } from "@/lib/whatsapp"

const title = "Pricing: Nutrition Programme Fees"
const description =
  "Simple programme fees for personalised nutrition care with clinical dietitian Irika Goyal: 1, 3 and 6 month programmes with a tailored plan and regular follow-ups."

export const metadata: Metadata = pageMetadata({ title, description, path: "/pricing" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]

const included = [
  "A personalised plan built around your food, routine and health goals",
  "Regular follow-ups to adjust the plan as you progress",
  "Support on WhatsApp between sessions",
  "Online sessions, or in person at a mutually convenient place",
]

export default function PricingPage() {
  return (
    <>
      <JsonLd data={webPageJson({ path: "/pricing", name: title, description, crumbs })} />

      <PageHero
        crumbs={crumbs}
        eyebrow="Pricing"
        tone="butter"
        title={
          <>
            Clear fees, <span className="em text-green">no surprises</span>.
          </>
        }
        lede="Choose the programme length that suits you. Everyone sees the same numbers before they message."
      />

      <Pricing headingId="pricing-page-title" location="pricing_page" />

      <section aria-labelledby="included-title" className="wrap py-16 sm:py-24">
        <h2 id="included-title" className="text-display-m">
          What&apos;s in every programme
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="rounded-[1.5rem] border-2 border-ink/15 bg-paper p-5 text-ink">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <CtaBand waHref={waUrl("booking")} location="pricing" secondary={{ href: "/consultation", label: "How consultations work" }} />
    </>
  )
}
