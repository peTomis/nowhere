import { PHOTO, type PhotoMime } from './schema'

/*
 * Photos are processed in the browser before anything leaves the device (docs/data-model.md
 * §6.4): decoded with the EXIF rotation applied, redrawn on a canvas and re-encoded. Re-encoding
 * drops every metadata block, GPS included: the original file never reaches the server.
 */

export type ProcessedPhoto = {
  mime: PhotoMime
  width: number
  height: number
  full: Blob
  thumb: Blob
}

export class PhotoError extends Error {
  constructor(
    readonly reason: 'unreadable' | 'too-large',
    readonly file: string,
  ) {
    super(reason)
  }
}

function draw(img: ImageBitmap, side: number) {
  const scale = Math.min(1, side / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

const encode = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

export async function processPhoto(file: File): Promise<ProcessedPhoto> {
  let img: ImageBitmap
  try {
    img = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    // e.g. HEIC in desktop Chrome
    throw new PhotoError('unreadable', file.name)
  }
  try {
    const big = draw(img, PHOTO.full.side)
    const small = draw(img, PHOTO.thumb.side)
    let full = await encode(big, 'image/webp', 0.82)
    let thumb = await encode(small, 'image/webp', 0.75)
    // Browsers that can't encode WebP return another type (PNG): use JPEG for both.
    if (full?.type !== 'image/webp' || thumb?.type !== 'image/webp') {
      full = await encode(big, 'image/jpeg', 0.85)
      thumb = await encode(small, 'image/jpeg', 0.8)
    }
    if (!full || !thumb) throw new PhotoError('unreadable', file.name)
    if (full.size > PHOTO.full.maxBytes || thumb.size > PHOTO.thumb.maxBytes)
      throw new PhotoError('too-large', file.name)
    return {
      mime: full.type as PhotoMime,
      width: big.width,
      height: big.height,
      full,
      thumb,
    }
  } finally {
    img.close()
  }
}
