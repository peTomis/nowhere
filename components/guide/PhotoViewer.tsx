'use client'

import { MinusIcon, PlusIcon, XIcon } from '@phosphor-icons/react'
import { select } from 'd3-selection'
import 'd3-transition'
import { zoom as d3Zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { t } from '@/i18n'

/** Highest zoom of a photo. */
const MAX_K = 6

/**
 * The reader's photo full screen (not in the design): whole at first, zoomed by pinch, wheel,
 * double click or tap and the buttons, dragged once zoomed. Escape or the button closes it.
 */
export function PhotoViewer({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  const stage = useRef<HTMLDivElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const zoomRef = useRef<ZoomBehavior<HTMLDivElement, unknown>>(null)
  const [tr, setTr] = useState<ZoomTransform>(zoomIdentity)

  // Focus, Escape (before the album's dialog under it sees it) and the page's scroll.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey, true)
    const root = document.documentElement
    const overflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey, true)
      root.style.overflow = overflow
      opener?.focus?.()
    }
  }, [onClose])

  // The zoom, within the screen: a zoomed photo can't be dragged past its edges.
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const zoom = d3Zoom<HTMLDivElement, unknown>()
      .scaleExtent([1, MAX_K])
      .on('zoom', (e: { transform: ZoomTransform }) => setTr(e.transform))
    const fit = () => {
      const box: [[number, number], [number, number]] = [
        [0, 0],
        [el.clientWidth, el.clientHeight],
      ]
      zoom.extent(box).translateExtent(box)
    }
    fit()
    const sel = select(el)
    sel.call(zoom)
    zoomRef.current = zoom
    const onResize = () => {
      fit()
      sel.call(zoom.transform, zoomIdentity)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      sel.on('.zoom', null)
    }
  }, [])

  const zoomBy = (f: number) => {
    const el = stage.current
    if (!el || !zoomRef.current) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    select(el)
      .transition()
      .duration(still ? 0 : 250)
      .call(zoomRef.current.scaleBy, f)
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-70 bg-neutral-900 font-body text-bg"
    >
      <div
        ref={stage}
        style={{ touchAction: 'none' }}
        className={`absolute inset-0 overflow-hidden select-none ${tr.k > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{ transform: `translate(${tr.x}px, ${tr.y}px) scale(${tr.k})` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
      </div>
      <button
        ref={close}
        type="button"
        className="btn btn-secondary btn-icon absolute top-[calc(12px+env(safe-area-inset-top,0px))] right-3 size-[44px] bg-bg text-text"
        aria-label={t.guide.trace.viewer.close}
        onClick={onClose}
      >
        <XIcon size={22} aria-hidden="true" />
      </button>
      <div className="absolute right-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] flex flex-col gap-1">
        <button
          type="button"
          className="btn btn-secondary btn-icon size-[44px] bg-bg text-text"
          aria-label={t.guide.trace.viewer.zoomIn}
          disabled={tr.k >= MAX_K}
          onClick={() => zoomBy(2)}
        >
          <PlusIcon size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-icon size-[44px] bg-bg text-text"
          aria-label={t.guide.trace.viewer.zoomOut}
          disabled={tr.k <= 1}
          onClick={() => zoomBy(1 / 2)}
        >
          <MinusIcon size={20} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  )
}
