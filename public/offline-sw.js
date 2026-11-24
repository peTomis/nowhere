/*
 * Offline guides (lib/offline.ts). Registered only after a download. Pages and files come from the
 * network while it answers, and from the saved snapshot when it doesn't: the snapshot is never
 * refreshed from here, so its pages always find the scripts they were saved with. Personal data
 * (/api/) is never cached. Guide images may come from the asset CDN (lib/assets.ts): its origin
 * is passed as `?assets=` when the worker is registered, and it is served the same way.
 */
const PREFIX = 'nowhere-offline-'
const META = 'nowhere-offline-meta'
// How long a page or a file may take before the saved copy is shown instead.
const TIMEOUT = 4000
const ASSETS = new URL(self.location.href).searchParams.get('assets')

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

async function snapshot() {
  const meta = await caches.match('/__offline', { cacheName: META })
  if (!meta) return null
  const { id, home } = await meta.json()
  if (!(await caches.has(PREFIX + id))) return null
  const cache = await caches.open(PREFIX + id)
  return { cache, home }
}

/** The network, or the saved copy if the network fails or is too slow. */
async function networkFirst(request, saved) {
  const network = fetch(request)
  network.catch(() => {}) // a late failure after the saved copy was shown
  try {
    return await Promise.race([
      network,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT)),
    ])
  } catch {
    const copy = await saved
    return copy ?? network
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) {
    // Guide images from the asset CDN, saved under their full URL (with `?v=`).
    if (ASSETS && url.origin === ASSETS)
      event.respondWith(
        snapshot().then((s) =>
          s ? networkFirst(request, s.cache.match(request.url)) : fetch(request),
        ),
      )
    return
  }
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/webpack-hmr')) return
  // Router data (RSC): when it fails, Next.js loads the page instead, which is served below.
  if (request.headers.get('rsc') || url.searchParams.has('_rsc')) return

  event.respondWith(
    (async () => {
      const saved = await snapshot()
      if (!saved) return fetch(request)
      const { cache, home } = saved
      // Hashed build files never change: the saved copy is as good as the network's.
      if (url.pathname.startsWith('/_next/static/'))
        return (await cache.match(request, { ignoreSearch: true })) ?? fetch(request)
      if (request.mode === 'navigate') {
        // Online, the server redirects `/` to a language: offline, to the saved one.
        const copy =
          url.pathname === '/' && home
            ? Promise.resolve(Response.redirect(new URL(home, self.location.origin).href, 302))
            : cache.match(url.pathname)
        return networkFirst(request, copy)
      }
      // Optimized images: offline, the saved original stands in for any size.
      if (url.pathname === '/_next/image') {
        const original = url.searchParams.get('url')
        return networkFirst(request, original ? cache.match(original) : undefined)
      }
      return networkFirst(request, cache.match(request, { ignoreSearch: true }))
    })(),
  )
})
