import type { Metadata } from "next"
import Link from "next/link"
import PageHero from "@/components/sections/PageHero"
import References from "@/components/sections/References"
import JsonLd from "@/components/ui-kit/JsonLd"
import PrintButton from "@/components/ui-kit/PrintButton"
import { refs } from "@/data/references"
import { getResource, isResourceIndexable } from "@/data/resources"
import { formatDate } from "@/lib/format"
import { pageMetadata, webPageJson } from "@/lib/seo"
import { person } from "@/lib/site"

const resource = getResource("indian-balanced-plate")!
const path = `/resources/${resource.slug}`

export const metadata: Metadata = pageMetadata({
  title: "Indian Balanced Plate Guide (Printable)",
  description: "How to build a balanced Indian meal — half vegetables, a quarter protein, a quarter grains — with simple portion cues and everyday swaps.",
  path,
  noindex: !isResourceIndexable(resource),
})

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "Indian balanced plate", path },
]

const cues = [
  { part: "Vegetables", cue: "About two cupped handfuls", examples: "Seasonal sabzi, salad or kachumber, vegetable raita, soup", tone: "bg-mint" },
  { part: "Protein", cue: "A palm-sized portion, or a katori of dal", examples: "Dal, chana, rajma, sprouts, paneer, tofu, curd, eggs, fish, chicken", tone: "bg-coral-soft" },
  { part: "Grains", cue: "About a fist — 1–2 phulkas or a small katori of rice", examples: "Phulka, hand-pounded or brown rice, jowar, bajra or ragi rotis, poha, dalia", tone: "bg-butter-soft" },
  { part: "Fats", cue: "About a thumb — roughly a teaspoon per dish", examples: "Cooking oil, ghee, nuts, seeds, coconut", tone: "bg-paper" },
]

const swaps = [
  ["Only white rice", "Mix in hand-pounded or brown rice, or millets, a few times a week"],
  ["Maida rotis or bread", "Whole-wheat, jowar, bajra or ragi rotis"],
  ["Plain poha or upma", "Add peas, vegetables, peanuts and a side of sprouts or curd"],
  ["Namkeen with tea", "Roasted chana, makhana or a handful of peanuts"],
  ["Packaged juice", "A whole fruit and a glass of water"],
]

function PlateDiagram() {
  return (
    <figure className="mx-auto max-w-md">
      <svg viewBox="0 0 400 340" role="img" aria-labelledby="plate-title plate-desc" className="h-auto w-full">
        <title id="plate-title">The balanced plate</title>
        <desc id="plate-desc">A plate divided into half vegetables, a quarter protein and a quarter grains, with a bowl of curd and a glass of water on the side.</desc>
        <circle cx="170" cy="170" r="150" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="4" />
        <path d="M170 34a136 136 0 0 0 0 272Z" fill="var(--color-mint)" />
        <path d="M170 34a136 136 0 0 1 136 136H170Z" fill="var(--color-coral-soft)" />
        <path d="M170 170h136a136 136 0 0 1-136 136Z" fill="var(--color-butter-soft)" />
        <path d="M170 34v272M170 170h136" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        <text x="96" y="176" textAnchor="middle" className="font-display" fontSize="22" fontWeight="700" fill="var(--color-ink)">Vegetables</text>
        <text x="96" y="200" textAnchor="middle" fontSize="15" fill="var(--color-ink-soft)">half</text>
        <text x="236" y="112" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--color-ink)">Protein</text>
        <text x="236" y="134" textAnchor="middle" fontSize="15" fill="var(--color-ink-soft)">a quarter</text>
        <text x="236" y="228" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--color-ink)">Grains</text>
        <text x="236" y="250" textAnchor="middle" fontSize="15" fill="var(--color-ink-soft)">a quarter</text>
        <ellipse cx="350" cy="62" rx="38" ry="16" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M312 62c2 22 18 34 38 34s36-12 38-34" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
        <text x="350" y="122" textAnchor="middle" fontSize="14" fill="var(--color-ink)">curd</text>
        <path d="M334 236h32l-5 70h-22Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M337 262h26" stroke="var(--color-green)" strokeWidth="3" />
        <text x="350" y="328" textAnchor="middle" fontSize="14" fill="var(--color-ink)">water</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-soft">A simple shape to aim for at lunch and dinner.</figcaption>
    </figure>
  )
}

export default function BalancedPlatePage() {
  const reviewed = resource.review !== null
  return (
    <>
      <JsonLd data={webPageJson({ path, name: resource.title, description: resource.description, crumbs, type: "MedicalWebPage" })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Printable guide"
        tone="butter"
        title={resource.title}
        lede="No apps, no weighing scales. Just a plate shape to aim for, built around food you already cook."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrintButton label="Print the guide" />
          <span className="text-sm text-ink-soft">Last updated {formatDate(resource.updated)}</span>
        </div>
      </PageHero>

      <section aria-labelledby="plate-heading" className="wrap py-14">
        {!reviewed && (
          <p className="mb-10 rounded-2xl border-2 border-dashed border-coral-deep/60 bg-paper px-5 py-4 text-[0.95rem]">
            <strong>Awaiting clinical review.</strong> This guide is being reviewed by {person.displayName} and is shared as general information in the
            meantime.
          </p>
        )}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <PlateDiagram />
          <div>
            <h2 id="plate-heading" className="text-display-m">
              The shape of a balanced meal
            </h2>
            <p className="mt-4 text-lg">
              Fill <strong>half</strong> your plate with vegetables, <strong>a quarter</strong> with protein and <strong>a quarter</strong> with
              grains — plus a little fat for cooking and flavour. It&apos;s a practical way to follow the spirit of the ICMR–NIN Dietary
              Guidelines for Indians: more vegetables and pulses, whole grains over refined ones, and less salt, sugar and fried food.
            </p>
            <p className="mt-4 text-ink-soft">
              This is a general guide for healthy adults. Children, pregnant women, athletes and people with conditions such as diabetes or kidney
              disease often need something different — that&apos;s what a personal plan is for.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="cues-heading" className="bg-paper py-14">
        <div className="wrap">
          <h2 id="cues-heading" className="text-display-m">
            Portion cues, using your hand
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cues.map((c) => (
              <li key={c.part} className={`break-inside-avoid rounded-[1.75rem] border-2 border-ink/10 p-6 ${c.tone}`}>
                <h3 className="text-xl">{c.part}</h3>
                <p className="mt-2 font-semibold">{c.cue}</p>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{c.examples}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-soft">Hands are a rough guide that scales with your size. Your own needs may be higher or lower.</p>
        </div>
      </section>

      <section aria-labelledby="swaps-heading" className="wrap py-14">
        <h2 id="swaps-heading" className="text-display-m">
          Easy everyday swaps
        </h2>
        <div className="prose-article mt-8 max-w-3xl">
          <table>
            <caption>Small changes that add up.</caption>
            <thead>
              <tr>
                <th scope="col">Instead of always…</th>
                <th scope="col">Try, some of the time…</th>
              </tr>
            </thead>
            <tbody>
              {swaps.map(([a, b]) => (
                <tr key={a}>
                  <th scope="row" className="bg-transparent! font-semibold">
                    {a}
                  </th>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 max-w-3xl">
          <References items={[refs.ninGuidelines, refs.whoHealthyDiet, refs.nhsBalancedDiet]} />
        </div>
        <p className="mt-8 max-w-3xl text-sm text-ink-soft">
          General information only, not personal medical advice. Want a plan for your own needs?{" "}
          <Link href="/consultation" className="font-semibold underline underline-offset-4">
            See how consultations work
          </Link>
          .
        </p>
      </section>
    </>
  )
}
