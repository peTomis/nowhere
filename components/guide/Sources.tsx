import type { SourceChapter } from '@/content/build'
import type { SourceRef } from '@/content/types'
import { format, t } from '@/i18n'
import { SourcesToggle } from './SourcesToggle'
import { Only } from './trip'

/** HTML id of the sources section, and its entry in the index. */
export const SOURCES_ID = 'sources'

type SourcesProps = {
  /** Country name, in the kicker. */
  name: string
  chapters: SourceChapter[]
}

/**
 * "Fonti", the last section of a guide's text (not in the design): the pages read while writing
 * it, in the order of the index, closed behind "Mostra le fonti" (SourcesToggle). Per chapter,
 * its general works, then its parts and cards with sources. Gated by the trip filter, as the rest
 * of the text. Nothing without sources.
 */
export function Sources({ name, chapters }: SourcesProps) {
  const n = chapters.reduce(
    (sum, c) => sum + c.refs.length + c.groups.reduce((s, g) => s + g.refs.length, 0),
    0,
  )
  if (n === 0) return null
  return (
    <section id={SOURCES_ID} className="flex scroll-mt-[80px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xs tracking-[.16em] text-accent-700 uppercase">
          {format(t.guide.sources.kicker, { name, n })}
        </div>
        <h2 className="m-0 text-[clamp(38px,7vw,56px)] leading-[1.04] tracking-[-.02em]">
          {t.guide.sources.heading}
        </h2>
        <p className="mt-1 mb-0 max-w-[36ch] text-[clamp(19px,3vw,21px)] leading-[1.35] text-neutral-800 italic">
          {t.guide.sources.lede}
        </p>
      </div>
      <SourcesToggle>
        {chapters.map((c) => (
          <Only key={c.id} on={c.on}>
            <section aria-labelledby={`sources-${c.id}`} className="flex flex-col gap-6">
              <h3
                id={`sources-${c.id}`}
                className="m-0 flex items-baseline gap-3 text-[clamp(24px,4.5vw,30px)] leading-[1.15]"
              >
                {c.number !== undefined && (
                  <span className="font-semibold text-accent-700 tabular-nums">{c.number}</span>
                )}
                {c.title}
              </h3>
              {c.refs.length > 0 && <Group label={t.guide.sources.chapterSources} refs={c.refs} />}
              {c.groups.map((g) => (
                <Only key={g.id} on={g.on}>
                  <Group label={g.label} refs={g.refs} />
                </Only>
              ))}
            </section>
          </Only>
        ))}
      </SourcesToggle>
    </section>
  )
}

function Group({ label, refs }: { label: string; refs: SourceRef[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h4 className="m-0 text-xl leading-[1.2] font-semibold">{label}</h4>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {refs.map((r) => (
          <li key={r.url} className="flex flex-col gap-[2px] text-[15px] leading-[1.4]">
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wrap-break-word text-text underline decoration-neutral-400 underline-offset-[3px] hover:text-accent-800 hover:decoration-accent-600"
            >
              {r.title}
            </a>
            <span className="text-[13px] text-neutral-700">{r.site}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
