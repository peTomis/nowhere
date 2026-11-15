import 'server-only'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { guides } from '@/content/countries'
import { guideContent } from '@/content/guides'

/** What an offline download saves (lib/offline.ts): the pages, then the public files they use. */
export type OfflineManifest = {
  routes: string[]
  files: string[]
  /** Size of `files` in bytes (the pages and their scripts come on top). */
  bytes: number
}

const PUBLIC = join(process.cwd(), 'public')

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(join(PUBLIC, dir), { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`/${dir}/${e.name}`])),
  )
  return nested.flat().filter((f) => !f.split('/').pop()!.startsWith('.'))
}

/**
 * The home and every ready guide, the world map, the app icons and the guides' images. Public
 * and the same for everyone: computed once, at build time.
 */
export async function offlineManifest(): Promise<OfflineManifest> {
  'use cache'
  const ready = guides.filter((g) => g.status === 'ready' && guideContent[g.slug])
  const routes = ['/', ...ready.map((g) => `/guide/${g.slug}`)]
  const files = [
    '/data/world-50m.json',
    ...(await walk('icons')),
    ...(await Promise.all(ready.map((g) => walk(`guides/${g.slug}`)))).flat(),
  ]
  const sizes = await Promise.all(files.map((f) => stat(join(PUBLIC, f)).then((s) => s.size)))
  return { routes, files, bytes: sizes.reduce((a, b) => a + b, 0) }
}
