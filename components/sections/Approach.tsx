import { Sparkle } from "@/components/brand/Motifs"

const steps = [
  {
    word: "We talk",
    title: "Assessment",
    body: "Your health history, blood reports, medicines, routine, the food you love and the food you don't. Nothing is too small to mention.",
  },
  {
    word: "We plan",
    title: "Personalised planning",
    body: "A plan built around your kitchen, your work hours and your goals — Indian home food first, with room for eating out and festivals.",
  },
  {
    word: "You learn",
    title: "Education",
    body: "The why behind each change, so you can make good choices on your own — reading labels, building plates, handling cravings.",
  },
  {
    word: "We adjust",
    title: "Follow-up",
    body: "Regular check-ins to see what's working, fine-tune what isn't, and keep going when life gets busy.",
  },
]

/** The four-step nutrition approach, connected by a hand-drawn path. */
export default function Approach({ headingId = "approach-title", intro }: { headingId?: string; intro?: React.ReactNode }) {
  return (
    <section aria-labelledby={headingId} className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">The approach</p>
            <h2 id={headingId} className="mt-4 text-display-l">
              Less diet chart. More <span className="em text-green">conversation</span>.
            </h2>
          </div>
          <p className="max-w-xl text-lede text-ink-soft lg:justify-self-end">
            {intro ?? "Nutrition care works best as a conversation that continues — not a one-off appointment. Here's what that looks like."}
          </p>
        </div>

        <div className="relative mt-16">
          {/* Hand-drawn connector across the steps on large screens */}
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="draw-on-view absolute left-0 right-0 top-6 hidden h-16 w-full lg:block" aria-hidden="true">
            <path pathLength={1} d="M40 50C180 6 300 70 420 34S640 4 760 40 980 70 1160 24" fill="none" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>

          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative pl-14 lg:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full font-display text-lg font-extrabold lg:relative lg:mb-6 lg:h-16 lg:w-16 lg:text-2xl ${
                    ["bg-butter", "bg-mint-deep", "bg-coral-soft", "bg-butter"][i]
                  }`}
                >
                  {i + 1}
                </span>
                <p className="hand text-3xl text-coral-deep">{s.word}</p>
                <h3 className="mt-1 text-xl">{s.title}</h3>
                <p className="mt-3 text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Sparkle className="absolute right-8 top-10 h-10 w-10" />
    </section>
  )
}
