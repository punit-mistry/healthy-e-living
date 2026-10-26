const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00+05:30`))
}

const inrFormat = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

/** Whole rupees, e.g. 2000 → "₹2,000". */
export function formatInr(amount: number): string {
  return inrFormat.format(amount)
}
