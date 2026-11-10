'use client'

import {
  CameraIcon,
  GlobeHemisphereWestIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
} from '@phosphor-icons/react'
import { geoEqualEarth, geoPath, type GeoPath, type GeoPermissibleObjects } from 'd3-geo'
import { select, type Selection } from 'd3-selection'
import 'd3-transition'
import { zoom as d3Zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom'
import type { Feature, Geometry } from 'geojson'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { AccountMenu } from './AccountMenu'
import { Completion, completionOf, type Scored } from './Completion'
import { CountryCard } from './CountryCard'
import { LogoBadge } from './LogoBadge'
import { locale, t } from '@/i18n'
import { isSeen, useCollection } from '@/lib/reader/collection'

/**
 * Home: full-screen world map with country search.
 * Port of "Nowhere - Home v2.dc.html" (claude.ai/design). d3 owns the SVG (projection, zoom,
 * country paths); React owns the overlays (search, account, tooltip, country card, controls).
 *
 * Countries are lit (accent fill) by the reader's photos: a guide country is lit once its album
 * completion is above 0%. Until then it is drawn as every other country. Hovering a guide country shows its
 * album completion; clicking it opens the guide (other countries do nothing on click). The
 * country card is shown only for a country picked in the search.
 */

export type MapGuide = {
  slug: string
  /** ISO 3166-1 numeric, matches the TopoJSON feature id. */
  countryId: string
  name: string
  /** The guide's traces, for the album completion in the hover. */
  traces: Scored[]
}

type CountryProps = { n: string; k: number }
type Country = Feature<Geometry, CountryProps>
type WorldTopology = Topology<{ countries: GeometryCollection<{ n: string }> }>

type Hover = { x: number; y: number; name: string; guide?: MapGuide; lit: boolean }
type Pin = { name: string; guide?: MapGuide; base: [number, number] }
type Entry = { f: Country; name: string; key: string; guide?: MapGuide }

/** Imperative d3 state, kept out of React. */
type Engine = {
  feats?: Country[]
  w: number
  h: number
  path?: GeoPath<unknown, GeoPermissibleObjects>
  svg?: Selection<SVGSVGElement, unknown, null, undefined>
  zoom?: ZoomBehavior<SVGSVGElement, unknown>
  paths?: Selection<SVGPathElement, Country, SVGGElement, unknown>
  tr: ZoomTransform
}

const TOPOLOGY_URL = '/data/world-50m.json'
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** How a country is drawn: lit by the reader's photos, or not. */
type Kind = 'lit' | 'none'

function fillOf(kind: Kind, hover: boolean, selected: boolean) {
  const on = hover || selected
  if (kind === 'lit') return on ? 'var(--color-accent-600)' : 'var(--color-accent)'
  if (hover) return 'var(--color-neutral-400)'
  return selected ? 'var(--color-neutral-500)' : 'var(--color-neutral-300)'
}

const NONE_LIT: ReadonlySet<string> = new Set()

type Props = {
  guides: MapGuide[]
  /** Numeric ids of other countries lit by the reader's photos (guide countries light up by
   * their album completion). */
  lit?: ReadonlySet<string>
}

export function WorldMap({ guides, lit = NONE_LIT }: Props) {
  const router = useRouter()
  // The reader's collection, loaded up front: it lights the guide countries and is ready for the
  // first hover.
  const { entries } = useCollection()
  const mapRef = useRef<HTMLDivElement>(null)
  const engine = useRef<Engine>({ w: 0, h: 0, tr: zoomIdentity })
  const selRef = useRef<number | null>(null)
  const pinRef = useRef<Pin | null>(null)
  const hoverRaf = useRef(0)
  const blurTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [size, setSize] = useState({ w: 800, h: 600 })
  const [list, setList] = useState<Entry[]>([])
  const [hover, setHover] = useState<Hover | null>(null)
  const [pin, setPin] = useState<Pin | null>(null)
  const [sel, setSel] = useState<number | null>(null)
  const [tr, setTr] = useState<ZoomTransform>(zoomIdentity)
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const [idx, setIdx] = useState(0)

  const guideOf = useMemo(() => {
    const byId = new Map(guides.map((g) => [g.countryId, g]))
    return (id: string | number | undefined) => (id == null ? undefined : byId.get(String(id)))
  }, [guides])
  // Guide countries with an album completion above 0%, plus the other lit countries.
  const litIds = useMemo(() => {
    const ids = new Set(lit)
    for (const g of guides)
      if (completionOf(g.traces, (key) => isSeen(entries[key])).pct > 0) ids.add(g.countryId)
    return ids
  }, [guides, lit, entries])
  const kindOf = useCallback(
    (id: string | number | undefined): Kind =>
      id != null && litIds.has(String(id)) ? 'lit' : 'none',
    [litIds],
  )
  // d3 handlers read the kind through a ref: a change (the collection loading) repaints the
  // countries instead of redrawing the map, which would reset the zoom.
  const kindRef = useRef(kindOf)

  /**
   * Forget pin, selection, hover and query before leaving for a guide. With cacheComponents the
   * home is kept alive (React <Activity>) and shown again as it was on back navigation, so stale
   * state would reappear. The hover fill is reset too: pointerleave never fires on navigation.
   */
  const clearSelection = useCallback(() => {
    setPin(null)
    setSel(null)
    setHover(null)
    setQ('')
    selRef.current = null
    engine.current.paths?.style('fill', (d) => fillOf(kindRef.current(d.id), false, false))
  }, [])

  // Keep the refs d3 handlers read in step with React state, and repaint the selection.
  useEffect(() => {
    pinRef.current = pin
  }, [pin])
  useEffect(() => {
    selRef.current = sel
    kindRef.current = kindOf
    engine.current.paths?.style('fill', (d) => fillOf(kindOf(d.id), false, sel === d.properties.k))
  }, [sel, kindOf])

  // Load the topology, draw, and redraw on resize.
  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const m = engine.current
    const abort = new AbortController()
    let ro: ResizeObserver | undefined

    const local = (e: MouseEvent): [number, number] => {
      const r = el.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const setHoverSoon = (h: Hover | null) => {
      cancelAnimationFrame(hoverRaf.current)
      hoverRaf.current = requestAnimationFrame(() => setHover(h))
    }
    const open = (g: MapGuide) => {
      cancelAnimationFrame(hoverRaf.current)
      clearSelection()
      router.push(`/guide/${g.slug}`)
    }
    // Touch has no hover: a tap on a guide country opens the country card (a bottom sheet on
    // phones) with the hover's content and the button to the guide.
    const pinAt = (f: Country, g: MapGuide, base: [number, number]) => {
      setSel(f.properties.k)
      setHover(null)
      setTr(m.tr)
      setPin({ name: f.properties.n, guide: g, base })
    }
    // The pointer type of the last press, for the click that follows it (not every browser's
    // click event carries pointerType).
    let pressedWith = 'mouse'

    const draw = () => {
      const feats = m.feats
      if (!feats) return
      const w = Math.round(el.clientWidth)
      const h = Math.round(el.clientHeight)
      if (!w || !h || (w === m.w && h === m.h)) return
      const narrow = w < 640
      // The map sits above the footer, but the world is framed on the whole viewport (as the
      // design's full-page map was), so it stays centered on the page; the footer covers the
      // sliver of ocean below the sphere.
      const pageH = Math.max(h, Math.round(window.innerHeight - el.getBoundingClientRect().top))
      m.w = w
      m.h = h
      setSize({ w, h })

      select(el).selectAll('svg').remove()
      const sphere: GeoPermissibleObjects = { type: 'Sphere' }
      const proj = geoEqualEarth().fitExtent(
        [
          [8, 8],
          [w - 8, pageH - 8],
        ],
        sphere,
      )
      // On phones the width-bound world would be a thin strip: make it at least 70% of the
      // viewport tall, overflowing sideways (panned horizontally).
      if (narrow) {
        const fit = proj.scale()
        proj.fitHeight(Math.round(pageH * 0.7), sphere)
        proj.scale(Math.max(fit, proj.scale()))
      }
      proj.translate([w / 2, pageH / 2])
      const [[x0], [x1]] = geoPath(proj).bounds(sphere)
      const path = geoPath(proj)
      m.path = path

      const svg = select(el)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('role', 'img')
        .attr('aria-label', t.map.ariaLabel)
        .style('display', 'block')
        .style('cursor', 'grab')
        .style('touch-action', 'none')
      const g = svg.append('g')
      g.append('path')
        .datum(sphere)
        .attr('d', path)
        // Sea and background are both paper (the design's light-blue background is not ported), so
        // the top of the home matches the status bar (theme-color) and the guide pages.
        .style('fill', 'var(--color-bg)')

      m.paths = g
        .selectAll<SVGPathElement, Country>('path.c')
        .data(feats)
        .join('path')
        .attr('class', 'c')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style('fill', (d) =>
          fillOf(kindRef.current(d.id), false, selRef.current === d.properties.k),
        )
        .style('stroke', 'var(--color-bg)')
        .style('stroke-width', '0.6px')
        // Only guide countries do something on click.
        .style('cursor', (d) => (guideOf(d.id) ? 'pointer' : 'inherit'))
        .on('pointerdown', (e: PointerEvent) => {
          pressedWith = e.pointerType
        })
        .on('pointerenter', function (e: PointerEvent, d) {
          if (e.pointerType === 'mouse')
            select(this).style(
              'fill',
              fillOf(kindRef.current(d.id), true, selRef.current === d.properties.k),
            )
        })
        .on('pointermove', (e: PointerEvent, d) => {
          if (e.pointerType !== 'mouse' || pinRef.current) return
          const [x, y] = local(e)
          setHoverSoon({
            x,
            y,
            name: d.properties.n,
            guide: guideOf(d.id),
            lit: kindRef.current(d.id) === 'lit',
          })
        })
        .on('pointerleave', function (e: PointerEvent, d) {
          select(this).style(
            'fill',
            fillOf(kindRef.current(d.id), false, selRef.current === d.properties.k),
          )
          if (e.pointerType === 'mouse') setHoverSoon(null)
        })
        .on('click', (e: MouseEvent, d) => {
          e.stopPropagation()
          const g = guideOf(d.id)
          if (!g) return
          if (pressedWith === 'mouse') open(g)
          else pinAt(d, g, m.tr.invert(local(e)))
        })
      const zoom = d3Zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 14])
        .translateExtent([
          [Math.min(0, x0), 0],
          [Math.max(w, x1), pageH],
        ])
        .on('start', (e) => {
          if (e.sourceEvent) {
            svg.style('cursor', 'grabbing')
            setHoverSoon(null)
          }
        })
        .on('zoom', (e: { transform: ZoomTransform }) => {
          m.tr = e.transform
          g.attr('transform', e.transform.toString())
          if (pinRef.current) setTr(e.transform)
        })
        .on('end', () => svg.style('cursor', 'grab'))
      svg.call(zoom)
      svg.on('click', () => {
        setPin(null)
        setSel(null)
      })
      m.svg = svg
      m.zoom = zoom

      svg.call(zoom.transform, zoomIdentity)
      setStatus('ready')
    }

    fetch(TOPOLOGY_URL, { signal: abort.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json() as Promise<WorldTopology>
      })
      .then((topo) => {
        if (abort.signal.aborted) return
        const feats = feature(topo, topo.objects.countries).features as Country[]
        feats.forEach((f, i) => {
          f.properties.k = i
        })
        m.feats = feats
        setList(
          feats
            .map((f) => ({
              f,
              name: f.properties.n,
              key: norm(f.properties.n),
              guide: guideOf(f.id),
            }))
            .sort((a, b) => a.name.localeCompare(b.name, locale)),
        )
        ro = new ResizeObserver(draw)
        ro.observe(el)
        draw()
      })
      .catch(() => {
        if (!abort.signal.aborted) setStatus('error')
      })

    return () => {
      abort.abort()
      ro?.disconnect()
      cancelAnimationFrame(hoverRaf.current)
      select(el).selectAll('svg').remove()
      Object.assign(m, { w: 0, h: 0, svg: undefined, zoom: undefined, paths: undefined })
    }
  }, [guides, guideOf, clearSelection, router])

  useEffect(() => () => clearTimeout(blurTimer.current), [])

  // — search —
  const results = useMemo(() => {
    const qn = norm(q.trim())
    if (!qn) return list.filter((x) => x.guide)
    const a = list.filter((x) => x.key.startsWith(qn))
    const b = list.filter((x) => !x.key.startsWith(qn) && x.key.includes(qn))
    return a.concat(b).slice(0, 8)
  }, [list, q])
  const active = Math.min(idx, Math.max(0, results.length - 1))

  const zoomTo = (f: Country) => {
    const { path, svg, zoom, w, h } = engine.current
    if (!path || !svg || !zoom) return
    const [[x0, y0], [x1, y1]] = path.bounds(f)
    const dx = x1 - x0
    const dy = y1 - y0
    const k = Math.max(1, Math.min(10, 0.55 / Math.max(dx / w, dy / h)))
    const t = zoomIdentity
      .translate(w / 2 - (k * (x0 + x1)) / 2, h / 2 + 24 - (k * (y0 + y1)) / 2)
      .scale(k)
    svg.transition().duration(750).call(zoom.transform, t)
    setSel(f.properties.k)
    setHover(null)
    setPin({ name: f.properties.n, guide: guideOf(f.id), base: path.centroid(f) })
  }
  const pick = (x: Entry) => {
    setQ(x.name)
    setFocus(false)
    setIdx(0)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    zoomTo(x.f)
  }
  const zoomBy = (f: number) => {
    const { svg, zoom } = engine.current
    if (svg && zoom) svg.transition().duration(300).call(zoom.scaleBy, f)
  }
  const zoomWorld = () => {
    setPin(null)
    setSel(null)
    const { svg, zoom } = engine.current
    if (svg && zoom) svg.transition().duration(450).call(zoom.transform, zoomIdentity)
  }

  // — overlay positions —
  const { w, h } = size
  const narrow = w < 640
  // The country card sits under the picked point, or above it in the lower part of the map; on
  // phones it is a full-width sheet at the bottom.
  const pinPos: { left: number; top?: number; bottom?: number } = { left: 12, bottom: 12 }
  if (pin && !narrow) {
    const p = tr.apply(pin.base)
    pinPos.left = Math.max(12, Math.min(p[0] - 140, w - 292))
    if (p[1] > h * 0.55) pinPos.bottom = Math.max(12, h - p[1] + 16)
    else Object.assign(pinPos, { top: Math.max(80, p[1] + 16), bottom: undefined })
  }
  // The hover sits below-right of the pointer, or above it when it would overflow the map. A
  // guide country's hover carries the full completion (the design's country card), so it is wider
  // and taller.
  const showHover = !!hover && !pin
  const hoverW = hover?.guide ? 280 : 230
  const hoverH = hover?.guide ? 190 : 84
  const hx = hover ? Math.max(8, Math.min(hover.x + 16, w - hoverW)) : 0
  const hoverPos =
    hover && hover.y + 18 + hoverH > h
      ? { left: hx, bottom: Math.max(8, h - hover.y + 10) }
      : { left: hx, top: hover ? hover.y + 18 : 0 }
  const listOn = focus && status === 'ready'
  const listId = 'country-results'

  return (
    <div data-screen-label="Home · mappa" className="relative min-h-0 flex-1 overflow-hidden bg-bg">
      <div ref={mapRef} className="absolute inset-0" />

      {status !== 'ready' && (
        <div className="absolute inset-0 grid place-items-center text-[15px] text-neutral-700 italic">
          {status === 'loading' ? t.map.loading : t.map.unavailable}
        </div>
      )}

      {showHover && (
        <div
          className={`pointer-events-none absolute z-3 flex flex-col rounded-md bg-bg shadow-md ${hover.guide ? 'w-[264px] gap-3 px-4 pt-3 pb-4' : 'gap-[2px] px-3 py-2 whitespace-nowrap'}`}
          style={hoverPos}
        >
          <span
            className={
              hover.guide
                ? 'text-xl leading-[1.2] font-semibold'
                : 'text-base leading-tight font-semibold'
            }
          >
            {hover.name}
          </span>
          {hover.lit && !hover.guide && (
            <span className="flex items-center gap-[6px] text-sm text-neutral-800">
              <CameraIcon weight="duotone" aria-hidden="true" />
              {t.map.yourPhotos}
            </span>
          )}
          {hover.guide && (
            <Completion name={hover.name} traces={hover.guide.traces} variant="card" />
          )}
          {!hover.guide && !hover.lit && (
            <span className="text-sm text-neutral-700 italic">{t.map.noGuide}</span>
          )}
        </div>
      )}

      {pin && (
        <div
          className="absolute z-6 max-h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-y-auto rounded-md bg-bg px-4 pt-3 pb-4 shadow-md sm:w-[280px]"
          style={pinPos}
        >
          <CountryCard
            name={pin.name}
            href={pin.guide && `/guide/${pin.guide.slug}`}
            traces={pin.guide?.traces}
            onClose={() => {
              setPin(null)
              setSel(null)
            }}
            onOpen={clearSelection}
          />
        </div>
      )}

      <div className="pointer-events-none absolute top-(--edge) right-(--edge) left-(--edge) z-7 flex flex-wrap items-start gap-2">
        <div className="pointer-events-auto flex-none">
          <LogoBadge framed={false} />
        </div>
        <div className="pointer-events-auto order-2 flex min-w-0 flex-[1_1_100%] flex-col gap-1 sm:order-0 sm:flex-[0_1_390px]">
          <div className="relative">
            <MagnifyingGlassIcon
              weight="duotone"
              size={20}
              className="pointer-events-none absolute top-1/2 left-[14px] -translate-y-1/2 text-neutral-700"
            />
            <input
              className="input min-h-[48px] bg-bg pl-[44px] text-[17px] shadow-sm"
              type="search"
              placeholder={t.map.searchPlaceholder}
              aria-label={t.map.searchPlaceholder}
              role="combobox"
              aria-expanded={listOn}
              aria-controls={listId}
              aria-autocomplete="list"
              autoComplete="off"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setIdx(0)
                setFocus(true)
              }}
              onFocus={() => {
                clearTimeout(blurTimer.current)
                setFocus(true)
              }}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setFocus(false), 150)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setIdx(Math.min(active + 1, results.length - 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setIdx(Math.max(active - 1, 0))
                } else if (e.key === 'Enter' && results[active]) {
                  e.preventDefault()
                  pick(results[active])
                } else if (e.key === 'Escape') {
                  setQ('')
                  setIdx(0)
                }
              }}
            />
          </div>
          {listOn && (
            <div
              id={listId}
              role="listbox"
              className="flex max-h-[min(360px,55svh)] flex-col overflow-y-auto rounded-md bg-bg py-1 shadow-md"
            >
              {!q.trim() && (
                <span className="px-3 pt-2 pb-1 text-[11px] tracking-[.14em] text-neutral-700 uppercase">
                  {t.map.guideCountries}
                </span>
              )}
              {results.map((x, i) => (
                <button
                  key={x.f.properties.k}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  onClick={() => pick(x)}
                  onMouseEnter={() => setIdx(i)}
                  className={`flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-3 border-0 px-3 text-left font-body text-base text-text ${i === active ? 'bg-accent-100' : 'bg-transparent'}`}
                >
                  <span>{x.name}</span>
                  {x.guide && <span className="tag tag-accent">{t.map.guideTag}</span>}
                </button>
              ))}
              {!!q.trim() && results.length === 0 && (
                <span className="p-3 text-[15px] text-neutral-700 italic">{t.map.noResults}</span>
              )}
            </div>
          )}
        </div>
        <div className="pointer-events-auto order-1 ml-auto flex-none">
          <AccountMenu />
        </div>
      </div>

      {status === 'ready' && (
        <div className="absolute bottom-(--edge) left-(--edge) z-2 flex flex-col gap-1">
          <ZoomButton label={t.map.zoomIn} onClick={() => zoomBy(1.8)}>
            <PlusIcon size={20} />
          </ZoomButton>
          <ZoomButton label={t.map.zoomOut} onClick={() => zoomBy(1 / 1.8)}>
            <MinusIcon size={20} />
          </ZoomButton>
          <ZoomButton label={t.map.zoomWorld} onClick={() => zoomWorld()}>
            <GlobeHemisphereWestIcon weight="duotone" size={20} />
          </ZoomButton>
        </div>
      )}
    </div>
  )
}

function ZoomButton(props: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-icon size-[44px] bg-bg"
      aria-label={props.label}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
