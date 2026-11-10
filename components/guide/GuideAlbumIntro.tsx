import { MapPinIcon } from '@phosphor-icons/react/ssr'
import { Completion, type Scored } from '@/components/Completion'
import type { AlbumTrace, GuideCard } from '@/content/build'
import { format, t } from '@/i18n'
import { CardLink } from './CardLink'
import { OpenAlbumButton } from './OpenAlbumButton'

/**
 * The album part of the guide's opening, from "Guida Romania - Sito v4.dc.html" ("Apertura",
 * between the cover and the sticky bar): title with the number of traces, full completion, the
 * button that switches to the album, and "Personaggi e città": the guide's cards, with their
 * number of traces, linking to them in the text.
 */
type Props = {
  name: string
  traces: AlbumTrace[]
  scored: Scored[]
  cards: GuideCard[]
}

export function GuideAlbumIntro({ name, traces, scored, cards }: Props) {
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
    <section
      aria-label={t.guide.album.title}
      className="flex flex-col gap-[clamp(40px,6vw,72px)] px-[clamp(16px,4.5vw,64px)] pt-[clamp(32px,6vw,64px)] pb-[clamp(40px,6vw,72px)]"
    >
      <div className="flex flex-wrap items-center gap-x-[clamp(24px,4vw,64px)] gap-y-4">
        <div className="flex flex-none flex-col gap-[2px]">
          <h2 className="m-0 text-[clamp(28px,4.4vw,36px)] leading-[1.1]">{t.guide.album.title}</h2>
          <span className="text-sm text-neutral-700">{summary}</span>
        </div>
        <Completion name={name} traces={scored} variant="full" className="flex-[1_1_320px]" />
        <OpenAlbumButton />
      </div>
      {cards.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="m-0 text-[11px] font-normal tracking-[.16em] text-neutral-700 uppercase">
            {t.guide.album.peopleAndCities}
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-[clamp(24px,4vw,64px)] gap-y-6 p-0">
            {cards.map((c) => (
              <li key={c.id}>
                <CardLink anchor={c.anchor}>
                  <span className="text-[11px] tracking-[.16em] text-accent-700 uppercase">
                    {t.guide.album.kind[c.kind]} · {c.regionName}
                  </span>
                  <span className="text-[clamp(24px,3.6vw,30px)] leading-[1.1] font-semibold">
                    {c.name}
                  </span>
                  {(c.local || c.dates) && (
                    <span className="text-[15px] text-neutral-700 italic">
                      {[c.local, c.dates].filter(Boolean).join(', ')}
                    </span>
                  )}
                  <span className="mt-[2px] flex items-center gap-[6px] text-sm text-neutral-800">
                    <MapPinIcon
                      weight="duotone"
                      size={16}
                      aria-hidden="true"
                      className="text-accent-700"
                    />
                    {c.traces.length === 1
                      ? t.guide.album.cardTracesOne
                      : format(t.guide.album.cardTraces, { n: c.traces.length })}
                  </span>
                </CardLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
