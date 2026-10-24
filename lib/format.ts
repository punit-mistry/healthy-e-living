const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00+05:30`))
}
