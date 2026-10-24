import type { Faq } from "@/data/services"

/**
 * Accessible FAQ list built on native <details>/<summary>: keyboard and
 * screen-reader friendly by default, and works without JavaScript.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-item">
          <summary>
            <span>{faq.question}</span>
            <span className="faq-toggle" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
                <path d="M10 3v14M3 10h14" fill="none" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="faq-answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
