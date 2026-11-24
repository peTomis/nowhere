import Link from 'next/link'
import { PlateText } from '@/components/PlateText'
import { SiteHeader } from '@/components/SiteHeader'
import { paths } from '@/i18n'
import { getLang, getT } from '@/i18n/server'

/** The 404 page: app/[lang]/not-found.tsx and, in the default language, app/global-not-found.tsx. */
export async function NotFoundView() {
  const lang = await getLang()
  const t = await getT()
  return (
    <>
      <SiteHeader back={false} />
      <main className="flex flex-1 flex-col gap-4 px-(--inset) pt-8 pb-8">
        <PlateText kind="num" className="text-[120px] font-semibold">
          404
        </PlateText>
        <p className="text-lg italic">{t.notFound.message}</p>
        <Link href={paths.home(lang)} className="btn btn-primary w-fit">
          {t.common.backToMap}
        </Link>
      </main>
    </>
  )
}
