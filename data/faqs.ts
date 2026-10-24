import { consultationFormat, serviceArea } from "@/lib/site"
import type { Faq } from "./services"

export interface FaqGroup {
  id: string
  title: string
  faqs: Faq[]
}

export const faqGroups: FaqGroup[] = [
  {
    id: "booking",
    title: "Booking & format",
    faqs: [
      { question: "How do I book a consultation?", answer: "Send a WhatsApp message with a line about what you'd like help with. You'll get available times and the current fees before anything is confirmed." },
      { question: "Do you offer online consultations?", answer: `Yes. ${serviceArea.online} ${serviceArea.inPersonNote}` },
      { question: "How long is a consultation, and how often will we meet?", answer: `The first consultation usually takes ${consultationFormat.initial}, and follow-ups ${consultationFormat.followUp}. ${consultationFormat.cadence} We'll agree on what suits you.` },
      { question: "How much does it cost?", answer: "Fees depend on the type of consultation and programme. Ask on WhatsApp and you'll get the current fees before you book — there are no surprises." },
    ],
  },
  {
    id: "first-session",
    title: "Your first session",
    faqs: [
      { question: "What should I have ready for my first appointment?", answer: "Recent blood reports if you have them, a list of medicines and supplements, and a rough idea of what you eat on a typical day. A few days of food notes help, but aren't essential." },
      { question: "Will I have to give up the foods I love?", answer: "No. Plans are built around Indian home food, your preferences and your routine — including eating out, festivals and family meals. The aim is a way of eating you can keep." },
      { question: "Can you plan around vegetarian, vegan or religious food practices?", answer: "Yes. Tell me how you eat — vegetarian, eggetarian, vegan, Jain or fasting days — and we plan around it." },
    ],
  },
  {
    id: "care",
    title: "Working with your doctor",
    faqs: [
      { question: "Do you work alongside my doctor?", answer: "Yes. Nutrition care supports your medical treatment; it doesn't replace it. I never stop or change medication, and I'll suggest checking with your doctor whenever something needs medical input." },
      { question: "How soon will I see results?", answer: "It depends on your goals, health and starting point, so I won't promise a timeline. Many people notice changes in energy and habits within a few weeks; we also track measurements and blood reports where relevant." },
      { question: "Is my information kept private?", answer: "Yes. What you share is used only to support your care. See the privacy policy for details on how information is handled." },
    ],
  },
]

/** The questions featured on the homepage. */
export const homeFaqs: Faq[] = [
  faqGroups[0].faqs[0],
  faqGroups[0].faqs[1],
  faqGroups[0].faqs[2],
  faqGroups[1].faqs[1],
  faqGroups[2].faqs[0],
]

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs)
