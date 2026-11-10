import 'server-only'
import { ObjectId } from 'mongodb'
import { getDb } from './mongodb'

export type UserDoc = {
  _id: ObjectId
  provider: 'google'
  /** Google's `sub`: stable even if the email changes. */
  providerId: string
  email: string
  name?: string
  createdAt: Date
  lastLoginAt: Date
}

/** Finds or creates the user of a Google sign-in; returns its id (the `ownerId` of its data). */
export async function upsertGoogleUser(
  providerId: string,
  email: string,
  name?: string | null,
): Promise<string> {
  const users = (await getDb()).collection<UserDoc>('users')
  const now = new Date()
  const upsert = () =>
    users.findOneAndUpdate(
      { provider: 'google', providerId },
      {
        $set: { email: email.toLowerCase(), name: name ?? undefined, lastLoginAt: now },
        $setOnInsert: { provider: 'google', providerId, createdAt: now },
      },
      { upsert: true, returnDocument: 'after' },
    )
  // Two first sign-ins at once both insert: the unique index refuses one, which retries as an update.
  const user = await upsert().catch((e: { code?: number }) =>
    e?.code === 11000 ? upsert() : Promise.reject(e),
  )
  if (!user) throw new Error('User upsert returned nothing')
  return user._id.toHexString()
}

/** When the user first signed in, or undefined if the database can't be reached. */
export async function userSince(id: string): Promise<Date | undefined> {
  try {
    const user = await (
      await getDb()
    )
      .collection<UserDoc>('users')
      .findOne({ _id: new ObjectId(id) }, { projection: { createdAt: 1 } })
    return user?.createdAt
  } catch {
    return undefined
  }
}
