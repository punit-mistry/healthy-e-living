import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { formatInr } from "@/lib/format"
import { pricingPlans } from "@/lib/site"
import { waUrlWithText } from "@/lib/whatsapp"

/** Programme fees, so everyone sees the same numbers before they message. */
export default function Pricing({ headingId = "pricing-title", location = "pricing" }: { headingId?: string; location?: string }) {
  return (
    <section id="pricing" aria-labelledby={headingId} className="scroll-mt-24 bg-butter-soft py-16 sm:py-24">
      <div className="wrap">
        <p className="eyebrow">Pricing</p>
        <h2 id={headingId} className="mt-4 max-w-2xl text-display-m">
          Simple <span className="em text-green">programme</span> fees
        </h2>
        <p className="mt-4 max-w-2xl text-ink-soft">Pick the length that suits you. Every programme includes your personalised plan and follow-ups.</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((p) => {
            const popular = "popular" in p && p.popular
            return (
              <li key={p.id} className={`relative flex flex-col rounded-[2rem] border-2 p-7 sm:p-8 ${popular ? "border-ink bg-paper shadow-[6px_6px_0_0_var(--color-green)]" : "border-ink/15 bg-paper"}`}>
                {popular && <span className="absolute -top-3 left-6 rounded-full bg-coral-deep px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white">Most chosen</span>}
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-3 font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.03em] text-green">{formatInr(p.price)}</p>
                <p className="mt-4 flex-1 text-ink-soft">{p.blurb}</p>
                <a
                  href={waUrlWithText(`Hi Irika! I'd like to join the ${p.name} programme (${formatInr(p.price)}). Could you share the next steps?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location={`${location}_${p.id}`}
                  className={`btn mt-6 w-full ${popular ? "btn-primary" : "btn-ghost"}`}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Choose {p.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
