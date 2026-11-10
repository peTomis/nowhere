# Data model: guide content and reader data

Status: **approved with changes (revision 2); phases 1–6 implemented** (phase 6 with the
deviations in [§11.1](#111-phase-6-as-implemented)), phases 7–8 not yet.

This document designs the data structure behind the guides and the reader's collection. It must
work today (Italian only, one allowed account) and accept followers and more languages later
without rewriting content or losing what readers have saved.

**Revision 2** (after review): reader data is stored **remotely from the start**: records in
MongoDB, photos in a private object store with signed URLs, behind Google sign-in (Auth.js) with
an email allowlist. The code is multi-user; followers, approvals and `followers` visibility stay
unimplemented; there is no offline queue. Export/import stays as a backup. Changed sections: 3,
6, 7, 9 (new: accounts), 11, 12. Section ids `ro.section.<topic>` and the slugs of §4.3 are
approved.

The editorial rules are in `PROMPT.md` (title: "Regole per le guide tascabili di un Paese"; it is
the file the brief calls `regole-guide-paese.md`, see [§12](#12-risks-and-open-questions)). This
document cites its sections (A11, B9, D4…) and does not repeat them.

---

## 1. Current state

What the repository does today (commit `edebf54`).

**Content**

- `data/guides.ts` is the registry: `slug`, `countryId` (ISO 3166-1 **numeric**, `'642'`),
  `name` (Italian), `status`, `at`, `summary` (Italian). The home map and `/guide/[slug]` read it.
- `content/guides/<slug>.tsx` holds a whole guide as one `GuideContent<P>` object
  (`lib/guide.ts`): `cover`, `coverInk`, `emblems`, `places` (regions with nested cities, for the
  trip filter), `toc`, `body` (a ReactNode). `content/guides/index.ts` maps slug → content.
- `romania.tsx` (2377 lines) has a string `enum Romania` with 4 regions (`transilvania`,
  `valacchia`, `moldavia`, `dobrogea`) and 8 cities (`sibiu`, `brasov`, `sighisoara`, `bucarest`,
  `iasi`, `suceava`, `constanta`, `tulcea`). **The cities are declared but unused**: every region
  has `cities: []`, so the filter only shows regions.
- Sections have positional ids: `c-emblems`, `p-flag`, `p-coat-of-arms`, `c-1`, `p-1`, `s-1-1`,
  `s-1-2`, `p-2`, `s-2-1`, `p-3`, `s-3-1`, `c-2`, `p-4`, `s-4-1`…`s-4-5`, `p-5`, `s-5-1`…`s-5-5`.
  The same id is written twice (in `toc` and on the section), and so are `on` and the dates
  (`headings` avoids duplicating the label text).
- The body is built with the kit in `components/guide/content.tsx` (`Chapter`, `Part`,
  `Timeline`, `Event`, `Context`, `Detail`, `Callout`, `Region`, `City`, `Figure`…). Every block
  has a required `on: P[] | 'always'` and wraps itself in the client gate `Only`. The kit is
  typed per guide through `guideKit<Enum>()`, so a wrong place id is a type error.
- The Romania guide has 91 `Event`s, ~420 external `href`s, 3 `Unless` pairs, two shared
  components (`BoyarsContext`, `RaduMihneaEvent`). **No places (traces), persons or city cards
  exist yet**: `Region` and `City` are only used in `template.tsx`.
- Images: `public/guides/<slug>/…`, through `publicAsset()` (missing file → placeholder). Alt
  texts and captions are written in the content file. No author/licence field exists.
- UI strings: `i18n/it.json` + `i18n/index.ts` (`t`, `format`, `locale = 'it'`). Content texts
  are Italian literals inside the TSX.

**Reader data**

- The only reader data is the trip filter: `localStorage['guida-<slug>-off']` = JSON array of
  **excluded** ids (e.g. `["valacchia"]`), read with `useSyncExternalStore` (server snapshot =
  nothing excluded) in `components/guide/trip.tsx`. Key `guida-template-off` exists for
  `/template`.
- No IndexedDB, no photos, no notes, no schema version.

**Home map**

- `components/WorldMap.tsx` (client, d3) colors a country `accent` when it has a guide with
  `status: 'ready'`, matched on the TopoJSON numeric id. The legend says "Paesi dove sono stato".
  `public/data/world-50m.json` has only numeric ids and Italian names (`properties.n`); no
  alpha-2 codes.

**Routing**

- `/`, `/guide/[slug]` (prerendered), `/template`, 404. No locale in the URL. Toc and outro link
  to `#<section id>`; `GuideShell` looks sections up with `document.getElementById`, so dots in
  ids are safe there (no `querySelector('#…')`).

**Validation**: only `tsc`. Nothing checks `on` nesting, dates, duplicate ids or image credits.

---

## 2. Content entities

### 2.1 Principles

- **Structure and text are separate.** Structure (ids, region, coordinates, trace kind, image
  file and credit, which places a person/city/event references, `on`, section periods as
  numbers) is language-independent and written once. Visible text (names, prose, captions, alt
  texts, section labels, formatted dates) lives in per-locale modules keyed by id.
- **Prose stays prose.** A locale's text for a section, a person or a city is a TSX tree, not a
  sentence-by-sentence table: a translation may split, merge or reorder paragraphs and details,
  use different exonyms and ethnonyms (B4–B6) and different typography (B8). Only the
  _references_ (which places, which ids) are shared.
- **Places are entities; texts about them are contextual** (D6). A place is defined once; a
  person card, a city card and a timeline event each reference it by id with their own text.

### 2.2 Folder layout

```
content/
  countries.ts              registry of every country with a guide (replaces data/guides.ts)
  locales.ts                supported locales, default, fallback chains
  types.ts                  entity types (replaces lib/guide.ts)
  ro/
    ids.ts                  enums: Ro (regions + cities), RoPlace, RoPerson, RoSection
    structure.ts            regions, cities, places, persons, city cards, sections (no text)
    it/
      names.ts              names, local names, alt texts, captions, section labels, dates
      body.tsx              the timeline prose (today's romania.tsx body)
      persons.tsx           person cards: intro, one text per trace, "Da ricordare"
      cities.tsx            city cards: same shape
    legacy.ts               old → new id map (only if the guide is already published, §4.4)
  xx/                       the template guide (/template), same layout ("xx" is an ISO
                            user-assigned code, so it can never clash with a real country)
public/guides/<slug>/…      images, unchanged
```

`lib/guide.ts`, `data/guides.ts` and `content/guides/` are moved here in phase 1; nothing else
in the app imports content files directly.

Reader-data code lives outside `content/`:

```
auth.ts                     Auth.js config (Google, allowlist, callbacks)
app/api/…                   route handlers (§6.2)
app/account/page.tsx        sign in/out, export, import
lib/server/                 mongodb.ts (lazy client), auth.ts (requireUser), bucket.ts (signed URLs)
lib/reader/                 store.ts (ReaderStore, HttpStore), hooks, photos.ts, prefs.ts, schema.ts
scripts/                    db-setup.mjs, migrate.mjs, cleanup.mjs
```

### 2.3 Types

```ts
// content/types.ts

/** ISO 3166-1 alpha-2, lowercase. */
export type CountryId = string // 'ro', 'bg', 'it'
export type Locale = 'it' | 'en' | 'fr' | 'de'

/** A year, or a century, optionally approximate. BC years are negative. */
export type Year = number | { century: number; circa?: boolean } | { year: number; circa: true }
export type Period = { from: Year; to?: Year }

export type Credit = {
  author: string
  license: string // SPDX-like: 'CC BY-SA 4.0', 'Public domain', 'Own work'
  url?: string // source page (Wikimedia Commons file page…)
}

/** A stock image (not the reader's photo). `null` = placeholder, by design. */
export type StockImage = { src: string; width: number; height: number; credit: Credit } | null

export type Country = {
  id: CountryId // 'ro'
  numeric: string // '642', matches the world TopoJSON
  slug: string // 'romania': URL segment, English, never translated
  status: 'ready' | 'draft'
  at: [number, number] // [lon, lat]
  tripDate?: string
}

export type RegionDef<R extends string, C extends string> = {
  id: R
  cities: C[] // order = order in the trip filter
}

export type TraceKind = 'on-route' | 'detour' // "Sul percorso" | "Se passi di lì" (B9)

export type PlaceDef<R extends string, C extends string, Pl extends string> = {
  id: Pl // 'ro.place.biertan-fortified-church'
  region: R
  city?: C // when the place is in (or belongs to) a city of the guide
  at?: [number, number] // [lon, lat]
  kind: TraceKind
  image: StockImage
}

/** A person card (B9): which places are its traces, in order. Text is per locale. */
export type PersonDef<Pl extends string, Pe extends string> = {
  id: Pe // 'ro.person.vlad-iii'
  traces: Pl[] // 2–5
  image?: StockImage // portrait, optional
}

/** A city card (B10). The city itself is a filter entry (RegionDef.cities). */
export type CityCardDef<C extends string, Pl extends string> = {
  id: C // the city id: one card per city
  traces: Pl[]
  image?: StockImage
}

/** Chapters, parts and titled timelines. Drives the index (toc) and the section headers. */
export type SectionDef<S extends string, P extends string> = {
  id: S
  parent?: S
  level: 1 | 2 | 3
  on: P[] | 'always'
  period?: Period // checked against the events it contains (§8)
  inToc?: boolean // default true; false for untitled timelines
}
```

Per locale, a guide provides a typed text module. The **default locale must be complete**
(`Record<Id, …>`, so a missing text is a type error); other locales are `Partial<…>` and fall
back (§5).

```ts
export type GuideTexts<R, C, Pl, Pe, S> = {
  name: string // 'Romania'
  summary?: string
  regions: Record<R, string>
  cities: Record<C, { name: string; local?: string }> // local: 'București' (exonym vs endonym)
  places: Record<Pl, { name: string; local?: string; alt: string; caption?: string }>
  persons: Record<Pe, { name: string }>
  sections: Record<S, { label: string; kicker?: string; lede?: string; dates?: string }>
  cover?: { alt: string }
  emblems?: { flag?: string; coatOfArms?: string }
}

/** A card's prose. Keys of `traces` must be exactly the card's `traces` (checked, §8). */
export type CardText<Pl extends string> = {
  intro: ReactNode
  traces: Partial<Record<Pl, ReactNode>>
  remember: ReactNode
}
```

The country's `structure.ts` ties it together:

```ts
export const ro = defineGuide({
  country: { id: 'ro', numeric: '642', slug: 'romania', status: 'ready', at: [24.9, 45.9] },
  regions: [{ id: Ro.Transylvania, cities: [Ro.Sibiu, Ro.Brasov, Ro.Sighisoara] }, …],
  places: [
    { id: RoPlace.BiertanFortifiedChurch, region: Ro.Transylvania, kind: 'detour',
      at: [24.52, 46.13], image: null },
  ],
  persons: [{ id: RoPerson.VladIii, traces: [RoPlace.VladHouseSighisoara, RoPlace.PoenariCitadel, RoPlace.BranCastle] }],
  cityCards: [{ id: Ro.Sighisoara, traces: [RoPlace.ClockTower, RoPlace.VladHouseSighisoara] }],
  sections: [ { id: RoSection.OttomanSuzerainty, parent: RoSection.EarlyModern, level: 2,
                on: [Ro.Transylvania, Ro.Wallachia, Ro.Moldavia, Ro.Dobruja],
                period: { from: 1541, to: 1688 } }, … ],
  cover: { src: '/guides/romania/cover.jpg', … },
  emblems: […],
  texts: { it: () => import('./it') },
})
```

`defineGuide` is an identity function with generics, so the enums flow into the kit exactly as
`guideKit<Enum>()` does today.

### 2.4 How cards and events reference places

New kit primitives (server components; reader state inside them is a client leaf):

```tsx
<PersonCard id={RoPerson.VladIii} />   // reads structure + texts, renders intro, traces, "Da ricordare"
<CityCard id={Ro.Sighisoara} />
<Event on={[Ro.Transylvania]} date="1568" title="…" places={[RoPlace.ChurchOfTorda]}>…</Event>
```

- **A trace's `on` is derived**, never written: `[place.city ?? place.region]`. A card's `on` is
  the union of its traces' `on` (B9 "Filtri"). Intro and "Da ricordare" show whenever the card
  shows; traces in the selected regions come first.
- `Event places` renders a quiet line under the details ("Oggi: …") linking to the place's card
  anchor and showing the seen mark. This is how the timeline stops being disconnected (req. 3).
- The reader's state (seen, photo, note) is read by **place id**, so the same place shows the same
  state in the person card, the city card and the event line.
- The template guide (`xx`) shows every new primitive (AGENTS rule).

### 2.5 What does _not_ move into structure (yet)

Events, details and paragraphs of the timeline keep their `on` inside the locale TSX. Moving 91
events and their details into a language-independent skeleton would be a near-complete rewrite of
`romania.tsx` for little gain today: the cost is that a future translation repeats the `on` of
details (which the validator checks against the section and the event, §8). See §10.

---

## 3. Reader data

Reader data is split by who it belongs to:

- **Account data** (visits, photos, notes, country covers): on the server, per user, behind
  sign-in. Only the allowlisted account can have any today.
- **Device preferences** (the trip filter): in the browser's localStorage, for every visitor,
  signed in or not. The guide must stay usable without an account.

### 3.1 Records

Account records are MongoDB documents. They share an envelope:

```ts
type OwnerId = string // the user's ObjectId as hex, from the session, never from the request

type Base = {
  _id: string // uuid v4 generated by the client: a retried create is idempotent
  ownerId: OwnerId
  schema: number // READER_SCHEMA at the last write (§3.2)
  createdAt: Date
  updatedAt: Date // newer wins on import merge
  deletedAt?: Date // tombstone: kept so exports and a future sync carry deletions
}

/** What a photo or a note is about. Country cover or a place (trace). */
type Subject =
  | { kind: 'country'; id: CountryId } // 'ro', or any country, with or without a guide
  | { kind: 'place'; id: string } // 'ro.place.biertan-fortified-church'

type Visit = Base & {
  placeId: string // one live visit per (ownerId, placeId)
  seenAt: string
}

type Photo = Base & {
  subject: Subject
  country: CountryId // denormalized from the subject (place ids start with it): map index
  role: 'cover' | 'trace'
  status: 'pending' | 'ready' // 'ready' only after both objects are verified in the bucket
  mime: 'image/webp' | 'image/jpeg'
  width: number
  height: number
  bytes: { full: number; thumb: number }
  // objects: `u/<ownerId>/p/<_id>/full.<ext>` and `…/thumb.<ext>` in the private bucket
}

type Note = Base & {
  subject: Subject
  text: string // free caption, plain text, max 2000 characters
  lang: string // BCP 47 code of what the reader wrote; default = UI locale
  visibility: 'private' | 'followers' // the type has both; the API accepts only 'private' today
}

type User = {
  _id: ObjectId
  provider: 'google'
  providerId: string // Google `sub`
  email: string
  name?: string
  createdAt: Date
  lastLoginAt: Date
}
```

Collections and indexes (created by `yarn db:setup`, as in collection-manager, with a JSON-schema
validator requiring `ownerId` on every reader document):

| Collection | Indexes                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `users`    | unique `{ provider, providerId }`                                                                    |
| `visits`   | unique `{ ownerId, placeId }`                                                                        |
| `photos`   | `{ ownerId, 'subject.kind', 'subject.id' }`, `{ ownerId, country, status }`, `{ status, createdAt }` |
| `notes`    | unique `{ ownerId, 'subject.kind', 'subject.id' }`                                                   |

Today the UI shows **one photo and one note per subject** (the latest ready one). The model allows
several photos, so more photos later is a UI change, not a migration.

Seen and photo are independent: a reader can mark a place seen without a photo; adding a photo
to a place also marks it seen.

The server checks every `subject` against the content: a place id must exist in a guide's
places, a country id in the alpha-2 table (§7). Unknown ids are refused (400).

### 3.2 Schema version and migrations

- One number, `READER_SCHEMA`, starting at **1**, in `lib/reader/schema.ts`. Every document
  stores the `schema` it was written with; every export carries it.
- Server data migrations are scripts (`scripts/migrate.mjs`), run by hand like `db:setup`: an
  ordered list `{ to: n, up(db) }`, recorded in a `meta` document. Each step is idempotent, and
  the API refuses to start writing if the database is behind `READER_SCHEMA` (clear error, not
  silent corruption).
- Export files with an older `schema` go through the same steps (pure functions on the JSON)
  before import.

### 3.3 Where the trip filter lives

The filter must render synchronously after hydration (it hides content) and work for every
visitor, so it stays in **localStorage**, under one versioned key: `nowhere.prefs` =
`{ schema: 1, trip: { ro: { off: […] } } }`. The `useSyncExternalStore` pattern in `trip.tsx`
stays; only `read`/`write` change.

**Migration 0 → 1 in the browser** (first visit with the new code): read `guida-romania-off`,
map each id through `content/ro/legacy.ts` if the guide was published (§4.4), drop unknown ids,
write `nowhere.prefs.trip.ro.off`, delete the old key; delete `guida-template-off`.

The filter is not synced to the account: it is a per-device reading preference.

---

## 4. Ids

### 4.1 Convention

Ids are internal: readers never see them. They are ASCII, lowercase, kebab-case English slugs,
without diacritics, prefixed by the country.

| Entity                            | Pattern                       | Example                                      |
| --------------------------------- | ----------------------------- | -------------------------------------------- |
| Country                           | ISO 3166-1 alpha-2            | `ro`, `bg`, `md`                             |
| Historical region                 | `<cc>.<slug>`                 | `ro.transylvania`, `ro.moldavia`             |
| City                              | `<cc>.<slug>`                 | `ro.bucharest`, `ro.iasi`                    |
| Place (trace)                     | `<cc>.place.<slug>`           | `ro.place.biertan-fortified-church`          |
| Person                            | `<cc>.person.<slug>`          | `ro.person.vlad-iii`                         |
| Section (chapter, part, timeline) | `<cc>.section.<slug>[.<sub>]` | `ro.section.ottoman-suzerainty.transylvania` |

Rules:

- The slug is the **English** name of the thing (exonym where English has one: `bucharest`,
  `wallachia`, `dobruja`; otherwise the local name stripped of diacritics: `iasi`, `sighisoara`).
  "moldavia" is the historical region; the Republic of Moldova is the country `md`.
- Regions and cities share the `<cc>.<slug>` namespace (they are both trip-filter entries); the
  validator rejects a collision.
- **Section ids describe the topic, not the position or the kind.** No numbers, no
  `chapter`/`part`/`timeline` segment: a part promoted to a chapter, or a chapter inserted before
  it, keeps its id. A sub-segment is used only for "X of Y" (`ottoman-suzerainty.transylvania`).
  This deviates from the brief's example `ro.timeline.…` for that reason.
- An id never changes when a title or a translation changes. **Once published, ids are never
  renamed** (D4); if it is unavoidable, add the old id to `legacy.ts` (§4.4).
- Ids live in enums (`Ro`, `RoPlace`, `RoPerson`, `RoSection`), never as bare strings in content.
  The country prefix is redundant inside a file but makes every id globally unique in reader
  data, exports, and a future server.

### 4.2 URL anchors

The HTML `id` and the URL fragment are the section id **without the `<cc>.section.` prefix**:
`/guide/romania#ottoman-suzerainty.transylvania`. Readable, unique in the page, language
independent (the same anchor in `/en/…`). Dots are valid in fragments and `getElementById`.
Place cards get anchors too (`#place.biertan-fortified-church`) so events can link to them.

### 4.3 Proposed renames

Regions and cities (`enum Romania` values):

| Old            | New               |
| -------------- | ----------------- |
| `transilvania` | `ro.transylvania` |
| `valacchia`    | `ro.wallachia`    |
| `moldavia`     | `ro.moldavia`     |
| `dobrogea`     | `ro.dobruja`      |
| `sibiu`        | `ro.sibiu`        |
| `brasov`       | `ro.brasov`       |
| `sighisoara`   | `ro.sighisoara`   |
| `bucarest`     | `ro.bucharest`    |
| `iasi`         | `ro.iasi`         |
| `suceava`      | `ro.suceava`      |
| `constanta`    | `ro.constanta`    |
| `tulcea`       | `ro.tulcea`       |

Enum member names become English too (`Ro.Transylvania`), consistent with the ids. (AGENTS.md
currently says members keep Italian names; that rule is updated.)

Sections (anchor = new id without `ro.section.`):

| Old              | New id                                       | Label today                 |
| ---------------- | -------------------------------------------- | --------------------------- |
| `c-emblems`      | `ro.section.emblems`                         | La bandiera e lo stemma     |
| `p-flag`         | `ro.section.emblems.flag`                    | Bandiera                    |
| `p-coat-of-arms` | `ro.section.emblems.coat-of-arms`            | Stemma                      |
| `c-1`            | `ro.section.dacia-to-principalities`         | Dalla Dacia ai principati   |
| `p-1`            | `ro.section.dacia-to-hungarians`             | Dalla Dacia agli Ungari     |
| `s-1-1`          | `ro.section.dacia-and-rome`                  | Dacia e Roma                |
| `s-1-2`          | `ro.section.migration-period`                | Anni di passaggio           |
| `p-2`            | `ro.section.principalities`                  | I principati                |
| `s-2-1`          | _(untitled timeline: id removed)_            | —                           |
| `p-3`            | `ro.section.late-middle-ages`                | Il basso Medioevo           |
| `s-3-1`          | _(untitled timeline: id removed)_            | —                           |
| `c-2`            | `ro.section.early-modern`                    | L’era moderna               |
| `p-4`            | `ro.section.ottoman-suzerainty`              | Sotto la sovranità ottomana |
| `s-4-1`          | _(untitled timeline: id removed)_            | —                           |
| `s-4-2`          | `ro.section.ottoman-suzerainty.transylvania` | Transilvania 1608 – 1686    |
| `s-4-3`          | `ro.section.ottoman-suzerainty.wallachia`    | Valacchia 1611 – 1688       |
| `s-4-4`          | `ro.section.ottoman-suzerainty.moldavia`     | Moldavia 1606 – 1680        |
| `s-4-5`          | `ro.section.ottoman-suzerainty.dobruja`      | Dobrogea 1541 – 1688        |
| `p-5`            | `ro.section.three-empires`                   | Tra tre imperi              |
| `s-5-1`          | _(untitled timeline: id removed)_            | —                           |
| `s-5-2`          | `ro.section.three-empires.transylvania`      | Transilvania 1688 – 1792    |
| `s-5-3`          | `ro.section.three-empires.wallachia`         | Valacchia 1688 – 1746       |
| `s-5-4`          | `ro.section.three-empires.moldavia`          | Moldavia 1709 – 1818        |
| `s-5-5`          | `ro.section.three-empires.dobruja`           | Dobrogea 1775 – 1812        |

The untitled timelines `s-x-1` are not in the index and nothing links to them; they lose their
id (if you prefer to keep them, `….overview`).

Template (`xx`, never published, renamed without compatibility): `nord` → `xx.north`, `sud` →
`xx.south`, `citta-uno` → `xx.city-one`, … and its sections likewise.

Not renamed: the route `/guide/romania`, every `href`, image paths, enum-free content.

### 4.4 Compatibility map (only if the guide is already published)

```ts
// content/ro/legacy.ts — frozen; only ever appended to
export const legacyIds: Record<string, string> = { transilvania: 'ro.transylvania', … }
export const legacyAnchors: Record<string, string> = { 's-4-2': 'ottoman-suzerainty.transylvania', … }
```

- `legacyIds` is used by the browser migration 0 → 1 of the trip filter (§3.3).
- `legacyAnchors` is used by a tiny client effect in `GuideShell`: on load, if `location.hash`
  is a legacy anchor, `history.replaceState` to the new one and scroll. Old shared links keep
  working.

If the guide is **not** published: no `legacy.ts`, no anchor redirects; the browser migration
just deletes the old keys.

---

## 5. Languages

### 5.1 Where texts live

Considered:

1. **One file per language with the whole guide duplicated** (`romania.it.tsx`,
   `romania.en.tsx`): simple, but structure (ids, `on`, places, images) is copied and drifts.
2. **Every text in a key/value catalogue** (JSON per locale, keys per sentence): no structure
   duplication, but forces word-for-word segmentation and loses inline marks (`<N href>`, `<D>`),
   which are most of the guide.
3. **Chosen: structure once, text per locale, granularity per entity.** Short texts (names,
   labels, captions, alt texts, section labels and dates) in a typed `names.ts` per locale;
   prose (section bodies, card intros, trace texts) as TSX per locale, keyed by entity id. A
   translation can restructure its prose freely; it cannot invent places, ids or images.

UI strings stay in `i18n/<locale>.json` (unchanged mechanism; `i18n/index.ts` gains a
`getMessages(locale)`).

Typography and naming differences are handled by giving each locale its own strings, never by
transforming Italian: `cities['ro.bucharest']` is "Bucarest" in `it`, "Bucharest" in `en`,
"Bucarest" in `fr`, "Bukarest" in `de`; the endonym "București" is `local`, written once per
locale file only if the locale wants to show it. Formatted dates come from `Period` through a
per-locale formatter (`I sec. a.C. – 895` vs `1st c. BC – 895`), so section dates are numbers in
structure and strings only at render.

### 5.2 Default and fallback

```ts
// content/locales.ts
export const locales = ['it'] as const // later: 'it', 'en', 'fr', 'de'
export const defaultLocale = 'it'
export const fallbacks: Record<Locale, Locale[]> = {
  it: [],
  en: ['it'],
  fr: ['en', 'it'],
  de: ['en', 'it'],
}
```

- **Short texts** fall back field by field along the chain.
- **Prose falls back as a whole unit** (a section, a card), never mid-paragraph: if `fr` has no
  text for a section, the `en` (or `it`) one is shown with `lang="…"` on its wrapper and a quiet
  notice ("Testo non ancora tradotto"). A guide with no body in the requested locale is not
  listed in that locale.
- The default locale is always complete (type-enforced + validator).

### 5.3 URLs

Today: `/guide/romania`. Later: `/it/guide/romania`, `/en/guide/romania`, via an `app/[lang]/`
segment (Next 16 i18n guide: `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`).

- The slug is English and **the same in every locale** (no `/fr/guide/roumanie`): one canonical
  path per guide, anchors identical across locales (§4.2).
- Existing unprefixed URLs get a **permanent redirect to `/it/…`** in `next.config.ts`
  `redirects()` (`/guide/:slug` → `/it/guide/:slug`, `/` → `/it`). Deterministic, not based on
  `Accept-Language`, because a shared link was written in Italian. The fragment survives the
  redirect, so `#…` anchors still work. The `proxy` may later redirect only the bare `/` by
  browser language.
- Nothing changes in the URLs during this work.

### 5.4 Reader notes

A note stores `lang` (defaults to the UI locale at writing time; the reader can change it later).
Notes are never translated; the `lang` attribute is set when rendering them.

The `/api` routes (§6) stay outside the `[lang]` segment: they never carry a locale.

---

## 6. Storage

### 6.1 Interface

The client talks to the server only through one interface, so components never know about
`fetch`, MongoDB or the bucket:

```ts
// lib/reader/store.ts (client)
export interface ReaderStore {
  // visits
  listVisits(q?: { country?: CountryId }): Promise<Visit[]>
  setSeen(placeId: string, seen: boolean): Promise<void>

  // photos (the image passed in is already processed in the browser, §6.4)
  listPhotos(q?: { subject?: Subject; country?: CountryId }): Promise<PhotoView[]> // with signed URLs
  addPhoto(subject: Subject, image: ProcessedImage): Promise<PhotoView>
  deletePhoto(id: string): Promise<void>

  // notes
  getNote(subject: Subject): Promise<Note | undefined>
  setNote(subject: Subject, input: { text: string; lang: string }): Promise<Note> // always 'private'

  // map
  litCountries(): Promise<CountryId[]> // later litRegions(country)

  // backup (§6.6)
  exportAll(onProgress?: (done: number, total: number) => void): Promise<Blob>
  importAll(file: Blob, mode: 'merge' | 'replace'): Promise<ImportReport>
}
```

`HttpStore` is the only implementation. Hooks (`useVisits`, `usePhotos(subject)`,
`useNote(subject)`, `useSession`) sit on top of it with a small in-memory cache per page, so the
same place shows the same state in every card that references it. Without a session the hooks
return "signed out" and the collection controls are not rendered (the guide text is unchanged).

### 6.2 Server

Route handlers under `app/api/` (JSON in and out). Every handler starts with
`const user = await requireUser()` (§9.2): no session, a deleted user or an email that left the
allowlist → 401/403. `ownerId` is **always** taken from the session and added to every query and
every write; a body or a query string never names an owner.

| Route                     | Method           | Does                                                                 |
| ------------------------- | ---------------- | -------------------------------------------------------------------- |
| `/api/me`                 | GET              | the signed-in user (id, email, name) or 401                          |
| `/api/visits`             | GET, PUT, DELETE | list; mark seen (`{ placeId }`, upsert); unmark (tombstone)          |
| `/api/photos`             | GET, POST        | list ready photos with signed GET URLs; start an upload (§6.3)       |
| `/api/photos/[id]/commit` | POST             | verify the uploaded objects, set `ready`                             |
| `/api/photos/[id]`        | DELETE           | tombstone the record, delete both objects                            |
| `/api/notes`              | GET, PUT         | read; upsert by subject (`visibility` other than `private` → 400)    |
| `/api/lit`                | GET              | distinct `country` of ready photos                                   |
| `/api/export`             | GET              | every record of the user (JSON) with signed GET URLs for the photos  |
| `/api/import`             | POST             | merge or replace records (photos go through the normal upload, §6.6) |
| `/api/auth/[...nextauth]` | GET, POST        | Auth.js                                                              |

- Writes require `Content-Type: application/json` (as `requireJson` in collection-manager): a
  cross-site form cannot post with the session cookie.
- Input is validated with small hand-written guards (or `zod` if they grow); unknown fields are
  dropped.
- `lib/server/mongodb.ts` creates the client **lazily**: `yarn build` (static guides) must work
  without database variables.
- The guides stay prerendered: no page reads the session on the server; only `/api/*` and the
  `/account` page are dynamic.

### 6.3 Photos: upload with signed URLs

1. The browser processes the file (§6.4) into `full` and `thumb` blobs.
2. `POST /api/photos` `{ id, subject, mime, width, height, bytes: { full, thumb } }`. The server
   checks the session, the subject, the mime (`image/webp` or `image/jpeg`) and the sizes
   (full ≤ 3 MB, thumb ≤ 300 kB), inserts the record as `pending` and returns two **presigned
   PUT URLs** (10 minutes, signed with `Content-Type` and `Content-Length`).
3. The browser PUTs both blobs straight to the bucket.
4. `POST /api/photos/[id]/commit`: the server HEADs both objects, checks type and size, sets
   `status: 'ready'`, upserts the visit (a photo marks the place seen). Only now does the UI
   show the photo as saved.
5. Reading: `GET /api/photos` returns **presigned GET URLs** (1 hour; the expiry is rounded to
   the hour so the same URL repeats within the hour and the browser can cache the image).
6. Cleanup: `pending` records older than 24 hours, and their objects if any, are removed by
   `scripts/cleanup.mjs` (by hand, or a scheduled job later), and lazily on each upload start.

Bucket: private (no public access, no public domain), CORS allowing `PUT` and `GET` from the
site's origins only. Keys: `u/<ownerId>/p/<photoId>/full.webp`. The server uses an API token
scoped to that bucket. S3-compatible API, through `@aws-sdk/client-s3` +
`@aws-sdk/s3-request-presigner` (server only), so the provider can change with environment
variables alone.

### 6.4 Photos: processing in the browser

Before anything leaves the device (`lib/reader/photos.ts`):

1. Decode with `createImageBitmap(file, { imageOrientation: 'from-image' })` (applies the EXIF
   rotation, after which the EXIF is no longer needed).
2. Draw on a canvas and re-encode. **Re-encoding drops every metadata block, GPS included**:
   the original file never reaches the server.
3. Sizes: **full = longest side 2048 px**, **thumb = longest side 480 px**.
4. Format: **WebP, quality 0.82** (full) / 0.75 (thumb); if the browser cannot encode WebP
   (`canvas.toBlob` returns another type), **JPEG 0.85**. Expected: 250–600 kB per photo.
5. Files that cannot be decoded (e.g. HEIC in desktop Chrome) are refused with a visible message.

### 6.5 Errors and connectivity

- No offline queue. Without a connection the upload fails at step 2 or 3 and the UI says so
  ("Nessuna connessione: la foto non è stata caricata"); the processed image stays in memory on
  that card with a "Riprova" button until the page is left.
- Every failure is shown next to the photo or note it concerns, with a reason: no connection,
  session expired (link to sign in again), file not readable, file too large, server error.
  Nothing is shown as saved before the commit (photos) or the 200 (visits, notes) arrives.
- A retried create reuses the same client `id`, so a request that succeeded but whose response
  was lost does not create a duplicate.
- Marking seen and notes update the UI optimistically and roll back with a message on failure.

### 6.6 Export and import

The backup is built and restored **in the browser**, so no server function has to hold all the
photos in memory or run for minutes.

- **Export** (`/account` page): `GET /api/export`, then each photo downloaded through its signed
  URL, zipped with `fflate` (~8 kB, no dependencies) into `nowhere-<YYYY-MM-DD>.zip`:
  `manifest.json` (`{ format: 'nowhere-backup', schema, exportedAt, user: { email }, visits,
photos, notes }`, tombstones included) + `photos/<id>.full.webp`, `photos/<id>.thumb.webp`.
  A progress line shows "12 di 140 foto". The zip is stored uncompressed (photos already are).
- **Import**: check `format`, migrate from the file's `schema`, then `POST /api/import` with the
  records: **merge** (default: per `_id`, the newer `updatedAt` wins, tombstones included) or
  **replace** (after a confirmation: tombstones everything not in the file). The `ownerId` in the
  file is ignored: everything is written for the signed-in user. Photos that are new go through
  the normal upload (§6.3) from the zip's blobs. A report says what was added, updated, skipped
  and failed.
- The same file restores into another account (e.g. a future second user) without changes.

### 6.7 Choice of object store

Prices from the providers' pricing pages as reported in November 2026 (check before signing up):

| Provider                  | Free every month                                                                                                           | Beyond                                                                          | Notes                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Cloudflare R2**         | 10 GB stored, 1 M writes (class A), 10 M reads (class B), **egress always free**                                           | $0.015/GB-month, $4.50/M writes, $0.36/M reads                                  | S3 API, presigned URLs, private by default. Needs a card on file to enable R2.                                     |
| Backblaze B2              | 10 GB stored, egress free up to 3× the stored data                                                                         | $6.95/TB-month, then $0.01/GB egress                                            | S3 API, presigned URLs. Fine, but egress has a cap.                                                                |
| Amazon S3                 | no permanent free storage: new accounts get $100–200 of credits for 6 months; 100 GB/month egress free (shared across AWS) | $0.023/GB-month (us-east-1), $0.09/GB egress past 100 GB, $5/M PUT, $0.40/M GET | The reference S3 API; IAM is more work to set up. After the credits, a small collection costs a few cents a month. |
| Vercel Blob (Hobby)       | 1 GB stored, 10 k reads, 2 k uploads, 10 GB transfer                                                                       | not on Hobby: **blocked for 30 days** when over a limit                         | Private blobs are served through a function (extra transfer). Too small, and a hard stop.                          |
| MongoDB Atlas M0 (GridFS) | 512 MB for **everything**                                                                                                  | Flex tier, $8–30/month                                                          | Photos in the database would fill the free cluster after ~1000 photos. Not an option.                              |

**Proposal: Cloudflare R2.** Against S3: same API (the code works with either through the
`S3_*` variables), but R2 has a permanent free tier and no egress charge, while S3 is free only
for the first months' credits and charges egress past 100 GB/month. S3 wins only if you already
use AWS or want its IAM policies. At ~550 kB per photo (full + thumb) 10 GB holds about 18 000
photos; an upload costs 2 writes; a page view of a guide with 30 traces costs at most 30 reads.
A personal collection stays at **$0** for years, and past the free tier it costs cents. MongoDB
Atlas **M0** (free, 512 MB) holds the records, which are a few hundred bytes each.

Environment variables (`.env.template`):

```
MONGODB_URI=
AUTH_SECRET=                 # openssl rand -base64 32
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=          # redirect URI: <origin>/api/auth/callback/google
ALLOWED_EMAILS=              # comma-separated, lowercase
S3_ENDPOINT=                 # https://<account>.r2.cloudflarestorage.com
S3_REGION=auto
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

---

## 7. Lit map

- **A country is lit if the signed-in reader has at least one ready photo whose `country` is
  it**, cover or trace: `GET /api/lit` (index `{ ownerId, country, status }`). The home map
  fetches it after hydration; signed out, the request is skipped and nothing is lit.
- **Any country can be lit**: when signed in, the map's pin card offers "Aggiungi una foto" for
  every country; it uploads a `cover` photo with `subject: { kind: 'country', id }`. With a cover,
  the pin card shows its thumb.
- The map needs alpha-2 for every TopoJSON feature. A static table `lib/countries.ts`
  (numeric → alpha-2, ~240 entries, plus `xk` for Kosovo, which has no numeric code) avoids
  touching `world-50m.json`, which must stay identical to the design file. The server uses the
  same table to validate country subjects.
- **Guides vs lit**: today the accent fill means "has a guide". It becomes "lit by my photos".
  Guides stay discoverable through the search list tag, the pin card and a second, quieter
  treatment for guide countries that are not lit (proposal: `neutral-400` fill). Signed-out
  visitors therefore see guide countries in that quieter treatment only. See §12.
- **Regions later**: photos of places carry the place id, and every place has a `region`. A
  `region → geometry` file per guide (`public/data/<cc>-regions.json`) plus `litRegions(country)`
  is enough; no reader-data change.
- The home stays prerendered; lighting is a client-side overlay.

---

## 8. Content validation

A pure function `validateGuide(guide, locales)` in `lib/content/validate.ts`, returning a list of
errors with a path (`ro › it › body › ottoman-suzerainty.wallachia › Event "1632" › Detail`).

Checks:

1. **Duplicate ids** across regions, cities, places, persons, sections, and DOM anchors.
2. **Unknown references**: `traces`, `Event places`, `PersonCard`/`CityCard` ids, `on` entries,
   `parent` of sections, keys of `CardText.traces` (must equal the card's traces).
3. **`on` nesting**: every block's `on` ⊆ its parent's `on` (`'always'` contains everything); a
   section's `on` equals its `SectionDef.on`; a trace's derived `on` ⊆ its card's.
4. **Images**: every `StockImage` that is not `null` has `credit.author` and `credit.license`;
   the file exists in `public/` (warning, not error, so writing can precede photos).
5. **Dates**: each section's `period` equals the first and last year of the events it contains
   (D3), contiguous parts don't overlap. Event dates are parsed from their Italian strings
   (`1608–1613`, `1003 ca.`, `XVII sec.`, `I sec. a.C.`, `1711 e 1716`); an unparseable date is an
   error whose fix is an explicit `years={[1711, 1716]}` prop.
6. **Missing default-locale texts**: every id has a text in `it` (also type-enforced); prose
   modules exist for every card and section.
7. Reserved: no `public`/`everyone` visibility value anywhere in reader types (a type test).

How the body is checked without rendering: the validator walks the React element tree of the
locale's body. Kit components are recognised by reference and inspected through their props;
plain helper components (`BoyarsContext`) are called with their props to expand them. Client
gates (`Only`, `Unless`) are transparent for structure.

**When it runs**

- In `generateStaticParams` of the guide route: errors throw, so **`yarn build` fails** and
  `yarn dev` shows the error overlay.
- `yarn validate`: same function from a script, so it can run alone and in the pre-commit
  checklist. (Running TSX outside Next needs a loader such as `tsx` with the `react-server`
  condition because `lib/assets.ts` imports `server-only`; if that proves fragile, `yarn validate`
  is an alias of a build of the guide routes.)

When it fails: the message names the file, the entity and the rule; AGENTS.md will say "fix the
content, never weaken the validator".

---

## 9. Accounts

### 9.1 What is implemented, what is not

| Implemented now                                                                  | Designed only (not implemented)                                       |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Google sign-in (Auth.js), `users` collection, real `ownerId` on every record     | Following, follow requests and approvals                              |
| Email allowlist (only the author today), no open registration                    | `followers` visibility (the field exists, only `private` is accepted) |
| Every request checks the session; queries always filtered by the session's owner | Profiles visible to others                                            |
| Data on the server: the same collection on every signed-in device                | Offline queue / local cache with sync                                 |

### 9.2 Sign-in (Auth.js)

Auth.js (`next-auth` v5, App Router), modelled on `collection-manager/lib/auth.ts` (which uses
v4 with the Pages Router; the logic carries over, the API shape does not):

- `auth.ts` at the root exports `{ handlers, auth, signIn, signOut }`; `app/api/auth/[...nextauth]/route.ts`
  re-exports the handlers. Google is the only provider.
- **Allowlist**: the `signIn` callback accepts only a Google profile with `email_verified` and an
  email in `ALLOWED_EMAILS` (lowercased, trimmed). Anyone else gets Auth.js's error page with a
  plain message ("Accesso non consentito"); no user document is created.
- **Users**: on the first sign-in of an allowed email, the `jwt` callback upserts
  `users { provider: 'google', providerId: sub }` (unique index, retry on a concurrent duplicate,
  as in collection-manager) and stores `userId` in the token.
- **Session**: JWT strategy, `maxAge` 7 days, httpOnly secure cookies (Auth.js defaults).
- **Every request**: `requireUser()` (`lib/server/auth.ts`) reads the session, checks that the
  user document exists **and that its email is still in `ALLOWED_EMAILS`** (removing an email
  revokes access at the next request, without waiting for the JWT to expire), and returns
  `{ id, email }`. Route handlers use nothing else to identify the owner.
- UI: a small "Accedi" / account link in the site footer leading to `/account` (sign in with
  Google, signed-in email, sign out, export, import, storage used). The guides look the same
  signed in or out, apart from the collection controls.

### 9.3 Later: following, approvals, sync

What the model already prepares: real `ownerId`, client-generated ids, `updatedAt` +
tombstones, `visibility` on notes, EXIF removed before upload, global place ids.

- **Opening sign-up** = replacing the allowlist with an open (or invite-based) `signIn` check.
  Nothing else changes.
- **Following**: `follows { followerId, followeeId, status: 'pending' | 'accepted', createdAt }`,
  unique on the pair. Profiles private by default; a request needs the followee's approval;
  either side can remove it.
- **Reading someone else's data**: new read-only routes (`/api/people/[id]/lit`, `…/photos`,
  `…/notes`) that check an accepted follow, then query with `ownerId = followee`. Notes are
  filtered to `visibility: 'followers'`; `private` notes are never returned to anyone else.
  Signed URLs for photos are issued the same way. Whether photos need their own `visibility`
  is an open question (§12).
- **Offline**: an IndexedDB cache + outbox in front of `HttpStore` (same interface), replaying
  writes with their client ids; last-write-wins on `updatedAt`.
- No public profiles, comments or votes.

---

## 10. TSX or data files

| Option                                                                 | For                                                                                                                                                     | Against                                                                                                                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **TSX everywhere (today)**                                             | Inline marks and gates are natural; enums give type errors for wrong ids; no build tooling; agents edit TSX well.                                       | Structure, text and filters interleaved; translating means copying structure; hard to validate dates and references without walking JSX.        |
| **JSON/YAML for everything**                                           | Tool-agnostic, CMS-ready, easy per-field diffs for translators.                                                                                         | Rich text (`<N href>`, `<D>`, nested `Detail on`) needs a custom markup; loses type checking of ids; a full rewrite of 2377 lines.              |
| **MDX for prose**                                                      | Prose reads like prose; JSX still available.                                                                                                            | `on` props and kit components are still JSX inside MDX, so little is gained; weaker typing; extra tooling (`@next/mdx`) with `cacheComponents`. |
| **Hybrid (proposed)**: TS data for structure, TSX per locale for prose | Places, persons, cities, sections and images become typed data the validator and the map can read; prose keeps its marks; a new locale adds files only. | Two places to look at for a section (structure + prose); the timeline's event-level `on` stays in prose (§2.5).                                 |

**Proposal**: hybrid. New entities (places, persons, city cards) are born in the hybrid form.
For the existing timeline, phase 2 only moves **sections** (≈25 entries: id, parent, `on`,
period) into `structure.ts` and their labels/dates into `it/names.ts`, so `toc` is derived
instead of hand-written; `<Chapter section={RoSection.EarlyModern}>` replaces the repeated `id`,
`on`, `title`, `period` props. Event texts are untouched. Moving events into structure is **not**
proposed now; reconsider when the first translation starts.

---

## 11. Migration plan

Each phase ends with `yarn typecheck && yarn lint && yarn format:check && yarn build` green and
`/guide/romania` and `/template` looking as before (manual check of every region alone, all
regions, and the `Unless` pairs). `yarn build` must keep working **without** any server
environment variable.

| #   | Phase                                                                                                                                                                                                                | What changes for Romania                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | **Layout and ids.** `content/` layout, `content/types.ts`, `countries.ts` (with alpha-2), enum values and section ids renamed per §4.3, `legacy.ts` if published.                                                    | `romania.tsx` moves to `content/ro/`; enum values/members and section ids change; anchors change. Text identical.   |
| 2   | **Structure.** `defineGuide`, sections in `structure.ts`, labels/dates in `it/names.ts`, toc derived, `Chapter`/`Part`/`Timeline` take `section`.                                                                    | Prop refactor of ~25 sections; `headings`/`regions` constants move to `it/names.ts`. Text identical.                |
| 3   | **Validation.** `validateGuide` wired into the build and `yarn validate`.                                                                                                                                            | Fixes whatever it finds (reported to you before fixing, since they may be content errors).                          |
| 4   | **Trip filter prefs.** `nowhere.prefs` with schema 1 and the browser migration 0 → 1.                                                                                                                                | Filter reads the new key; old key migrated (with the id map if published).                                          |
| 5   | **Accounts and server.** Auth.js + Google + allowlist, `users`, `requireUser`, lazy MongoDB client, `db:setup` (validators, indexes), `/api/me`, `/account` page with sign-in/out, footer link, `.env.template`.     | None in the guide; a footer link.                                                                                   |
| 6   | **Places and collection.** `PlaceDef`, `PersonCard`, `CityCard`, `Event places`; `/api/visits`, `/api/notes`, `/api/photos` with R2 signed URLs; browser photo pipeline; trace UI (seen, photo, note); error states. | None visible: Romania has no places yet (its places list, A11, is a separate editorial task). Shown in `/template`. |
| 7   | **Lit map.** alpha-2 table, `/api/lit`, cover photo from the pin card, quieter treatment for guide countries.                                                                                                        | Romania is no longer lit by default; it is lit when you add a photo.                                                |
| 8   | **Export/import** on `/account`.                                                                                                                                                                                     | —                                                                                                                   |
| 9   | **Docs.** AGENTS.md, README.md, this document marked as implemented.                                                                                                                                                 | —                                                                                                                   |

Phases 5–8 need, from you: a MongoDB Atlas M0 cluster (connection string), a Google OAuth client
(redirect URI per environment), an R2 bucket with an API token and CORS, and the same variables in
the hosting environment. Until they exist, phases 5–8 are verified with a local MongoDB and
mocked bucket calls only, and I will say so.

### 11.1 Phase 6 as implemented

What the code does, where it differs from the sections above (follows the v4 design,
`Guida Romania - Sito v4.dc.html`):

- **Three built-in traces per country.** Every album opens with 01 **cover**, 02 **flag**,
  03 **coat of arms** (fixed order), added by `tracesOf()` (`content/build.ts`) and never written in a guide.
  Subjects (`content/subjects.ts`): the cover is `{ kind: 'country', id: cc }` (role `cover`, the
  same photo that will light the country on the map, §7); the others are places with reserved
  slugs, `<cc>.place.coat-of-arms` and `<cc>.place.flag` (the validator refuses them in
  `structure.traces`). Their stock images are the guide's cover and emblems (shown whole, `fit: 'contain'`, for the
  emblems); in the text the coat of arms and the flag are placed as traces with the kit's
  `<Emblem>`; their texts are UI
  strings (`guide.builtIn` in `i18n/it.json`); 1 point each. A guide's own traces follow from 04.
- **Structure, not `PlaceDef`/`PersonDef`/`CityCardDef`.** `TraceDef` (region, city, `where`:
  city/nearby/remote, rarity, icon, optional stock `image`, `isNew`) and `CardDef` (person or
  city, region, trace ids) in `content/types.ts`; texts in `names.traces` (`TraceText`: name,
  local, place line, optional text, "Come trovarla", note invite, distance) and `names.cards`. The card's
  prose is the kit's `<Card card on intro remember>`; `<Today traces>` is the "Oggi:" line under
  an event. `TraceKind` (on-route/detour) became `where` + rarity, as in the design.
- **Seen = has a photo.** The design asks for a photo to put a trace in the album, so there are
  no visits: `/api/visits` is not implemented and the `visits` collection stays unused.
- **One photo per subject.** Committing a photo tombstones the subject's previous one and deletes
  its objects (`lib/server/collection.ts`).
- **Routes:** `/api/photos` (GET, POST), `/api/photos/[id]/commit`, `/api/photos/[id]`
  (DELETE), `/api/notes` (GET, PUT; an empty text deletes the note, which also stores `country`
  for `?country=`). Subjects are checked against `content/structures.ts`.
- **Browser:** `lib/reader/photos.ts` (§6.4), `lib/reader/collection.ts` (one in-memory store per
  page instead of the `ReaderStore` interface; photos being uploaded are kept with a local
  preview, and those interrupted by the network restart when it comes back while the page is
  open). The UI caps notes at 300 characters (the server at 2000).
- **Pins** ("In evidenza") are a device preference in `nowhere.prefs` (`pins`, added within
  schema 1), for person and city cards only: pinning sections is not ported.
- **Not ported:** the "Per chi mi segue" note visibility, export/import (phase 8), the lit map
  and cover photos from the country card (phase 7).

---

## 12. Risks and open questions

**Risks**

- **Signed-out visitors see an unlit map.** With lighting tied to the signed-in reader, the
  public home no longer shows where the author has been. Intended by the brief; flagged because
  it changes what visitors see today.
- **Free tiers change.** Atlas may pause an idle M0 cluster; R2 needs a card on file. The
  export on `/account` is the safety net: take one now and then.
- **Auth.js v5** has had a long beta; the exact package version is pinned at implementation
  after reading its current docs and Next 16 compatibility.
- **No offline**: in places with poor coverage (Carpathians, monasteries) a photo cannot be added
  on the spot; it can be added later from the phone's gallery. An offline queue is designed
  (§9.3), not built.
- **Date parsing** of Italian event strings may hit edge cases at first; each unparseable date
  becomes an explicit `years` prop, a one-time cost.
- **Walking JSX** in the validator relies on helper components being pure functions of their
  props (true today). AGENTS.md will forbid hooks in content helpers.
- **Rename in phase 1** changes every anchor; shared links to `#s-4-2` rely on `legacyAnchors`
  if the guide was published.

**Answered** (revision 2): the guide is **not published yet**, so ids are renamed without
`legacy.ts` or anchor redirects (§4.4 does not apply); the site is hosted on **Vercel**
(environment variables in the Vercel project; Google callbacks for production and localhost);
section ids `ro.section.<topic>` and the §4.3 slugs are approved;
storage is remote (MongoDB + private object store); Google-only sign-in with an allowlist; no
followers, no offline queue; export/import kept.

**Still open**

1. **Object store**: Cloudflare R2 or Amazon S3 (§6.7)? Needed only from phase 6.
2. **Map**: how should guide countries that aren't lit look (proposed `neutral-400` fill)? Is
   there a design for it, for person/city cards and traces, and for `/account`, in the claude.ai
   design project?
3. **Cities in the trip filter**: the 8 Romanian cities are declared but not in the filter. Should
   city cards bring them back under their regions?
4. **Trace kind per place or per reference?** Proposed: per place, with an optional override on
   the reference (B10).
5. **Photo visibility** for future followers: all photos visible to followers, or a per-photo
   `visibility` like notes? (Adding the field now costs nothing.)
6. **Rules file name**: rename `PROMPT.md` to `regole-guide-paese.md`? Is `ROMANIA.md`
   superseded?
