"use client"

import { track } from "@vercel/analytics"
import { useEffect } from "react"

/**
 * Privacy-safe CTA measurement.
 *
 * Elements opt in with data-track="event_name" and data-track-location="...".
 * Only the event name, the location label and the page path are sent —
 * never form contents, names, phone numbers or anything health-related.
 * (Vercel Web Analytics custom events require a Pro or Enterprise plan;
 * on other plans these calls are silently ignored.)
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]")
      if (!el) return
      try {
        track(el.dataset.track ?? "click", {
          location: el.dataset.trackLocation ?? "unknown",
          path: window.location.pathname,
        })
      } catch {
        /* analytics must never break the page */
      }
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])
  return null
}
