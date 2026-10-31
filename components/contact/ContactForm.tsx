"use client"

import { useId, useState } from "react"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { contact } from "@/lib/site"
import { waUrlWithText } from "@/lib/whatsapp"

const TOPICS = [
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
  "Corporate wellness",
  "Something else",
]

const FORMATS = ["Online", "In person at a mutually convenient place", "Either works for me"]

const LIMITS = { name: 60, message: 400 }

/**
 * Composes a WhatsApp message — nothing is sent to or stored on this website.
 * Without JavaScript the form still works: it submits the message text
 * straight to WhatsApp's own send page.
 */
export default function ContactForm({ location = "contact_page" }: { location?: string }) {
  const id = useId()
  const [name, setName] = useState("")
  const [topic, setTopic] = useState(TOPICS[0])
  const [format, setFormat] = useState(FORMATS[0])
  const [message, setMessage] = useState("")
  const [opened, setOpened] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = [
      `Hi Irika! I'm ${name.trim().slice(0, LIMITS.name)}.`,
      `I'd like help with: ${topic}.`,
      `I'd prefer: ${format}.`,
      message.trim() ? `\n${message.trim().slice(0, LIMITS.message)}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    const url = waUrlWithText(text)
    const win = window.open(url, "_blank")
    if (win) win.opener = null
    else window.location.href = url
    setOpened(true)
  }

  const field = "mt-2 block w-full rounded-2xl border-2 border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-green focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-deep"

  return (
    <form action="https://api.whatsapp.com/send" method="get" target="_blank" onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="phone" value={contact.whatsappNumber} />

      <div>
        <label htmlFor={`${id}-name`} className="font-semibold">
          Your first name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          required
          autoComplete="given-name"
          maxLength={LIMITS.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-topic`} className="font-semibold">
            What would you like help with?
          </label>
          <select id={`${id}-topic`} name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="font-semibold">Online or at a mutually convenient place?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <label
                key={f}
                className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-ink/15 bg-paper px-3.5 py-2 text-sm font-semibold has-[:checked]:border-green has-[:checked]:bg-mint"
              >
                <input type="radio" name="format" value={f} checked={format === f} onChange={() => setFormat(f)} className="accent-[var(--color-green)]" />
                {f}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="font-semibold">
          Anything you&apos;d like to add? <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="text"
          rows={4}
          maxLength={LIMITS.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-describedby={`${id}-privacy`}
          placeholder="For example: I'd like help planning meals around long work days."
          className={`${field} resize-y`}
        />
        <p className="mt-1 text-right text-xs text-ink-soft" aria-live="polite">
          {message.length}/{LIMITS.message}
        </p>
      </div>

      <p id={`${id}-privacy`} className="rounded-2xl bg-butter-soft p-4 text-sm">
        <strong>Please don&apos;t include detailed medical history here</strong> — we&apos;ll go through that together in your consultation. This form
        doesn&apos;t store anything on this website; it opens WhatsApp with your message ready, and nothing is sent until you press send.
      </p>

      <button type="submit" data-track="contact_form_submit" data-track-location={location} className="btn btn-primary w-full sm:w-auto">
        <WhatsAppIcon className="h-5 w-5" />
        Continue in WhatsApp
      </button>

      <p role="status" className="text-sm font-semibold text-green">
        {opened ? "WhatsApp should now be open with your message. If it didn't open, please message " + contact.whatsappDisplay + " directly." : ""}
      </p>
    </form>
  )
}
