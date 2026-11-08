import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Diwali Detox — a free 5-day festive reset plan from clinical dietitian Dt. Irika Goyal."
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({
    eyebrow: "Free 5-day plan · no sign-up",
    title: "Diwali Detox: a 5-day festive reset",
    footer: "by Dt. Irika Goyal · Clinical Dietitian",
  })
}
