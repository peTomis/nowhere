import 'server-only'
import { isKnownSubject } from '@/content/structures'
import { countryOf, type Subject } from '@/content/subjects'
import { NOTE_MAX, PHOTO, READER_SCHEMA, type PhotoMime } from '@/lib/reader/schema'
import { head, photoKey, remove, signGet, signPut, type Size } from './bucket'
import { HttpError } from './http'
import { getDb } from './mongodb'

/*
 * The reader's collection on the server (docs/data-model.md §3.1, §6): photos (records here,
 * objects in the bucket) and notes. Every function takes the owner from the session (requireUser)
 * and adds it to every query. A trace is in the album when it has a ready photo: there is no
 * separate "seen" record yet (the design asks for a photo to mark a trace).
 */

type Base = {
  _id: string
  ownerId: string
  schema: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

type PhotoDoc = Base & {
  subject: Subject
  country: string
  role: 'cover' | 'trace'
  status: 'pending' | 'ready'
  mime: PhotoMime
  width: number
  height: number
  bytes: { full: number; thumb: number }
}

type NoteDoc = Base & {
  subject: Subject
  country: string
  text: string
  lang: string
  visibility: 'private' | 'followers'
}

/** A ready photo as the browser gets it. */
export type PhotoView = {
  id: string
  subject: Subject
  /** When it was added (ISO): the trace's "Vista il …" date. */
  createdAt: string
  width: number
  height: number
  thumb: string
  full: string
}

export type NoteView = { id: string; subject: Subject; text: string; updatedAt: string }

const photos = async () => (await getDb()).collection<PhotoDoc>('photos')
const notes = async () => (await getDb()).collection<NoteDoc>('notes')

// --- input guards ------------------------------------------------------------------------------

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

export function parseId(v: unknown): string {
  if (typeof v !== 'string' || !UUID.test(v)) throw new HttpError(400, 'Invalid id')
  return v
}

export function parseSubject(v: unknown): Subject {
  const s = v as Partial<Subject> | null
  if (
    !s ||
    (s.kind !== 'country' && s.kind !== 'place') ||
    typeof s.id !== 'string' ||
    !isKnownSubject({ kind: s.kind, id: s.id })
  )
    throw new HttpError(400, 'Unknown subject')
  return { kind: s.kind, id: s.id }
}

const int = (v: unknown, max: number) =>
  typeof v === 'number' && Number.isInteger(v) && v > 0 && v <= max

// --- photos ------------------------------------------------------------------------------------

const keys = (p: Pick<PhotoDoc, 'ownerId' | '_id' | 'mime'>) =>
  (['full', 'thumb'] as Size[]).map((size) => photoKey(p.ownerId, p._id, size, p.mime))

async function view(p: PhotoDoc): Promise<PhotoView> {
  const [full, thumb] = await Promise.all(keys(p).map(signGet))
  return {
    id: p._id,
    subject: p.subject,
    createdAt: p.createdAt.toISOString(),
    width: p.width,
    height: p.height,
    full,
    thumb,
  }
}

/** Ready photos, optionally of one country, with signed URLs. */
export async function listPhotos(ownerId: string, country?: string): Promise<PhotoView[]> {
  const docs = await (
    await photos()
  )
    .find({
      ownerId,
      status: 'ready',
      deletedAt: { $exists: false },
      ...(country ? { country } : {}),
    })
    .sort({ createdAt: 1 })
    .toArray()
  return Promise.all(docs.map(view))
}

/**
 * Starts an upload: records the photo as pending and returns two presigned PUT URLs. The client
 * picks the id, so a retried request reuses the same record instead of creating another.
 */
export async function startUpload(ownerId: string, body: unknown) {
  const b = (body ?? {}) as Record<string, unknown>
  const id = parseId(b.id)
  const subject = parseSubject(b.subject)
  const mime = b.mime as PhotoMime
  if (!PHOTO.mimes.includes(mime)) throw new HttpError(400, 'Unsupported type')
  const bytes = (b.bytes ?? {}) as Record<string, unknown>
  if (!int(bytes.full, PHOTO.full.maxBytes) || !int(bytes.thumb, PHOTO.thumb.maxBytes))
    throw new HttpError(413, 'Photo too large')
  if (!int(b.width, PHOTO.full.side) || !int(b.height, PHOTO.full.side))
    throw new HttpError(400, 'Invalid size')

  const col = await photos()
  await cleanup(ownerId)
  const now = new Date()
  const existing = await col.findOne({ _id: id, ownerId })
  if (existing && existing.status !== 'pending') throw new HttpError(409, 'Already uploaded')
  const doc: PhotoDoc = {
    _id: id,
    ownerId,
    schema: READER_SCHEMA,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    subject,
    country: countryOf(subject),
    role: subject.kind === 'country' ? 'cover' : 'trace',
    status: 'pending',
    mime,
    width: b.width as number,
    height: b.height as number,
    bytes: { full: bytes.full as number, thumb: bytes.thumb as number },
  }
  await col.replaceOne({ _id: id, ownerId }, doc, { upsert: true })
  const [full, thumb] = keys(doc)
  return {
    id,
    put: {
      full: await signPut(full, mime, doc.bytes.full),
      thumb: await signPut(thumb, mime, doc.bytes.thumb),
    },
  }
}

/**
 * Checks that both objects arrived with the declared type and length, marks the photo ready,
 * and retires the subject's previous photo: the album shows one photo per trace.
 */
export async function commitUpload(ownerId: string, id: string): Promise<PhotoView> {
  const col = await photos()
  const p = await col.findOne({ _id: id, ownerId, deletedAt: { $exists: false } })
  if (!p) throw new HttpError(404, 'Unknown photo')
  if (p.status === 'pending') {
    const [full, thumb] = keys(p)
    const [hf, ht] = await Promise.all([head(full), head(thumb)])
    const ok = (h: Awaited<ReturnType<typeof head>>, length: number) =>
      h && h.length === length && h.type === p.mime
    if (!ok(hf, p.bytes.full) || !ok(ht, p.bytes.thumb))
      throw new HttpError(409, 'Upload incomplete')
    p.status = 'ready'
    p.updatedAt = new Date()
    await col.updateOne({ _id: id, ownerId }, { $set: { status: 'ready', updatedAt: p.updatedAt } })
  }
  const older = await col
    .find({
      ownerId,
      _id: { $ne: id },
      'subject.kind': p.subject.kind,
      'subject.id': p.subject.id,
      deletedAt: { $exists: false },
    })
    .toArray()
  for (const o of older) await retire(o)
  return view(p)
}

/** Tombstones a photo (kept for exports and a future sync) and deletes its objects. */
async function retire(p: PhotoDoc) {
  const now = new Date()
  await (
    await photos()
  ).updateOne({ _id: p._id, ownerId: p.ownerId }, { $set: { deletedAt: now, updatedAt: now } })
  await remove(keys(p))
}

export async function deletePhoto(ownerId: string, id: string) {
  const p = await (await photos()).findOne({ _id: id, ownerId, deletedAt: { $exists: false } })
  if (!p) throw new HttpError(404, 'Unknown photo')
  await retire(p)
}

/** Pending uploads older than a day: abandoned. Run lazily at each upload start. */
async function cleanup(ownerId: string) {
  const col = await photos()
  const old = await col
    .find({
      ownerId,
      status: 'pending',
      deletedAt: { $exists: false },
      updatedAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
    .limit(20)
    .toArray()
  for (const p of old) await retire(p)
}

// --- notes -------------------------------------------------------------------------------------

const noteView = (n: NoteDoc): NoteView => ({
  id: n._id,
  subject: n.subject,
  text: n.text,
  updatedAt: n.updatedAt.toISOString(),
})

export async function listNotes(ownerId: string, country?: string): Promise<NoteView[]> {
  const docs = await (
    await notes()
  )
    .find({ ownerId, deletedAt: { $exists: false }, ...(country ? { country } : {}) })
    .toArray()
  return docs.map(noteView)
}

/** Writes the note of a subject; an empty text deletes it (tombstone). Always private. */
export async function setNote(ownerId: string, body: unknown): Promise<NoteView | null> {
  const b = (body ?? {}) as Record<string, unknown>
  const subject = parseSubject(b.subject)
  if (typeof b.text !== 'string') throw new HttpError(400, 'Invalid text')
  const text = b.text.trim()
  if (text.length > NOTE_MAX) throw new HttpError(413, 'Note too long')
  if (b.visibility !== undefined && b.visibility !== 'private')
    throw new HttpError(400, 'Only private notes for now')
  const lang =
    typeof b.lang === 'string' && /^[a-z]{2,3}(-[A-Za-z0-9]+)*$/.test(b.lang) ? b.lang : 'it'
  const col = await notes()
  const filter = { ownerId, 'subject.kind': subject.kind, 'subject.id': subject.id }
  const now = new Date()
  if (!text) {
    await col.updateOne(
      { ...filter, deletedAt: { $exists: false } },
      { $set: { deletedAt: now, updatedAt: now } },
    )
    return null
  }
  const doc = await col.findOneAndUpdate(
    filter,
    {
      $set: { text, lang, visibility: 'private', updatedAt: now, schema: READER_SCHEMA },
      $unset: { deletedAt: '' },
      $setOnInsert: {
        _id: crypto.randomUUID(),
        ownerId,
        subject,
        country: countryOf(subject),
        createdAt: now,
      },
    },
    { upsert: true, returnDocument: 'after' },
  )
  if (!doc) throw new Error('Note upsert returned nothing')
  return noteView(doc)
}
