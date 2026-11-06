# nowhere

A personal site with travel guides to places I've been and places I'm about to go.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · d3 + topojson · Phosphor Icons

## Development

```bash
yarn
yarn dev               # http://localhost:3000
yarn build             # production build (prerenders every guide)
yarn start             # serve the production build
yarn typecheck         # next typegen + tsc
yarn lint              # oxlint
yarn format            # prettier (with Tailwind class sorting)
yarn format:check
```

## Structure

```
app/
  layout.tsx           root layout: Source Serif 4 via next/font, print-plate filters
  globals.css          entry: tailwind + theme + components
  page.tsx             home: full-screen world map + footer (no site header)
  guide/[slug]/page.tsx  a guide: cover, reading layout, footer (prerendered per guide)
  template/page.tsx    /template: every guide element with placeholder text (not indexed)
  not-found.tsx        404 (with the logo header)
  icon.svg             favicon
components/
  Logo.tsx             Nowhere logo in process colors (variant: horizontal | vertical |
                       symbol | wordmark)
  PlateText.tsx        text printed as misregistered C/M/Y plates
  PrintPlates.tsx      client component that mounts lib/printPlates once
  SiteHeader.tsx       logo header (404)
  SiteFooter.tsx       site footer (home and guides): wordmark, tagline, credit to petomis
  WorldMap.tsx         home map: d3 projection/zoom + search, tooltip, pin card, legend
  guide/               guide kit: Guide (the whole page), GuideCover, GuideShell (sidebar, index, mobile menu),
                       TripFilter + trip.tsx (trip filter), content.tsx (D, N, Chapter,
                       Part, Timeline/Event, Detail, Callout, Region, City, Figure…),
                       GuideOutro (closing recap: name, chapters, "Torna su")
content/guides/        guide content, one file per country (romania.tsx) + template.tsx + index.ts
i18n/                  UI strings: it.json (Italian, the only locale) + index.ts (t, format, locale)
lib/printPlates.ts     SVG separation filters + the "press driver" (hover / pointer lean)
lib/guide.ts           guide content types (places, index entries, cover, emblems)
data/guides.ts         guide registry (one entry per country)
styles/
  theme.css            Broadsheet design-system tokens → Tailwind theme
  broadsheet.css       base styles and component classes (.btn, .card, .tag, .cmyk…)
  guide.css            guide treatments: date highlighter, timeline rail
public/data/world-50m.json  world TopoJSON (Natural Earth 50m via world-atlas, Italian names)
public/guides/<slug>/  guide images (cover, coat of arms, flag, maps, photos)
```

Components are Server Components by default. Client Components: `PrintPlates`, `WorldMap` and the
interactive parts of the guide kit (`GuideShell`, `TripFilter`, `Toc`, `trip.tsx`).
Phosphor icons in Server Components are imported from `@phosphor-icons/react/ssr`.

## Design system

The design comes from claude.ai/design — project **Nowhere**, design system **Broadsheet**
([reference: `NowhereLogo.dc.html`](https://claude.ai/design/p/71e00691-2bb5-4596-89b0-0be5888e925e?file=NowhereLogo.dc.html)).
Light paper ground, Source Serif 4 everywhere, cyan (`accent`) and magenta (`accent-2`) as spot
colors, process yellow reserved for print treatments only.

| Design source                              | Local port                                          |
| ------------------------------------------ | --------------------------------------------------- |
| `_ds/broadsheet-…/styles.css` (tokens)     | `styles/theme.css`                                  |
| `_ds/broadsheet-…/styles.css` (components) | `styles/broadsheet.css`                             |
| `print-plates.js` (inside `_ds_bundle.js`) | `lib/printPlates.ts`                                |
| `NowhereLogo.dc.html`                      | `components/Logo.tsx` (Italian variant names → EN)  |
| `Nowhere - Home.dc.html`                   | `app/page.tsx` + `components/WorldMap.tsx`          |
| `assets/mondo-50m.json`                    | `public/data/world-50m.json`                        |
| `Guida Romania - Sito.dc.html`             | `components/guide/*` + `content/guides/romania.tsx` |

Rules of thumb:

- Tailwind's default palette is disabled: only tokens exist (`bg-bg`, `text-text`, `bg-accent`,
  `text-accent-700`, `bg-neutral-300`, …).
- `--spacing` is 5px, so `p-1`=5px, `p-2`=10px, `p-4`=20px, `p-8`=40px (the system's 1.25× density).
- No borders or boxes to structure the page: hierarchy comes from the type scale and white space.
  Use `.card` only for discrete items.
- `process-yellow` is a print-treatment ink (`.cmyk`, `.cmyk-head`, `.cmyk-num`, logo plates, and
  the date highlighter in guide text) —
  never for UI chrome or body copy.
- Icons: Phosphor, `duotone` weight.

## Adding a guide

1. Add an entry to `data/guides.ts` (`countryId` = ISO 3166-1 numeric code, e.g. Romania = `642`).
   Guides with `status: 'ready'` are highlighted on the home map.
2. Copy `content/guides/template.tsx` (every element of the kit, shown at `/template`) to
   `content/guides/<slug>.tsx`, then register the content in `content/guides/index.ts`. All the
   guide's texts live in that file (titles and place names used in more than one spot are local
   constants). A guide has:
   - a string `enum` of the guide's regions and cities, used as `GuideContent<MyEnum>` and for
     `const { Chapter, Text, … } = guideKit<MyEnum>()`, so a wrong id is a type error;
   - `places`: regions and cities for the trip filter (shown as "Il tuo viaggio");
   - `toc`: the index; each `id` is the anchor of a `Chapter`, `Part`, titled `Timeline` or `Region`,
     and `on` lists the same places as that section;
   - `body`: the text, built from the kit. Every block has a required `on`: an array of the places
     for which it is shown (at least one must be in the trip), or `"always"` to show it whatever
     the reader selected. Blocks nest, so give a
     chapter the widest list (its parts go inside it) and its texts the same list or a part of it:
     `<Chapter on={[Dobrogea, Transilvania]}>` → `<Text on={[Dobrogea]}>`.
3. Put images in `public/guides/<slug>/` with English file names (`cover.jpg`, `coat-of-arms.png`,
   `flag.svg`, `map.png`…); their alt texts go next to them in the content file. Missing files
   show a neutral placeholder, so the page can be written before the photos exist.

The page `/guide/<slug>` is generated at build time.
