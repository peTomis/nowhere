'use client'

import { ArrowLeftIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import type { Place, TocEntry } from '@/lib/guide'
import { Toc } from './Toc'
import { TripFilter } from './TripFilter'
import { TripProvider, useTrip } from './trip'
import { t } from '@/i18n'

/**
 * Reading layout of a guide, from "Guida Romania - Sito.dc.html": sticky sidebar with the trip
 * filter and the index on wide screens; a sticky bar and a full-screen index menu below 960px.
 */
export function GuideShell(props: {
  slug: string
  country: string
  places: Place[]
  toc: TocEntry[]
  children: ReactNode
}) {
  return (
    <TripProvider storageKey={`guida-${props.slug}-off`} places={props.places}>
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
        const el = document.getElementById(id)
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

function Shell({
  country,
  toc,
  children,
}: {
  country: string
  toc: TocEntry[]
  children: ReactNode
}) {
  const trip = useTrip()
  const [menu, setMenu] = useState(false)
  const ids = useMemo(() => toc.map((e) => e.id), [toc])
  const active = useActiveSection(ids, trip)
  const current = (toc.find((e) => e.id === active) ?? toc[0])?.label
  const [sentinel, stuck] = useStuck()

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
      <div className="sticky top-0 z-20 flex h-[56px] items-center gap-3 bg-bg px-[clamp(16px,5vw,32px)] shadow-sm min-[960px]:hidden">
        {/* Once the bar is stuck the cover (and its logo) is gone: the symbol leads back home. */}
        <Link
          href="/"
          aria-label={t.common.homeLabel}
          className={`flex h-[44px] flex-none items-center overflow-hidden motion-safe:transition-[width,margin,opacity,visibility] motion-safe:duration-200 ${stuck ? 'visible w-[32px] opacity-100' : 'invisible -mr-3 w-0 opacity-0'}`}
        >
          <Logo variant="symbol" className="size-[32px] flex-none" />
        </Link>
        <a
          href="#top"
          className="text-xs font-semibold tracking-[.16em] text-accent-700 uppercase no-underline"
        >
          {country}
        </a>
        <span className="min-w-0 flex-1 truncate text-[15px] text-neutral-800 italic">
          {current}
        </span>
        {trip.filtered && (
          <span className="tag tag-accent flex-none">{t.guide.shell.filtered}</span>
        )}
        <button
          type="button"
          className="btn btn-ghost min-h-[44px]"
          aria-haspopup="dialog"
          onClick={() => setMenu(true)}
        >
          {t.guide.shell.index}
        </button>
      </div>

      <div className="flex justify-center gap-[clamp(48px,7vw,104px)] px-[clamp(20px,5vw,48px)] pt-[clamp(72px,11vw,144px)]">
        <aside className="hidden flex-[0_0_232px] min-[960px]:block">
          <div className="sticky top-[40px] flex max-h-[calc(100vh-80px)] flex-col gap-[50px] overflow-y-auto">
            <TripFilter country={country} size="sidebar" />
            <nav aria-label={t.guide.shell.index} className="flex flex-col gap-4">
              <div className="text-[11px] tracking-[.16em] text-neutral-700 uppercase">
                {t.guide.shell.index}
              </div>
              <Toc entries={toc} active={active} size="sidebar" />
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
