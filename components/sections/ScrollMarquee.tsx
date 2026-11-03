import { Sparkle } from "@/components/brand/Motifs"

const words = [
  "Real food",
  "Indian plates",
  "No crash diets",
  "Your family table",
  "Evidence, not trends",
  "PCOS",
  "Diabetes",
  "Gut health",
  "Weight loss",
  "Pregnancy",
  "Sports nutrition",
]

/** Big headline band that loops continuously. */
export default function ScrollMarquee() {
  return (
    <section aria-label="What Irika helps with" className="marquee-viewport bg-green py-8 text-cream sm:py-12">
      <div className="marquee-track marquee-track--headline flex w-max items-center whitespace-nowrap">
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1 ? "true" : undefined}
            className={`flex min-w-[100vw] flex-none items-center gap-6 pr-6 ${group === 1 ? "marquee-duplicate" : ""}`}
          >
            {words.map((word) => (
              <span key={word} className="flex items-center gap-6">
                <span className="font-display text-5xl font-extrabold tracking-tight text-cream sm:text-7xl">{word}</span>
                <Sparkle className="h-7 w-7 flex-none sm:h-10 sm:w-10" color="var(--color-coral)" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
