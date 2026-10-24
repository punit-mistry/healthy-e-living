import type { Metadata } from "next"
import Link from "next/link"
import { Sparkle } from "@/components/brand/Motifs"
import { waUrl } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

const suggestions = [
  { href: "/services", label: "All services" },
  { href: "/about", label: "Meet Irika" },
  { href: "/consultation", label: "How consultations work" },
  { href: "/blog", label: "The journal" },
  { href: "/contact", label: "Contact" },
]

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-2">
      <div className="relative mx-auto w-64 sm:w-80" aria-hidden="true">
        <svg viewBox="-4 -4 128 128" className="w-full -rotate-12">
          <path d="M60 13C87 12 108 33 107 60C106 87 85 108 58 107C31 106 12 85 13 58C14 33 34 14 64 14" fill="var(--color-paper)" stroke="var(--color-green)" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 30C77 30 90 43 90 60C90 78 76 90 59 90C42 89 30 76 30 59" fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
          <path d="M44 74C51 66 69 66 76 74" fill="none" stroke="var(--color-coral)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="48" cy="52" r="3.5" fill="var(--color-ink)" />
          <circle cx="72" cy="52" r="3.5" fill="var(--color-ink)" />
        </svg>
        <Sparkle className="bob absolute -right-2 top-4 h-10 w-10" />
        <p className="hand absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-3xl text-coral-deep">this plate&apos;s empty</p>
      </div>
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-display-l">This page has wandered off the menu.</h1>
        <p className="mt-6 max-w-lg text-lede text-ink-soft">
          The link may be old, or the page may have moved. Here are a few good places to pick up from.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="chip">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to the homepage
          </Link>
          <a href={waUrl("default")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
