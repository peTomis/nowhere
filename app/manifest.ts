import type { MetadataRoute } from 'next'
import { t } from '@/i18n'

/** Web manifest: name and icons used when the site is added to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nowhere',
    short_name: 'Nowhere',
    description: t.meta.description,
    start_url: '/',
    display: 'standalone',
    // --color-bg (styles/theme.css), as the viewport themeColor in app/layout.tsx.
    background_color: '#f3f2f2',
    theme_color: '#f3f2f2',
    // Icons rendered from app/icon.svg by scripts/app-icons.mjs; the symbol sits in the
    // maskable safe zone, so the same files serve both purposes.
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
