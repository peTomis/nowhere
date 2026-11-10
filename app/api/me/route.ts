import { requireUser, route } from '@/lib/server/http'

/** The signed-in user, or 401. The client uses it to show or hide the collection controls. */
export const GET = route(async () => {
  const { id, email, name, image } = await requireUser()
  return { id, email, name, image }
})
