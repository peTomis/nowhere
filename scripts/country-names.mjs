// Country names of the home map in each language other than Italian (the world TopoJSON carries
// the Italian ones, `properties.n`): public/data/country-names/<lang>.json, ISO 3166-1 numeric →
// name, from Intl.DisplayNames. The numeric → alpha-2 table comes from the world-countries npm
// package (pinned). Features without an ISO code (e.g. Kosovo, Somaliland) keep their Italian name.
// Usage: yarn country-names (after adding a language to i18n/config.ts)
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const CODES = 'https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json'
// Languages besides Italian; keep in sync with LOCALES in i18n/config.ts.
const LANGS = ['en']

const topo = JSON.parse(await readFile(join(root, 'public/data/world-50m.json'), 'utf8'))
const ids = topo.objects.countries.geometries.map((g) => g.id).filter(Boolean)

const res = await fetch(CODES)
if (!res.ok) throw new Error(`${CODES}: HTTP ${res.status}`)
const alpha2 = new Map((await res.json()).map((c) => [c.ccn3, c.cca2]))

await mkdir(join(root, 'public/data/country-names'), { recursive: true })
for (const lang of LANGS) {
  const display = new Intl.DisplayNames([lang], { type: 'region', fallback: 'none' })
  const names = {}
  const missing = []
  for (const id of ids) {
    const code = alpha2.get(id)
    const name = code && display.of(code)
    if (name) names[id] = name
    else missing.push(id)
  }
  await writeFile(
    join(root, `public/data/country-names/${lang}.json`),
    `${JSON.stringify(names)}\n`,
  )
  console.log(
    `✓ ${lang}: ${Object.keys(names).length} names` +
      (missing.length ? ` (kept Italian for ${missing.join(', ')})` : ''),
  )
}
