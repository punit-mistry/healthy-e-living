import type { Metadata } from "next"
import CtaBand from "@/components/sections/CtaBand"
import PageHero from "@/components/sections/PageHero"
import FaqList from "@/components/ui-kit/FaqList"
import JsonLd from "@/components/ui-kit/JsonLd"
import { allFaqs, faqGroups } from "@/data/faqs"
import { faqEntities, pageMetadata, webPageJson } from "@/lib/seo"
import { waUrl } from "@/lib/whatsapp"

const title = "Frequently Asked Questions"
const description =
  "Answers to the questions people ask before booking a nutrition consultation with Irika Goyal — format, fees, first sessions, privacy and working with your doctor."

export const metadata: Metadata = pageMetadata({ title, description, path: "/faq" })

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]

export default function FaqPage() {
  return (
    <>
      <JsonLd data={webPageJson({ path: "/faq", name: title, description, crumbs, type: "FAQPage", pageProps: { mainEntity: faqEntities(allFaqs) } })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        tone="butter"
        title={
          <>
            Good questions <span className="em text-green">only</span>. (They all are.)
          </>
        }
        lede="The things people most often ask before their first consultation. If yours isn't here, just send a message."
      >
        <nav aria-label="FAQ sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="chip">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="wrap space-y-16 py-16 sm:py-20">
        {faqGroups.map((g, i) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.8fr_1.4fr]">
            <div>
              <span className="hand text-4xl text-coral-deep" aria-hidden="true">
                0{i + 1}
              </span>
              <h2 id={`${g.id}-title`} className="mt-1 text-display-m">
                {g.title}
              </h2>
            </div>
            <FaqList faqs={g.faqs} />
          </section>
        ))}
      </div>

      <CtaBand waHref={waUrl("discuss")} location="faq" />
    </>
  )
}
