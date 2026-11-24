import 'server-only'
import { existsSync, statSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import manifest from '@/content/assets.json'

/*
 * Guide images (covers, emblems, stock images of the traces, figures): content, not code, so not
 * in git. They live in the private bucket under `assets/` (next to the readers' photos, which stay
 * private) and the site serves them itself: app/assets/[...path]/route.ts. Content names them by
 * path, the same in every language: `/guides/romania/traces/bran-castle.webp`.
 *
 * - With a local copy in public/guides/ (`yarn assets pull`, or a new image not pushed yet), the
 *   page uses it directly: `/guides/romania/cover.jpg`.
 * - Otherwise (production: public/guides/ is gitignored) an image exists when content/assets.json
 *   lists it, and its URL carries the file's hash: `/assets/25540717e126/guides/romania/cover.jpg`.
 *   The CDN keeps it forever; a replaced file gets a new hash, so a new URL.
 *
 * A missing image is never an error: the page shows a placeholder instead.
 */

type Entry = { bytes: number; hash: string }

export const assetFiles: Partial<Record<string, Entry>> = manifest
const PUBLIC = join(process.cwd(), 'public')

const local = (src: string) => existsSync(join(PUBLIC, src))
const served = (src: string, entry: Entry) => `/assets/${entry.hash}${src}`

/** The URL of an image if it exists, else undefined (the page shows a placeholder). */
export function asset(src: string | undefined): string | undefined {
  if (!src) return undefined
  if (local(src)) return src
  const entry = assetFiles[src]
  return entry && served(src, entry)
}

/** Every image under a folder (`/guides/romania`), with its URL and size: the offline download. */
export async function assetsUnder(dir: string): Promise<{ url: string; bytes: number }[]> {
  const prefix = `${dir.replace(/\/+$/, '')}/`
  if (!local(prefix))
    return Object.entries(assetFiles)
      .filter(([src]) => src.startsWith(prefix))
      .map(([src, entry]) => ({ url: served(src, entry!), bytes: entry!.bytes }))
  const walk = async (rel: string): Promise<string[]> => {
    const entries = await readdir(join(PUBLIC, rel), { withFileTypes: true }).catch(() => [])
    const nested = await Promise.all(
      entries.map((e) => (e.isDirectory() ? walk(`${rel}/${e.name}`) : [`${rel}/${e.name}`])),
    )
    return nested.flat().filter((f) => !f.split('/').pop()!.startsWith('.'))
  }
  return (await walk(prefix.slice(0, -1))).map((url) => ({
    url,
    bytes: statSync(join(PUBLIC, url)).size,
  }))
}
