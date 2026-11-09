import 'server-only'

/**
 * Emails allowed to sign in (ALLOWED_EMAILS, comma-separated). No open registration: anyone else
 * is refused at sign-in, and removing an email revokes access at the next request (requireUser).
 */
export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const allowed = (process.env.ALLOWED_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return allowed.includes(email.trim().toLowerCase())
}
