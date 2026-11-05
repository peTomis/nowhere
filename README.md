# nowhere

A personal site with travel guides to places I've been and places I'm about to go.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · d3 + topojson · Phosphor Icons

## Development

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production build (prerenders every guide)
npm run start         # serve the production build
npm run typecheck     # next typegen + tsc
npm run lint          # oxlint
npm run format        # prettier (with Tailwind class sorting)
npm run format:check
```

## Structure

```
app/
  layout.tsx           root layout: Source Serif 4 via next/font, print-plate filters
  globals.css          entry: tailwind + theme + components
  page.tsx             home: full-screen world map + footer (no site header)
  (site)/layout.tsx    header + content shell for every other page
  (site)/guide/[slug]/page.tsx  single guide (statically generated from data/guides.ts)
  not-found.tsx        404
  icon.svg             favicon
components/
  Logo.tsx             Nowhere logo (variant: horizontal | vertical | symbol | wordmark,
                       tone: process | ink)
  PlateText.tsx        text printed as misregistered C/M/Y plates
  PrintPlates.tsx      client component that mounts lib/printPlates once
  SiteHeader.tsx       logo header for guide pages
  SiteFooter.tsx       home footer: wordmark, tagline, credit to petomis
  WorldMap.tsx         home map: d3 projection/zoom + search, tooltip, pin card, legend
lib/printPlates.ts     SVG separation filters + the "press driver" (hover / pointer lean)
data/guides.ts         guide registry (one entry per country)
styles/
  theme.css            Broadsheet design-system tokens → Tailwind theme
  broadsheet.css       base styles and component classes (.btn, .card, .tag, .cmyk…)
public/data/world-50m.json  world TopoJSON (Natural Earth 50m via world-atlas, Italian names)
```

Components are Server Components by default; only `PrintPlates` and `WorldMap` are Client Components.
Phosphor icons in Server Components are imported from `@phosphor-icons/react/ssr`.

## Design system

The design comes from claude.ai/design — project **Nowhere**, design system **Broadsheet**
([reference: `NowhereLogo.dc.html`](https://claude.ai/design/p/71e00691-2bb5-4596-89b0-0be5888e925e?file=NowhereLogo.dc.html)).
Light paper ground, Source Serif 4 everywhere, cyan (`accent`) and magenta (`accent-2`) as spot
colors, process yellow reserved for print treatments only.

| Design source                              | Local port                                         |
| ------------------------------------------ | -------------------------------------------------- |
| `_ds/broadsheet-…/styles.css` (tokens)     | `styles/theme.css`                                 |
| `_ds/broadsheet-…/styles.css` (components) | `styles/broadsheet.css`                            |
| `print-plates.js` (inside `_ds_bundle.js`) | `lib/printPlates.ts`                               |
| `NowhereLogo.dc.html`                      | `components/Logo.tsx` (Italian variant names → EN) |
| `Nowhere - Home.dc.html`                   | `app/page.tsx` + `components/WorldMap.tsx`         |
| `assets/mondo-50m.json`                    | `public/data/world-50m.json`                       |

Rules of thumb:

- Tailwind's default palette is disabled: only tokens exist (`bg-bg`, `text-text`, `bg-accent`,
  `text-accent-700`, `bg-neutral-300`, …).
- `--spacing` is 5px, so `p-1`=5px, `p-2`=10px, `p-4`=20px, `p-8`=40px (the system's 1.25× density).
- No borders or boxes to structure the page: hierarchy comes from the type scale and white space.
  Use `.card` only for discrete items.
- `process-yellow` is a print-treatment ink (`.cmyk`, `.cmyk-head`, `.cmyk-num`, logo plates) —
  never for UI chrome or body copy.
- Icons: Phosphor, `duotone` weight.

## Adding a guide

1. Add an entry to `data/guides.ts` (`countryId` = ISO 3166-1 numeric code, e.g. Romania = `642`).
   The page `/guide/<slug>` is generated at build time. Guides with `status: 'ready'` are
   highlighted on the home map.
2. Guide content will live alongside `app/guide/[slug]/page.tsx` (format to be defined, likely MDX).
