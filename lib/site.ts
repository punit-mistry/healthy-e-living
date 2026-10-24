/**
 * Single source of truth for business facts.
 *
 * Anything that is a factual claim about the practice lives here so it is
 * stated the same way everywhere (pages, structured data, social images).
 * Claims with `confirmed: false` are NOT rendered until the client confirms
 * them — see docs/client-verification.md.
 */

export const site = {
  name: "Healthy E Living with Irika Goyal",
  shortName: "Healthy E Living",
  wordmark: "healthy e living",
  tagline: "A little more joy on your plate.",
  url: "https://www.healthelivingwithirika.com",
  locale: "en_IN",
  language: "en-IN",
  description:
    "Personalised, food-first nutrition care from clinical dietitian Irika Goyal. Online consultations across India and in-person sessions in Mumbai.",
} as const

export const person = {
  name: "Irika Goyal",
  displayName: "Dt. Irika Goyal",
  firstName: "Irika",
  jobTitle: "Clinical Dietitian & Nutritionist",
} as const

export const contact = {
  /** WhatsApp (bookings and messages). */
  whatsappNumber: "918879043297",
  whatsappDisplay: "+91 88790 43297",
  /** Phone calls. */
  phoneE164: "+919833640891",
  phoneDisplay: "+91 98336 40891",
  email: "health.e.living23@gmail.com",
  hours: "Monday to Saturday, by appointment",
} as const

export const social = {
  linkedin: "https://www.linkedin.com/in/irika-goyal-825183229/",
  instagram: "https://www.instagram.com/health.e.living",
  instagramHandle: "@health.e.living",
} as const

export const serviceArea = {
  inPerson: "Mumbai",
  inPersonNote: "In-person sessions are held in Mumbai. The exact location is shared when you book.",
  online: "Online video consultations for clients across India and abroad.",
} as const

interface Claim {
  value: string
  label: string
  /** Only rendered when the client has confirmed the figure in writing. */
  confirmed: boolean
}

export const claims: Record<"experience" | "clients", Claim> = {
  experience: { value: "4+", label: "years of clinical experience", confirmed: false },
  clients: { value: "100+", label: "clients supported", confirmed: false },
}

export function confirmedClaims(): Claim[] {
  return Object.values(claims).filter((c) => c.confirmed)
}

export interface Qualification {
  title: string
  institution: string
  year?: string
}

/**
 * Verified qualifications only. Intentionally empty until the client supplies
 * degree, institution and any registration details. Sections that list
 * qualifications are hidden while this is empty.
 */
export const qualifications: Qualification[] = []

/** Consultation logistics as described in the existing site's FAQ. */
export const consultationFormat = {
  initial: "45–60 minutes",
  followUp: "20–30 minutes",
  cadence: "Often every ten days or so to begin with, then every fortnight once things are settled.",
} as const

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString()
}
