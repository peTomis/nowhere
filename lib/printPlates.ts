/**
 * Port of print-plates.js from the Broadsheet design system.
 *
 * Mounts the SVG separation filters (#sep-c/m/y/k and the compound #sep-all) used
 * by `.cmyk` once per document, and starts the "press driver":
 * - hovering `.cmyk .print` eases the plates into register so the image becomes a photograph;
 * - the pointer publishes --press-nx / --press-ny (-1..1) on :root, which `.cmyk-num`
 *   and `.cmyk-head` use to make the plates "breathe" toward the cursor.
 * Stands down under prefers-reduced-motion or without a fine pointer.
 */

const ID = 'broadsheet-print-plates'

const INK = {
  c: [1, 0, 0, 0, 0, 0.467, 0, 0, 0, 0.533, 0.31, 0, 0, 0, 0.69, 0, 0, 0, 0, 1],
  m: [0, 0.161, 0, 0, 0.839, 0, 1, 0, 0, 0, 0, 0.576, 0, 0, 0.424, 0, 0, 0, 0, 1],
  y: [0, 0, 0.071, 0, 0.929, 0, 0, 0.267, 0, 0.733, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  k: [
    0.112, 0.375, 0.038, 0, 0.475, 0.113, 0.379, 0.038, 0, 0.471, 0.113, 0.38, 0.038, 0, 0.468, 0,
    0, 0, 0, 1,
  ],
} as const

/** "Pure" factorization: the four plates multiplied together give back exactly the source. */
const TRUE_ = {
  c: [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  m: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  y: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  k: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
} as const

type Plate = keyof typeof INK
type OffsetPlate = 'm' | 'y' | 'k'

const BASE: Record<OffsetPlate, [number, number]> = { m: [5, 3], y: [-5, -3], k: [3, 6] }
const LEAN_PX: [number, number] = [2.5, 2]
const REGISTER_MS = 450

const mat = (p: Plate) => INK[p].join(' ')

const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="sep-c" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${mat('c')}"/></filter>
  <filter id="sep-m" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${mat('m')}"/></filter>
  <filter id="sep-y" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${mat('y')}"/></filter>
  <filter id="sep-k" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${mat('k')}"/></filter>
  <filter id="sep-all" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" type="matrix" values="${mat('c')}" data-plate-mat="c" result="c0"/>
    <feComposite in="c0" in2="SourceAlpha" operator="in" result="c"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="${mat('m')}" data-plate-mat="m" result="m0"/>
    <feComposite in="m0" in2="SourceAlpha" operator="in" result="m1"/>
    <feOffset in="m1" dx="5" dy="3" data-plate="m" result="m"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="${mat('y')}" data-plate-mat="y" result="y0"/>
    <feComposite in="y0" in2="SourceAlpha" operator="in" result="y1"/>
    <feOffset in="y1" dx="-5" dy="-3" data-plate="y" result="y"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="${mat('k')}" data-plate-mat="k" result="k0"/>
    <feComposite in="k0" in2="SourceAlpha" operator="in" result="k1"/>
    <feOffset in="k1" dx="3" dy="6" data-plate="k" result="k"/>
    <feBlend in="m" in2="c" mode="multiply" result="s1"/>
    <feBlend in="y" in2="s1" mode="multiply" result="s2"/>
    <feBlend in="k" in2="s2" mode="multiply"/>
  </filter>
</defs></svg>`

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

function press(svg: SVGSVGElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return

  const offsets = {} as Record<OffsetPlate, SVGFEOffsetElement>
  svg.querySelectorAll<SVGFEOffsetElement>('feOffset[data-plate]').forEach((n) => {
    offsets[n.dataset.plate as OffsetPlate] = n
  })
  const mats = {} as Record<Plate, SVGFEColorMatrixElement>
  svg.querySelectorAll<SVGFEColorMatrixElement>('feColorMatrix[data-plate-mat]').forEach((n) => {
    mats[n.dataset.plateMat as Plate] = n
  })

  const root = document.documentElement
  let nx = 0,
    ny = 0,
    tx = 0,
    ty = 0
  let reg = 1,
    regFrom = 1,
    regTo = 1,
    regT0 = 0
  let raf = 0,
    lastOffs = '',
    lastReg = -1,
    lastProps = ''

  const tick = (now: number) => {
    raf = 0
    nx += (tx - nx) * 0.22
    ny += (ty - ny) * 0.22
    if (regTo !== reg || regT0) {
      const t = Math.min(1, (now - regT0) / REGISTER_MS)
      reg = regFrom + (regTo - regFrom) * ease(t)
      if (t >= 1) {
        reg = regTo
        regT0 = 0
      }
    }
    const lx = LEAN_PX[0] * nx
    const ly = LEAN_PX[1] * ny
    let key = ''
    const vals = {} as Record<OffsetPlate, [string, string]>
    for (const p of Object.keys(BASE) as OffsetPlate[]) {
      const dx = ((BASE[p][0] + lx) * reg).toFixed(2)
      const dy = ((BASE[p][1] + ly) * reg).toFixed(2)
      vals[p] = [dx, dy]
      key += `${dx},${dy};`
    }
    if (key !== lastOffs) {
      lastOffs = key
      for (const p of Object.keys(BASE) as OffsetPlate[]) {
        offsets[p]?.setAttribute('dx', vals[p][0])
        offsets[p]?.setAttribute('dy', vals[p][1])
      }
    }
    if (reg !== lastReg) {
      lastReg = reg
      for (const p of Object.keys(mats) as Plate[]) {
        const a = INK[p],
          b = TRUE_[p]
        mats[p].setAttribute(
          'values',
          a.map((_, i) => (b[i] + (a[i] - b[i]) * reg).toFixed(3)).join(' '),
        )
      }
    }
    const pk = `${nx.toFixed(3)},${ny.toFixed(3)}`
    if (pk !== lastProps) {
      lastProps = pk
      root.style.setProperty('--press-nx', nx.toFixed(3))
      root.style.setProperty('--press-ny', ny.toFixed(3))
    }
    if (regT0 || Math.abs(tx - nx) > 0.002 || Math.abs(ty - ny) > 0.002) schedule()
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(tick)
  }
  const retarget = (to: number) => {
    regFrom = reg
    regTo = to
    regT0 = performance.now()
    schedule()
  }
  const printOf = (t: EventTarget | null) =>
    t instanceof Element ? t.closest('.cmyk .print') : null

  addEventListener(
    'pointermove',
    (e) => {
      tx = (2 * e.clientX) / innerWidth - 1
      ty = (2 * e.clientY) / innerHeight - 1
      schedule()
    },
    { passive: true },
  )
  document.addEventListener('pointerover', (e) => {
    const p = printOf(e.target)
    if (p && !(e.relatedTarget instanceof Node && p.contains(e.relatedTarget))) retarget(0)
  })
  document.addEventListener('pointerout', (e) => {
    const p = printOf(e.target)
    if (p && !(e.relatedTarget instanceof Node && p.contains(e.relatedTarget))) retarget(1)
  })
}

/** Idempotent: calling it more than once mounts the filters only once. */
export function mountPrintPlates() {
  if (typeof document === 'undefined' || document.getElementById(ID)) return
  const host = document.createElement('div')
  host.innerHTML = DEFS
  const svg = host.firstElementChild as SVGSVGElement
  svg.id = ID
  document.body.appendChild(svg)
  press(svg)
}
