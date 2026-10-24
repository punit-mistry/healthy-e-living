/* eslint-disable @next/next/no-img-element -- next/og (Satori) renders plain <img>; next/image does not apply to generated images. */
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const C = {
  cream: "#FFF6E8",
  paper: "#FFFCF6",
  green: "#28583E",
  greenDeep: "#1D4230",
  coral: "#F16A55",
  butter: "#F3D66C",
  mint: "#DDE9D6",
  ink: "#252D27",
  inkSoft: "#4A544C",
}

async function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file))
}

async function portraitDataUri() {
  const buf = await readFile(join(process.cwd(), "assets/og-portrait.jpg"))
  return `data:image/jpeg;base64,${buf.toString("base64")}`
}

function svgUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

const RAYS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2 - Math.PI / 2
  const r2 = i % 2 === 0 ? 60 : 56.5
  return `<path d="M${(60 + Math.cos(a) * 51).toFixed(1)} ${(60 + Math.sin(a) * 51).toFixed(1)}L${(60 + Math.cos(a) * r2).toFixed(1)} ${(60 + Math.sin(a) * r2).toFixed(1)}" stroke="${C.green}" stroke-width="4" stroke-linecap="round"/>`
}).join("")

const PLATE = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 128 128">${RAYS}<path d="M60 13C87 12 108 33 107 60C106 87 85 108 58 107C31 106 12 85 13 58C14 33 34 14 64 14" fill="${C.paper}" stroke="${C.green}" stroke-width="4" stroke-linecap="round"/><path d="M60 30C77 30 90 43 90 60C90 78 76 90 59 90C42 89 30 76 30 59" fill="none" stroke="${C.green}" stroke-width="2.5" stroke-linecap="round" opacity="0.45"/><path d="M42 64C49 76 71 77 78 64" fill="none" stroke="${C.coral}" stroke-width="5" stroke-linecap="round"/><circle cx="88" cy="30" r="6" fill="${C.butter}"/></svg>`,
)

const UNDERLINE = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 20"><path d="M3 13C48 5 120 3 197 9" fill="none" stroke="${C.coral}" stroke-width="5" stroke-linecap="round"/><path d="M22 17C70 12 128 12 176 15" fill="none" stroke="${C.coral}" stroke-width="3.5" stroke-linecap="round"/></svg>`,
)

const BLOB = (fill: string) =>
  svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M33 4c15 1 27 12 27 28S48 61 31 60 3 48 4 31 18 3 33 4Z" fill="${fill}"/></svg>`)

interface OgInput {
  eyebrow: string
  title: string
  footer?: string
  withPortrait?: boolean
}

function titleSize(title: string) {
  if (title.length <= 34) return 76
  if (title.length <= 56) return 64
  if (title.length <= 80) return 54
  return 46
}

export async function renderOg({ eyebrow, title, footer = "with Irika Goyal · Clinical Dietitian", withPortrait = false }: OgInput): Promise<Response> {
  const [bold, extra, body, hand] = await Promise.all([
    font("bricolage-grotesque-latin-700-normal.woff"),
    font("bricolage-grotesque-latin-800-normal.woff"),
    font("dm-sans-latin-500-normal.woff"),
    font("caveat-latin-600-normal.woff"),
  ])
  const portrait = withPortrait ? await portraitDataUri() : null

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.cream, position: "relative", fontFamily: "DM Sans" }}>
        {/* Right-hand art */}
        {portrait ? (
          <div style={{ position: "absolute", right: 64, top: 60, display: "flex" }}>
            <div style={{ position: "absolute", right: -40, bottom: 20, width: 230, height: 230, borderRadius: 999, background: C.butter, display: "flex" }} />
            <div style={{ display: "flex", width: 380, height: 500, borderRadius: "190px 190px 36px 36px", overflow: "hidden", border: `5px solid ${C.ink}`, background: C.mint }}>
              <img src={portrait} width={380} height={500} style={{ objectFit: "cover" }} alt="" />
            </div>
            <img src={PLATE} width={130} height={130} style={{ position: "absolute", left: -60, top: -24 }} alt="" />
          </div>
        ) : (
          <div style={{ position: "absolute", right: 40, top: 95, display: "flex", width: 440, height: 440 }}>
            <img src={BLOB(C.mint)} width={440} height={440} style={{ position: "absolute", left: 0, top: 0 }} alt="" />
            <img src={PLATE} width={300} height={300} style={{ position: "absolute", left: 70, top: 70 }} alt="" />
          </div>
        )}

        {/* Left-hand copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 72px", width: portrait ? 700 : 700 }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Bricolage", fontWeight: 800, fontSize: 34, color: C.ink, letterSpacing: -1.5 }}>
            <span>healthy</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, margin: "0 8px", borderRadius: 999, background: C.butter, color: C.greenDeep, fontSize: 26 }}>e</span>
            <span>living</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.green }}>{eyebrow}</div>
            <div style={{ display: "flex", marginTop: 18, fontFamily: "Bricolage", fontWeight: 800, fontSize: titleSize(title), lineHeight: 1.02, letterSpacing: -2, color: C.ink }}>
              {title}
            </div>
            <img src={UNDERLINE} width={260} height={26} style={{ marginTop: 18 }} alt="" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 620 }}>
            <span style={{ fontFamily: "Caveat", fontSize: 38, color: "#B93C29" }}>{footer}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: bold, weight: 700, style: "normal" },
        { name: "Bricolage", data: extra, weight: 800, style: "normal" },
        { name: "DM Sans", data: body, weight: 500, style: "normal" },
        { name: "Caveat", data: hand, weight: 600, style: "normal" },
      ],
    },  )

  // Photo cards are re-encoded as JPEG: a photographic PNG is ~550 KB, and
  // WhatsApp often drops link previews above ~300 KB. Falls back to PNG.
  if (!withPortrait) return png
  try {
    const { default: sharp } = await import("sharp")
    const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
    return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } })
  } catch {
    return png
  }
}
