'use client'

import { BooksIcon } from '@phosphor-icons/react'
import { useId, useState, type ReactNode } from 'react'
import { t } from '@/i18n'

/**
 * "Mostra le fonti": the list of sources stays closed under its heading, so the page ends sooner.
 * The button looks like "Apri l’album"; once open it reads "Nascondi le fonti". The list is
 * rendered on the server in any case (hidden, not left out).
 */
export function SourcesToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="btn btn-secondary flex min-h-[48px] flex-none gap-[8px] self-start bg-bg text-base"
      >
        <BooksIcon weight="duotone" size={20} aria-hidden="true" className="text-accent-700" />
        {open ? t.guide.sources.hide : t.guide.sources.show}
      </button>
      <div id={id} hidden={!open} className="flex flex-col gap-12">
        {children}
      </div>
    </>
  )
}
