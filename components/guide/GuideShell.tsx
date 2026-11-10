'use client'

import { ArrowLeftIcon, ListIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AccountMenu } from '@/components/AccountMenu'
import { Logo } from '@/components/Logo'
import { Completion } from '@/components/Completion'
import type { AlbumTrace, GuideCard } from '@/content/build'
import { anchorOf, type Place, type TocEntry } from '@/content/types'
import { Album } from './Album'
import { GuideDataProvider } from './data'
import { PhotoPanel } from './PhotoPanel'
import { Pinned } from './Pins'
import { Toast } from './Toast'
import { Toc } from './Toc'
import { TripFilter } from './TripFilter'
import { TripProvider, useTrip } from './trip'
import { GUIDE_BAR_ID, openAlbum, setGuideView, useGuideView, type GuideView } from './view'
import { t } from '@/i18n'

/**
 * Reading layout of a guide, from "Guida Romania - Sito v4.dc.html". A sticky top bar, whose
 * controls show only once it is stuck (they repeat the cover and the album opening): nowhere logo,
 * country, current section; from 960px also the Guida/Album switch and the completion, below
 * 960px the index button, whose menu starts with them. Under it, the text (sticky
 * sidebar with the trip filter and the index on wide screens, full-screen index menu below 960px)
 * or the album. The bar keeps its right end free for the account button (see useBarPush).
 */
export function GuideShell(props: ShellProps & { cards: GuideCard[] }) {
  const { countryId, country, places, traces, cards } = props
  const data = useMemo(
    () => ({
      country: countryId,
      name: country,
      traces,
      cards,
      regions: Object.fromEntries(places.map((p) => [p.id, p.name])),
    }),
    [countryId, country, traces, cards, places],
  )
  return (
    <GuideDataProvider value={data}>
      <TripProvider country={countryId} places={places}>
        <Shell {...props} />
        <PhotoPanel />
        <Toast />
      </TripProvider>
    </GuideDataProvider>
  )
}

type ShellProps = {
  /** ISO 3166-1 alpha-2: the trip filter's key in the reader's prefs. */
  countryId: string
  country: string
  places: Place[]
  toc: TocEntry[]
  traces: AlbumTrace[]
  /** Copies of the cards for "In evidenza", by card id (lib/content/cards.ts). */
  copies: Record<string, ReactNode>
  children: ReactNode
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

/**
 * Whether the bar is stuck. The sentinel sits where the bar's bottom edge is in the flow (the bar
 * is pulled up by its height), so the bar sticks when the sentinel passes BAR px from the top.
 */
function useStuck() {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < BAR),
      { rootMargin: `-${BAR}px 0px 0px 0px` },
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

function Shell({ country, toc, traces, copies, children }: ShellProps) {
  const view = useGuideView()
  // /guide/<slug>#album (e.g. from "I tuoi dati") opens on the album.
  useEffect(() => {
    if (window.location.hash !== '#album') return
    openAlbum()
    // Arriving from a link (e.g. "I tuoi dati"): start at the album, not at the cover.
    document.getElementById(GUIDE_BAR_ID)?.parentElement?.scrollIntoView()
  }, [])
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
        // Pulled up by its own height (-mt), over the bottom margin of the opening, so it takes no
        // room: its bottom line sits right under the opening and scrolls up with the page until
        // it reaches 64px from the top, where it stops; the bar then fills the space above it.
        // Until stuck it is see-through and lets clicks pass to the opening.
        className={`sticky top-0 z-20 -mt-[64px] flex h-[64px] items-center gap-2 pr-[calc(var(--edge)+56px)] pl-[clamp(16px,4.5vw,64px)] ${stuck ? 'bg-bg shadow-sm' : 'pointer-events-none bg-transparent shadow-[inset_0_-1px_0_var(--color-divider)]'}`}
      >
        {/*
          The bar's controls repeat the cover and the album opening: they appear only once the bar
          is stuck. Every width: nowhere logo (home), country, current section, and below 960px the
          index button. From 960px also the view switch and the completion, which below 960px are
          at the top of the index menu.
        */}
        <div
          inert={!stuck}
          className={`flex min-w-0 flex-1 items-center gap-2 motion-safe:transition-opacity motion-safe:duration-200 ${stuck ? 'opacity-100' : 'opacity-0'}`}
        >
          <Link
            href="/"
            aria-label={t.common.homeLabel}
            className="grid size-[44px] flex-none place-items-center no-underline"
          >
            <Logo variant="symbol" className="size-[32px]" />
          </Link>
          <a
            href="#top"
            className="flex-none text-xs font-semibold tracking-[.16em] text-accent-700 uppercase no-underline min-[960px]:mr-3"
          >
            {country}
          </a>
          <ViewSwitch view={view} className="hidden min-[960px]:flex" />
          <div className="ml-2 hidden max-w-[220px] min-w-0 flex-[1_1_auto] min-[960px]:block">
            <Completion name={country} traces={traces} />
          </div>
          {/* The current section, in the text. */}
          {view === 'guide' && (
            <span className="ml-auto min-w-0 truncate pl-2 text-[15px] text-neutral-800 italic min-[960px]:mr-3">
              {current}
            </span>
          )}
        </div>
        <button
          type="button"
          inert={!stuck}
          className={`grid size-[44px] flex-none cursor-pointer place-items-center border-0 bg-transparent p-0 text-text hover:text-accent-700 min-[960px]:hidden ${stuck ? '' : 'invisible'}`}
          aria-label={t.guide.shell.index}
          aria-haspopup="dialog"
          onClick={() => setMenu(true)}
        >
          <ListIcon size={22} aria-hidden="true" />
        </button>
      </div>

      {view === 'album' && <Album />}
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
          <Pinned copies={copies} />
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
          <div className="mt-4 flex flex-col gap-3">
            <ViewSwitch view={view} className="flex self-start" onPick={() => setMenu(false)} />
            <Completion name={country} traces={traces} />
          </div>
          <div className="mt-8">
            <TripFilter country={country} size="menu" />
          </div>
          <div className="mt-8 text-[11px] tracking-[.16em] text-neutral-700 uppercase">
            {t.guide.shell.index}
          </div>
          <nav aria-label={t.guide.shell.index} className="mt-2">
            <Toc
              entries={toc}
              active={active}
              size="menu"
              onNavigate={() => {
                setGuideView('guide')
                setMenu(false)
              }}
            />
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

/** The Guida/Album switch: in the bar from 960px, at the top of the index menu below. */
function ViewSwitch({
  view,
  className,
  onPick,
}: {
  view: GuideView
  className: string
  onPick?: () => void
}) {
  return (
    <div
      role="group"
      aria-label={t.guide.view.label}
      className={`flex-none gap-[2px] rounded-md bg-surface p-[3px] ${className}`}
    >
      {(['guide', 'album'] as GuideView[]).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          onClick={() => {
            setGuideView(v)
            onPick?.()
          }}
          className={`min-h-[40px] cursor-pointer rounded-sm border-0 px-3 font-body text-[15px] text-text hover:text-accent-800 ${view === v ? 'bg-bg font-semibold shadow-sm' : 'bg-transparent'}`}
        >
          {t.guide.view[v]}
        </button>
      ))}
    </div>
  )
}
