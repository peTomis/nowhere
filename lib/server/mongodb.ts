import 'server-only'
import { MongoClient, type Db } from 'mongodb'

/*
 * MongoDB, created on first use: `yarn build` (static guides) must work without any database
 * variable. MONGODB_URI is the app's user (readWrite only); the admin connection string
 * (MONGODB_ADMIN_URI) is for scripts/db-setup.mjs, never for the app.
 */

const globalForMongo = globalThis as typeof globalThis & { _nowhereMongo?: MongoClient }

export async function getDb(): Promise<Db> {
  if (!globalForMongo._nowhereMongo) {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('Missing environment variable MONGODB_URI (see .env.template)')
    // Kept on globalThis so dev reloads and warm serverless invocations reuse the pool.
    globalForMongo._nowhereMongo = new MongoClient(uri)
  }
  await globalForMongo._nowhereMongo.connect()
  return globalForMongo._nowhereMongo.db(process.env.MONGODB_DB || 'nowhere')
}
