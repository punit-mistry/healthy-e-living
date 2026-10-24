import { testimonials } from "@/data/testimonials"

const styles = [
  { card: "bg-butter lg:-rotate-[0.8deg]", mark: "text-coral" },
  { card: "bg-mint lg:translate-y-16 lg:rotate-[0.6deg]", mark: "text-green" },
]

/** Client stories, set as large editorial quotes rather than identical cards. */
export default function Stories({ headingId = "stories-title" }: { headingId?: string }) {
  if (testimonials.length === 0) return null
  return (
    <section aria-labelledby={headingId} className="wrap py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="eyebrow">Client stories</p>
        <h2 id={headingId} className="mt-4 text-display-l">
          In their <span className="em text-green">own</span> words.
        </h2>
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:pb-16">
        {testimonials.map((t, i) => {
          const s = styles[i % styles.length]
          return (
            <figure key={t.name} className={`reveal relative rounded-[2rem] p-8 sm:p-10 ${s.card}`}>
              <span aria-hidden="true" className={`absolute -top-8 left-6 font-italic text-[7rem] leading-none ${s.mark}`}>
                &ldquo;
              </span>
              <blockquote className="relative text-[1.15rem] leading-relaxed text-ink sm:text-xl">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t-2 border-ink/15 pt-4">
                <span className="block font-display text-lg font-bold">{t.name}</span>
                <span className="text-sm text-ink-soft">{t.context}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>
      <p className="mt-8 text-sm text-ink-soft">Shared by clients. Everyone&apos;s experience is different, and results vary from person to person.</p>
    </section>
  )
}
