'use client'

import {
  CameraIcon,
  CheckIcon,
  CloudSlashIcon,
  EyeSlashIcon,
  ImageBrokenIcon,
  ImagesIcon,
  LockSimpleIcon,
  XIcon,
} from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Completion, completionOf, THRESHOLDS } from '@/components/Completion'
import type { AlbumTrace } from '@/content/build'
import { format, t } from '@/i18n'
import { addPhoto, isSeen, removeFromAlbum, saveNote, useCollection } from '@/lib/reader/collection'
import { PhotoError, processPhoto, type ProcessedPhoto } from '@/lib/reader/photos'
import { NOTE_UI_MAX } from '@/lib/reader/schema'
import { pad, useGuideData } from './data'
import { closePhotoPanel, usePhotoPanel } from './panelStore'
import { photoSrc, RarityMarks } from './Trace'

/*
 * The photo panel, port of "PannelloFoto.dc.html": take or pick a photo for a trace, add a note,
 * put it in the album; then the points it brings and the completion growing (and the level, when
 * one is reached). Also edits a trace's photo and note, or removes it from the album. A bottom
 * sheet on phones, a window from 640px. Mounted once per guide; traces open it through
 * openPhotoPanel(). The "Per chi mi segue" visibility is not ported: notes are private.
 */

export function PhotoPanel() {
  const request = usePhotoPanel()
  const { traces } = useGuideData()
  const trace = request && traces.find((tr) => tr.id === request.trace)
  if (!request || !trace) return null
  // Keyed: a new request starts from a clean state.
  return <Panel key={`${trace.id}-${request.mode}`} trace={trace} mode={request.mode} />
}

type Done = { from: number; level: number | null }

function Panel({ trace, mode }: { trace: AlbumTrace; mode: 'new' | 'edit' }) {
  const { entries } = useCollection()
  const { traces, name } = useGuideData()
  const entry = entries[trace.key]
  const editing = mode === 'edit' && isSeen(entry)
  const [picked, setPicked] = useState<{ photo: ProcessedPhoto; preview: string } | null>(null)
  const [note, setNote] = useState(entry?.note ?? '')
  const [problem, setProblem] = useState<string | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [done, setDone] = useState<Done | null>(null)
  const [busy, setBusy] = useState(false)
  const [offline, setOffline] = useState(false)
  const camera = useRef<HTMLInputElement>(null)
  const gallery = useRef<HTMLInputElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const doneRef = useRef<HTMLButtonElement>(null)
  const ids = useId()
  const preview = picked?.preview ?? photoSrc(entry, 'full')

  // Focus, Escape, scroll lock; focus goes back to the opener on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePhotoPanel()
    const sync = () => setOffline(navigator.onLine === false)
    sync()
    document.addEventListener('keydown', onKey)
    window.addEventListener('online', sync)
    window.addEventListener('offline', sync)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('online', sync)
      window.removeEventListener('offline', sync)
      document.documentElement.style.overflow = ''
      opener?.focus?.()
    }
  }, [])
  useEffect(() => {
    if (done) doneRef.current?.focus()
  }, [done])
  // A preview not handed to the collection is freed with the panel.
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
      setProblem(
        format(reason === 'too-large' ? t.guide.photo.tooLarge : t.guide.photo.unreadable, {
          file: file.name,
        }),
      )
      setPicked(null)
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    if (!preview) return
    const before = completionOf(traces, (k) => isSeen(entries[k]))
    if (picked) {
      handed.current = true
      addPhoto(trace.subject, picked.photo)
    }
    saveNote(trace.subject, note).catch(() => setProblem(t.guide.photo.noteError))
    if (editing) return closePhotoPanel()
    const after = completionOf(traces, (k) => k === trace.key || isSeen(entries[k]))
    setDone({ from: before.pct, level: after.level > before.level ? after.level : null })
  }

  const remove = async () => {
    setBusy(true)
    try {
      await removeFromAlbum(trace.subject)
      closePhotoPanel()
    } catch {
      setConfirm(false)
      setProblem(t.guide.photo.deleteError)
    } finally {
      setBusy(false)
    }
  }

  const points =
    trace.points === 1 ? t.guide.trace.pointOne : format(t.guide.trace.points, { n: trace.points })
  const left = NOTE_UI_MAX - note.length
  const kicker = editing ? t.guide.photo.kickerEdit : t.guide.photo.kickerNew

  return (
    <div
      onClick={closePhotoPanel}
      className="fixed inset-0 z-60 flex items-end justify-center bg-[color-mix(in_srgb,var(--color-neutral-900)_50%,transparent)] font-body [text-wrap:pretty] text-text sm:items-center sm:p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${ids}-t`}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94%] w-full flex-col overflow-hidden rounded-t-lg bg-bg shadow-lg sm:max-h-[min(780px,100%)] sm:w-[min(540px,100%)] sm:rounded-lg"
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
              {kicker}
            </span>
            <h2 id={`${ids}-t`} className="m-0 text-[21px] leading-[1.25]">
              {trace.name}
            </h2>
            <span className="text-sm text-neutral-700 italic">{trace.place}</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-ghost btn-icon size-[44px] flex-none text-text"
            aria-label={t.guide.photo.close}
            onClick={closePhotoPanel}
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        {confirm ? (
          <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
            <h3 className="m-0 text-[19px] leading-[1.3]">{t.guide.photo.confirmTitle}</h3>
            <p className="m-0 text-base leading-[1.5] text-neutral-800">
              {format(t.guide.photo.confirmText, { points })}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                className="btn min-h-[48px] bg-text text-base text-bg hover:bg-neutral-800"
                disabled={busy}
                onClick={remove}
              >
                {t.guide.photo.confirmDelete}
              </button>
              <button
                type="button"
                className="btn btn-secondary min-h-[48px] text-base"
                onClick={() => setConfirm(false)}
              >
                {t.guide.photo.cancel}
              </button>
            </div>
          </div>
        ) : done ? (
          <>
            <div
              role="status"
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-2 pb-4"
            >
              <div className="flex items-center gap-4">
                <Thumb src={preview}>
                  <span className="absolute top-[6px] left-[6px] flex items-center gap-[3px] rounded-md bg-bg py-px pr-[6px] pl-1 text-xs font-semibold tabular-nums">
                    <CheckIcon weight="bold" size={12} className="text-accent-700" />
                    {pad(trace.num)}
                  </span>
                </Thumb>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-[15px] text-neutral-800">{t.guide.photo.inAlbum}</span>
                  <span className="text-[clamp(30px,8vw,40px)] leading-none font-semibold tabular-nums">
                    {trace.points === 1
                      ? t.guide.photo.plusOne
                      : format(t.guide.photo.plus, { n: trace.points })}
                  </span>
                  <span className="flex items-center gap-[6px] text-[13px] tracking-[.12em] text-neutral-700 uppercase">
                    <RarityMarks points={trace.points} />
                    {t.guide.album.rarityLabel[trace.rarity]}
                  </span>
                </div>
              </div>
              {done.level && (
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-[52px] flex-none place-items-center rounded-full bg-text text-[28px] leading-none font-semibold text-bg"
                  >
                    {done.level}
                  </span>
                  <span className="flex flex-col gap-[2px]">
                    <span className="text-[21px] leading-[1.2] font-semibold">
                      {format(t.guide.photo.levelTitle, { n: done.level, name })}
                    </span>
                    <span className="text-[15px] text-neutral-800">
                      {format(t.guide.photo.levelLine, { pct: THRESHOLDS[done.level - 1] })}
                    </span>
                  </span>
                </div>
              )}
              <Completion name={name} traces={traces} variant="full" from={done.from} />
            </div>
            <Footer>
              <button
                ref={doneRef}
                type="button"
                className="btn btn-primary min-h-[48px] flex-1 text-base"
                onClick={closePhotoPanel}
              >
                {t.guide.photo.done}
              </button>
            </Footer>
          </>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-2 pb-4">
              {offline && (
                <div
                  role="status"
                  className="flex items-start gap-[10px] rounded-md bg-surface p-3 text-sm leading-[1.45] text-neutral-800"
                >
                  <CloudSlashIcon
                    weight="duotone"
                    size={20}
                    aria-hidden="true"
                    className="flex-none"
                  />
                  <span>{t.guide.photo.offline}</span>
                </div>
              )}
              {problem && (
                <div role="alert" className="flex flex-col gap-[6px]">
                  <span className="flex items-center gap-[8px] text-base font-semibold">
                    <ImageBrokenIcon weight="duotone" size={22} aria-hidden="true" />
                    {t.guide.photo.unreadableTitle}
                  </span>
                  <span className="text-[15px] leading-[1.5] text-neutral-800">{problem}</span>
                </div>
              )}
              {preview ? (
                <div className="flex flex-col gap-1">
                  <div
                    role="img"
                    aria-label={t.guide.photo.preview}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-surface"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- local preview or signed URL */}
                    <img src={preview} alt="" className="absolute inset-0 size-full object-cover" />
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
                </div>
              ) : (
                <>
                  <span className="text-[15px] leading-[1.5] text-neutral-800">
                    {t.guide.photo.prompt}
                  </span>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                    {[
                      { ref: camera, Icon: CameraIcon, label: t.guide.photo.camera },
                      { ref: gallery, Icon: ImagesIcon, label: t.guide.photo.gallery },
                    ].map(({ ref, Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        disabled={busy}
                        className="btn btn-secondary flex min-h-[104px] flex-col items-center justify-center gap-[8px] p-3 text-center text-base whitespace-normal"
                        onClick={() => ref.current?.click()}
                      >
                        <Icon
                          weight="duotone"
                          size={32}
                          aria-hidden="true"
                          className="text-accent-700"
                        />
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="field flex flex-col gap-[6px]">
                <label htmlFor={`${ids}-n`} className="m-0 text-sm text-neutral-800">
                  {t.guide.photo.noteLabel}
                </label>
                <textarea
                  id={`${ids}-n`}
                  className="input min-h-[96px] w-full bg-bg px-3 py-[10px] text-base leading-[1.45]"
                  rows={3}
                  maxLength={NOTE_UI_MAX}
                  placeholder={trace.invite}
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, NOTE_UI_MAX))}
                  aria-describedby={`${ids}-h`}
                />
                <span id={`${ids}-h`} className="text-[13px] leading-[1.4] text-neutral-700">
                  {left <= 40
                    ? left === 1
                      ? t.guide.photo.noteLeftOne
                      : format(t.guide.photo.noteLeft, { n: left })
                    : t.guide.photo.noteHint}
                </span>
              </div>

              <div className="flex items-start gap-[10px] text-sm leading-[1.45] text-neutral-800">
                <LockSimpleIcon
                  weight="duotone"
                  size={18}
                  aria-hidden="true"
                  className="mt-px flex-none"
                />
                <span>
                  <span className="font-semibold text-text">{t.guide.photo.privateTitle}</span>{' '}
                  {t.guide.photo.privateText}
                </span>
              </div>

              {isSeen(entry) && (
                <button
                  type="button"
                  className="btn btn-ghost -ml-2 inline-flex min-h-[44px] items-center gap-[6px] self-start px-2 text-[15px] text-neutral-800"
                  onClick={() => setConfirm(true)}
                >
                  <EyeSlashIcon weight="duotone" size={18} aria-hidden="true" />
                  {t.guide.photo.remove}
                </button>
              )}
            </div>
            <Footer>
              <button
                type="button"
                className="btn btn-secondary min-h-[48px] flex-[1_1_120px] text-base"
                onClick={closePhotoPanel}
              >
                {t.guide.photo.cancel}
              </button>
              <button
                type="button"
                className="btn btn-primary min-h-[48px] flex-[2_1_160px] text-base"
                disabled={!preview || busy}
                onClick={save}
              >
                {editing ? t.guide.photo.saveEdit : t.guide.photo.save}
              </button>
            </Footer>
          </>
        )}
      </div>
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

function Thumb({ src, children }: { src: string | undefined; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-[112px] flex-none overflow-hidden rounded-md bg-surface"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local preview or signed URL */}
      {src && <img src={src} alt="" className="absolute inset-0 size-full object-cover" />}
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
