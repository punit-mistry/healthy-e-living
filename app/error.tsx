"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[20%] w-[600px] h-[600px] bg-yellow-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative text-center px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
          Something Went Wrong
        </h1>

        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          Don't worry — even the best meal plans need adjustments. Please try again or reach out for help.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium shadow-lg"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/919833640891"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
          >
            Get Help
          </a>
        </div>

        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl inline-block">
          <p className="text-sm text-slate-500">
            Need immediate assistance?{" "}
            <a
              href="tel:+919833640891"
              className="text-[#6A431C] font-medium hover:underline"
            >
              Call +91 9833640891
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
