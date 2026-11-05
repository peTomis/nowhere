import Link from 'next/link'
import { Logo } from './Logo'

export function SiteHeader() {
  return (
    <header className="nav">
      <Link href="/" className="nav-brand" aria-label="Nowhere — home">
        <Logo variant="horizontal" tone="ink" className="h-6 w-auto" />
      </Link>
      <Link href="/guide">Guide</Link>
    </header>
  )
}
