import Link from 'next/link'
import { PlateText } from '@/components/PlateText'
import { SiteHeader } from '@/components/SiteHeader'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-4 px-4 pt-8 pb-8">
        <PlateText kind="num" className="text-[120px] font-semibold">
          404
        </PlateText>
        <p className="text-lg italic">Questo posto è davvero da nessuna parte.</p>
        <Link href="/" className="btn btn-primary w-fit">
          Torna alla mappa
        </Link>
      </main>
    </>
  )
}
