"use client"

import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

let instance: Lenis | null = null

/** Jump (or glide) to the top, whether or not Lenis is running. */
export function scrollToTop(immediate = false) {
  if (instance) instance.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" })
}

/**
 * Lenis smooth scrolling for the page. Off for reduced-motion users, and it
 * never touches scrolling inside open dialogs (the Diwali offer, mobile menu).
 * Also resets to the top on every route change, so nav clicks always land at
 * the top of the new page.
 */
export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({
      anchors: true,
      prevent: (node) => node.closest("dialog") !== null,
    })
    instance = lenis
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
    }
  }, [])

  useEffect(() => {
    if (window.location.hash) return
    scrollToTop(true)
  }, [pathname])

  return null
}
