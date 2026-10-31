"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { scrollToTop } from "./SmoothScroll"

/** Logo link: on the home page, clicking it scrolls to the top instead of doing nothing. */
export default function HomeLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <Link
      href="/"
      className={className}
      onClick={() => {
        if (pathname === "/") scrollToTop()
      }}
    >
      {children}
    </Link>
  )
}
