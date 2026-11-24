'use client'

import { format } from '@/i18n'
import { useT } from '@/i18n/client'
import { builtInTrace, subjectKey } from '@/content/subjects'
import { PREPAINT } from '@/lib/reader/cache'
import { useEntry } from '@/lib/reader/collection'
import { photoSrc } from './Trace'

/**
 * The reader's photo of the cover trace (01), over the guide's stock cover. Always rendered,
 * hidden while there is no photo: the cover's inline script (prepaintCover) fills it from the
 * local copy before the first paint, and React keeps what it set (suppressHydrationWarning), then
 * renders the same values once hydrated.
 */
export function CoverPhoto({ country, name }: { country: string; name: string }) {
  const t = useT()
  const src = photoSrc(useEntry(subjectKey(builtInTrace(country, 'cover').subject)), 'full')
  return (
    // The reader's own upload (presigned or a blob: URL): next/image would add nothing.
    // oxlint-disable-next-line nextjs/no-img-element
    <img
      id={PREPAINT.coverPhoto}
      src={src}
      hidden={!src}
      alt={format(t.guide.photo.coverAlt, { name })}
      className="absolute inset-0 size-full object-cover"
      suppressHydrationWarning
    />
  )
}
