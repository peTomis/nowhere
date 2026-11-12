import { format, t } from '@/i18n'
import type { ChapterEntry } from '@/content/build'
import { anchorOf } from '@/content/types'

type ChapterSummaryProps = { chapters: ChapterEntry[] }

/**
 * "La guida in sei capitoli", at the top of the text (Sito v5): the guide's chapters with their
 * number, fixed title and the guide's line under it.
 */
export function ChapterSummary({ chapters }: ChapterSummaryProps) {
  if (chapters.length === 0) return null
  return (
    <nav aria-label={t.guide.summary.label} className="flex flex-col gap-4">
      <div className="text-[11px] tracking-[.16em] text-neutral-700 uppercase">
        {format(t.guide.summary.title, { count: t.guide.summary.count[chapters.length - 1] })}
      </div>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-x-6 gap-y-4 p-0">
        {chapters.map((c) => (
          <li key={c.id}>
            <a
              href={`#${anchorOf(c.id)}`}
              className="grid min-h-[44px] grid-cols-[28px_minmax(0,1fr)] text-text no-underline hover:text-accent-800"
            >
              <span className="text-xl leading-[1.2] font-semibold text-accent-700 tabular-nums">
                {c.number}
              </span>
              <span className="flex flex-col gap-[2px]">
                <span className="text-xl leading-[1.2] font-semibold">{c.title}</span>
                {/* At most two lines: a long list (cities, landscapes) ends in an ellipsis. */}
                <span
                  title={c.line}
                  className="line-clamp-2 text-sm leading-[1.35] text-neutral-700 italic"
                >
                  {c.line}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
