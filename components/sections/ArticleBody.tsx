import type { Block } from "@/data/articles"
import RichText from "@/components/ui-kit/RichText"

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-article">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            )
          case "p":
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            )
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            )
          case "note":
            return (
              <aside key={i} className="rounded-2xl border-l-[6px] border-coral bg-coral-soft/50 p-5 text-[1rem]">
                <p className="font-display font-bold">{b.title}</p>
                <p className="mt-1">{b.text}</p>
              </aside>
            )
          case "table":
            return (
              <div key={i} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label={b.caption}>
                <table>
                  <caption>{b.caption}</caption>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, ci) =>
                          ci === 0 ? (
                            <th key={ci} scope="row" className="bg-transparent! font-semibold">
                              {cell}
                            </th>
                          ) : (
                            <td key={ci}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}
