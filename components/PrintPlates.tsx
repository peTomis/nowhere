'use client'

import { useEffect } from 'react'
import { mountPrintPlates } from '@/lib/printPlates'

/** Mounts the SVG separation filters and the press driver (client only, once per document). */
export function PrintPlates() {
  useEffect(() => mountPrintPlates(), [])
  return null
}
