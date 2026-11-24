import 'server-only'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { guides } from '@/content/countries'
import { readyGuides } from '@/content/guides'
import { LOCALES, paths, type Locale } from '@/i18n'
import { assetsOrigin, assetsUnder } from '@/lib/assets'

/** What an offline download saves (lib/offline.ts): the pages, then the files they use. */
export type OfflineManifest = {
  /** Pages by language: a download saves those of the reader's language only. */
  routes: Record<Locale, string[]>
  /** Same-origin paths or asset CDN URLs: the same images serve every language. */
  files: string[]
  /** Size of `files` in bytes (the pages and their scripts come on top). */
  bytes: number
  /** Origin of the asset CDN, if images come from one: the worker serves it offline too. */
  assetsOrigin?: string
}

const PUBLIC = join(process.cwd(), 'public')

async function publicFiles(dir: string) {
  const entries = await readdir(join(PUBLIC, dir), { withFileTypes: true }).catch(() => [])
  return entries
    .filter((e) => e.isFile() && !e.name.startsWith('.'))
    .map((e) => `/${dir}/${e.name}`)
}

/**
 * The home and every ready guide, the world map, the app icons and the guides' images. Public
 * and the same for everyone: computed once, at build time.
 */
export async function offlineManifest(): Promise<OfflineManifest> {
  'use cache'
  const routes = Object.fromEntries(
    LOCALES.map((lang) => [
      lang,
      [paths.home(lang), ...readyGuides(lang).map((g) => paths.guide(lang, g.slug))],
    ]),
  ) as Record<Locale, string[]>
  // A guide's images are the same in every language: listed once.
  const slugs = new Set(LOCALES.flatMap((lang) => readyGuides(lang).map((g) => g.slug)))
  const local = ['/data/world-50m.json', ...(await publicFiles('icons'))]
  const names = (await publicFiles('data/country-names')).filter((f) => f.endsWith('.json'))
  const images = (
    await Promise.all(
      guides.filter((g) => slugs.has(g.slug)).map((g) => assetsUnder(`/guides/${g.slug}`)),
    )
  ).flat()
  const localSizes = await Promise.all(
    [...local, ...names].map((f) => stat(join(PUBLIC, f)).then((s) => s.size)),
  )
  return {
    routes,
    files: [...local, ...names, ...images.map((i) => i.url)],
    bytes: [...localSizes, ...images.map((i) => i.bytes)].reduce((a, b) => a + b, 0),
    assetsOrigin,
  }
}
