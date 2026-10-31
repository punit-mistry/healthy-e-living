"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { primaryNav } from "./nav"
import { scrollToTop } from "./SmoothScroll"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function DesktopNavLinks() {
  const pathname = usePathname()
  return (
    <ul className="flex items-center gap-1">
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => pathname === item.href && scrollToTop()}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors hover:bg-cream-deep ${
                active ? "text-green" : "text-ink"
              }`}
            >
              {item.label}
              {active && (
                <svg viewBox="0 0 40 8" className="absolute -bottom-0.5 left-1/2 h-2 w-9 -translate-x-1/2" aria-hidden="true">
                  <path d="M2 5c8-4 14 3 20 0s12-3 16 0" fill="none" stroke="var(--color-coral)" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function MobileNavLinks() {
  const pathname = usePathname()
  return (
    <ul className="flex flex-col">
      {primaryNav.map((item, i) => {
        const active = isActive(pathname, item.href)
        return (
          <li key={item.href} className="border-b-2 border-ink/10">
            <Link
              href={item.href}
              onClick={() => pathname === item.href && scrollToTop()}
              aria-current={active ? "page" : undefined}
              className="flex items-baseline justify-between py-4 font-display text-3xl font-bold tracking-tight"
            >
              <span className={active ? "text-green" : undefined}>{item.label}</span>
              <span className="hand text-xl text-coral-deep" aria-hidden="true">
                0{i + 1}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
