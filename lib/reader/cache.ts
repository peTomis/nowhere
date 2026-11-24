/*
 * The local copy of the reader's album (lib/reader/collection.ts keeps it), shared with the server:
 * the guide's cover reads it in an inline script before the first paint (prepaintCover), so the
 * reader's cover photo and completion are there from the first frame instead of after hydration.
 * No 'use client' here: both sides import these values.
 */

export const COLLECTION_CACHE = 'nowhere.collection'

/** The photo URLs (signed for the day, lib/server/bucket.ts) last at least this long. */
export const COLLECTION_CACHE_MAX_AGE = 12 * 60 * 60 * 1000

/** Element ids the cover script fills; the components render them for it. */
export const PREPAINT = {
  coverPhoto: 'cover-photo',
  completion: 'cover-completion',
} as const

/**
 * The cover script: reads the copy and sets the cover photo and the completion bar and
 * percentage, the same values the components compute (completionOf) once hydrated. Plain ES5,
 * no imports: it runs while the HTML is parsed. Any problem leaves the server's version.
 */
export function prepaintCover(coverKey: string, traces: [key: string, points: number][]) {
  const data = JSON.stringify({ coverKey, traces })
  return `(function(){try{var d=${data};var c=JSON.parse(localStorage.getItem(${JSON.stringify(COLLECTION_CACHE)})||"null");if(!c||c.v!==1||!(Date.now()-c.savedAt<${COLLECTION_CACHE_MAX_AGE}))return;var e=c.entries||{};var cover=e[d.coverKey],img=document.getElementById(${JSON.stringify(PREPAINT.coverPhoto)});if(img&&cover&&cover.photo&&cover.photo.full){img.src=cover.photo.full;img.hidden=false}var p=0,t=0;for(var i=0;i<d.traces.length;i++){var tr=d.traces[i],x=e[tr[0]];t+=tr[1];if(x&&(x.seenAt||x.photo))p+=tr[1]}var pct=t?Math.floor(p/t*100):0;var f=document.getElementById(${JSON.stringify(`${PREPAINT.completion}-fill`)});if(f)f.style.width=pct+"%";var n=document.getElementById(${JSON.stringify(`${PREPAINT.completion}-pct`)});if(n)n.textContent=pct+"%"}catch(_){}})()`
}
