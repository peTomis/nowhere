import { CheckCircleIcon, DeviceMobileIcon, SignOutIcon } from '@phosphor-icons/react/ssr'
import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { Suspense, type ReactNode } from 'react'
import { auth, signIn, signOut } from '@/auth'
import { Avatar } from '@/components/AccountMenu'
import { Completion } from '@/components/Completion'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'
import { OfflineGuides } from '@/components/OfflineGuides'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { tracesOf } from '@/content/build'
import { readyGuides } from '@/content/guides'
import { format, paths, type Locale, type Messages } from '@/i18n'
import { getT, requireLang } from '@/i18n/server'
import { offlineManifest } from '@/lib/server/offline'
import { userSince } from '@/lib/server/users'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT()
  return { title: t.account.title, robots: { index: false, follow: false } }
}

/**
 * "I tuoi dati", port of "Nowhere - I tuoi dati.dc.html": the account (Google sign-in for the
 * allowlisted reader, docs/data-model.md §9.2), the sync status and the album completion of each
 * guide, and the offline guides (not in the design). Not ported yet: export, import and storage used (phase 8 of the data model). The session
 * is read at request time, behind <Suspense>, so the rest of the page stays in the static shell.
 */
export default async function AccountPage({ searchParams }: PageProps<'/[lang]/account'>) {
  const lang = await requireLang()
  const t = await getT()
  const ready = readyGuides(lang)
  const { bytes } = await offlineManifest()
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex w-full max-w-144 flex-1 flex-col gap-12 px-(--inset) pt-[clamp(56px,9vw,112px)] text-[17px] leading-[1.6] text-pretty">
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-[clamp(44px,9vw,72px)] leading-[.95] font-semibold tracking-[-.03em]">
            {t.account.title}
          </h1>
          <p className="m-0 max-w-[36ch] text-[clamp(19px,3vw,21px)] leading-[1.35] text-neutral-800 italic">
            {t.account.subtitle}
          </p>
        </div>

        <Suspense
          fallback={
            <Section title={t.account.accountHeading}>
              <p className="m-0 text-neutral-700 italic">{t.account.loading}</p>
            </Section>
          }
        >
          <Session searchParams={searchParams} lang={lang} t={t} />
        </Suspense>

        {ready.length > 0 && (
          <Section title={t.account.completionHeading} gap="gap-4">
            {ready.map(({ slug, content }) => {
              const name = content.names.country
              const traces = tracesOf(content).map(({ key, points }) => ({ key, points }))
              return (
                <div key={slug} className="flex max-w-104 flex-col gap-2">
                  <Completion name={name} traces={traces} variant="full" />
                  <Link
                    href={`${paths.guide(lang, slug)}#album`}
                    className="inline-flex min-h-[44px] items-center gap-[6px] self-start text-[15px] text-accent-700 no-underline hover:text-accent-800"
                  >
                    {format(t.account.openAlbum, { name })}
                  </Link>
                </div>
              )
            })}
          </Section>
        )}

        {ready.length > 0 && (
          <Section title={t.offline.heading}>
            <OfflineGuides bytes={bytes} />
          </Section>
        )}
      </main>
      <SiteFooter className="mt-24" />
    </div>
  )
}

function Section({
  title,
  gap = 'gap-3',
  children,
}: {
  title: string
  gap?: string
  children: ReactNode
}) {
  return (
    <section className={`flex flex-col ${gap}`}>
      <h2 className="m-0 text-xs font-normal tracking-[.16em] text-accent-700 uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

/** The session part, per request. Server Actions can't read the language: it is passed in. */
async function Session({
  searchParams,
  lang,
  t,
}: Pick<PageProps<'/[lang]/account'>, 'searchParams'> & { lang: Locale; t: Messages }) {
  const account = paths.account(lang)
  // Auth.js draws random values: tell Next this render is per request before it does.
  await connection()
  const [session, params] = await Promise.all([auth(), searchParams])
  const error = typeof params.error === 'string' ? params.error : undefined
  const user = session?.user?.email ? session.user : undefined
  const since = user?.id ? await userSince(user.id) : undefined

  return (
    <>
      <Section title={t.account.accountHeading}>
        {user?.email ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Avatar
              me={{
                email: user.email,
                name: user.name ?? undefined,
                image: user.image ?? undefined,
              }}
              className="size-[48px] flex-none text-[21px]"
            />
            <div className="flex min-w-0 flex-[1_1_220px] flex-col">
              <span className="text-lg font-semibold wrap-anywhere">{user.email}</span>
              <span className="text-sm text-neutral-700">
                {since
                  ? format(t.account.connectedSince, {
                      date: since.toLocaleDateString(lang, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }),
                    })
                  : t.account.connected}
              </span>
            </div>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: account })
              }}
            >
              <button
                type="submit"
                className="btn btn-ghost inline-flex min-h-[44px] gap-[6px] px-2 text-[15px] text-accent-700"
              >
                <SignOutIcon weight="duotone" size={18} aria-hidden="true" />
                {t.account.signOut}
              </button>
            </form>
          </div>
        ) : (
          <>
            {error && (
              <p role="alert" className="m-0 text-accent-2-700">
                {error === 'AccessDenied' ? t.account.denied : t.account.error}
              </p>
            )}
            <p className="m-0 max-w-[52ch]">{t.account.signInPrompt}</p>
            <form
              action={async () => {
                'use server'
                await signIn('google', { redirectTo: account })
              }}
            >
              <GoogleSignInButton />
            </form>
          </>
        )}
      </Section>

      <Section title={t.account.syncHeading}>
        <div role="status" className="flex max-w-[56ch] items-start gap-2">
          {user ? (
            <CheckCircleIcon
              weight="duotone"
              size={22}
              aria-hidden="true"
              className="mt-[2px] flex-none text-accent-700"
            />
          ) : (
            <DeviceMobileIcon
              weight="duotone"
              size={22}
              aria-hidden="true"
              className="mt-[2px] flex-none text-neutral-700"
            />
          )}
          <span>{user ? t.account.syncOk : t.account.syncLocal}</span>
        </div>
      </Section>
    </>
  )
}
