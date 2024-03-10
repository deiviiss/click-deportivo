'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { type PhotographerForm } from '@/photographers'
import { uploadPhoto } from '@/photos/actions/upload-photo'

interface UploadImageFormProps {
  photographers: PhotographerForm[]
}

export const UploadImageForm = ({ photographers }: UploadImageFormProps) => {
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
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="text" name="event" />

        <label htmlFor='photographer'>
          Selecciona al fotografo
        </label>
        <div className='relative'>
          <select
            id='photographer'
            name='photographerId'
            className='peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500'
          >
            <option value='' disabled>
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
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
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
