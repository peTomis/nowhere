import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { guides } from '@/data/guides'

/**
 * Home placeholder. The final design ("Nowhere - Home") is a full-screen world map
 * (d3 + topojson) with country search: it will be implemented here.
 */
export default function HomePage() {
  return (
    <section className="flex max-w-3xl flex-col gap-6 pt-8">
      <Logo variant="horizontal" className="h-12 w-auto" />
      <p className="max-w-xl text-lg">
        Le mie guide dei posti dove sono stato e di quelli dove sto per andare.
      </p>
      <ul className="flex flex-col gap-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guide/${g.slug}`} className="btn btn-ghost text-base">
              {g.name} <ArrowRightIcon weight="duotone" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
