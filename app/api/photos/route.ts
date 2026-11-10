import { listPhotos, startUpload } from '@/lib/server/collection'
import { readJson, requireUser, route } from '@/lib/server/http'

/** The reader's ready photos (`?country=ro` for one country), with signed URLs. */
export const GET = route(async (req: Request) => {
  const { id } = await requireUser()
  const country = new URL(req.url).searchParams.get('country') ?? undefined
  return listPhotos(id, country)
})

/** Starts an upload: `{ id, subject, mime, width, height, bytes: { full, thumb } }`. */
export const POST = route(async (req: Request) => {
  const { id } = await requireUser()
  return startUpload(id, await readJson(req))
})
