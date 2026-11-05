import 'server-only'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** `src` if the file exists under `public/`, so pages can fall back while assets are missing. */
export function publicAsset(src: string | undefined): string | undefined {
  if (!src) return undefined
  return existsSync(join(process.cwd(), 'public', src)) ? src : undefined
}
