"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"

function getHash(href: string): string | null {
  const i = href.indexOf("#")
  if (i === -1) return null
  return href.slice(i)
}

const HASH_OFFSET = -80
const MAX_RETRIES = 20
const RETRY_INTERVAL = 200

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const hashAttemptRef = useRef(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis
    ;(window as any).__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  useEffect(() => {
    function scrollToHash(hash: string) {
      const el = document.querySelector(hash)
      if (el) {
        lenisRef.current?.scrollTo(el, { offset: HASH_OFFSET })
        return true
      }
      return false
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href") || ""
      const hash = getHash(href)
      if (!hash) return
      if (!href.startsWith("#") && !href.startsWith("/#")) return

      e.preventDefault()
      scrollToHash(hash)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    function tryScroll(): boolean {
      hashAttemptRef.current++
      const el = document.querySelector(hash)
      if (el) {
        lenisRef.current?.scrollTo(el, { offset: HASH_OFFSET, immediate: false })
        history.replaceState(null, "", window.location.pathname + window.location.search)
        return true
      }
      if (hashAttemptRef.current < MAX_RETRIES) {
        setTimeout(tryScroll, RETRY_INTERVAL)
      }
      return false
    }

    tryScroll()
  }, [])

  return <>{children}</>
}
