import type { NextConfig } from 'next'
import { DEFAULT_LOCALE, LOCALES } from './i18n/config'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // The root layout is app/[lang]/layout.tsx: URLs outside it get app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    // Only the guide images may be optimized: from the bucket (app/assets/, the hash is in the
    // path) or the local copy (public/guides/). No query strings.
    localPatterns: [
      { pathname: '/assets/**', search: '' },
      { pathname: '/guides/**', search: '' },
    ],
  },
  // URLs from before the language prefix (docs/data-model.md §5.3). The bare `/` is temporary,
  // so it can later follow the browser's language; old links were written in Italian.
  async redirects() {
    return [
      { source: '/', destination: '/it', permanent: false },
      { source: '/guide/:slug', destination: '/it/guide/:slug', permanent: true },
      { source: '/account', destination: '/it/account', permanent: true },
      { source: '/template', destination: '/it/template', permanent: true },
    ]
  },
  // A first segment that is no language (`/xx`, `/xx/account`) would reach app/[lang]/ with an
  // unknown root param, which renders without HTML: sent instead to a path that matches nothing,
  // so it gets the 404 page. After files (public/, /_next) and before dynamic routes, which is why
  // the other dynamic routes outside app/[lang]/ (api, assets) are left out.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: `/:first((?!(?:${LOCALES.join('|')}|api|assets)(?:/|$))[^/.]+)/:rest*`,
          destination: `/${DEFAULT_LOCALE}/404`,
        },
      ],
      fallback: [],
    }
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
