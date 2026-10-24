import type { ArtKey } from "./services"

export interface Resource {
  slug: string
  title: string
  description: string
  art: ArtKey
  /** Health guidance needs Dt. Irika Goyal's review before it is indexed. */
  clinical: boolean
  review: { on: string } | null
  updated: string
}

export const resources: Resource[] = [
  {
    slug: "first-consultation-checklist",
    title: "Your first nutrition consultation: a printable checklist",
    description: "What to gather, what to think about and what to expect — so you get the most from your first session.",
    art: "shield",
    clinical: false,
    review: null,
    updated: "2026-10-24",
  },
  {
    slug: "indian-balanced-plate",
    title: "The Indian balanced plate: a practical guide",
    description: "A simple, printable way to build balanced Indian meals — with portion cues and easy swaps.",
    art: "plate",
    clinical: true,
    review: null,
    updated: "2026-10-24",
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function isResourceIndexable(r: Resource): boolean {
  return !r.clinical || r.review !== null
}
