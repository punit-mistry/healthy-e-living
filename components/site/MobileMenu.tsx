"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"

/**
 * Mobile menu built on <details>, so it opens and closes without JavaScript.
 * JavaScript only adds conveniences: close on navigation and on Escape.
 */
export default function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (ref.current) ref.current.open = false
  }, [pathname])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false
        el.querySelector("summary")?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <details ref={ref} className="group lg:hidden">
      <summary
        className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-cream [&::-webkit-details-marker]:hidden"
        aria-label="Menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path className="group-open:hidden" d="M4 8c5-2 11 2 16 0M4 16c5-2 11 2 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path className="hidden group-open:block" d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
      </summary>
      <div className="absolute inset-x-0 top-full border-b-2 border-ink bg-cream px-4 pb-8 pt-2 shadow-[0_24px_40px_-24px_rgb(37_45_39/0.4)] sm:px-7">
        {children}
      </div>
    </details>
  )
}
