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
  page.tsx             home: full-screen world map + footer
  guide/[slug]/page.tsx  a guide: cover, album opening, text or album, footer (prerendered)
  template/page.tsx    /template: every guide element with placeholder text (not indexed)
  account/page.tsx     "I tuoi dati": account, sync, completion per guide
  api/                 me, auth, photos (+ [id], [id]/commit), notes
components/
  Logo.tsx, PlateText.tsx, PrintPlates.tsx, SiteHeader.tsx, SiteFooter.tsx
  WorldMap.tsx, CountryCard.tsx, AccountMenu.tsx, Completion.tsx
  guide/               Guide (the whole page), GuideCover, GuideAlbumIntro, GuideShell (sticky bar,
                       sidebar, index menu), content.tsx (the kit: Chapter, Part, Timeline, Event,
                       Region, City, Card, Today, Figure…), Album, Trace, CardTraces, PhotoPanel,
                       Pins ("In evidenza"), Toast, GuideOutro
content/
  countries.ts         guide registry (one entry per country)
  guides.ts            guide content by slug
  types.ts, build.ts   content types; places, index, traces and cards for the page
  subjects.ts          what a reader's photo is about; the three built-in traces
  <cc>/structure.ts    ids, regions, sections, traces, cards (no text)
  <cc>/it/             names.ts (short texts) and guide.tsx (the body)
  xx/                  the template guide (/template)
lib/
  content/             validate.ts (content checks), cards.ts (pinned copies)
  reader/              prefs.ts (trip filter, pins), collection.ts, photos.ts, schema.ts
  server/              mongodb, http (requireUser, route), bucket (S3/R2), collection
i18n/                  UI strings: it.json + index.ts (t, format, locale)
styles/                theme.css (tokens), broadsheet.css (components), guide.css
public/guides/<slug>/  guide images (cover, coat of arms, flag, maps, photos)
```

Components are Server Components by default; client components are listed in `AGENTS.md`.
Phosphor icons in Server Components are imported from `@phosphor-icons/react/ssr`.

## The album

Every guide has an album: one box per trace, filled by the reader's own photos (signed in, stored
in a private S3-compatible bucket, see `docs/data-model.md`). **The first three boxes of every
country are always the cover (01), the flag (02) and the coat of arms (03)**: the kit adds them,
with the guide's cover and emblems as stock images. A guide's own traces start at 04. Each trace
is worth 1–3 points; the completion bar and the levels (25, 50, 80%) come from them.

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

1. Register the country in `content/countries.ts` (`id` = ISO 3166-1 alpha-2, `numeric` = the
   numeric code, e.g. Romania = `642`). Guides with `status: 'ready'` are shown on the home map.
2. Copy `content/xx/` (every element of the kit, shown at `/template`) to `content/<cc>/`,
   register the content in `content/guides.ts` and the structure in `content/structures.ts`.
   - `structure.ts`: region/city enum, sections (index, anchors, periods), traces and cards;
   - `it/names.ts`: place and section names, trace texts, card names;
   - `it/guide.tsx`: cover, emblems and the body, built from the kit. Every block has a required
     `on`: the places for which it is shown, or `"always"`.
   - Don't declare the cover, coat of arms and flag traces: the album gets them by itself, using
     the guide's `cover` and `emblems`.
3. Put images in `public/guides/<slug>/` with English file names (`cover.jpg`, `coat-of-arms.png`,
   `flag.svg`, `map.png`…). Missing files show a neutral placeholder.
4. `yarn validate` checks the content; the page `/guide/<slug>` is generated at build time.
