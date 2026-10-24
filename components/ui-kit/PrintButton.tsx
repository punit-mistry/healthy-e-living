"use client"

export default function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-coral no-print">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}
