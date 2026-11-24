import { useLayoutEffect } from 'react'
import { GUIDE_BAR_HEIGHT, GUIDE_BAR_ID } from './view'

/*
 * The guide's sticky bar and the account button it pushes up (GuideShell). Their state is in the
 * DOM, not in React: `data-stuck` on the bar (its background and controls follow it through
 * Tailwind's `data-stuck:` variants), `inert` on its controls while it isn't stuck, and `--bar-y`
 * (the bar's top edge, viewport px) on the button's wrapper. An inline script right after the bar
 * (guideBarScript) sets them while the HTML is parsed and keeps them up to date, frame by frame,
 * until the shell is hydrated, which on a long guide takes a moment: a reload restores the scroll in the middle of
 * the text, and without it the bar would stay see-through and the button where it is at the top
 * until then. Once hydrated, useGuideBar stops the script and does the same.
 */

/** The zero-height element where the bar's bottom edge is in the flow. */
export const GUIDE_BAR_SENTINEL_ID = 'guide-bar-sentinel'
/** The account button's wrapper. */
export const GUIDE_ACCOUNT_ID = 'guide-account'
/** Marks the bar's controls, inert while the bar isn't stuck. */
export const BAR_CONTROL = 'data-bar-control'

/** The global the inline script leaves, so the hydrated shell can stop it. */
const HANDLE = '__nowhereGuideBar'

/**
 * Sets the bar's state from the layout. The bar is stuck once the sentinel has passed its height
 * from the top of the viewport (the bar is pulled up by its height over the opening).
 */
function sync() {
  const bar = document.getElementById(GUIDE_BAR_ID)
  const sentinel = document.getElementById(GUIDE_BAR_SENTINEL_ID)
  // Not laid out yet: the streamed HTML of a Suspense boundary arrives in a hidden container
  // and is moved into place later; there everything measures 0, which would read as stuck.
  if (!bar || !sentinel || sentinel.getClientRects().length === 0) return
  const stuck = sentinel.getBoundingClientRect().top < GUIDE_BAR_HEIGHT
  bar.toggleAttribute('data-stuck', stuck)
  for (const el of bar.querySelectorAll(`[${BAR_CONTROL}]`)) el.toggleAttribute('inert', !stuck)
  document
    .getElementById(GUIDE_ACCOUNT_ID)
    ?.style.setProperty('--bar-y', `${bar.getBoundingClientRect().top}px`)
}

/**
 * The same as sync(), in plain ES5 for the inline script, run on every frame until the shell is
 * hydrated: while the page loads, the layout keeps changing without a scroll (the stylesheet, the
 * fonts, the cover), and the browser restores the scroll position at some point.
 */
export function guideBarScript() {
  const id = JSON.stringify
  return `(function(){if(window.${HANDLE})return;var f=0;function sync(){var b=document.getElementById(${id(GUIDE_BAR_ID)}),s=document.getElementById(${id(GUIDE_BAR_SENTINEL_ID)});if(!b||!s||!s.getClientRects().length)return;var st=s.getBoundingClientRect().top<${GUIDE_BAR_HEIGHT};if(st)b.setAttribute("data-stuck","");else b.removeAttribute("data-stuck");var c=b.querySelectorAll("[${BAR_CONTROL}]");for(var i=0;i<c.length;i++){if(st)c[i].removeAttribute("inert");else c[i].setAttribute("inert","")}var a=document.getElementById(${id(GUIDE_ACCOUNT_ID)});if(a)a.style.setProperty("--bar-y",b.getBoundingClientRect().top+"px")}function loop(){sync();f=requestAnimationFrame(loop)}loop();window.${HANDLE}={stop:function(){cancelAnimationFrame(f)}}})()`
}

type Handle = { stop: () => void }

/**
 * Keeps the bar's state once the shell is mounted: stops the inline script (absent after a
 * client-side navigation, where it is rendered inert), then syncs on scroll, resize and layout
 * shifts above the sentinel (an IntersectionObserver; it alone would miss a jump across the
 * sentinel, such as the restored scroll of a reload, which the scroll listener catches).
 */
export function useGuideBar() {
  useLayoutEffect(() => {
    const w = window as unknown as Record<string, Handle | undefined>
    w[HANDLE]?.stop()
    w[HANDLE] = undefined
    const frame = { id: 0 }
    const schedule = () => {
      if (!frame.id)
        frame.id = requestAnimationFrame(() => {
          frame.id = 0
          sync()
        })
    }
    sync()
    const sentinel = document.getElementById(GUIDE_BAR_SENTINEL_ID)
    const io = new IntersectionObserver(schedule, {
      rootMargin: `-${GUIDE_BAR_HEIGHT}px 0px 0px 0px`,
    })
    if (sentinel) io.observe(sentinel)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame.id)
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}
