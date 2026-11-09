import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { isAllowedEmail } from '@/lib/server/allowlist'
import { upsertGoogleUser } from '@/lib/server/users'

/*
 * Sign-in (docs/data-model.md §9.2): Google only, and only for the emails in ALLOWED_EMAILS.
 * Reads AUTH_SECRET, AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET from the environment. Sessions are
 * stateless JWTs: a leaked cookie stays valid until it expires, so keep them short. The user is
 * re-checked on every API request anyway (lib/server/auth.ts).
 */

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user']
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  // Errors (e.g. AccessDenied for an email not on the list) are shown on the account page.
  pages: { signIn: '/account', error: '/account' },
  callbacks: {
    signIn({ account, profile }) {
      return (
        account?.provider === 'google' &&
        profile?.email_verified === true &&
        isAllowedEmail(profile.email)
      )
    },
    async jwt({ token, account, profile }) {
      // `account` is only there on sign-in: resolve (or create) the user document once.
      if (account?.provider === 'google' && profile?.email) {
        token.userId = await upsertGoogleUser(
          account.providerAccountId,
          profile.email,
          profile.name,
        )
      }
      return token
    },
    session({ session, token }) {
      if (typeof token.userId === 'string') session.user.id = token.userId
      return session
    },
  },
})
