import { formatInr } from "./format"
import { contact, diwaliOffer } from "./site"

const messages = {
  diwali: `Hi Irika! I'd like to book the Diwali special ${diwaliOffer.title.toLowerCase()} at ${formatInr(diwaliOffer.offerPrice)}. Could you share available slots?`,
  default: "Hi Irika! I'd like to know more about your nutrition consultations.",
  booking: "Hi Irika! I'd like to talk about my goals and book a consultation. Could you share available slots and fees?",
  discuss: "Hi Irika! I'd like to discuss my health needs. Could you tell me how a consultation works?",
  online: "Hi Irika! I'm interested in an online consultation. Could you share how it works and the fees?",
  inPerson: "Hi Irika! I'd like an in-person consultation in Mumbai. Could you share available slots and fees?",
  corporate: "Hi Irika! I'd like to discuss a corporate wellness session for our team.",
} as const

export type WhatsAppIntent = keyof typeof messages

export function waUrl(intent: WhatsAppIntent = "default"): string {
  return waUrlWithText(messages[intent])
}

export function waUrlForService(serviceName: string): string {
  return waUrlWithText(`Hi Irika! I'm interested in nutrition support for ${serviceName.toLowerCase()}. Could you share how you can help and the fees?`)
}

export function waUrlWithText(text: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`
}
