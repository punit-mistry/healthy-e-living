"use client"

import { useEffect, useRef, useState } from "react"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { formatInr } from "@/lib/format"
import { consultationFormat, contact, pricingPlans, serviceArea } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

interface Msg {
  from: "bot" | "me"
  text: string
  link?: { href: string; label: string }
  contact?: boolean
}

interface Intent {
  id: string
  chip?: string
  keys: string[]
  reply: Omit<Msg, "from">
}

const intents: Intent[] = [
  {
    id: "book",
    chip: "How do I book?",
    keys: ["book", "appointment", "slot", "schedule", "start", "join"],
    reply: {
      text: "Booking is easy: send a WhatsApp message with a line about what you'd like help with. You'll get available times and current fees before anything is confirmed.",
      link: { href: waUrl("booking"), label: "Book on WhatsApp" },
    },
  },
  {
    id: "fees",
    chip: "Fees & plans",
    keys: ["fee", "price", "cost", "charge", "plan", "package", "rupee", "₹", "how much", "pay"],
    reply: {
      text: `Programme fees: ${pricingPlans.map((p) => `${p.name} ${formatInr(p.price)}`).join(", ")}. Each includes your personalised plan and follow-ups.`,
      link: { href: "/pricing", label: "See pricing" },
    },
  },
  {
    id: "online",
    chip: "Online or in person?",
    keys: ["online", "video", "zoom", "abroad", "outside", "in person", "in-person", "offline", "clinic", "visit", "mumbai", "where", "location"],
    reply: {
      text: `${serviceArea.online} ${serviceArea.inPersonNote}`,
      link: { href: "/consultation", label: "Consultation details" },
    },
  },
  {
    id: "first",
    chip: "First session?",
    keys: ["first", "session", "duration", "long", "follow", "prepare", "ready", "report", "bring", "expect"],
    reply: {
      text: `The first consultation usually takes ${consultationFormat.initial}, follow-ups ${consultationFormat.followUp}. Keep recent blood reports, your medicines and supplements list, and a rough idea of a typical day's food handy.`,
    },
  },
  {
    id: "services",
    chip: "What do you help with?",
    keys: ["help", "service", "diabetes", "pcos", "thyroid", "weight", "fat", "gut", "ibs", "heart", "kidney", "pregnan", "child", "kid", "senior", "bone", "sport", "muscle", "allerg", "corporate", "cholesterol"],
    reply: {
      text: "Irika supports weight, PCOS, diabetes, thyroid, heart, kidney and gut health, pregnancy, children, seniors, sports nutrition and corporate wellness. Plans are built around Indian home food, and she works alongside your doctor, never replacing treatment.",
      link: { href: "/services", label: "Browse all services" },
    },
  },
  {
    id: "food",
    keys: ["veg", "vegan", "jain", "egg", "give up", "love", "diet", "food", "eat"],
    reply: {
      text: "No need to give up foods you love. Plans suit vegetarian, eggetarian, vegan, Jain or fasting days, and cover eating out, festivals and family meals.",
    },
  },
  {
    id: "results",
    keys: ["result", "how soon", "quick", "fast", "guarantee", "lose"],
    reply: {
      text: "It depends on your goals, health and starting point, so no timeline is promised. Many people notice energy and habit changes within a few weeks.",
    },
  },
  {
    id: "doctor",
    keys: ["doctor", "medicine", "medication", "medical", "treatment", "emergency"],
    reply: {
      text: "Nutrition care supports your medical treatment; it doesn't replace it. Medication is never stopped or changed, and for anything urgent please see your doctor.",
    },
  },
  {
    id: "contact",
    chip: "Contact Irika",
    keys: ["contact", "phone", "number", "email", "mail", "whatsapp", "reach", "talk", "speak", "irika", "call"],
    reply: { text: "Happy to connect! Reach Irika any of these ways:", contact: true },
  },
]

const greeting: Msg = {
  from: "bot",
  text: "Hi, I'm the Healthy E Living helper 🌿 Ask me about booking, fees or services, or pick a question below.",
}

function answer(input: string): Omit<Msg, "from"> {
  const q = input.toLowerCase()
  let best: Intent | null = null
  let score = 0
  for (const it of intents) {
    const s = it.keys.filter((k) => q.includes(k)).length
    if (s > score) {
      score = s
      best = it
    }
  }
  if (best) return best.reply
  return {
    text: "I'm a simple helper, so I might not have that one. Irika can answer it personally:",
    contact: true,
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([greeting])
  const [text, setText] = useState("")
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [msgs, typing, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const ask = async (q: string, useAi = true) => {
    const clean = q.trim()
    if (!clean || typing) return
    const history = [...msgs, { from: "me" as const, text: clean }]
    setMsgs(history)
    setText("")
    setTyping(true)
    let reply: Omit<Msg, "from"> | null = null
    if (useAi) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history
              .slice(1)
              .map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text })),
          }),
        })
        if (res.ok) {
          const data = (await res.json()) as { reply?: string }
          if (data.reply) reply = { text: data.reply, link: { href: waUrl("default"), label: "Talk to Irika on WhatsApp" } }
        }
      } catch {
        /* fall back below */
      }
    } else {
      await new Promise((r) => setTimeout(r, 500))
    }
    setMsgs((m) => [...m, { from: "bot", ...(reply ?? answer(clean)) }])
    setTyping(false)
  }

  const pill =
    "rounded-full border-2 border-ink bg-paper px-3 py-1.5 text-sm font-bold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-butter active:scale-95"

  return (
    <>
      {open && (
        <div
          role="dialog"
          data-lenis-prevent
          aria-label="Chat with Healthy E Living"
          className="no-print fixed inset-x-3 bottom-20 z-50 flex max-h-[min(34rem,calc(100dvh-7rem))] animate-[chat-in_.3s_ease-out] flex-col overflow-hidden rounded-[1.5rem] border-2 border-ink bg-cream shadow-[6px_6px_0_0_var(--color-green)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[22rem]"
        >
          <div className="flex items-center justify-between gap-3 bg-green px-4 py-3 text-cream">
            <div>
              <p className="font-display text-lg font-bold leading-tight">Ask Healthy E Living</p>
              <p className="text-xs text-cream/80">AI helper · not medical advice</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-9 w-9 place-items-center rounded-full text-xl transition hover:bg-cream/15"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="themed-scroll min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" data-lenis-prevent aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex animate-[chat-in_.25s_ease-out] ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "me" ? "rounded-br-sm bg-green text-cream" : "rounded-bl-sm bg-mint text-ink"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.link && (
                    <a
                      href={m.link.href}
                      target={m.link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-bold underline underline-offset-4"
                    >
                      {m.link.label} →
                    </a>
                  )}
                  {m.contact && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      <a href={waUrl("default")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold underline underline-offset-4">
                        <WhatsAppIcon className="h-4 w-4" /> WhatsApp {contact.whatsappDisplay}
                      </a>
                      <a href={`tel:${contact.phoneE164}`} className="font-bold underline underline-offset-4">
                        📞 Call {contact.phoneDisplay}
                      </a>
                      <a href={`mailto:${contact.email}`} className="break-all font-bold underline underline-offset-4">
                        ✉️ {contact.email}
                      </a>
                      <span className="text-xs text-ink-soft">{contact.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-label="Typing">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-mint px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-green" style={{ animationDelay: `${d * 120}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t-2 border-ink/10 px-4 py-3">
            {intents
              .filter((i) => i.chip)
              .map((i) => (
                <button key={i.id} type="button" onClick={() => ask(i.chip!, false)} className={pill}>
                  {i.chip}
                </button>
              ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(text)
            }}
            className="flex gap-2 border-t-2 border-ink/10 bg-paper p-3"
          >
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={200}
              className="min-w-0 flex-1 rounded-full border-2 border-ink/20 bg-cream px-4 py-2 text-sm outline-none focus:border-green"
            />
            <button type="submit" aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green text-cream transition hover:bg-green-deep active:scale-95">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="no-print fixed bottom-[5.25rem] right-4 z-50 grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-butter text-xl shadow-[3px_3px_0_0_var(--color-ink)] transition duration-200 hover:-translate-y-0.5 active:scale-95 sm:bottom-24 sm:right-6"
      >
        <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5A8.5 8.5 0 1 1 21 11.5z" />
          )}
        </svg>
      </button>
      <style>{`@keyframes chat-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </>
  )
}
