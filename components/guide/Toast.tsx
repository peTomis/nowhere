'use client'

import { PushPinIcon, PushPinSlashIcon } from '@phosphor-icons/react'
import { dismissNotice, useNotice } from './notice'

/** The notice at the bottom of the page, port of "Avviso.dc.html": a line and one action. */
export function Toast() {
  const n = useNotice()
  const Icon = n?.icon === 'unpin' ? PushPinSlashIcon : PushPinIcon
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-95 flex justify-center px-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))]"
    >
      {n && (
        <div
          role="status"
          className="pointer-events-auto flex w-[min(480px,100%)] items-center gap-3 rounded-md bg-bg py-1 pr-1 pl-4 font-body [text-wrap:pretty] text-text shadow-lg"
        >
          <Icon
            weight="duotone"
            size={20}
            aria-hidden="true"
            className="flex-none text-accent-700"
          />
          <span className="min-w-0 flex-1 py-[10px] text-[15px] leading-[1.4]">{n.text}</span>
          <button
            type="button"
            className="btn btn-ghost min-h-[44px] flex-none px-3 text-[15px] font-semibold text-accent-700"
            onClick={() => {
              dismissNotice()
              n.run()
            }}
          >
            {n.action}
          </button>
        </div>
      )}
    </div>
  )
}
