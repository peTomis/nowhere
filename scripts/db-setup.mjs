// Collections, validators and indexes of the reader data (docs/data-model.md §3.1). MongoDB has no
// row-level security: the validators require an `ownerId` on every reader document, and the API
// adds the session's owner to every query (lib/server/http.ts). Safe to run again.
//
// Changing validators needs the dbAdmin role, which the app's own user (MONGODB_URI, readWrite)
// shouldn't have: the script uses MONGODB_ADMIN_URI when set.
//
// Usage: yarn db:setup            dry run: shows the rules, writes nothing
//        yarn db:setup --apply    creates collections, validators and indexes
import { MongoClient } from 'mongodb'

const apply = process.argv.includes('--apply')
const uri = process.env.MONGODB_ADMIN_URI || process.env.MONGODB_URI
if (!uri) throw new Error('Missing MONGODB_ADMIN_URI or MONGODB_URI (see .env.template)')
const dbName = process.env.MONGODB_DB || 'nowhere'

const date = { bsonType: 'date' }
const str = { bsonType: 'string' }
const subject = {
  bsonType: 'object',
  required: ['kind', 'id'],
  properties: { kind: { enum: ['country', 'place'] }, id: str },
}
/** Fields of every reader record (Base in docs/data-model.md §3.1). */
const base = {
  required: ['_id', 'ownerId', 'schema', 'createdAt', 'updatedAt'],
  properties: {
    _id: str,
    ownerId: str,
    schema: { bsonType: 'int', minimum: 1 },
    createdAt: date,
    updatedAt: date,
    deletedAt: date,
  },
}
const reader = (required, properties) => ({
  bsonType: 'object',
  required: [...base.required, ...required],
  properties: { ...base.properties, ...properties },
})

const RULES = {
  users: {
    schema: {
      bsonType: 'object',
      required: ['provider', 'providerId', 'email', 'createdAt'],
      properties: { provider: { enum: ['google'] }, providerId: str, email: str, createdAt: date },
    },
    indexes: [[{ provider: 1, providerId: 1 }, { unique: true }]],
  },
  visits: {
    schema: reader(['placeId', 'seenAt'], { placeId: str, seenAt: date }),
    indexes: [[{ ownerId: 1, placeId: 1 }, { unique: true }]],
  },
  photos: {
    schema: reader(['subject', 'country', 'role', 'status', 'mime', 'width', 'height', 'bytes'], {
      subject,
      country: str,
      role: { enum: ['cover', 'trace'] },
      status: { enum: ['pending', 'ready'] },
      mime: { enum: ['image/webp', 'image/jpeg'] },
    }),
    indexes: [
      [{ ownerId: 1, 'subject.kind': 1, 'subject.id': 1 }, {}],
      [{ ownerId: 1, country: 1, status: 1 }, {}],
      [{ status: 1, createdAt: 1 }, {}],
    ],
  },
  notes: {
    schema: reader(['subject', 'text', 'lang', 'visibility'], {
      subject,
      text: { bsonType: 'string', maxLength: 2000 },
      lang: str,
      // 'followers' exists in the model; the API accepts only 'private' for now.
      visibility: { enum: ['private', 'followers'] },
    }),
    indexes: [[{ ownerId: 1, 'subject.kind': 1, 'subject.id': 1 }, { unique: true }]],
  },
  meta: { schema: null, indexes: [] },
}

const client = new MongoClient(uri)
try {
  await client.connect()
  const db = client.db(dbName)
  const existing = new Set(
    (await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name),
  )
  console.log(`${apply ? 'Applying to' : 'Dry run on'} database "${dbName}"`)
  for (const [name, { schema, indexes }] of Object.entries(RULES)) {
    const validator = schema ? { $jsonSchema: schema } : undefined
    const status = existing.has(name) ? 'exists' : 'to create'
    console.log(
      `- ${name} (${status}): ${schema ? `requires ${schema.required.join(', ')}` : 'no validator'}`,
    )
    for (const [key, options] of indexes)
      console.log(`    index ${JSON.stringify(key)} ${JSON.stringify(options)}`)
    if (existing.has(name) && validator) {
      const invalid = await db.collection(name).countDocuments({ $nor: [validator] })
      if (invalid) console.warn(`    ${invalid} existing document(s) break the rules`)
    }
    if (!apply) continue
    // Collections and indexes first: readWrite is enough for them.
    if (!existing.has(name)) await db.createCollection(name)
    for (const [key, opts] of indexes) await db.collection(name).createIndex(key, opts)
  }
  if (apply) {
    for (const [name, { schema }] of Object.entries(RULES)) {
      if (!schema) continue
      const validator = { $jsonSchema: schema }
      try {
        await db.command({
          collMod: name,
          validator,
          validationLevel: 'strict',
          validationAction: 'error',
        })
      } catch (error) {
        if (error.codeName === 'AtlasError' || error.codeName === 'Unauthorized') {
          throw new Error(
            `Collections and indexes are in place, but this database user can't set validators (${error.message}). ` +
              'Give it the dbAdmin role on the database (Atlas: Database Access) and run again.',
            { cause: error },
          )
        }
        throw error
      }
    }
    await db
      .collection('meta')
      .updateOne(
        { _id: 'schema' },
        { $max: { version: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      )
    console.log('Done.')
  }
} finally {
  await client.close()
}
