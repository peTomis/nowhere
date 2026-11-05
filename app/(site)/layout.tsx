import { SiteHeader } from '@/components/SiteHeader'

/** Shell for content pages (guides). The home is a full-screen map and sits outside it. */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 pb-8">{children}</main>
    </>
  )
}
