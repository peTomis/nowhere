'use client'

import { CheckIcon, CornersOutIcon, MinusIcon, PlusIcon, XIcon } from '@phosphor-icons/react'
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { select } from 'd3-selection'
import 'd3-transition'
import { zoom as d3Zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom'
import type { Feature, Geometry } from 'geojson'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import type { AlbumTrace } from '@/content/build'
import { format, t } from '@/i18n'
import { isSeen, type Entry } from '@/lib/reader/collection'
import { pad, useGuideData } from './data'
import { boxBorder, photoSrc } from './Trace'

/*
 * The album's map (no design yet: the home's monochrome map, the album's boxes), at the top of the
 * album: the traces of the album's filter at their spot (`at` in the structure), the reader's
 * photo where one is found, its number in a dashed circle where it is still to find. Traces closer
 * than a pin are grouped; a group zooms in on click. Traces without a spot (a dish of a region, a
 * banknote) are only in the album's pages. A pin opens the trace as an album box does.
 *
 * d3 computes the projection and drives the zoom; React draws the SVG and the pins. Zoom by
 * buttons, double click, ctrl/⌘ + wheel or trackpad pinch, and two fingers on touch: one finger
 * and the plain wheel keep scrolling the page.
 */

type Country = Feature<Geometry, { n: string }>
type WorldTopology = Topology<{ countries: GeometryCollection<{ n: string }> }>

const TOPOLOGY_URL = '/data/world-50m.json'
/** Highest zoom: about 20 m per pixel on a phone-wide Romania, enough to split a square. */
const MAX_K = 64
/** Pins closer than this (px) are grouped. */
const GROUP_RADIUS = 36

let world: Promise<Country[]> | undefined
function loadWorld() {
  world ??= fetch(TOPOLOGY_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`${r.status}`)
      return r.json() as Promise<WorldTopology>
    })
    .then((topo) => feature(topo, topo.objects.countries).features as Country[])
    .catch((e: unknown) => {
      world = undefined
      throw e
    })
  return world
}

type Point = { trace: AlbumTrace; base: [number, number]; x: number; y: number }
type Group = { x: number; y: number; points: Point[] }

export function TraceMap({
  traces: all,
  entries,
  onOpen,
}: {
  /** The traces to show (those of the album's filter); the ones without `at` are skipped. Keep
   * the array stable between renders: a new one redraws the map and resets the zoom. */
  traces: AlbumTrace[]
  entries: Record<string, Entry>
  onOpen: (id: string) => void
}) {
  const { numeric, name } = useGuideData()
  const traces = useMemo(() => all.filter((tr) => tr.at), [all])
  const ref = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<ZoomBehavior<HTMLDivElement, unknown>>(null)
  const [feats, setFeats] = useState<Country[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [width, setWidth] = useState(0)
  const [tr, setTr] = useState<ZoomTransform>(zoomIdentity)
  const [list, setList] = useState<Point[] | null>(null)

  // The world's shapes (cached by the browser: the home loads the same file). The template has no
  // country: only its pins are drawn.
  useEffect(() => {
    if (!numeric) return
    let live = true
    loadWorld().then(
      (f) => live && setFeats(f),
      () => live && setFailed(true),
    )
    return () => {
      live = false
    }
  }, [numeric])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const ready = !numeric || failed || feats !== null
  const geo = useMemo(() => {
    if (!ready || !width || traces.length === 0) return null
    const country = feats?.find((f) => String(f.id) === numeric)
    const target: GeoPermissibleObjects = country ?? {
      type: 'MultiPoint',
      coordinates: traces.map((tr) => tr.at as [number, number]),
    }
    // Room for a whole pin at the edges, and on the right for the zoom buttons.
    const inset = width < 640 ? 24 : 32
    const right = inset + 52
    // Height from the country's shape at this width, within the screen.
    const fit = geoMercator().fitWidth(width - inset - right, target)
    const [[, y0], [, y1]] = geoPath(fit).bounds(target)
    const h = Math.round(Math.min(window.innerHeight * 0.75, Math.max(320, y1 - y0 + 2 * inset)))
    const proj = geoMercator()
      .fitExtent(
        [
          [inset, inset],
          [width - right, h - inset],
        ],
        target,
      )
      .clipExtent([
        [0, 0],
        [width, h],
      ])
    const path = geoPath(proj)
    // The neighbours, for context; the clip extent leaves out the rest of the world.
    const others = country
      ? (feats ?? [])
          .filter((f) => f !== country)
          .map((f) => path(f))
          .filter((d): d is string => !!d)
      : []
    return {
      w: width,
      h,
      country: country ? path(country) : null,
      others,
      points: traces.map((trace) => ({
        trace,
        base: proj(trace.at as [number, number]) as [number, number],
      })),
    }
  }, [ready, width, feats, numeric, traces])

  // The zoom, set up again when the map is redrawn (a new size resets it).
  useEffect(() => {
    const el = ref.current
    if (!el || !geo) return
    const zoom = d3Zoom<HTMLDivElement, unknown>()
      .scaleExtent([1, MAX_K])
      .extent([
        [0, 0],
        [geo.w, geo.h],
      ])
      .translateExtent([
        [0, 0],
        [geo.w, geo.h],
      ])
      .filter((e: Event) => {
        if (e.type === 'wheel') return (e as WheelEvent).ctrlKey || (e as WheelEvent).metaKey
        if (e.type.startsWith('touch')) return (e as TouchEvent).touches.length > 1
        return !(e as MouseEvent).button
      })
      .on('zoom', (e: { transform: ZoomTransform }) => setTr(e.transform))
    const sel = select(el)
    sel.call(zoom).call(zoom.transform, zoomIdentity)
    zoomRef.current = zoom
    setList(null)
    return () => {
      sel.on('.zoom', null)
    }
  }, [geo])

  const groups = useMemo(() => {
    const out: Group[] = []
    for (const p of geo?.points ?? []) {
      const point = { ...p, x: tr.applyX(p.base[0]), y: tr.applyY(p.base[1]) }
      const near = out.find((g) => Math.hypot(g.x - point.x, g.y - point.y) < GROUP_RADIUS)
      if (near) near.points.push(point)
      else out.push({ x: point.x, y: point.y, points: [point] })
    }
    return out
  }, [geo, tr])

  const animate = () => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return select(ref.current as HTMLDivElement)
      .transition()
      .duration(still ? 0 : 350)
  }
  const zoomBy = (f: number) => {
    if (zoomRef.current) animate().call(zoomRef.current.scaleBy, f)
  }
  const zoomAll = () => {
    setList(null)
    if (zoomRef.current) animate().call(zoomRef.current.transform, zoomIdentity)
  }
  // A group zooms in on its pins; one that can't split any more (same spot, or the highest zoom)
  // lists them instead.
  const openGroup = (g: Group) => {
    if (!geo || !zoomRef.current) return
    const xs = g.points.map((p) => p.base[0])
    const ys = g.points.map((p) => p.base[1])
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
    const spread = Math.max(x1 - x0, y1 - y0)
    const k = Math.min(MAX_K, spread > 0 ? (GROUP_RADIUS * 2.5) / spread : MAX_K, tr.k * 4)
    if (k <= tr.k * 1.05) {
      setList(g.points)
      return
    }
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    animate().call(
      zoomRef.current.transform,
      zoomIdentity
        .translate(geo.w / 2, geo.h / 2)
        .scale(k)
        .translate(-cx, -cy),
    )
  }

  if (traces.length === 0) return null
  return (
    <div
      ref={ref}
      role="group"
      aria-label={format(t.guide.map.ariaLabel, { name })}
      // One finger and the plain wheel scroll the page; two fingers zoom (the d3 filter above).
      style={{ height: geo?.h ?? 420, touchAction: 'pan-x pan-y' }}
      className="relative -mx-[clamp(20px,5vw,48px)] cursor-grab overflow-hidden bg-bg select-none active:cursor-grabbing sm:mx-0 sm:rounded-lg sm:shadow-[inset_0_0_0_1px_var(--color-divider)]"
    >
      {geo && (
        <svg width={geo.w} height={geo.h} aria-hidden="true" className="absolute inset-0 block">
          <g transform={tr.toString()}>
            {geo.others.map((d, i) => (
              <path
                key={i}
                d={d}
                vectorEffect="non-scaling-stroke"
                className="fill-neutral-200 stroke-bg stroke-[0.6px]"
              />
            ))}
            {geo.country && (
              <path
                d={geo.country}
                vectorEffect="non-scaling-stroke"
                className="fill-neutral-300 stroke-bg stroke-[0.6px]"
              />
            )}
          </g>
        </svg>
      )}
      {!geo && (
        <p className="absolute inset-0 m-0 grid place-items-center text-[15px] text-neutral-700 italic">
          {t.guide.map.loading}
        </p>
      )}
      {failed && (
        <p className="absolute top-3 left-3 m-0 text-[13px] text-neutral-700 italic">
          {t.guide.map.unavailable}
        </p>
      )}

      {groups.map((g) =>
        g.points.length === 1 ? (
          <Pin
            key={g.points[0].trace.id}
            point={g.points[0]}
            entry={entries[g.points[0].trace.key]}
            onOpen={onOpen}
          />
        ) : (
          <button
            key={g.points.map((p) => p.trace.id).join()}
            type="button"
            onClick={() => openGroup(g)}
            aria-label={format(t.guide.map.group, { n: g.points.length })}
            style={{ left: g.x, top: g.y }}
            className="absolute z-1 grid size-[38px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-2 border-bg bg-text p-0 font-body text-[15px] font-semibold text-bg tabular-nums shadow-md hover:bg-accent-800"
          >
            {g.points.length}
          </button>
        ),
      )}

      {geo && (
        <div className="absolute right-3 bottom-3 z-2 flex flex-col gap-1">
          <ZoomButton label={t.guide.map.zoomIn} onClick={() => zoomBy(2)}>
            <PlusIcon size={20} />
          </ZoomButton>
          <ZoomButton label={t.guide.map.zoomOut} onClick={() => zoomBy(1 / 2)}>
            <MinusIcon size={20} />
          </ZoomButton>
          <ZoomButton label={t.guide.map.zoomAll} onClick={zoomAll}>
            <CornersOutIcon weight="duotone" size={20} />
          </ZoomButton>
        </div>
      )}

      {list && (
        <div className="absolute bottom-3 left-3 z-3 flex max-h-[calc(100%-24px)] w-[min(320px,calc(100%-80px))] flex-col overflow-hidden rounded-md bg-bg shadow-lg">
          <div className="flex flex-none items-center justify-between pl-3">
            <span className="text-[11px] tracking-[.14em] text-neutral-700 uppercase">
              {format(t.guide.map.here, { n: list.length })}
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-icon size-[44px] text-text"
              aria-label={t.guide.album.close}
              onClick={() => setList(null)}
            >
              <XIcon size={20} aria-hidden="true" />
            </button>
          </div>
          <ul className="m-0 list-none overflow-y-auto p-0 pb-2">
            {list.map((p) => (
              <li key={p.trace.id}>
                <button
                  type="button"
                  onClick={() => onOpen(p.trace.id)}
                  className="flex min-h-[44px] w-full cursor-pointer items-center gap-3 border-0 bg-transparent px-3 text-left font-body text-[15px] text-text hover:bg-accent-100"
                >
                  <span className="w-[2ch] flex-none text-neutral-700 tabular-nums">
                    {pad(p.trace.num)}
                  </span>
                  <span className="min-w-0 flex-1">{p.trace.name}</span>
                  {isSeen(entries[p.trace.key]) && (
                    <CheckIcon weight="bold" size={16} className="flex-none text-accent-700" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** A trace on the map: the reader's photo once found, else its number in a dashed circle. */
function Pin({
  point,
  entry,
  onOpen,
}: {
  point: Point
  entry: Entry | undefined
  onOpen: (id: string) => void
}) {
  const { trace } = point
  const num = pad(trace.num)
  const seen = isSeen(entry)
  const src = photoSrc(entry, 'thumb')
  return (
    <button
      type="button"
      onClick={() => onOpen(trace.id)}
      title={trace.name}
      aria-label={format(t.guide.album.traceAria, {
        num,
        name: trace.name,
        rarity: t.guide.album.rarity[trace.rarity],
        where: t.guide.album.where[trace.where].toLowerCase(),
        state: seen ? t.guide.album.seen : t.guide.album.toFind,
      })}
      style={{ left: point.x, top: point.y }}
      className={`absolute grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center overflow-hidden p-0 font-body ${
        seen
          ? 'z-1 size-[46px] rounded-md border-2 border-bg bg-accent-700 text-bg shadow-md hover:border-accent-600'
          : `size-[30px] rounded-full border-[1.5px] bg-bg text-[11px] font-semibold text-neutral-700 tabular-nums hover:bg-accent-100 hover:text-accent-800 ${boxBorder(false, trace.theme)}`
      }`}
    >
      {seen ? (
        src ? (
          // eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          <CheckIcon weight="bold" size={18} aria-hidden="true" />
        )
      ) : (
        <span aria-hidden="true">{num}</span>
      )}
    </button>
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
