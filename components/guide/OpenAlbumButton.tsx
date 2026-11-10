'use client'

import { BookOpenTextIcon, SquaresFourIcon } from '@phosphor-icons/react'
import { t } from '@/i18n'
import { openView, useGuideView } from './view'

/**
 * "Apri l’album" in the album opening: switches the guide to the album (without scrolling).
 * While the album is shown it becomes "Apri la guida" and switches back.
 */
export function OpenAlbumButton() {
  const album = useGuideView() === 'album'
  const Icon = album ? BookOpenTextIcon : SquaresFourIcon
  return (
    <button
      type="button"
      onClick={() => openView(album ? 'guide' : 'album')}
      className="btn btn-secondary flex min-h-[48px] flex-none gap-[8px] bg-bg text-base"
    >
      <Icon weight="duotone" size={20} aria-hidden="true" className="text-accent-700" />
      {album ? t.guide.album.openGuide : t.guide.album.open}
    </button>
  )
}
