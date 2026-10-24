"use client"

import Link from "next/link"
import { HappyPlate } from "@/components/brand/Motifs"
import { contact } from "@/lib/site"

// Never renders error details to visitors; Next.js already strips stack traces in production.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="wrap grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="max-w-xl">
        <HappyPlate className="mx-auto h-24 w-24 rotate-180" />
        <h1 className="mt-6 text-display-m">Something didn&apos;t cook properly.</h1>
        <p className="mt-4 text-lede text-ink-soft">Sorry about that. Please try again — and if it keeps happening, let us know.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to the homepage
          </Link>
        </div>
        <p className="mt-8 text-sm text-ink-soft">
          Need help now? WhatsApp{" "}
          <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
            {contact.whatsappDisplay}
          </a>{" "}
          or call{" "}
          <a href={`tel:${contact.phoneE164}`} className="font-semibold underline underline-offset-4">
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
