import type { Locale } from '@/i18n/config'
import { guides, type Guide } from './countries'
import { romania } from './ro/it/guide'
import type { GuideContent } from './types'
import { template as templateIt } from './xx/it/guide'

/*
 * Guide content by slug and language (see content/countries.ts for the registry shown on the map).
 * A guide is listed, prerendered and offered offline only in the languages it has content in:
 * add `en: romaniaEn` once content/ro/en/ is written.
 */
export const guideContent: Record<string, Partial<Record<Locale, GuideContent>>> = {
  romania: { it: romania },
}

/** The template guide (/template), in each language it is written in. */
export const templateContent: Partial<Record<Locale, GuideContent>> = { it: templateIt }

export const getGuideContent = (slug: string, lang: Locale): GuideContent | undefined =>
  guideContent[slug]?.[lang]

/** The ready guides with content in a language, with that content: the map and offline. */
export const readyGuides = (lang: Locale): (Guide & { content: GuideContent })[] =>
  guides.flatMap((g) => {
    const content = getGuideContent(g.slug, lang)
    return g.status === 'ready' && content ? [{ ...g, content }] : []
  })
