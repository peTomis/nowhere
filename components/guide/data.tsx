'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { AlbumTrace, GuideCard } from '@/content/build'

/**
 * The guide's traces and cards for its client components (album, cards, photo panel, pins),
 * provided once by GuideShell so the body's kit components only pass ids.
 */
export type GuideData = {
  /** ISO 3166-1 alpha-2. */
  country: string
  /** ISO 3166-1 numeric: the country's shape in the world TopoJSON (none for the template). */
  numeric?: string
  /** Country name. */
  name: string
  traces: AlbumTrace[]
  cards: GuideCard[]
  /** Region names by id. */
  regions: Record<string, string>
}

const Ctx = createContext<GuideData | null>(null)

export function GuideDataProvider({ value, children }: { value: GuideData; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useGuideData(): GuideData {
  const v = useContext(Ctx)
  if (!v) throw new Error('useGuideData outside GuideShell')
  return v
}

export function useTrace(id: string): AlbumTrace | undefined {
  return useGuideData().traces.find((tr) => tr.id === id)
}

export const pad = (n: number) => String(n).padStart(2, '0')
