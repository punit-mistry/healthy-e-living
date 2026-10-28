"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import { DiwaliSky, Diya, percentOff } from "@/components/sections/DiwaliOffer"

/**
 * Seasonal offer popup, used on the homepage only.
 *
 * - Opens once, 5s after landing (never over first paint, which keeps it
 *   clear of LCP and of Google's intrusive-interstitial rules on mobile).
 * - Shown on every page load. Closing it in any way (✕, Escape, tapping the
 *   backdrop, or tapping the CTA) leaves a small pill bottom-left to reopen it.
 * - Native <dialog>: focus is trapped while open and returned on close, and
 *   the rest of the page is inert. Without JavaScript nothing is shown.
 */

const OPEN_DELAY = 5000

export default function DiwaliOfferModal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [showPill, setShowPill] = useState(false)

  const open = useCallback(() => {
    const dialog = ref.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    setShowPill(false)
  }, [])

  // Whatever the screen size, shrink the card until all of it fits: the popup
  // should never need a scrollbar.
  useEffect(() => {
    const dialog = ref.current
    const panel = dialog?.querySelector<HTMLElement>(".diwali-modal__panel")
    if (!dialog || !panel) return
    const fit = () => {
      if (!dialog.open) return
      panel.style.zoom = "1"
      const ratio = dialog.clientHeight / panel.scrollHeight
      panel.style.zoom = ratio < 1 ? String(Math.max(ratio * 0.99, 0.3)) : "1"
    }
    dialog.addEventListener("toggle", fit)
    window.addEventListener("resize", fit)
    const observer = new MutationObserver(fit)
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] })
    return () => {
      dialog.removeEventListener("toggle", fit)
      window.removeEventListener("resize", fit)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Shown on every page load (refresh included); closing it only hides it
    // until the next load, and the pill reopens it meanwhile.
    const timer = window.setTimeout(() => {
      // Don't interrupt someone who's using the mobile menu or another dialog.
      if (document.querySelector("dialog[open], details[open]")) setShowPill(true)
      else open()
    }, OPEN_DELAY)
    return () => window.clearTimeout(timer)
  }, [open])

  const onClose = () => setShowPill(true)

  // The dialog fills the screen; a click anywhere outside the card closes it.
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    const target = e.target as Element
    if (target === e.currentTarget || target.classList.contains("diwali-modal__panel") || target.closest("a")) ref.current?.close()
  }

  return (
    <>
      <dialog ref={ref} className="diwali-modal no-print" aria-label="Diwali special offer" onClose={onClose} onClick={onClick}>
        <DiwaliSky />
        <div className="diwali-modal__panel">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-paper text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform duration-200 hover:rotate-90 sm:right-4"
            aria-label="Close offer"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
              <path d="M6.5 6C10 9.5 14 14 17.5 18M17.5 6.5C14 9.5 10 14 6 17.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      </dialog>

      {showPill && (
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          data-track="diwali_offer_open"
          data-track-location="offer_pill"
          className="diwali-pill no-print fixed bottom-4 left-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink bg-paper pl-3 pr-4 text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-green)] transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-6 sm:left-6"
        >
          <Diya className="h-5 w-6 shrink-0" />
          Diwali offer
          <span className="hidden rounded-full bg-coral-deep px-2 py-0.5 text-xs font-extrabold uppercase tracking-[0.06em] text-white min-[360px]:inline">
            {percentOff}% off
          </span>
        </button>
      )}
    </>
  )
}
