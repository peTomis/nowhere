import { Completion } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import { format, t } from '@/i18n'
import { OpenAlbumButton } from './OpenAlbumButton'

/**
 * The album part of the guide's opening, from "Guida Romania - Sito v4.dc.html" ("Apertura",
 * between the cover and the sticky bar): title with the number of traces, full completion, and
 * the button that switches to the album. The opening's "Personaggi e città" is not ported.
 */
type Props = {
  /** ISO 3166-1 alpha-2. */
  countryId: string
  name: string
  traces: AlbumTrace[]
}

export function GuideAlbumIntro({ countryId, name, traces }: Props) {
  const regions = new Set(traces.map((tr) => tr.region)).size
  const summary =
    traces.length === 0
      ? t.guide.album.noTraces
      : format(traces.length === 1 ? t.guide.album.tracesOne : t.guide.album.traces, {
          n: traces.length,
          regions,
        })
  return (
    <section
      aria-label={t.guide.album.title}
      className="px-[clamp(16px,4.5vw,64px)] pt-[clamp(32px,6vw,64px)] pb-[clamp(40px,6vw,72px)]"
    >
      <div className="flex flex-wrap items-center gap-x-[clamp(24px,4vw,64px)] gap-y-4">
        <div className="flex flex-none flex-col gap-[2px]">
          <h2 className="m-0 text-[clamp(28px,4.4vw,36px)] leading-[1.1]">{t.guide.album.title}</h2>
          <span className="text-sm text-neutral-700">{summary}</span>
        </div>
        <Completion
          country={countryId}
          name={name}
          total={traces.reduce((sum, tr) => sum + tr.points, 0)}
          variant="full"
          className="flex-[1_1_320px]"
        />
        <OpenAlbumButton />
      </div>
    </section>
  )
}
