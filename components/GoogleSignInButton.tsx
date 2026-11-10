'use client'

import { CircleNotchIcon, GoogleLogoIcon } from '@phosphor-icons/react'
import { useFormStatus } from 'react-dom'
import { t } from '@/i18n'

/** "Accedi con Google" submit button of a sign-in form, busy while the form is pending. */
export function GoogleSignInButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="btn btn-secondary flex min-h-[48px] gap-[8px] bg-bg text-base"
    >
      {pending ? (
        <>
          <CircleNotchIcon
            weight="duotone"
            size={18}
            aria-hidden="true"
            className="motion-safe:animate-spin"
          />
          {t.accountMenu.signingIn}
        </>
      ) : (
        <>
          <GoogleLogoIcon weight="duotone" size={20} aria-hidden="true" />
          {t.accountMenu.signInGoogle}
        </>
      )}
    </button>
  )
}
