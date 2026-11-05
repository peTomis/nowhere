import type { Metadata } from 'next'
import Link from 'next/link'
import { guides } from '@/data/guides'

export const metadata: Metadata = { title: 'Guide' }

export default function GuidesPage() {
  return (
    <section className="flex max-w-3xl flex-col gap-4 pt-6">
      <h1>Guide</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guide/${g.slug}`} className="card text-text no-underline">
            <span className="card-kicker">
              {g.status === 'ready' ? 'Guida' : 'In preparazione'}
            </span>
            <span className="card-title">{g.name}</span>
            {g.summary && <p className="card-body">{g.summary}</p>}
          </Link>
        ))}
      </div>
    </section>
  )
}
