'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/auth'

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'SuccessSignin') {
      window.location.replace('/profile')
    }
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col gap-3">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 text-black focus:outline-none focus:border-gray-800"
        type="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 text-black focus:outline-none focus:border-gray-800"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === 'CredentialsSignin' && (
          <div className="flex flex-row mb-2">
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      // className={clsx({
      //   'btn-primary': !pending,
      //   'btn-disabled': pending
      // })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}
