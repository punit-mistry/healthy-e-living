import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/sections/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { contact, site } from "@/lib/site"

// Plain-language draft describing how the site actually works today.
// Must be reviewed by the client and, ideally, a legal adviser before relaunch.

const description = "How Healthy E Living handles your information — what this website collects (very little), what happens when you get in touch, and your rights."

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description, path: "/privacy" })

export default function PrivacyPage() {
  return (
    <LegalPage path="/privacy" title="Privacy policy" description={description} updated="2026-10-24">
      <h2 id="who">Who we are</h2>
      <p>
        This website belongs to {site.name}, the nutrition practice of clinical dietitian Irika Goyal. You can reach us at{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2 id="website">What this website collects</h2>
      <ul>
        <li>
          <strong>No accounts and no stored form submissions.</strong> The contact form doesn&apos;t send anything to this website. It opens
          WhatsApp with your message pre-filled, and nothing is sent until you press send in WhatsApp.
        </li>
        <li>
          <strong>Privacy-friendly analytics.</strong> We use Vercel Web Analytics to count page views and a few button clicks (for example,
          how many people tap &ldquo;WhatsApp&rdquo;). It doesn&apos;t use cookies, and we never send names, phone numbers, messages or health
          information to it.
        </li>
        <li>
          <strong>Basic technical logs.</strong> Like any website, our hosting provider processes technical information such as IP addresses
          to deliver pages and protect the site from abuse.
        </li>
        <li>
          <strong>One small note in your browser.</strong> We store a single &ldquo;seen&rdquo; flag in your browser&apos;s session storage so
          the welcome animation only plays once. It contains no personal information and disappears when you close the tab.
        </li>
      </ul>

      <h2 id="contact">When you get in touch or book</h2>
      <p>
        If you message us on WhatsApp, email or call, we receive the details you choose to share. During consultations you may share health
        information such as medical history, reports and medicines. We use this information only to provide and follow up on your care.
      </p>
      <ul>
        <li>We keep it confidential and never sell it.</li>
        <li>We share it only with your consent — for example with your doctor — or where the law requires it.</li>
        <li>WhatsApp messages are also subject to WhatsApp&apos;s own privacy policy.</li>
        <li>Please don&apos;t send detailed medical history through the website form; we&apos;ll go through it together in your consultation.</li>
      </ul>

      <h2 id="retention">How long we keep it</h2>
      <p>
        We keep consultation records for as long as they&apos;re needed to support your care and to meet legal or professional obligations,
        and then delete them securely. You can ask us at any time what we hold about you.
      </p>

      <h2 id="rights">Your rights</h2>
      <p>
        Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal data, withdraw
        consent, and raise a grievance. Email <a href={`mailto:${contact.email}`}>{contact.email}</a> and we&apos;ll respond as soon as we can.
      </p>

      <h2 id="children">Children</h2>
      <p>Consultations for anyone under 18 take place with a parent or guardian, who provides consent on their behalf.</p>

      <h2 id="links">Other websites</h2>
      <p>
        We link to trusted sources such as the WHO and NHS, and to WhatsApp, Instagram and LinkedIn. Their own privacy policies apply once you
        leave this site.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        If we change how we handle information, we&apos;ll update this page and the date above. Questions? See our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  )
}
