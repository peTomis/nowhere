import { assetFiles } from '@/lib/assets'
import { read } from '@/lib/server/bucket'

/*
 * Guide images from the private bucket (lib/assets.ts): `/assets/<hash>/guides/<slug>/…`. Only
 * the files content/assets.json lists, at their current hash, so nothing else in the bucket (the
 * readers' photos) can be reached from here. The hash makes the URL immutable: the CDN and the
 * browser keep the answer for a year, and the function runs once per image per region.
 */

const TYPES: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
}

const notFound = () => new Response('Not found', { status: 404 })

export async function GET(_req: Request, ctx: RouteContext<'/assets/[...path]'>) {
  const [hash, ...rest] = (await ctx.params).path
  const src = `/${rest.join('/')}`
  const entry = assetFiles[src]
  if (!entry || entry.hash !== hash) return notFound()
  const object = await read(`assets${src}`)
  if (!object) return notFound()
  return new Response(object.body, {
    headers: {
      'content-type': TYPES[src.split('.').pop()!.toLowerCase()] ?? 'application/octet-stream',
      ...(object.length ? { 'content-length': String(object.length) } : {}),
      'cache-control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      // An SVG opened on its own runs as a document of this origin: nothing may run in it.
      'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      'x-content-type-options': 'nosniff',
    },
  })
}
