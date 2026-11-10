import 'server-only'
import {
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/*
 * The private photo bucket (docs/data-model.md §6.3): any S3-compatible store, Cloudflare R2
 * proposed. The browser never gets a key: only presigned URLs, PUT for 10 minutes, GET for at
 * least an hour. Created on first use, so `yarn build` works without the S3_* variables.
 */

let client: S3Client | undefined

function env(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing environment variable ${name} (see .env.template)`)
  return v
}

function s3(): S3Client {
  client ??= new S3Client({
    endpoint: env('S3_ENDPOINT'),
    region: process.env.S3_REGION || 'auto',
    credentials: {
      accessKeyId: env('S3_ACCESS_KEY_ID'),
      secretAccessKey: env('S3_SECRET_ACCESS_KEY'),
    },
    // No checksum headers on presigned PUTs: the browser can't compute them.
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
  })
  return client
}

const bucket = () => env('S3_BUCKET')

export type Size = 'full' | 'thumb'

/** `u/<ownerId>/p/<photoId>/full.webp` */
export function photoKey(ownerId: string, photoId: string, size: Size, mime: string) {
  return `u/${ownerId}/p/${photoId}/${size}.${mime === 'image/webp' ? 'webp' : 'jpg'}`
}

/** A URL the browser PUTs the object to, bound to its type and length. */
export function signPut(key: string, type: string, length: number) {
  return getSignedUrl(
    s3(),
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      ContentType: type,
      ContentLength: length,
    }),
    { expiresIn: 600, signableHeaders: new Set(['content-type', 'content-length']) },
  )
}

/**
 * A URL to read the object. Signed as of the start of the hour and valid for two: within an hour
 * the same photo gets the same URL, so the browser can cache the image.
 */
export function signGet(key: string) {
  const hour = new Date()
  hour.setUTCMinutes(0, 0, 0)
  return getSignedUrl(s3(), new GetObjectCommand({ Bucket: bucket(), Key: key }), {
    signingDate: hour,
    expiresIn: 2 * 60 * 60,
  })
}

/** Type and length of an object, or undefined if it isn't there. */
export async function head(key: string) {
  try {
    const r = await s3().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }))
    return { type: r.ContentType, length: r.ContentLength }
  } catch (e) {
    const status = (e as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode
    if (status === 404 || status === 403) return undefined
    throw e
  }
}

export async function remove(keys: string[]) {
  if (keys.length === 0) return
  await s3().send(
    new DeleteObjectsCommand({
      Bucket: bucket(),
      Delete: { Objects: keys.map((Key) => ({ Key })), Quiet: true },
    }),
  )
}
