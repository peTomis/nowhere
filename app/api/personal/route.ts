import { deletePersonal, listPersonal, setPersonal } from '@/lib/server/collection'
import { readJson, requireUser, route } from '@/lib/server/http'

/** The reader's personal traces (`?country=eg` for one country). */
export const GET = route(async (req: Request) => {
  const { id } = await requireUser()
  const country = new URL(req.url).searchParams.get('country') ?? undefined
  return listPersonal(id, country)
})

/** Writes a personal trace: `{ subject, title, place?, text?, lang? }`. */
export const PUT = route(async (req: Request) => {
  const { id } = await requireUser()
  return setPersonal(id, await readJson(req))
})

/** Removes a personal trace: `{ subject }` (its photo is deleted through /api/photos/[id]). */
export const DELETE = route(async (req: Request) => {
  const { id } = await requireUser()
  await deletePersonal(id, await readJson(req))
  return { ok: true }
})
