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
 * The private bucket (docs/data-model.md §6.3): any S3-compatible store, Cloudflare R2
 * proposed. Readers' photos under `u/`, the guide images under `assets/` (lib/assets.ts). The
 * browser never gets a key: only presigned URLs, PUT for 10 minutes, GET for the day (signGet).
 * Created on first use, so `yarn build` works without the S3_* variables.
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
 * A URL to read the object. Signed as of the start of the UTC day and valid for 36 hours: all day
 * the same photo gets the same URL, and the answer carries a cache header (`response-cache-control`,
 * so photos already in the bucket get it too), so the browser downloads each photo once a day
 * instead of at every page. A photo never changes under its id (a new one gets a new id), hence
 * `immutable`; `private`: never kept by a shared cache.
 */
export function signGet(key: string) {
  const day = new Date()
  day.setUTCHours(0, 0, 0, 0)
  return getSignedUrl(
    s3(),
    new GetObjectCommand({
      Bucket: bucket(),
      Key: key,
      ResponseCacheControl: 'private, max-age=86400, immutable',
    }),
    { signingDate: day, expiresIn: 36 * 60 * 60 },
  )
}

/**
 * An object's body as a web stream, with its type and length, or undefined if it isn't there.
 * Server side only: the guide images (app/assets/) are read this way, never through a public URL.
 */
export async function read(key: string) {
  try {
    const r = await s3().send(new GetObjectCommand({ Bucket: bucket(), Key: key }))
    if (!r.Body) return undefined
    return { body: r.Body.transformToWebStream(), type: r.ContentType, length: r.ContentLength }
  } catch (e) {
    const status = (e as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode
    if (status === 404 || status === 403) return undefined
    throw e
  }
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
