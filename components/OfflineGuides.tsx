'use client'

import { CloudArrowDownIcon, CheckCircleIcon, TrashIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { format } from '@/i18n'
import { useLang, useT } from '@/i18n/client'
import {
  OfflineError,
  downloadOffline,
  removeOffline,
  snapshotAvailable,
  useOfflineSnapshot,
} from '@/lib/offline'

type Props = {
  /** Approximate size of the download in bytes (the guides' images and the map). */
  bytes: number
}

/** "Guide offline" in "I tuoi dati": saves the guides on this device for reading without network. */
export function OfflineGuides({ bytes }: Props) {
  const lang = useLang()
  const t = useT()
  const snapshot = useOfflineSnapshot()
  // The id of a snapshot the browser has evicted.
  const [evicted, setEvicted] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState('')
  const controller = useRef<AbortController | null>(null)

  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => {
    if (!snapshot) return
    let current = true
    snapshotAvailable(snapshot.id).then((ok) => current && setEvicted(ok ? null : snapshot.id))
    return () => {
      current = false
    }
  }, [snapshot])

  const download = async () => {
    if (controller.current) return
    setError('')
    controller.current = new AbortController()
    setProgress({ done: 0, total: 0 })
    try {
      await downloadOffline(
        lang,
        (done, total) => setProgress({ done, total }),
        controller.current.signal,
      )
    } catch (e) {
      if (!controller.current?.signal.aborted)
        setError(t.offline[e instanceof OfflineError ? e.code : 'failed'])
    } finally {
      controller.current = null
      setProgress(null)
    }
  }

  const remove = async () => {
    setError('')
    await removeOffline().catch(() => setError(t.offline.removeFailed))
  }

  const size = Math.max(1, Math.round(bytes / 1e6))
  const missing = !!snapshot && evicted === snapshot.id
  const saved = snapshot && !missing

  return (
    <>
      <p className="m-0 max-w-[56ch]">{format(t.offline.description, { size })}</p>
      <div role="status" className="flex max-w-[56ch] items-start gap-2">
        {saved && (
          <CheckCircleIcon
            weight="duotone"
            size={22}
            aria-hidden="true"
            className="mt-[2px] flex-none text-accent-700"
          />
        )}
        <span className={saved ? undefined : 'text-neutral-700'}>
          {progress
            ? progress.total
              ? format(t.offline.progress, { done: progress.done, total: progress.total })
              : t.offline.preparing
            : saved
              ? format(t.offline.saved, {
                  date: new Date(snapshot.savedAt).toLocaleDateString(lang, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                })
              : missing
                ? t.offline.missing
                : t.offline.none}
        </span>
      </div>
      {error && (
        <p role="alert" className="m-0 max-w-[56ch] text-accent-2-700">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {progress ? (
          <button
            type="button"
            className="btn btn-ghost min-h-[44px] px-2 text-[15px]"
            onClick={() => controller.current?.abort()}
          >
            {t.offline.cancel}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary min-h-[44px] text-[15px]"
              onClick={download}
            >
              <CloudArrowDownIcon weight="duotone" size={18} aria-hidden="true" />
              {saved ? t.offline.update : t.offline.download}
            </button>
            {snapshot && (
              <button
                type="button"
                className="btn btn-ghost min-h-[44px] px-2 text-[15px]"
                onClick={remove}
              >
                <TrashIcon weight="duotone" size={18} aria-hidden="true" />
                {t.offline.remove}
              </button>
            )}
          </>
        )}
      </div>
      <p className="m-0 max-w-[56ch] text-sm text-neutral-700">{t.offline.homeScreenHint}</p>
    </>
  )
}
