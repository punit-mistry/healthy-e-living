import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/sections/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { contact, site } from "@/lib/site"

// Plain-language draft. Booking, fee and cancellation details must be
// confirmed by the client, and the page reviewed by a legal adviser.

const description = "The terms for using this website and booking nutrition consultations with Healthy E Living, written in plain language."

export const metadata: Metadata = pageMetadata({ title: "Terms of Service", description, path: "/terms" })

export default function TermsPage() {
  return (
    <LegalPage path="/terms" title="Terms of service" description={description} updated="2026-10-24">
      <h2 id="service">What we offer</h2>
      <p>
        {site.name} provides nutrition counselling and education by a clinical dietitian, online and in person in Mumbai. Nutrition care
        supports — but does not replace — care from your doctor. We don&apos;t diagnose medical conditions, prescribe medicines or change
        medication.
      </p>

      <h2 id="booking">Bookings and fees</h2>
      <ul>
        <li>Consultations are arranged and confirmed over WhatsApp, phone or email.</li>
        <li>Current fees are shared with you before you book, so you can decide with all the information.</li>
        <li>If you need to reschedule or cancel, please let us know as early as possible. Any specific rescheduling terms are shared when you book.</li>
      </ul>

      <h2 id="you">Your part</h2>
      <ul>
        <li>Share accurate, complete information about your health, medicines and any changes, so advice can be safe and relevant.</li>
        <li>Keep seeing your doctor and following their treatment.</li>
        <li>Tell your doctor before making major changes if you have a medical condition, are pregnant, or take medication.</li>
      </ul>

      <h2 id="results">No guaranteed results</h2>
      <p>
        Everyone&apos;s body, health and circumstances are different. We&apos;ll work hard with you, but we can&apos;t promise specific
        outcomes such as a set amount of weight loss or a change in test results.
      </p>

      <h2 id="emergencies">Not for emergencies</h2>
      <p>
        This service isn&apos;t for urgent or emergency care. If you feel unwell or think you may have a medical emergency, contact your doctor
        or local emergency services immediately.
      </p>

      <h2 id="website">Using this website</h2>
      <ul>
        <li>
          Content on this site is general and educational. Please read our <Link href="/medical-disclaimer">medical disclaimer</Link>.
        </li>
        <li>You&apos;re welcome to print and share our free resources for personal, non-commercial use, with credit to {site.name}.</li>
        <li>Other text, illustrations and design on this site belong to {site.name} and may not be reused commercially without permission.</li>
        <li>We link to other websites for further reading; we aren&apos;t responsible for their content.</li>
      </ul>

      <h2 id="law">Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2 id="contact">Questions</h2>
      <p>
        Email <a href={`mailto:${contact.email}`}>{contact.email}</a> or see the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  )
}
