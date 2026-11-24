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
yarn validate          # content checks, every guide in every language
yarn assets pull       # guide images from the asset bucket into public/guides/
```

`yarn dev` without `ASSETS_URL` reads the guide images from `public/guides/` (not in git): run
`yarn assets pull` once (it needs `ASSETS_URL`) or the pages show placeholders.

## Structure

```
app/
  [lang]/              every page, under /it, /en (the language is the root param)
    layout.tsx         root layout: html lang, Source Serif 4, print-plate filters, LangProvider
    page.tsx           home: full-screen world map + footer
    guide/[slug]/page.tsx  a guide: cover, album opening, text or album, footer (prerendered)
    template/page.tsx  /<lang>/template: every guide element with placeholder text (not indexed)
    account/page.tsx   "I tuoi dati": account, sync, completion per guide, offline guides
    not-found.tsx      404 in the page's language
  global-not-found.tsx 404 of URLs outside [lang], in Italian
  api/                 me, auth, photos (+ [id], [id]/commit), notes, offline (manifest)
components/
  Logo.tsx, PlateText.tsx, PrintPlates.tsx, SiteHeader.tsx, SiteFooter.tsx
  WorldMap.tsx, CountryCard.tsx, AccountMenu.tsx, Completion.tsx, OfflineGuides.tsx
  guide/               Guide (the whole page), GuideCover, GuideAlbumIntro, GuideShell (sticky bar,
                       sidebar, index menu), content.tsx (the kit: Chapter, Part, Timeline, Event,
                       Region, City, Card, Today, Figure…), Album, Trace, CardTraces, PhotoPanel,
                       Pins ("In evidenza"), Toast, GuideOutro
content/
  countries.ts         guide registry (one entry per country, nothing per language)
  guides.ts            guide content by slug and language
  assets.json          the guide images in the asset bucket, with hash and size (generated)
  types.ts, build.ts   content types; places, index, traces and cards for the page
  subjects.ts          what a reader's photo is about; the three built-in traces
  <cc>/structure.ts    ids, regions, sections, traces, cards, cover and emblems (no text)
  <cc>/it/             names.ts (short texts) and guide.tsx (the body); en/ once translated
  xx/                  the template guide (/template)
lib/
  assets.ts            asset(): URL of a guide image (asset CDN or public/), or none
  offline.ts           offline guides: download into Cache Storage, remove
  content/             validate.ts (content checks), cards.ts (pinned copies)
  reader/              prefs.ts (trip filter, pins), collection.ts, photos.ts, schema.ts
  server/              mongodb, http (requireUser, route), bucket (S3/R2), collection, offline
i18n/                  languages (config.ts), UI strings per language (it.json, en.json),
                       server.ts (getLang, getT), client.tsx (useLang, useT), dates.ts
styles/                theme.css (tokens), broadsheet.css (components), guide.css
public/guides/<slug>/  local copy of the guide images (gitignored; yarn assets pull/push)
public/data/           world map, country names per language (country-names/<lang>.json)
public/offline-sw.js   service worker of the offline guides
```

Components are Server Components by default; client components are listed in `AGENTS.md`.
Phosphor icons in Server Components are imported from `@phosphor-icons/react/ssr`.

## Languages

Every page is under its language: `/it`, `/it/guide/romania`, `/en/…`. The old URLs without one
(`/`, `/guide/romania`, `/account`) redirect to Italian. The UI is translated
(`i18n/<lang>.json`); a guide is shown in a language only once it is written in it, so today
`/en` has the map and the UI in English but no guide yet.

- **Structure once, text per language** (docs/data-model.md §5): `content/<cc>/structure.ts`
  holds everything that is the same in every language (ids, places, periods as numbers, traces,
  cards, images and their credits), `content/<cc>/<lang>/` the texts (`names.ts`) and the body
  (`guide.tsx`). The reader's photos, notes and trip filter are keyed by ids, so they are the same
  in every language.
- **Translating a guide**: copy `content/<cc>/it/` to `content/<cc>/en/`, set `lang: 'en'`,
  translate names and body (a translation may restructure its prose; it cannot add places, ids or
  images), register it in `content/guides.ts` (`romania: { it: romania, en: romaniaEn }`), run
  `yarn validate` (event dates are read per language: "c. 1310", "14th c.", "1st c. BC").
  The text is free, the skeleton is not: `lib/content/parity.ts` checks that every section and
  card keeps the Italian landmarks (sections, cards, `Today`, emblems, images) in the same order
  and the same `on` lists, so no place loses text in one language.
- **Adding a language**: `i18n/config.ts`, `i18n/<lang>.json`, a formatter in `i18n/dates.ts`,
  a date parser in `lib/content/validate.ts`, the language in `scripts/country-names.mjs` and
  `yarn country-names`.

## Guide images

Covers, emblems, stock images of the traces and figures are content: they live in a **public
asset bucket** behind a CDN (an R2 bucket with a custom domain), separate from the private bucket
of the readers' photos, and not in git. Content names them by path (`/guides/romania/cover.jpg`).

- `content/assets.json` (committed) lists what the bucket holds, with each file's hash and size:
  builds need no network, an image exists when it is listed, and its URL carries the hash
  (`https://assets…/guides/romania/cover.jpg?v=25540717e126`), so the CDN caches it forever
  (`Cache-Control: immutable`) and a replaced file gets a new URL.
- Adding or replacing an image: put it in `public/guides/<slug>/`, check it with `yarn dev`
  (without `ASSETS_URL` the local files are used), then `yarn assets push` (uploads new and
  changed files, rewrites the manifest) and commit `content/assets.json`. Files are never deleted
  from the bucket by the script: it lists the ones no longer used.
- Configuration (`.env.template`): `ASSETS_URL` is the only variable Vercel needs; `ASSETS_BUCKET`
  and a token with write access are for `yarn assets push` on your machine. The bucket needs CORS
  `GET` from the site's origins (the offline download fetches the images).

## The album

Every guide has an album: one box per trace, filled by the reader's own photos (signed in, stored
in a private S3-compatible bucket, see `docs/data-model.md`). **The first three boxes of every
country are always the cover (01), the flag (02) and the coat of arms (03)**: the kit adds them,
with the guide's cover and emblems as stock images. A guide's own traces start at 04. Each trace
is worth 1–3 points; the completion bar and the levels (25, 50, 80%) come from them.

## Offline guides

For an emergency without network: "I tuoi dati" → **Guide offline** → "Scarica le guide" saves
the home, the world map and every ready guide (pages, scripts, fonts and images) on the device.
No account is needed and nothing personal is saved: photos and notes stay online.

- `/api/offline` (prerendered, `lib/server/offline.ts`) lists the pages per language and the
  files (map, icons, the guides' images, on the asset CDN when configured); the browser
  (`lib/offline.ts`) saves the pages of its language and also the build files the pages, styles
  and scripts name. Each
  download goes into its own Cache Storage cache and replaces the previous one only once complete.
- `public/offline-sw.js`, registered only after a download, serves pages and files from the
  network while it answers within 4 seconds, else from the snapshot (hashed build files straight
  from the snapshot). Optimized images (`/_next/image`) fall back to the saved original; images
  from the asset CDN are served too (its origin is passed to the worker). `/`, offline, goes to the
  saved language. `/api/`
  is never cached. The snapshot is never refreshed by browsing: after a deploy, download again.
- Offline, the reader's session is "unknown" rather than signed out, and is read again when the
  connection comes back.
- Needs HTTPS (or localhost) and a production build: test with `yarn build && yarn start`, then
  DevTools → Network → Offline. On iPhone, add the site to the home screen: Safari evicts the
  storage of sites not opened for a few days.

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
| `Nowhere - Home.dc.html`                   | `app/[lang]/page.tsx` + `components/WorldMap.tsx`   |
| `assets/mondo-50m.json`                    | `public/data/world-50m.json`                        |
| `Guida Romania - Sito.dc.html`             | `components/guide/*` + `content/ro/`                |

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
2. Copy `content/xx/` (every element of the kit, shown at `/it/template`) to `content/<cc>/`,
   register the content in `content/guides.ts` and the structure in `content/structures.ts`.
   - `structure.ts`: region/city enum, sections (index, anchors, periods), traces and cards,
     cover, emblems and `coverInk`;
   - `it/names.ts`: country name and summary, alt texts, place and section names, trace texts,
     card names;
   - `it/guide.tsx`: `lang: 'it'` and the body, built from the kit. Every block has a required
     `on`: the places for which it is shown, or `"always"`.
   - Don't declare the cover, coat of arms and flag traces: the album gets them by itself, using
     the structure's `cover` and `emblems`.
3. Put images in `public/guides/<slug>/` with English file names (`cover.jpg`, `coat-of-arms.png`,
   `flag.svg`, `map.png`…), then `yarn assets push` and commit `content/assets.json`. Missing
   files show a neutral placeholder.
4. `yarn validate` checks the content; the page `/it/guide/<slug>` is generated at build time.
