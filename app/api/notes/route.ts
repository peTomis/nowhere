import { listNotes, setNote } from '@/lib/server/collection'
import { readJson, requireUser, route } from '@/lib/server/http'

/** The reader's notes (`?country=ro` for one country). */
export const GET = route(async (req: Request) => {
  const { id } = await requireUser()
  const country = new URL(req.url).searchParams.get('country') ?? undefined
  return listNotes(id, country)
})

/** Writes a subject's note: `{ subject, text, lang? }`; an empty text deletes it. */
export const PUT = route(async (req: Request) => {
  const { id } = await requireUser()
  return setNote(id, await readJson(req))
})
