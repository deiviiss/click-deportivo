'use client'

import { type Event } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { type PhotographerForm } from '@/photographers'
import { uploadPhoto } from '@/photos/actions/upload-photo'

interface UploadImageFormProps {
  photographers: PhotographerForm[]
  events: Event[]
}

export const UploadImageForm = ({ photographers, events }: UploadImageFormProps) => {
  const [state, dispatch] = useFormState(uploadPhoto, undefined)

  const [image, setImage] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result)
        }
      }

      if (file instanceof Blob) {
        reader.readAsDataURL(file)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    formData.append('img', image)

    formData.delete('imgFile')

    dispatch(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="event">Evento:</label>
        <div className='relative'>
          <select
            id='event'
            name='eventId'
            className="px-2 py-2 border bg-gray-200 mb-5 text-black focus:outline-none focus:border-gray-800 w-full peer block rounded-md"
          >
            <option value=''>
              Selecciona un evento
            </option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor='photographer'>
          Selecciona al fotografo
        </label>
        <div className='relative'>
          <select
            id='photographer'
            name='photographerId'
            className="px-2 py-2 border bg-gray-200 mb-5 text-black focus:outline-none focus:border-gray-800 w-full peer block rounded-md"
          >
            <option value=''>
              Selecciona un fotografo
            </option>
            {photographers.map((photographer) => (
              <option key={photographer.id} value={photographer.id}>
                {photographer.name}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="imgFile">Imagenes:</label>
        <input
          className="px-2 py-2 border bg-gray-200 mb-5 text-black focus:outline-none focus:border-gray-800 w-full peer block rounded-md"
          type="file"
          name="imgFile"
          onChange={handleImageChange}
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === 'ErrorUploadingImage' && (
            <div className="flex flex-row mb-2">
              <p className="text-sm text-red-500">
                No se ha guardado la imagen.
              </p>
            </div>
          )}
        </div>

        <div className='flex justify-center items-center gap-5'>
          <button type='button' className='btn-secondary'>
            <Link href={'/'}>Cancelar</Link>
          </button>
          <SubmitButton />
        </div>

      </form>

    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className='btn-primary'
      // className={clsx({
      //   'btn-primary': !pending,
      //   'btn-disabled': pending
      // })}
      disabled={pending}
    >
      Subir
    </button>
  )
}
