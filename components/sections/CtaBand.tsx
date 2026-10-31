import Link from "next/link"
import { CurlyArrow, HappyPlate, Sparkle } from "@/components/brand/Motifs"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { contact } from "@/lib/site"

interface CtaBandProps {
  title?: React.ReactNode
  body?: string
  waHref: string
  location: string
  secondary?: { href: string; label: string }
}

/** The closing invitation used at the end of most pages. */
export default function CtaBand({
  title = (
    <>
      Let&apos;s find an approach that works for <span className="em">your</span> real life.
    </>
  ),
  body = "Send a message on WhatsApp with a line about your goals. You'll hear back with available times and current fees — no pressure, no obligation.",
  waHref,
  location,
  secondary = { href: "/consultation", label: "How consultations work" },
}: CtaBandProps) {
  return (
    <section aria-labelledby={`cta-${location}`} className="wrap my-14 sm:my-28">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-coral px-5 py-10 sm:rounded-[2rem] sm:px-12 sm:py-20 lg:px-20">
        <HappyPlate className="spin-slow pointer-events-none absolute -right-10 -top-10 h-28 w-28 opacity-40 sm:-right-16 sm:-top-16 sm:h-80 sm:w-80 sm:opacity-90" />
        <Sparkle className="absolute bottom-10 right-[38%] hidden h-8 w-8 sm:block" color="var(--color-butter)" />
        <div className="relative max-w-2xl">
          <p className="hand text-xl text-ink sm:text-3xl">ready when you are</p>
          <h2 id={`cta-${location}`} className="mt-2 text-[1.6rem] leading-tight text-ink sm:text-display-m">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lede text-ink">{body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location={`cta_${location}`}
              className="btn btn-primary w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Let&apos;s talk about your goals
            </a>
            {secondary && (
              <Link href={secondary.href} className="btn btn-ghost w-full sm:w-auto">
                {secondary.label}
              </Link>
            )}
          </div>
          <p className="mt-6 text-sm font-medium text-ink">
            Prefer email?{" "}
            <a href={`mailto:${contact.email}`} className="underline decoration-2 underline-offset-4">
              {contact.email}
            </a>
          </p>
        </div>
        <CurlyArrow className="absolute bottom-8 right-10 hidden h-20 w-24 rotate-[160deg] lg:block" />
      </div>
    </section>
  )
}
