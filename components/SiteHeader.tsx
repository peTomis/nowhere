import Link from 'next/link'
import { Logo } from './Logo'
import { t } from '@/i18n'

export function SiteHeader() {
  return (
    <header className="nav">
      <Link href="/" className="nav-brand" aria-label={t.common.homeLabel}>
        <Logo variant="horizontal" tone="ink" className="h-6 w-auto" />
      </Link>
    </header>
  )
}
