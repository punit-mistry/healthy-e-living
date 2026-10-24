"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect, useRef, useState } from "react"
import { HappyPlate } from "@/components/brand/Motifs"

const EDGE = "M100 0H58C22 120 88 250 48 380S84 640 44 770C16 868 70 940 60 1000H100Z"

function Panel({ tone }: { tone: "green" | "coral" }) {
  return (
    <div className={`route-wipe__panel route-wipe__panel--${tone}`}>
      <svg className="route-wipe__edge" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d={EDGE} fill="currentColor" />
      </svg>
    </div>
  )
}

/**
 * Editorial colour wipe for client-side navigations.
 *
 * - Never plays on the first load (the brand loader covers that).
 * - The new page is already rendered underneath; the wipe only reveals it.
 * - Moves focus to <main> so keyboard and screen-reader users start at the
 *   new content; Next.js' route announcer reads the new page title.
 * - Hidden entirely under prefers-reduced-motion (see globals.css).
 * - Decorative and non-interactive (aria-hidden, pointer-events: none).
 */
export default function RouteTransition() {
  const pathname = usePathname()
  const isFirst = useRef(true)
  const [wipeKey, setWipeKey] = useState<string | null>(null)

  // Layout effect: the overlay is in place before the browser paints the new
  // route, so there's no flash of the page before the wipe.
  useLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setWipeKey(pathname)
    document.getElementById("main")?.focus({ preventScroll: true })
  }, [pathname])

  if (!wipeKey) return null

  return (
    <div
      key={wipeKey}
      className="route-wipe"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if ((e.target as HTMLElement).classList.contains("route-wipe__panel--green")) setWipeKey(null)
      }}
    >
      <Panel tone="green" />
      <Panel tone="coral" />
      <div className="route-wipe__mark">
        <HappyPlate className="h-full w-full" />
      </div>
    </div>
  )
}
