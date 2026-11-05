'use client'

import {
  ArrowRightIcon,
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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { Logo } from './Logo'

/**
 * Home: full-screen world map with country search.
 * Port of "Nowhere - Home.dc.html" (claude.ai/design). d3 owns the SVG (projection, zoom,
 * country paths); React owns the overlays (search, tooltip, pin card, controls).
 */

export type MapGuide = {
  slug: string
  /** ISO 3166-1 numeric, matches the TopoJSON feature id. */
  countryId: string
  name: string
  /** [longitude, latitude]: on narrow screens the map opens zoomed on the first guide. */
  at: [number, number]
}

type CountryProps = { n: string; k: number }
type Country = Feature<Geometry, CountryProps>
type WorldTopology = Topology<{ countries: GeometryCollection<{ n: string }> }>

type Hover = { x: number; y: number; name: string; guide: boolean }
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

function fillOf(hasGuide: boolean, hover: boolean, selected: boolean) {
  if (hasGuide) return hover || selected ? 'var(--color-accent-800)' : 'var(--color-accent)'
  if (hover) return 'var(--color-neutral-400)'
  return selected ? 'var(--color-neutral-500)' : 'var(--color-neutral-300)'
}

export function WorldMap({ guides }: { guides: MapGuide[] }) {
  const router = useRouter()
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

  // Keep the refs d3 handlers read in step with React state, and repaint the selection.
  useEffect(() => {
    pinRef.current = pin
  }, [pin])
  useEffect(() => {
    selRef.current = sel
    engine.current.paths?.style('fill', (d) =>
      fillOf(!!guideOf(d.id), false, sel === d.properties.k),
    )
  }, [sel, guideOf])

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
    const go = (g: MapGuide) => router.push(`/guide/${g.slug}`)
    const pinAt = (f: Country, base: [number, number]) => {
      setSel(f.properties.k)
      setHover(null)
      setTr(m.tr)
      setPin({ name: f.properties.n, guide: guideOf(f.id), base })
    }

    const draw = () => {
      const feats = m.feats
      if (!feats) return
      const w = Math.round(el.clientWidth)
      const h = Math.round(el.clientHeight)
      if (!w || !h || (w === m.w && h === m.h)) return
      const narrow = w < 640
      m.w = w
      m.h = h
      setSize({ w, h })

      select(el).selectAll('svg').remove()
      const sphere: GeoPermissibleObjects = { type: 'Sphere' }
      const proj = geoEqualEarth().fitExtent(
        [
          [8, 8],
          [w - 8, h - 8],
        ],
        sphere,
      )
      const path = geoPath(proj)
      m.path = path

      const svg = select(el)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('role', 'img')
        .attr('aria-label', 'Mappa del mondo: i paesi dove sono stato sono in azzurro')
        .style('display', 'block')
        .style('cursor', 'grab')
        .style('touch-action', 'none')
      const g = svg.append('g')
      g.append('path')
        .datum(sphere)
        .attr('d', path)
        .style('fill', 'var(--color-bg)')
        .style('opacity', 0.55)

      m.paths = g
        .selectAll<SVGPathElement, Country>('path.c')
        .data(feats)
        .join('path')
        .attr('class', 'c')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style('fill', (d) => fillOf(!!guideOf(d.id), false, selRef.current === d.properties.k))
        .style('stroke', 'var(--color-bg)')
        .style('stroke-width', '0.6px')
        .style('cursor', 'pointer')
        .on('pointerenter', function (e: PointerEvent, d) {
          if (e.pointerType === 'mouse')
            select(this).style(
              'fill',
              fillOf(!!guideOf(d.id), true, selRef.current === d.properties.k),
            )
        })
        .on('pointermove', (e: PointerEvent, d) => {
          if (e.pointerType !== 'mouse' || pinRef.current) return
          const [x, y] = local(e)
          setHoverSoon({ x, y, name: d.properties.n, guide: !!guideOf(d.id) })
        })
        .on('pointerleave', function (e: PointerEvent, d) {
          select(this).style(
            'fill',
            fillOf(!!guideOf(d.id), false, selRef.current === d.properties.k),
          )
          if (e.pointerType === 'mouse') setHoverSoon(null)
        })
        .on('click', (e: MouseEvent, d) => {
          e.stopPropagation()
          const gd = guideOf(d.id)
          if (gd) return go(gd)
          pinAt(d, m.tr.invert(local(e)))
        })

      const zoom = d3Zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 14])
        .translateExtent([
          [0, 0],
          [w, h],
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

      const k = 2.6
      const c = guides[0] && proj(guides[0].at)
      const start =
        narrow && c
          ? zoomIdentity.translate(w / 2 - k * c[0], h / 2 - k * c[1]).scale(k)
          : zoomIdentity
      svg.call(zoom.transform, start)
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
            .sort((a, b) => a.name.localeCompare(b.name, 'it')),
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
  }, [guides, guideOf, router])

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
  let px = 0
  let py = 0
  if (pin) {
    const p = tr.apply(pin.base)
    px = Math.max(8, Math.min(p[0] - 116, w - 240))
    py = Math.max(80, p[1] + 150 > h ? p[1] - 140 : p[1] + 16)
  }
  const showHover = !!hover && !pin
  const hx = hover ? Math.max(8, Math.min(hover.x + 16, w - 230)) : 0
  const hy = hover ? (hover.y + 84 > h ? hover.y - 76 : hover.y + 18) : 0
  const listOn = focus && status === 'ready'
  const listId = 'country-results'

  return (
    <div
      data-screen-label="Home · mappa"
      className="relative min-h-0 flex-1 overflow-hidden bg-accent-100"
      style={{ '--edge': 'clamp(12px, 3vw, 24px)' } as CSSProperties}
    >
      <div ref={mapRef} className="absolute inset-0" />

      {status !== 'ready' && (
        <div className="absolute inset-0 grid place-items-center text-[15px] text-neutral-700 italic">
          {status === 'loading' ? 'Carico la mappa…' : 'Mappa non disponibile.'}
        </div>
      )}

      {showHover && (
        <div
          className="pointer-events-none absolute z-3 flex flex-col gap-[2px] rounded-md bg-bg px-3 py-2 whitespace-nowrap shadow-md"
          style={{ left: hx, top: hy }}
        >
          <span className="text-base leading-tight font-semibold">{hover.name}</span>
          {!hover.guide && (
            <span className="text-sm text-neutral-700 italic">Guida non ancora scritta</span>
          )}
        </div>
      )}

      {pin && (
        <div
          className="absolute z-4 flex w-[232px] flex-col gap-2 rounded-md bg-bg px-4 pt-3 pb-4 shadow-md"
          style={{ left: px, top: py }}
        >
          <span className="text-xl leading-[1.2] font-semibold">{pin.name}</span>
          {pin.guide ? (
            <Link
              href={`/guide/${pin.guide.slug}`}
              className="btn btn-primary flex min-h-[44px] gap-[8px] text-bg no-underline"
            >
              Apri la guida <ArrowRightIcon weight="duotone" size={18} />
            </Link>
          ) : (
            <span className="text-[15px] text-neutral-700 italic">Guida non ancora scritta</span>
          )}
        </div>
      )}

      <div className="absolute top-(--edge) left-(--edge) z-5 flex w-[min(540px,calc(100%-2*var(--edge)))] items-start gap-2">
        <div className="flex h-[48px] flex-none items-center rounded-md bg-bg px-[14px] shadow-sm">
          <div className="aspect-[226/48] w-[113px]">
            <Logo variant="horizontal" tone="ink" className="size-full" />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="relative">
            <MagnifyingGlassIcon
              weight="duotone"
              size={20}
              className="pointer-events-none absolute top-1/2 left-[14px] -translate-y-1/2 text-neutral-700"
            />
            <input
              className="input min-h-[48px] bg-bg pl-[44px] text-[17px] shadow-sm"
              type="search"
              placeholder="Cerca un paese"
              aria-label="Cerca un paese"
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
                  Paesi dove sono stato
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
                  {x.guide && <span className="tag tag-accent">Guida</span>}
                </button>
              ))}
              {!!q.trim() && results.length === 0 && (
                <span className="p-3 text-[15px] text-neutral-700 italic">
                  Nessun paese trovato
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {status === 'ready' && (
        <div className="absolute bottom-(--edge) left-(--edge) z-2 flex flex-col gap-1">
          <ZoomButton label="Ingrandisci" onClick={() => zoomBy(1.8)}>
            <PlusIcon size={20} />
          </ZoomButton>
          <ZoomButton label="Riduci" onClick={() => zoomBy(1 / 1.8)}>
            <MinusIcon size={20} />
          </ZoomButton>
          <ZoomButton label="Mostra tutto il mondo" onClick={() => zoomWorld()}>
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
