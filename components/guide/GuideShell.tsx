'use client'

import { ArrowLeftIcon, ListIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AccountMenu } from '@/components/AccountMenu'
import { Completion } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import { anchorOf, type Place, type TocEntry } from '@/content/types'
import { Album } from './Album'
import { Toc } from './Toc'
import { TripFilter } from './TripFilter'
import { TripProvider, useTrip } from './trip'
import { GUIDE_BAR_ID, setGuideView, useGuideView, type GuideView } from './view'
import { t } from '@/i18n'

/**
 * Reading layout of a guide, from "Guida Romania - Sito v4.dc.html". A sticky top bar: country
 * (from 960px), Guida/Album switch, album completion, and on the right the current section (from
 * 960px, once the bar is stuck) or the index button (below 960px). Under it, the text (sticky
 * sidebar with the trip filter and the index on wide screens, full-screen index menu below 960px)
 * or the album. The bar keeps its right end free for the account button (see useBarPush).
 */
export function GuideShell(props: {
  /** ISO 3166-1 alpha-2: the trip filter's key in the reader's prefs. */
  countryId: string
  country: string
  places: Place[]
  toc: TocEntry[]
  traces: AlbumTrace[]
  children: ReactNode
}) {
  return (
    <TripProvider country={props.countryId} places={props.places}>
      <Shell {...props} />
    </TripProvider>
  )
}

/** The section whose top has passed 35% of the viewport. */
function useActiveSection(ids: string[], recheck: unknown) {
  const [active, setActive] = useState(ids[0] ?? '')
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(anchorOf(id))
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, recheck])
  return active
}

/** Whether the element placed right above a sticky bar has scrolled out the top (bar stuck). */
function useStuck() {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) =>
      setStuck(!e.isIntersecting && e.boundingClientRect.top < 0),
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, stuck] as const
}

/** Bar height and account button size: the button settles centered in the stuck bar. */
const BAR = 64
const BUTTON = 48

/**
 * Publishes the bar's top edge (viewport px) as --bar-y on the account button's wrapper. Its `top`
 * is min(var(--edge), max(8px, bar top + 8px)): fixed where the home has it until the bar comes
 * up to it, then pushed up with the bar, and sticky once centered in the stuck bar.
 */
function useBarPush() {
  const bar = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const frame = { id: 0 }
    const update = () => {
      frame.id = 0
      if (bar.current && button.current)
        button.current.style.setProperty('--bar-y', `${bar.current.getBoundingClientRect().top}px`)
    }
    const schedule = () => {
      if (!frame.id) frame.id = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame.id)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return [bar, button] as const
}

function Shell({
  countryId,
  country,
  places,
  toc,
  traces,
  children,
}: {
  countryId: string
  country: string
  places: Place[]
  toc: TocEntry[]
  traces: AlbumTrace[]
  children: ReactNode
}) {
  const view = useGuideView()
  const total = traces.reduce((sum, tr) => sum + tr.points, 0)
  const trip = useTrip()
  const [menu, setMenu] = useState(false)
  const ids = useMemo(() => toc.map((e) => e.id), [toc])
  const active = useActiveSection(ids, trip)
  const current = (toc.find((e) => e.id === active) ?? toc[0])?.label
  const [sentinel, stuck] = useStuck()
  const [barRef, buttonRef] = useBarPush()
  const inset = (BAR - BUTTON) / 2

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    const mq = window.matchMedia('(min-width: 960px)')
    const onWide = () => mq.matches && setMenu(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
      document.documentElement.style.overflow = ''
    }
  }, [menu])

  return (
    <div className="relative">
      <div ref={sentinel} aria-hidden />
      <div
        ref={buttonRef}
        className="fixed right-(--edge) z-30"
        // Before hydration --bar-y is unset: the fallback keeps the button at var(--edge).
        style={{ top: `min(var(--edge), max(${inset}px, calc(var(--bar-y, 100vh) + ${inset}px)))` }}
      >
        <AccountMenu />
      </div>
      <div
        ref={barRef}
        id={GUIDE_BAR_ID}
        className="sticky top-0 z-20 flex h-[64px] items-center gap-2 bg-bg pr-[calc(var(--edge)+56px)] pl-[clamp(16px,4.5vw,64px)] shadow-sm"
      >
        <a
          href="#top"
          className="mr-3 hidden flex-none text-xs font-semibold tracking-[.16em] text-accent-700 uppercase no-underline min-[960px]:block"
        >
          {country}
        </a>
        <div
          role="group"
          aria-label={t.guide.view.label}
          className="flex flex-none gap-[2px] rounded-md bg-surface p-[3px]"
        >
          {(['guide', 'album'] as GuideView[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setGuideView(v)}
              className={`min-h-[40px] cursor-pointer rounded-sm border-0 px-3 font-body text-[15px] text-text hover:text-accent-800 ${view === v ? 'bg-bg font-semibold shadow-sm' : 'bg-transparent'}`}
            >
              {t.guide.view[v]}
            </button>
          ))}
        </div>
        <Completion
          country={countryId}
          name={country}
          total={total}
          className="ml-2 max-w-[220px] flex-[1_1_auto]"
        />
        <div className="flex-1" />
        {/* The current section, once the reader is in the text: the bar is stuck. */}
        {stuck && view === 'guide' && (
          <span className="mr-3 hidden min-w-0 flex-[0_1_auto] truncate text-[15px] text-neutral-800 italic min-[960px]:block">
            {current}
          </span>
        )}
        <button
          type="button"
          hidden={view !== 'guide'}
          className="grid size-[44px] flex-none cursor-pointer place-items-center border-0 bg-transparent p-0 text-text hover:text-accent-700 min-[960px]:hidden"
          aria-label={t.guide.shell.index}
          aria-haspopup="dialog"
          onClick={() => setMenu(true)}
        >
          <ListIcon size={22} aria-hidden="true" />
        </button>
      </div>

      {view === 'album' && (
        <Album countryId={countryId} name={country} places={places} traces={traces} />
      )}
      {/* The text stays mounted (and server-rendered) while the album is shown. */}
      <div
        hidden={view !== 'guide'}
        className="flex justify-center gap-[clamp(48px,7vw,104px)] px-[clamp(20px,5vw,48px)] pt-[clamp(72px,11vw,144px)]"
      >
        <aside className="hidden flex-[0_0_232px] min-[960px]:block">
          {/* Trip filter and index title stay put; only the index list scrolls. */}
          <div className="sticky top-[104px] flex max-h-[calc(100vh-144px)] flex-col gap-[50px]">
            <div className="flex-none">
              <TripFilter country={country} size="sidebar" />
            </div>
            <nav aria-label={t.guide.shell.index} className="flex min-h-0 flex-col gap-4">
              <div className="flex-none text-[11px] tracking-[.16em] text-neutral-700 uppercase">
                {t.guide.shell.index}
              </div>
              <div className="min-h-0 overflow-y-auto overscroll-contain pb-8">
                <Toc entries={toc} active={active} size="sidebar" />
              </div>
            </nav>
          </div>
        </aside>
        <main className="flex min-w-0 flex-[0_1_720px] flex-col gap-20 text-[17px] leading-[1.6] text-pretty">
          {children}
        </main>
      </div>

      {menu && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.guide.shell.index}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg px-[clamp(16px,5vw,32px)] pb-8"
        >
          <div className="flex h-[56px] flex-none items-center justify-between">
            <span className="text-xs font-semibold tracking-[.16em] text-accent-700 uppercase">
              {country}
            </span>
            <button
              type="button"
              className="btn btn-ghost min-h-[44px]"
              autoFocus
              onClick={() => setMenu(false)}
            >
              {t.guide.shell.close}
            </button>
          </div>
          <div className="mt-4">
            <TripFilter country={country} size="menu" />
          </div>
          <div className="mt-8 text-[11px] tracking-[.16em] text-neutral-700 uppercase">
            {t.guide.shell.index}
          </div>
          <nav aria-label={t.guide.shell.index} className="mt-2">
            <Toc entries={toc} active={active} size="menu" onNavigate={() => setMenu(false)} />
          </nav>
          <Link
            href="/"
            className="mt-8 flex min-h-[44px] items-center gap-[8px] text-[17px] text-accent-700 no-underline"
          >
            <ArrowLeftIcon weight="duotone" size={18} />
            {t.common.backToMap}
          </Link>
        </div>
      )}
    </div>
  )
}
