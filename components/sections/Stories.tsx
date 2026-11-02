import { testimonials } from "@/data/testimonials"
import StoriesCarousel from "./StoriesCarousel"

/** Client stories, set as large editorial quotes in a swipeable carousel. */
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
      <StoriesCarousel items={testimonials} />
      <p className="mt-5 text-sm text-ink-soft">Shared by clients. Everyone&apos;s experience is different, and results vary from person to person.</p>
    </section>
  )
}
