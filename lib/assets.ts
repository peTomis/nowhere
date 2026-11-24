import 'server-only'
import { existsSync, statSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import manifest from '@/content/assets.json'

/*
 * Guide images (covers, emblems, stock images of the traces, figures): content, not code. They
 * live in a public bucket served by a CDN (ASSETS_URL), separate from the private bucket of the
 * readers' photos, and are named in content by their path, the same in every language:
 * `/guides/romania/traces/bran-castle.webp`.
 *
 * - With ASSETS_URL (production, previews): an image exists when content/assets.json lists it;
 *   its URL carries the file's hash (`?v=`), so the CDN can cache it forever and a replaced file
 *   gets a new URL. The manifest is written by `yarn assets push`.
 * - Without (local work): the files are read from `public/` (`yarn assets pull` fetches them;
 *   the folder is gitignored), so a new image shows up before it is pushed.
 *
 * A missing image is never an error: the page shows a placeholder instead.
 */

type Entry = { bytes: number; hash: string }

const files: Partial<Record<string, Entry>> = manifest
const base = process.env.ASSETS_URL?.replace(/\/+$/, '') || undefined
const PUBLIC = join(process.cwd(), 'public')

/** Origin of the asset CDN, when images come from it (the offline worker must know it). */
export const assetsOrigin = base && new URL(base).origin

/** The URL of an image if it exists, else undefined (the page shows a placeholder). */
export function asset(src: string | undefined): string | undefined {
  if (!src) return undefined
  if (base) {
    const entry = files[src]
    return entry && `${base}${src}?v=${entry.hash}`
  }
  return existsSync(join(PUBLIC, src)) ? src : undefined
}

/** Every image under a folder (`/guides/romania`), with its URL and size: the offline download. */
export async function assetsUnder(dir: string): Promise<{ url: string; bytes: number }[]> {
  const prefix = `${dir.replace(/\/+$/, '')}/`
  if (base)
    return Object.entries(files)
      .filter(([src]) => src.startsWith(prefix))
      .map(([src, entry]) => ({ url: `${base}${src}?v=${entry!.hash}`, bytes: entry!.bytes }))
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
