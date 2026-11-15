import { offlineManifest } from '@/lib/server/offline'

/** The offline manifest (lib/offline.ts): public, prerendered at build time. */
export async function GET() {
  return Response.json(await offlineManifest())
}
