import { ArrowRightIcon, XIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { Completion, type Scored } from './Completion'
import { t } from '@/i18n'

/**
 * The card of a country picked on the home map, port of "SchedaPaese.dc.html": name, close
 * button, the album completion (as in the map's hover) and the link to the guide, or "Guida non
 * ancora scritta". Shown for a tap on a guide country (touch has no hover) and for a country picked
 * in the search. Not ported yet: the cover photo ("Aggiungi una foto", Cambia/Togli).
 */
type Props = {
  name: string
  /** Guide URL, if the country has a ready guide. */
  href?: string
  /** The guide's traces, for the album completion. */
  traces?: Scored[]
  onClose: () => void
  /** Called before following the guide link. */
  onOpen?: () => void
}

export function CountryCard({ name, href, traces, onClose, onOpen }: Props) {
  return (
    <div
      role="group"
      aria-label={name}
      className="flex flex-col gap-3 font-body [text-wrap:pretty] text-text"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-[2px] pt-[6px]">
          <span className="text-xl leading-[1.2] font-semibold">{name}</span>
          {!href && <span className="text-sm text-neutral-700 italic">{t.map.noGuide}</span>}
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-icon -mt-1 -mr-2 size-[44px] flex-none text-text"
          aria-label={t.map.close}
          onClick={onClose}
        >
          <XIcon size={20} aria-hidden="true" />
        </button>
      </div>
      {href && traces && <Completion name={name} traces={traces} variant="card" />}
      {href && (
        <Link
          href={href}
          onClick={onOpen}
          className="btn btn-primary flex min-h-[48px] gap-[8px] text-base text-bg no-underline"
        >
          {t.map.openGuide} <ArrowRightIcon weight="duotone" size={18} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
