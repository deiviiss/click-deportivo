'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FcGoogle } from 'react-icons/fc'
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

      <LoginButton />

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

      <button
        type='button'
        onClick={async () => await signIn('google')}
        className='btn-secondary flex items-center justify-center gap-4 w-full'
      >
        <FcGoogle
          className='rounded bg-white p-1'
          size={30}
        />
        Iniciar con google
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-400"></div>
        <div className="px-2 text-gray-200">O</div>
        <div className="flex-1 border-t border-gray-400"></div>
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
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}
