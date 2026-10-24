import { ogSize, renderOg } from "@/lib/og"
import { DEFAULT_OG_ALT } from "@/lib/seo"

export const alt = DEFAULT_OG_ALT
export const size = ogSize
export const contentType = "image/jpeg"

export default function Image() {
  return renderOg({
    eyebrow: "Clinical dietitian · Mumbai & online",
    title: "Food should feel good. So should you.",
    withPortrait: true,
  })
}
