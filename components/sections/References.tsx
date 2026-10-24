import type { Reference } from "@/data/references"

export default function References({ items, id = "references" }: { items: Reference[]; id?: string }) {
  if (items.length === 0) return null
  return (
    <section aria-labelledby={id} className="rounded-3xl bg-paper p-6 sm:p-8">
      <h2 id={id} className="text-display-s">
        Sources &amp; further reading
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Guidance on this page draws on the following. Links open external websites.
      </p>
      <ol className="mt-5 space-y-3 text-[0.95rem]">
        {items.map((r, i) => (
          <li key={r.url} className="flex gap-3">
            <span className="font-display font-bold text-coral-deep">{i + 1}.</span>
            <span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-green underline decoration-line underline-offset-4 hover:decoration-coral">
                {r.title}
              </a>
              <span className="text-ink-soft">
                {" "}
                — {r.publisher}
                {r.year ? `, ${r.year}` : ""}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
