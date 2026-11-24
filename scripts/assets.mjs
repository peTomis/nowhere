// Guide images ↔ the public asset bucket (lib/assets.ts). The local copy is public/guides/
// (gitignored); content/assets.json (committed) lists what the bucket holds, with each file's hash
// and size, so builds never need the network.
//
//   yarn assets manifest   hash public/guides/ into content/assets.json (no network)
//   yarn assets push       upload new and changed files, then write the manifest
//   yarn assets pull       download what the manifest lists and is missing or different locally
//
// push needs ASSETS_BUCKET and S3 credentials with write access to it (ASSETS_ACCESS_KEY_ID /
// ASSETS_SECRET_ACCESS_KEY, else the S3_* ones) and S3_ENDPOINT. pull needs ASSETS_URL only.
// Files are never deleted from the bucket: removed ones are listed, delete them by hand.
import {
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC = join(root, 'public')
const DIR = 'guides'
const MANIFEST = join(root, 'content/assets.json')

const TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}
// URLs carry the hash (`?v=`): a changed file gets a new URL, so every copy may be kept forever.
const CACHE = 'public, max-age=31536000, immutable'

const hashOf = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 12)

function env(name, fallback) {
  const v = process.env[name] || (fallback && process.env[fallback])
  if (!v) throw new Error(`Missing environment variable ${name} (see .env.template)`)
  return v
}

async function walk(rel) {
  const entries = await readdir(join(PUBLIC, rel), { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(`${rel}/${e.name}`) : [`/${rel}/${e.name}`])),
  )
  return nested.flat().filter((f) => !f.split('/').pop().startsWith('.'))
}

/** The local files, sorted, with hash and size. */
async function local() {
  const out = {}
  for (const src of (await walk(DIR)).sort()) {
    if (!TYPES[extname(src).toLowerCase()]) {
      console.warn(`! skipped ${src}: not an image type the site serves`)
      continue
    }
    const buf = await readFile(join(PUBLIC, src))
    out[src] = { bytes: buf.length, hash: hashOf(buf) }
  }
  return out
}

async function readManifest() {
  return existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {}
}

async function writeManifest(files) {
  await writeFile(MANIFEST, `${JSON.stringify(files, null, 2)}\n`)
  console.log(`✓ content/assets.json: ${Object.keys(files).length} files`)
}

function client() {
  return new S3Client({
    endpoint: env('S3_ENDPOINT'),
    region: process.env.S3_REGION || 'auto',
    credentials: {
      accessKeyId: env('ASSETS_ACCESS_KEY_ID', 'S3_ACCESS_KEY_ID'),
      secretAccessKey: env('ASSETS_SECRET_ACCESS_KEY', 'S3_SECRET_ACCESS_KEY'),
    },
  })
}

async function push() {
  const files = await local()
  if (Object.keys(files).length === 0) throw new Error(`No files under public/${DIR}/`)
  const s3 = client()
  const Bucket = env('ASSETS_BUCKET')
  let uploaded = 0
  for (const [src, { hash }] of Object.entries(files)) {
    const Key = src.slice(1)
    const head = await s3.send(new HeadObjectCommand({ Bucket, Key })).catch((e) => {
      if (e.$metadata?.httpStatusCode === 404) return undefined
      throw e
    })
    if (head?.Metadata?.sha256 === hash) continue
    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body: await readFile(join(PUBLIC, src)),
        ContentType: TYPES[extname(src).toLowerCase()],
        CacheControl: CACHE,
        Metadata: { sha256: hash },
      }),
    )
    uploaded++
    console.log(`↑ ${src}`)
  }
  console.log(`✓ ${uploaded} uploaded, ${Object.keys(files).length - uploaded} unchanged`)

  // Objects no longer in public/: listed, not deleted (an older deploy may still use them).
  let ContinuationToken
  const stale = []
  do {
    const page = await s3.send(
      new ListObjectsV2Command({ Bucket, Prefix: `${DIR}/`, ContinuationToken }),
    )
    for (const o of page.Contents ?? []) if (!files[`/${o.Key}`]) stale.push(o.Key)
    ContinuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
  } while (ContinuationToken)
  if (stale.length)
    console.log(
      `! in the bucket but not in public/${DIR}/ (delete by hand once unused):\n  ${stale.join('\n  ')}`,
    )

  await writeManifest(files)
}

async function pull() {
  const base = env('ASSETS_URL').replace(/\/+$/, '')
  const files = await readManifest()
  const mine = await local()
  let fetched = 0
  for (const [src, { hash }] of Object.entries(files)) {
    if (mine[src]?.hash === hash) continue
    const res = await fetch(`${base}${src}?v=${hash}`)
    if (!res.ok) throw new Error(`${src}: HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (hashOf(buf) !== hash)
      throw new Error(`${src}: hash mismatch (the bucket is ahead of the manifest?)`)
    await mkdir(dirname(join(PUBLIC, src)), { recursive: true })
    await writeFile(join(PUBLIC, src), buf)
    fetched++
    console.log(`↓ ${src}`)
  }
  console.log(`✓ ${fetched} downloaded, ${Object.keys(files).length - fetched} already here`)
}

const command = process.argv[2]
try {
  if (command === 'manifest') await writeManifest(await local())
  else if (command === 'push') await push()
  else if (command === 'pull') await pull()
  else {
    console.error('Usage: yarn assets manifest | push | pull')
    process.exit(1)
  }
} catch (e) {
  console.error(`✗ ${e.message}`)
  process.exit(1)
}
