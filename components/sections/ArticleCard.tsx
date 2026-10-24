import Link from "next/link"
import ArtIcon from "@/components/brand/ArtIcon"
import { readingMinutes, type Article } from "@/data/articles"

const backgrounds = ["bg-mint", "bg-butter-soft", "bg-coral-soft"]

export default function ArticleCard({ article, index = 0, size = "md" }: { article: Article; index?: number; size?: "md" | "lg" }) {
  const lg = size === "lg"
  return (
    <article className="group reveal relative flex h-full flex-col">
      <div className={`relative grid place-items-center overflow-hidden rounded-[1.75rem] ${backgrounds[index % 3]} ${lg ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        <ArtIcon name={article.art} tone={index + 1} className={`${lg ? "h-40 w-40 sm:h-52 sm:w-52" : "h-24 w-24"} transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105`} />
        <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-green">{article.category.name}</span>
      </div>
      <h3 className={`mt-5 ${lg ? "text-display-s" : "text-xl"}`}>
        <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-green">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-ink-soft">{article.description}</p>
      <p className="mt-3 text-sm font-semibold text-ink-soft">{readingMinutes(article)} min read</p>
    </article>
  )
}
