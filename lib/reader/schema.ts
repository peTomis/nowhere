/*
 * Version of the reader's account records (docs/data-model.md §3.2). Every document stores the
 * `schema` it was written with; raise it with a migration in scripts/, never silently.
 */
export const READER_SCHEMA = 1

/** Longest side of the processed photos (lib/reader/photos.ts) and the server's size limits. */
export const PHOTO = {
  full: { side: 2048, maxBytes: 3 * 1024 * 1024 },
  thumb: { side: 480, maxBytes: 300 * 1024 },
  mimes: ['image/webp', 'image/jpeg'] as const,
}

export type PhotoMime = (typeof PHOTO.mimes)[number]

/** Longest note the server accepts; the photo panel stops at NOTE_UI_MAX. */
export const NOTE_MAX = 2000
export const NOTE_UI_MAX = 300
