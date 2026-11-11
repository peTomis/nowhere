import { Completion, type Scored } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import { format, t } from '@/i18n'
import { OpenAlbumButton } from './OpenAlbumButton'

/**
 * The album part of the guide's opening, from "Guida Romania - Sito v4.dc.html" ("Apertura",
 * between the cover and the sticky bar): title with the number of traces, full completion and the
 * button that switches to the album. The design's "Personaggi e città" list is deliberately left
 * out: the cards are reached from the index.
 */
type Props = {
  name: string
  traces: AlbumTrace[]
  scored: Scored[]
}

export function GuideAlbumIntro({ name, traces, scored }: Props) {
  const regions = new Set(traces.flatMap((tr) => (tr.region ? [tr.region] : []))).size
  const summary =
    traces.length === 0
      ? t.guide.album.noTraces
      : format(
          regions === 0
            ? t.guide.album.tracesOnly
            : regions === 1
              ? t.guide.album.tracesOneRegion
              : t.guide.album.traces,
          { n: traces.length, regions },
        )
  return (
    // The sticky bar (64px) is pulled up over the bottom padding: the padding is the bar's height
    // plus a gap, so the last row (the button, on phones) is never under the bar when it turns
    // opaque.
    <section
      aria-label={t.guide.album.title}
      className="flex flex-col gap-[clamp(40px,6vw,72px)] px-[clamp(16px,4.5vw,64px)] pt-[clamp(32px,6vw,64px)] pb-[calc(64px+clamp(24px,3vw,32px))]"
    >
      <div className="flex flex-wrap items-center gap-x-[clamp(24px,4vw,64px)] gap-y-4">
        <div className="flex flex-none flex-col gap-[2px]">
          <h2 className="m-0 text-[clamp(28px,4.4vw,36px)] leading-[1.1]">{t.guide.album.title}</h2>
          <span className="text-sm text-neutral-700">{summary}</span>
        </div>
        <Completion name={name} traces={scored} variant="full" className="flex-[1_1_320px]" />
        <OpenAlbumButton />
      </div>
    </section>
  )
}
