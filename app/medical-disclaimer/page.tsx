import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/sections/LegalPage"
import { pageMetadata } from "@/lib/seo"
import { person } from "@/lib/site"

const description = "Information on this website is general and educational. Here's what that means, and when to speak to your doctor."

export const metadata: Metadata = pageMetadata({ title: "Medical Disclaimer", description, path: "/medical-disclaimer" })

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage path="/medical-disclaimer" title="Medical disclaimer" description={description} updated="2026-10-24">
      <h2 id="general">General information, not personal advice</h2>
      <p>
        Articles, guides and service descriptions on this website are written to help you understand nutrition in general. They aren&apos;t a
        diagnosis, a treatment plan or a substitute for advice from your doctor or another qualified health professional who knows your
        situation.
      </p>

      <h2 id="relationship">Reading isn&apos;t a consultation</h2>
      <p>
        Reading this website doesn&apos;t create a dietitian–client relationship. Personalised advice is given only in a consultation, where{" "}
        {person.displayName} can take your health history, medicines and circumstances into account.
      </p>

      <h2 id="doctor">Please check with your doctor</h2>
      <ul>
        <li>Never stop, start or change any medication based on something you read here.</li>
        <li>Talk to your doctor before major diet changes if you have a medical condition, are pregnant or breastfeeding, or take medication.</li>
        <li>Don&apos;t ignore or delay medical advice because of something on this website.</li>
      </ul>

      <h2 id="emergency">In an emergency</h2>
      <p>If you think you may have a medical emergency, contact your doctor or local emergency services immediately.</p>

      <h2 id="review">How our content is checked</h2>
      <p>
        Health articles show who reviewed them and when. Articles that haven&apos;t yet been reviewed by {person.displayName} are clearly
        marked. We cite sources so you can see where guidance comes from, and we update content when guidance changes.
      </p>

      <h2 id="results">Experiences vary</h2>
      <p>
        Client stories describe individual experiences. Everyone is different, and similar results aren&apos;t guaranteed. See our{" "}
        <Link href="/terms">terms of service</Link> for more.
      </p>
    </LegalPage>
  )
}
