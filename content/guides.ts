import type { GuideContent } from './types'
import { romania } from './ro/it/guide'

/** Guide content by slug (see content/countries.ts for the registry shown on the map). */
export const guideContent: Record<string, GuideContent> = {
  romania,
}
