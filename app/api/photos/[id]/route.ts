import { deletePhoto, parseId } from '@/lib/server/collection'
import { requireUser, route } from '@/lib/server/http'

/** Removes a photo: tombstones the record and deletes its objects. */
export const DELETE = route(async (_req: Request, ctx: RouteContext<'/api/photos/[id]'>) => {
  const user = await requireUser()
  await deletePhoto(user.id, parseId((await ctx.params).id))
  return { ok: true }
})
