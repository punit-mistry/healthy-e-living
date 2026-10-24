import Link from "next/link"
import { consultationFormat } from "@/lib/site"

const steps = [
  { title: "Say hello on WhatsApp", body: "A line about what you'd like help with is plenty. You'll get available times and current fees before anything is booked." },
  { title: "Your first consultation", body: `Usually ${consultationFormat.initial}, online or in person in Mumbai. We go through your health, routine and goals.` },
  { title: "Your personalised plan", body: "Built around your food, your kitchen and your week — shared with you digitally." },
  { title: "Follow-ups that adjust", body: `Shorter check-ins (${consultationFormat.followUp}) to review progress and fine-tune the plan.` },
]

/** Compact "what happens next" strip used on service pages. */
export default function ConsultationSteps() {
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-3xl border-2 border-ink/10 bg-paper p-6">
            <span className="hand text-4xl text-coral-deep" aria-hidden="true">
              {i + 1}.
            </span>
            <h3 className="mt-2 text-lg">{s.title}</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>
      <Link href="/consultation" className="link-squiggle mt-6 inline-block">
        More about how consultations work
      </Link>
    </div>
  )
}
