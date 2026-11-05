// Renders the home-screen icons (iOS apple-icon, web manifest icons) from app/icon.svg:
// the dot symbol on the paper background, opaque, with margin for rounded/maskable crops.
// Run with `node scripts/app-icons.mjs` after changing app/icon.svg.
import { readFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const BG = '#f3f2f2' // --color-bg (styles/theme.css)

const src = await readFile(new URL('app/icon.svg', root), 'utf8')
const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
// The 48-unit symbol box takes 80% of the icon: the dots stay inside the maskable safe zone.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 60 60">
  <rect x="-6" y="-6" width="60" height="60" fill="${BG}"/>
  <g style="isolation:isolate">${inner}</g>
</svg>`

const out = [
  ['app/apple-icon.png', 180],
  ['public/icons/icon-192.png', 192],
  ['public/icons/icon-512.png', 512],
]
await mkdir(new URL('public/icons/', root), { recursive: true })
for (const [file, size] of out) {
  await sharp(Buffer.from(svg), { density: (72 * size) / 60 })
    .resize(size, size)
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toFile(new URL(file, root).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
  console.log(file, size)
}
