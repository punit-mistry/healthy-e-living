const PHONE = "919833640891"

const messages: Record<string, string> = {
  default: "Hi! I'd like to know more about your nutrition consultation services.",
  booking: "Hi! I'd like to book a consultation with Dt. Irika Goyal. Can you please share the available slots and pricing?",
  discuss: "Hi! I'd like to discuss my health needs with Dt. Irika Goyal. Can you help me with more details?",
  schedule: "Hi! I'd like to schedule a consultation. Could you share the available timings?",
  weightLoss: "Hi! I'm interested in your weight loss diet plan. Can you share more details?",
  pcos: "Hi! I'm interested in your PCOS diet plan. Can you share more details?",
  diabetes: "Hi! I'm interested in your diabetes diet plan. Can you share more details?",
  gutHealth: "Hi! I'm interested in your gut health diet plan. Can you share more details?",
}

export function waUrl(key: keyof typeof messages = "default"): string {
  const text = encodeURIComponent(messages[key] || messages.default)
  return `https://wa.me/${PHONE}?text=${text}`
}
