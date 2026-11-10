import { commitUpload, parseId } from '@/lib/server/collection'
import { requireUser, route } from '@/lib/server/http'

/** Ends an upload once both objects are in the bucket: the photo becomes ready. */
export const POST = route(async (_req: Request, ctx: RouteContext<'/api/photos/[id]/commit'>) => {
  const user = await requireUser()
  return commitUpload(user.id, parseId((await ctx.params).id))
})
