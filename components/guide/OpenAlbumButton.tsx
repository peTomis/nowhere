'use client'

import { SquaresFourIcon } from '@phosphor-icons/react'
import { t } from '@/i18n'
import { openAlbum } from './view'

/** "Apri l’album": switches the guide to the album view and scrolls the bar to the top. */
export function OpenAlbumButton() {
  return (
    <button
      type="button"
      onClick={openAlbum}
      className="btn btn-secondary flex min-h-[48px] flex-none gap-[8px] bg-bg text-base"
    >
      <SquaresFourIcon weight="duotone" size={20} aria-hidden="true" className="text-accent-700" />
      {t.guide.album.open}
    </button>
  )
}
