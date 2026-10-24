import { getServiceBySlug, serviceCategories, services } from "@/data/services"
import { ogContentType, ogSize, renderOg } from "@/lib/og"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  return [
    {
      id: "card",
      size: ogSize,
      contentType: ogContentType,
      alt: `${service?.name ?? "Nutrition services"} with clinical dietitian Irika Goyal — Healthy E Living`,
    },
  ]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  const category = serviceCategories.find((c) => c.id === service?.category)
  return renderOg({
    eyebrow: category?.title ?? "Nutrition services",
    title: service?.h1 ?? "Nutrition support for every chapter",
  })
}
