import { listVisits, markSeen, unmarkSeen } from '@/lib/server/collection'
import { readJson, requireUser, route } from '@/lib/server/http'

/** The places the reader has seen (`?country=ro` for one country). */
export const GET = route(async (req: Request) => {
  const { id } = await requireUser()
  const country = new URL(req.url).searchParams.get('country') ?? undefined
  return listVisits(id, country)
})

/** Marks a place seen, with or without a photo: `{ placeId }`. Idempotent. */
export const PUT = route(async (req: Request) => {
  const { id } = await requireUser()
  return markSeen(id, await readJson(req))
})

/** Unmarks a place: `{ placeId }` (the trace leaves the album unless it has a photo). */
export const DELETE = route(async (req: Request) => {
  const { id } = await requireUser()
  const body = (await readJson(req)) as { placeId?: unknown } | null
  await unmarkSeen(id, body?.placeId)
  return { ok: true }
})
