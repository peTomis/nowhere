'use client'

import {
  CaretRightIcon,
  CircleNotchIcon,
  DatabaseIcon,
  GoogleLogoIcon,
  SignOutIcon,
  UserIcon,
  XIcon,
} from '@phosphor-icons/react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { format, t } from '@/i18n'

/**
 * Account button and side panel, port of "Account.dc.html". The button shows the reader's initial
 * when signed in; the panel offers Google sign-in, or the account, a link to "I tuoi dati"
 * (/account) and sign-out. Not ported yet: the sync status line and its badge (there are no photos
 * to upload until the collection exists, docs/data-model.md §6).
 *
 * The session is read from /api/me after hydration, so the pages that host it stay static.
 *
 * `panel={false}` (guide pages): only the avatar, not clickable and without the panel, so signing
 * in and out happen from the home only.
 */

export type Me = { email: string; name?: string; image?: string }

type Props = {
  /** Whether the button opens the account panel. */
  panel?: boolean
}

export function AccountMenu({ panel = true }: Props) {
  const [me, setMe] = useState<Me | null>(null)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    const abort = new AbortController()
    fetch('/api/me', { signal: abort.signal })
      .then((r) => (r.ok ? (r.json() as Promise<Me>) : null))
      .then((m) => setMe(m?.email ? m : null))
      .catch(() => {}) // offline or aborted: stay signed out
    return () => abort.abort()
  }, [])

  // Escape closes; focus goes to the close button on open and back to the trigger on close.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open) closeRef.current?.focus()
    else if (wasOpen.current) btnRef.current?.focus()
    wasOpen.current = open
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const face = me ? (
    <Avatar me={me} className="size-full text-lg" />
  ) : (
    <UserIcon weight="duotone" size={22} aria-hidden="true" />
  )
  const label = me
    ? format(t.accountMenu.buttonSignedIn, { email: me.email })
    : t.accountMenu.signIn

  if (!panel)
    return (
      <span
        role="img"
        aria-label={me ? label : t.accountMenu.title}
        className="relative grid size-[48px] flex-none place-items-center overflow-hidden rounded-full bg-bg font-body text-text shadow-sm"
      >
        {face}
      </span>
    )

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-[48px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-bg p-0 font-body text-text shadow-sm hover:bg-accent-100"
      >
        {face}
      </button>

      {/* Always mounted, so it can slide in from the right and out again; inert while closed. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-80 bg-neutral-900/40 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={`fixed top-0 right-0 bottom-0 z-81 flex w-[min(360px,calc(100%-48px))] flex-col overflow-y-auto bg-bg font-body text-pretty text-text shadow-lg transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none ${open ? 'visible translate-x-0' : 'invisible translate-x-full'}`}
      >
        <div className="flex flex-none items-center justify-between gap-2 pt-3 pr-3 pl-6">
          <h2
            id={titleId}
            className="m-0 text-xs font-normal tracking-[.16em] text-accent-700 uppercase"
          >
            {t.accountMenu.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="grid size-[44px] cursor-pointer place-items-center border-0 bg-transparent p-0 text-text hover:text-accent-700"
            aria-label={t.accountMenu.close}
            onClick={() => setOpen(false)}
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 px-6 pt-4 pb-6">
          {me ? (
            <div className="flex items-center gap-3">
              <Avatar me={me} className="size-[52px] flex-none text-[22px]" />
              <div className="flex min-w-0 flex-col">
                <span className="text-lg leading-[1.3] font-semibold">{me.name || me.email}</span>
                <span className="text-sm leading-[1.4] wrap-anywhere text-neutral-700">
                  {me.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="m-0 text-[17px] leading-normal">{t.accountMenu.signInPrompt}</p>
              <button
                type="button"
                className="btn btn-secondary flex min-h-[48px] gap-[8px] bg-bg text-base"
                disabled={busy}
                aria-busy={busy}
                onClick={() => {
                  setBusy(true)
                  signIn('google', { redirectTo: window.location.pathname }).catch(() =>
                    setBusy(false),
                  )
                }}
              >
                {busy ? (
                  <>
                    <CircleNotchIcon
                      weight="duotone"
                      size={18}
                      aria-hidden="true"
                      className="motion-safe:animate-spin"
                    />
                    {t.accountMenu.signingIn}
                  </>
                ) : (
                  <>
                    <GoogleLogoIcon weight="duotone" size={20} aria-hidden="true" />
                    {t.accountMenu.signInGoogle}
                  </>
                )}
              </button>
            </div>
          )}

          <nav aria-label={t.accountMenu.title} className="flex flex-col">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center gap-3 text-text no-underline hover:text-accent-700"
            >
              <DatabaseIcon
                weight="duotone"
                size={22}
                aria-hidden="true"
                className="flex-none text-accent-700"
              />
              <span className="min-w-0 flex-1 text-[17px] leading-[1.3]">
                {t.accountMenu.yourData}
              </span>
              <CaretRightIcon
                weight="duotone"
                size={18}
                aria-hidden="true"
                className="flex-none text-neutral-700"
              />
            </Link>
          </nav>

          {me && (
            <button
              type="button"
              className="btn btn-ghost mt-auto -mr-2 inline-flex min-h-[44px] gap-[6px] self-end px-2 text-[15px] text-accent-700"
              onClick={() => signOut({ redirectTo: window.location.pathname })}
            >
              <SignOutIcon weight="duotone" size={18} aria-hidden="true" />
              {t.accountMenu.signOut}
            </button>
          )}
        </div>
      </aside>
    </>
  )
}

/** The Google profile picture, or the initial when there is none or it fails to load. */
export function Avatar({ me, className }: { me: Me; className: string }) {
  const [failed, setFailed] = useState(false)
  const initial = (me.name || me.email).trim().charAt(0).toUpperCase()
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center overflow-hidden rounded-full bg-accent-100 font-semibold text-accent-800 ${className}`}
    >
      {me.image && !failed ? (
        // A remote avatar at icon size: next/image would need the Google host configured for no gain.
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={me.image}
          alt=""
          referrerPolicy="no-referrer"
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        initial
      )}
    </span>
  )
}
