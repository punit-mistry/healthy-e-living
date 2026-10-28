"use client"

import { useId, useState } from "react"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { contact } from "@/lib/site"
import { waUrlWithText } from "@/lib/whatsapp"

const GOALS = [
  "Weight management",
  "PCOS",
  "Diabetes or prediabetes",
  "Thyroid",
  "Heart health or blood pressure",
  "Gut health or IBS",
  "Food allergy or intolerance",
  "Pregnancy or postpartum",
  "My child's eating",
  "Sports or muscle gain",
  "Healthy ageing",
  "Something else",
]

const TIMES = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)", "Late evening (8pm–10pm)"]

const LIMITS = { name: 60, contact: 40, remarks: 400 }

/**
 * Online consultation enquiry. Like the contact form it only composes a
 * WhatsApp message — nothing is stored on this website.
 */
export default function OnlineEnquiryForm({ location = "online_enquiry" }: { location?: string }) {
  const id = useId()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [goal, setGoal] = useState(GOALS[0])
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [times, setTimes] = useState<string[]>([])
  const [remarks, setRemarks] = useState("")
  const [opened, setOpened] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const toggleTime = (t: string) => setTimes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dates = from && to ? `${from} to ${to}` : from || to
    const text = [
      "Hi Irika! I'd like to enquire about an online consultation.",
      `Name: ${name.trim().slice(0, LIMITS.name)}`,
      `Contact: ${phone.trim().slice(0, LIMITS.contact)}`,
      `Main goal: ${goal}`,
      dates ? `Preferred dates: ${dates}` : "",
      times.length ? `Preferred time: ${times.join(", ")}` : "",
      remarks.trim() ? `Remarks: ${remarks.trim().slice(0, LIMITS.remarks)}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    const url = waUrlWithText(text)
    const win = window.open(url, "_blank")
    if (win) win.opener = null
    else window.location.href = url
    setOpened(true)
  }

  const field =
    "mt-2 block w-full rounded-2xl border-2 border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-green focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-deep"

  return (
    <form action="https://api.whatsapp.com/send" method="get" target="_blank" onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="phone" value={contact.whatsappNumber} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="font-semibold">
            Your name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" maxLength={LIMITS.name} value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="font-semibold">
            Contact number
          </label>
          <input
            id={`${id}-phone`}
            name="contact"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.contact}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-goal`} className="font-semibold">
          Main goal
        </label>
        <select id={`${id}-goal`} name="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className={field}>
          {GOALS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="font-semibold">Preferred dates</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-from`} className="text-sm text-ink-soft">
              From
            </label>
            <input id={`${id}-from`} type="date" min={today} value={from} onChange={(e) => setFrom(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor={`${id}-to`} className="text-sm text-ink-soft">
              To
            </label>
            <input id={`${id}-to`} type="date" min={from || today} value={to} onChange={(e) => setTo(e.target.value)} className={field} />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Preferred time ranges</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-ink/15 bg-paper px-3.5 py-2 text-sm font-semibold has-[:checked]:border-green has-[:checked]:bg-mint"
            >
              <input type="checkbox" checked={times.includes(t)} onChange={() => toggleTime(t)} className="accent-[var(--color-green)]" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-remarks`} className="font-semibold">
          Remarks <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id={`${id}-remarks`}
          name="text"
          rows={3}
          maxLength={LIMITS.remarks}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          aria-describedby={`${id}-privacy`}
          className={`${field} resize-y`}
        />
      </div>

      <p id={`${id}-privacy`} className="rounded-2xl bg-butter-soft p-4 text-sm">
        <strong>Please don&apos;t include detailed medical history here.</strong> This form doesn&apos;t store anything on this website; it opens WhatsApp with
        your enquiry ready, and nothing is sent until you press send.
      </p>

      <button type="submit" data-track="contact_form_submit" data-track-location={location} className="btn btn-primary w-full sm:w-auto">
        <WhatsAppIcon className="h-5 w-5" />
        Send enquiry on WhatsApp
      </button>

      <p role="status" className="text-sm font-semibold text-green">
        {opened ? "WhatsApp should now be open with your enquiry. If it didn't open, please message " + contact.whatsappDisplay + " directly." : ""}
      </p>
    </form>
  )
}
