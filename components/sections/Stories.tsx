import { testimonials } from "@/data/testimonials"

const styles = [
  { card: "bg-butter", mark: "text-coral" },
  { card: "bg-mint", mark: "text-green" },
]

/** Client stories, set as large editorial quotes rather than identical cards. */
export default function Stories({ headingId = "stories-title" }: { headingId?: string }) {
  if (testimonials.length === 0) return null
  return (
    <section aria-labelledby={headingId} className="wrap py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">Client stories</p>
        <h2 id={headingId} className="mt-3 text-display-m">
          In their <span className="em text-green">own</span> words.
        </h2>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {testimonials.map((t, i) => {
          const s = styles[i % styles.length]
          return (
            <figure key={t.name} className={`reveal relative rounded-[1.5rem] p-5 pt-8 sm:p-6 sm:pt-9 ${s.card}`}>
              <span aria-hidden="true" className={`absolute -top-4 left-5 font-italic text-[4rem] leading-none ${s.mark}`}>
                &ldquo;
              </span>
              <blockquote className="relative text-base leading-relaxed text-ink">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-4 border-t-2 border-ink/15 pt-3">
                <span className="block font-display text-lg font-bold">{t.name}</span>
                <span className="text-sm text-ink-soft">{t.context}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>
      <p className="mt-5 text-sm text-ink-soft">Shared by clients. Everyone&apos;s experience is different, and results vary from person to person.</p>
    </section>
  )
}
