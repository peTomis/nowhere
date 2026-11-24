'use client'

import {
  ArrowsClockwiseIcon,
  CameraIcon,
  CircleNotchIcon,
  CloudSlashIcon,
  ImageBrokenIcon,
  ImagesIcon,
  LockSimpleIcon,
  MapPinIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { PERSONAL_SLOTS, personalTrace, subjectKey, type Subject } from '@/content/subjects'
import { format, paths } from '@/i18n'
import { useLang, useT } from '@/i18n/client'
import {
  addPhoto,
  removeFromAlbum,
  retryPhoto,
  savePersonal,
  useCollection,
  type Entry,
} from '@/lib/reader/collection'
import { PhotoError, processPhoto, type ProcessedPhoto } from '@/lib/reader/photos'
import { PERSONAL } from '@/lib/reader/schema'
import { useGuideData } from './data'
import { PhotoViewer } from './PhotoViewer'
import { formatDay, photoSrc } from './Trace'

/*
 * The reader's own traces (not in the design): PERSONAL_SLOTS boxes at the end of the album that
 * the guide leaves empty, for a place, a meeting or a taste it doesn't have. The reader writes a
 * title, where, a story and adds a photo; all private, like the notes. They are not scored: the
 * completion counts only the guide's traces. An empty box opens the form (or sign-in), a written
 * one opens the trace, with "Modifica". Not on the album's map: readers' photos carry no GPS.
 */

export function PersonalTraces() {
  const t = useT()
  const lang = useLang()
  const router = useRouter()
  const { country } = useGuideData()
  const { session, entries } = useCollection()
  const [open, setOpen] = useState<number | null>(null)
  // Stable: the dialog's focus and Escape effect depends on it.
  const close = useCallback(() => setOpen(null), [])
  const slots = Array.from({ length: PERSONAL_SLOTS }, (_, i) => {
    const subject = personalTrace(country, i + 1)
    return { n: i + 1, subject, entry: entries[subjectKey(subject)] }
  })
  const current = open ? slots[open - 1] : undefined

  return (
    <section aria-labelledby="album-personal" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 id="album-personal" className="m-0 text-[clamp(26px,5vw,34px)] leading-[1.1]">
          {t.guide.personal.title}
        </h3>
        <span className="max-w-[52ch] text-[15px] leading-[1.45] text-neutral-700 italic">
          {t.guide.personal.lede}
        </span>
      </div>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-3 gap-y-4 p-0">
        {slots.map(({ n, entry }) => (
          <li key={n} className="min-w-0">
            <PersonalBox
              n={n}
              entry={entry}
              signedOut={session === 'signed-out'}
              onOpen={() =>
                session === 'signed-out' && !entry?.personal
                  ? router.push(paths.account(lang))
                  : setOpen(n)
              }
            />
          </li>
        ))}
      </ul>
      {current && (
        <PersonalDialog
          key={current.n}
          n={current.n}
          subject={current.subject}
          entry={current.entry}
          onClose={close}
        />
      )}
    </section>
  )
}

/** A box: the reader's photo (or a pencil) and the title, or a dashed box with a plus. */
function PersonalBox({
  n,
  entry,
  signedOut,
  onOpen,
}: {
  n: number
  entry: Entry | undefined
  signedOut: boolean
  onOpen: () => void
}) {
  const t = useT()
  const written = entry?.personal
  const src = written && photoSrc(entry, 'thumb')
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={format(t.guide.personal.boxAria, {
        n,
        total: PERSONAL_SLOTS,
        state: written?.title ?? (signedOut ? t.guide.personal.signIn : t.guide.personal.empty),
      })}
      className="flex w-full cursor-pointer flex-col gap-2 border-0 bg-transparent p-0 text-left font-body text-text hover:text-accent-800"
    >
      <span
        className={`relative block aspect-4/3 w-full overflow-hidden rounded-md border-[1.5px] bg-bg ${written ? 'border-transparent bg-surface' : 'border-dashed border-neutral-500'}`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview
          <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
        ) : written ? (
          <PencilSimpleIcon
            weight="duotone"
            size={32}
            aria-hidden="true"
            className="absolute right-[12px] bottom-2 text-accent-700"
          />
        ) : (
          <PlusIcon
            size={32}
            aria-hidden="true"
            className="absolute inset-0 m-auto text-neutral-500"
          />
        )}
      </span>
      <span aria-hidden="true" className="flex min-w-0 flex-col gap-1">
        <span
          className={`text-[15px] leading-[1.3] ${written ? 'font-semibold' : 'text-neutral-700 italic'}`}
        >
          {written?.title ?? (signedOut ? t.guide.personal.signIn : t.guide.personal.empty)}
        </span>
        {written?.place && <span className="text-xs text-neutral-700">{written.place}</span>}
      </span>
    </button>
  )
}

type Mode = 'view' | 'edit' | 'confirm'

/**
 * A personal trace in a bottom sheet (phones) or a window (from 640px): read it, write it, or
 * delete it. The texts are saved first (a refusal stays in the form), then the photo uploads in
 * the background as a trace's does.
 */
function PersonalDialog({
  n,
  subject,
  entry,
  onClose,
}: {
  n: number
  subject: Subject
  entry: Entry | undefined
  onClose: () => void
}) {
  const t = useT()
  const lang = useLang()
  const written = entry?.personal
  const [mode, setMode] = useState<Mode>(written ? 'view' : 'edit')
  const [title, setTitle] = useState(written?.title ?? '')
  const [place, setPlace] = useState(written?.place ?? '')
  const [text, setText] = useState(written?.text ?? '')
  const [picked, setPicked] = useState<{ photo: ProcessedPhoto; preview: string } | null>(null)
  const [problem, setProblem] = useState<{ title: string; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [viewing, setViewing] = useState(false)
  const camera = useRef<HTMLInputElement>(null)
  const gallery = useRef<HTMLInputElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const ids = useId()
  const saved = photoSrc(entry, 'full')
  const preview = picked?.preview ?? saved
  const failed = (text: string) => setProblem({ title: t.guide.photo.errorTitle, text })

  // Focus, Escape, scroll lock; focus goes back to the opener on close.
  const viewingRef = useRef(false)
  useEffect(() => {
    viewingRef.current = viewing
  }, [viewing])
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    // The photo viewer, on top, closes first.
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !viewingRef.current && onClose()
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      opener?.focus?.()
    }
  }, [onClose])
  // A preview not handed to the collection is freed with the dialog.
  const handed = useRef(false)
  useEffect(
    () => () => {
      if (picked && !handed.current) URL.revokeObjectURL(picked.preview)
    },
    [picked],
  )

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      const photo = await processPhoto(file)
      setPicked({ photo, preview: URL.createObjectURL(photo.full) })
      setProblem(null)
    } catch (err) {
      const reason = err instanceof PhotoError ? err.reason : 'unreadable'
      setProblem({
        title: t.guide.photo.unreadableTitle,
        text: format(reason === 'too-large' ? t.guide.photo.tooLarge : t.guide.photo.unreadable, {
          file: file.name,
        }),
      })
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    if (!title.trim()) return
    setBusy(true)
    try {
      await savePersonal(subject, { title, place, text }, lang)
    } catch {
      failed(t.guide.personal.saveError)
      setBusy(false)
      return
    }
    if (picked) {
      handed.current = true
      addPhoto(subject, picked.photo)
    }
    onClose()
  }

  const remove = async () => {
    setBusy(true)
    try {
      await removeFromAlbum(subject)
      onClose()
    } catch {
      setMode('edit')
      failed(t.guide.personal.deleteError)
      setBusy(false)
    }
  }

  const left = PERSONAL.text - text.length
  const heading = mode === 'view' && written ? written.title : t.guide.personal.newTitle

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-end justify-center bg-[color-mix(in_srgb,var(--color-neutral-900)_50%,transparent)] font-body [text-wrap:pretty] text-text sm:items-center sm:p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${ids}-t`}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94%] w-full flex-col overflow-hidden rounded-t-lg bg-bg shadow-lg sm:max-h-[min(820px,100%)] sm:w-[min(600px,100%)] sm:rounded-lg"
      >
        {/* Inside the dialog: their clicks must not reach the backdrop, which closes it. */}
        <input
          ref={camera}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={pick}
          tabIndex={-1}
          aria-hidden="true"
          hidden
        />
        <input
          ref={gallery}
          type="file"
          accept="image/*"
          onChange={pick}
          tabIndex={-1}
          aria-hidden="true"
          hidden
        />
        <div aria-hidden="true" className="flex flex-none justify-center pt-[10px] sm:hidden">
          <span className="h-[4px] w-[40px] rounded-[2px] bg-neutral-300" />
        </div>
        <div className="flex flex-none items-start gap-2 pt-3 pr-3 pb-2 pl-4">
          <div className="flex min-w-0 flex-1 flex-col gap-[2px] pt-[6px]">
            <span className="text-[11px] tracking-[.14em] text-neutral-700 uppercase">
              {format(t.guide.personal.kicker, { n, total: PERSONAL_SLOTS })}
            </span>
            <h2 id={`${ids}-t`} className="m-0 text-[21px] leading-[1.25]">
              {heading}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-ghost btn-icon size-[44px] flex-none text-text"
            aria-label={t.guide.photo.close}
            onClick={onClose}
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        {mode === 'confirm' ? (
          <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
            <h3 className="m-0 text-[19px] leading-[1.3]">{t.guide.personal.confirmTitle}</h3>
            <p className="m-0 text-base leading-[1.5] text-neutral-800">
              {t.guide.personal.confirmText}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                className="btn min-h-[48px] bg-text text-base text-bg hover:bg-neutral-800"
                disabled={busy}
                onClick={remove}
              >
                {t.guide.personal.confirmDelete}
              </button>
              <button
                type="button"
                className="btn btn-secondary min-h-[48px] text-base"
                onClick={() => setMode('edit')}
              >
                {t.guide.photo.cancel}
              </button>
            </div>
          </div>
        ) : mode === 'view' && written ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-2 pb-4">
              {saved && (
                <button
                  type="button"
                  aria-label={format(t.guide.trace.open, {
                    alt: format(t.guide.personal.photoAlt, { title: written.title }),
                  })}
                  onClick={() => setViewing(true)}
                  className="relative block aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-md border-0 bg-surface p-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- signed URL or local preview */}
                  <img src={saved} alt="" className="absolute inset-0 size-full object-cover" />
                </button>
              )}
              <PhotoState subject={subject} entry={entry} />
              <div className="flex flex-col gap-1 text-sm leading-[1.4] text-neutral-700">
                {written.place && (
                  <span className="flex items-center gap-[6px]">
                    <MapPinIcon weight="duotone" size={16} aria-hidden="true" />
                    {written.place}
                  </span>
                )}
                <span>
                  {format(t.guide.personal.writtenOn, {
                    date: formatDay(written.createdAt, lang),
                  })}
                </span>
              </div>
              {written.text && (
                <p className="m-0 max-w-[60ch] text-[17px] leading-[1.55] whitespace-pre-line">
                  {written.text}
                </p>
              )}
              <Private />
            </div>
            <Footer>
              <button
                type="button"
                className="btn btn-primary inline-flex min-h-[48px] flex-1 items-center justify-center gap-[8px] text-base"
                onClick={() => setMode('edit')}
              >
                <PencilSimpleIcon weight="duotone" size={18} aria-hidden="true" />
                {t.guide.personal.edit}
              </button>
            </Footer>
            {viewing && saved && (
              <PhotoViewer
                src={saved}
                alt={format(t.guide.personal.photoAlt, { title: written.title })}
                onClose={() => setViewing(false)}
              />
            )}
          </>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-2 pb-4">
              {problem && (
                <div role="alert" className="flex flex-col gap-[6px]">
                  <span className="flex items-center gap-[8px] text-base font-semibold">
                    <ImageBrokenIcon weight="duotone" size={22} aria-hidden="true" />
                    {problem.title}
                  </span>
                  <span className="text-[15px] leading-[1.5] text-neutral-800">{problem.text}</span>
                </div>
              )}

              <Field id={`${ids}-title`} label={t.guide.personal.titleLabel}>
                <input
                  id={`${ids}-title`}
                  className="input min-h-[48px] w-full bg-bg px-3 text-base"
                  required
                  maxLength={PERSONAL.title}
                  placeholder={t.guide.personal.titlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <Field id={`${ids}-place`} label={t.guide.personal.placeLabel}>
                <input
                  id={`${ids}-place`}
                  className="input min-h-[48px] w-full bg-bg px-3 text-base"
                  maxLength={PERSONAL.place}
                  placeholder={t.guide.personal.placePlaceholder}
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </Field>
              <Field id={`${ids}-text`} label={t.guide.personal.textLabel}>
                <textarea
                  id={`${ids}-text`}
                  className="input min-h-[160px] w-full bg-bg px-3 py-[10px] text-base leading-[1.45]"
                  rows={6}
                  maxLength={PERSONAL.text}
                  placeholder={t.guide.personal.textPlaceholder}
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, PERSONAL.text))}
                  aria-describedby={left <= 200 ? `${ids}-left` : undefined}
                />
                {left <= 200 && (
                  <span id={`${ids}-left`} className="text-[13px] leading-[1.4] text-neutral-700">
                    {left === 1
                      ? t.guide.personal.textLeftOne
                      : format(t.guide.personal.textLeft, { n: left })}
                  </span>
                )}
              </Field>

              <div className="flex flex-col gap-[6px]">
                <span className="text-sm text-neutral-800">{t.guide.personal.photoLabel}</span>
                {preview ? (
                  <>
                    <div
                      role="img"
                      aria-label={t.guide.photo.preview}
                      className="relative aspect-4/3 w-full overflow-hidden rounded-md bg-surface"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- local preview or signed URL */}
                      <img
                        src={preview}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <PickButton
                        icon={<CameraIcon weight="duotone" size={18} aria-hidden="true" />}
                        onClick={() => camera.current?.click()}
                        className="-ml-2"
                      >
                        {t.guide.photo.cameraAgain}
                      </PickButton>
                      <PickButton
                        icon={<ImagesIcon weight="duotone" size={18} aria-hidden="true" />}
                        onClick={() => gallery.current?.click()}
                      >
                        {t.guide.photo.gallery}
                      </PickButton>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                    {[
                      { ref: camera, Icon: CameraIcon, label: t.guide.photo.camera },
                      { ref: gallery, Icon: ImagesIcon, label: t.guide.photo.gallery },
                    ].map(({ ref, Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        disabled={busy}
                        className="btn btn-secondary flex min-h-[88px] flex-col items-center justify-center gap-[8px] p-3 text-center text-base whitespace-normal"
                        onClick={() => ref.current?.click()}
                      >
                        <Icon
                          weight="duotone"
                          size={28}
                          aria-hidden="true"
                          className="text-accent-700"
                        />
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Private />

              {written && (
                <button
                  type="button"
                  className="btn btn-ghost -ml-2 inline-flex min-h-[44px] items-center gap-[6px] self-start px-2 text-[15px] text-neutral-800"
                  onClick={() => setMode('confirm')}
                >
                  <TrashIcon weight="duotone" size={18} aria-hidden="true" />
                  {t.guide.personal.remove}
                </button>
              )}
            </div>
            <Footer>
              <button
                type="button"
                className="btn btn-secondary min-h-[48px] flex-[1_1_120px] text-base"
                onClick={written ? () => setMode('view') : onClose}
              >
                {t.guide.photo.cancel}
              </button>
              <button
                type="button"
                className="btn btn-primary min-h-[48px] flex-[2_1_160px] text-base"
                disabled={!title.trim() || busy}
                onClick={save}
              >
                {t.guide.personal.save}
              </button>
            </Footer>
          </>
        )}
      </div>
    </div>
  )
}

/** The upload of the trace's photo, while it isn't saved yet: in progress, offline, or failed. */
function PhotoState({ subject, entry }: { subject: Subject; entry: Entry | undefined }) {
  const t = useT()
  const local = entry?.local
  if (!local) return null
  if (local.state === 'pending')
    return (
      <span role="status" className="flex items-center gap-[8px] text-sm text-neutral-800">
        <CircleNotchIcon
          size={18}
          aria-hidden="true"
          className="text-accent-700 motion-safe:animate-spin"
        />
        {t.guide.personal.savingPhoto}
      </span>
    )
  if (local.state === 'offline')
    return (
      <span role="status" className="flex items-start gap-[6px] text-sm text-neutral-800">
        <CloudSlashIcon weight="duotone" size={20} aria-hidden="true" className="flex-none" />
        {t.guide.personal.photoOffline}
      </span>
    )
  return (
    <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="flex items-center gap-[6px] text-sm text-neutral-800">
        <WarningCircleIcon weight="duotone" size={20} aria-hidden="true" />
        {local.state === 'session' ? t.guide.trace.errorSession : t.guide.personal.photoError}
      </span>
      <button
        type="button"
        className="btn btn-ghost inline-flex min-h-[44px] items-center gap-[6px] px-2 text-[15px] text-accent-700"
        onClick={() => retryPhoto(subjectKey(subject))}
      >
        <ArrowsClockwiseIcon weight="duotone" size={18} aria-hidden="true" />
        {t.guide.trace.retry}
      </button>
    </div>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="field flex flex-col gap-[6px]">
      <label htmlFor={id} className="m-0 text-sm text-neutral-800">
        {label}
      </label>
      {children}
    </div>
  )
}

function Private() {
  const t = useT()
  return (
    <div className="flex items-start gap-[10px] text-sm leading-[1.45] text-neutral-800">
      <LockSimpleIcon weight="duotone" size={18} aria-hidden="true" className="mt-px flex-none" />
      <span>
        <span className="font-semibold text-text">{t.guide.photo.privateTitle}</span>{' '}
        {t.guide.personal.privateText}
      </span>
    </div>
  )
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-none flex-wrap gap-2 px-4 pt-3 pb-[calc(15px+env(safe-area-inset-bottom,0px))] shadow-[0_-1px_0_var(--color-divider)]">
      {children}
    </div>
  )
}

function PickButton({
  icon,
  onClick,
  className = '',
  children,
}: {
  icon: ReactNode
  onClick: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`btn btn-ghost inline-flex min-h-[44px] items-center gap-[6px] px-2 text-[15px] text-accent-700 ${className}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}
