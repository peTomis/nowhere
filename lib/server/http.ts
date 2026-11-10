import 'server-only'
import { ObjectId } from 'mongodb'
import { unstable_rethrow } from 'next/navigation'
import { auth } from '@/auth'
import { isAllowedEmail } from './allowlist'
import { getDb } from './mongodb'
import type { UserDoc } from './users'

/** An error with an HTTP status, turned into a JSON response by `route()`. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

export type CurrentUser = { id: string; email: string; name?: string; image?: string }

/**
 * The signed-in user, checked on every request: a session, a user document, and an email still
 * on the allowlist. The owner of every query and write comes from here, never from the request.
 */
export async function requireUser(): Promise<CurrentUser> {
  const session = await auth()
  const id = session?.user?.id
  if (!id || !ObjectId.isValid(id)) throw new HttpError(401, 'Not signed in')
  const user = await (
    await getDb()
  )
    .collection<UserDoc>('users')
    .findOne({ _id: new ObjectId(id) }, { projection: { email: 1, name: 1 } })
  if (!user) throw new HttpError(401, 'Unknown user')
  if (!isAllowedEmail(user.email)) throw new HttpError(403, 'Not allowed')
  // The picture comes from the Google profile in the session, not from the user document.
  return { id, email: user.email, name: user.name, image: session.user.image ?? undefined }
}

/**
 * The JSON body of a write. Only `application/json` is accepted: a page on another origin can't
 * send it with the session cookie without a CORS preflight, which this API never grants.
 */
export async function readJson(req: Request): Promise<unknown> {
  const type = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (type !== 'application/json') throw new HttpError(415, 'Expected an application/json body')
  try {
    return await req.json()
  } catch {
    throw new HttpError(400, 'Invalid JSON')
  }
}

/** Wraps a route handler: JSON out, HttpError → its status, anything else → 500 (logged). */
export function route<A extends unknown[]>(fn: (...args: A) => Promise<unknown>) {
  return async (...args: A): Promise<Response> => {
    try {
      const body = await fn(...args)
      return body instanceof Response ? body : Response.json(body ?? null)
    } catch (e) {
      unstable_rethrow(e) // Next's own control flow (dynamic rendering, redirects) must pass
      if (e instanceof HttpError) return Response.json({ error: e.message }, { status: e.status })
      console.error(e)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }
  }
}
