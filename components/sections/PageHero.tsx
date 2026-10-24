import { Underline } from "@/components/brand/Motifs"
import Breadcrumbs from "@/components/ui-kit/Breadcrumbs"
import type { Crumb } from "@/lib/seo"

interface PageHeroProps {
  crumbs: Crumb[]
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
  aside?: React.ReactNode
  tone?: "cream" | "mint" | "butter"
}

const tones = {
  cream: "bg-cream",
  mint: "bg-mint",
  butter: "bg-butter-soft",
}

/** Shared editorial opener for inner pages. */
export default function PageHero({ crumbs, eyebrow, title, lede, children, aside, tone = "cream" }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden ${tones[tone]}`}>
      <div className="wrap pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Breadcrumbs crumbs={crumbs} />
        <div className={`mt-10 grid items-end gap-10 ${aside ? "lg:grid-cols-[1.5fr_1fr]" : ""}`}>
          <div className="max-w-4xl">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="text-display-l">{title}</h1>
            <Underline className="draw-on-load mt-3 h-4 w-40 sm:w-56" />
            {lede && <p className="mt-6 max-w-2xl text-lede text-ink-soft">{lede}</p>}
            {children}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
