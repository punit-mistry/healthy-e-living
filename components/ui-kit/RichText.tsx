import Link from "next/link"
import { Fragment } from "react"

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

/**
 * Renders plain text with [anchor](/internal-path) links.
 * Only site-internal paths become links; everything else stays text, and
 * nothing is ever injected as HTML.
 */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(
      <Link key={index} href={href}>
        {label}
      </Link>,
    )
    last = index + whole.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  )
}
