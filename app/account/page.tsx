import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { auth, signIn, signOut } from '@/auth'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { format, t } from '@/i18n'

export const metadata: Metadata = {
  title: t.account.title,
  robots: { index: false, follow: false },
}

/**
 * Account page: Google sign-in for the allowlisted reader (docs/data-model.md §9.2), later also
 * export and import of the collection. The session is read at request time, behind <Suspense>,
 * so the rest of the page stays in the static shell.
 */
export default function AccountPage({ searchParams }: PageProps<'/account'>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-4 px-(--edge) pt-8 pb-12">
        <h1 className="m-0 text-[clamp(32px,6vw,44px)] leading-[1.1]">{t.account.title}</h1>
        <p className="m-0 max-w-[52ch] text-neutral-800">{t.account.intro}</p>
        <Suspense fallback={<p className="m-0 text-neutral-700 italic">{t.account.loading}</p>}>
          <Session searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

async function Session({ searchParams }: Pick<PageProps<'/account'>, 'searchParams'>) {
  // Auth.js draws random values: tell Next this render is per request before it does.
  await connection()
  const [session, params] = await Promise.all([auth(), searchParams])
  const error = typeof params.error === 'string' ? params.error : undefined

  if (session?.user?.email) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="m-0">{format(t.account.signedInAs, { email: session.user.email })}</p>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/account' })
          }}
        >
          <button type="submit" className="btn btn-secondary">
            {t.account.signOut}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-3">
      {error && (
        <p role="alert" className="m-0 text-accent-2-700">
          {error === 'AccessDenied' ? t.account.denied : t.account.error}
        </p>
      )}
      <form
        action={async () => {
          'use server'
          await signIn('google', { redirectTo: '/account' })
        }}
      >
        <button type="submit" className="btn btn-primary">
          {t.account.signIn}
        </button>
      </form>
    </div>
  )
}
