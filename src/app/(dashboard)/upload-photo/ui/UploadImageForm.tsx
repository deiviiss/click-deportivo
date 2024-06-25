'use client'

import { type State, type Discipline, type Event, type Rama, type Venue, type Category } from '@prisma/client'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type PhotographerForm } from '@/photographers'
import { uploadPhoto } from '@/photos/actions/upload-photo'

interface FormInputs {
  photographer: string
  discipline: string
  event: string
  state: string
  venue: string
  rama: string
  category: string

  images?: FileList
}

interface UploadImageProps {
  photographers: PhotographerForm[]
  events: Event[]
  disciplines: Discipline[]
  states: State[]
  ramas: Rama[]
  venues: Venue[]
  categories: Category[]
}

export const UploadImageForm = ({ photographers, events, disciplines, states, ramas, venues, categories }: UploadImageProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<FormInputs>()

  const onSubmit = async (data: FormInputs) => {
    // setErrorMessage('')
    setIsSubmitting(true)

    const formData = new FormData()

    const { images, ...dataPhotoToSave } = data

    formData.append('photographer', dataPhotoToSave.photographer)
    formData.append('discipline', data.discipline)
    formData.append('event', data.event)
    formData.append('state', data.state)
    formData.append('venue', data.venue)
    formData.append('rama', data.rama)
    formData.append('category', data.category)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    // for (const key in data) {
    //   formData.append(key, (data as any)[key])
    // }

    const rta = await uploadPhoto(formData)

    setIsSubmitting(false)

    if (!rta.ok) {
      setIsSubmitting(false)
      setErrorMessage(rta.message)
      return
    }

    router.push('/show-photos')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' >
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 my-3">
        {/* event */}
        <div className='flex flex-col'>
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="event">Evento:</label>
            <div className='relative w-60'>
              <select
                id='eventId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.event
                    }
                  )
                }
                {...register('event', { required: true })}
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
          </div>
          {
            errors.event?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* El evento es requerido</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/* discipline */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="discipline">Disciplina:</label>
            <div className='relative w-60'>
              <select
                id='disciplineId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.discipline
                    }
                  )
                }
                {...register('discipline', { required: true })}
              >
                <option value=''>
                  Selecciona una disciplina
                </option>
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
          {
            errors.discipline?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* La disciplina es requerida</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/* state */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="state">Estado:</label>
            <div className='relative w-60'>
              <select
                id='stateId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.state
                    }
                  )
                }
                {...register('state', { required: true })}
              >
                <option value=''>
                  Selecciona un estado:
                </option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {
            errors.state?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* El estado es requerido</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/*  categories */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="category">Categoria:</label>
            <div className='relative w-60'>
              <select
                id='categoryId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.category
                    }
                  )
                }
                {...register('category', { required: true })}
              >
                <option value=''>
                  Selecciona una categoria
                </option>
                {
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          {
            errors.category?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* La categoria es requerida</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/*  rama */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="rama">Rama:</label>
            <div className='relative w-60'>
              <select
                id='ramaId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.rama
                    }
                  )
                }
                {...register('rama', { required: true })}
              >
                <option value=''>
                  Selecciona una rama
                </option>
                {
                  ramas.map((rama) => (
                    <option key={rama.id} value={rama.id} className='capitalize'>
                      {rama.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          {
            errors.rama?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* La rama es requerida</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/* venue */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="venue">Sede:</label>
            <div className='relative w-60'>
              <select
                id='venueId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.venue
                    }
                  )
                }
                {...register('venue', { required: true })}
              >
                <option value=''>
                  Selecciona una sede
                </option>
                {
                  venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          {
            errors.venue?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* La sede es requerida</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        {/* images */}
        <div className="flex flex-col">
          <div className='flex items-center justify-between gap-2'>
            <span>Fotos: </span>
            <label htmlFor='imgFile' className="px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 peer block rounded-md w-60">
              Imagenes
              {/* {
                images.length === 0
                  ? ('Selecciona imagenes...')
                  : ('Cambiar imagenes...')
              } */}
              <input
                id='imgFile'
                type="file"
                multiple
                className="hidden"
                {...register('images')}
              // onChange={handleImageChange}
              />
            </label>
          </div>
          {
            (isValid)
              ? (
                <span className='text-red-500 text-sm pt-2'>* La imagen es requerida</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>

        { /* photographer */}
        <div className='flex flex-col'>
          <div className='flex items-center justify-between gap-2'>
            <label htmlFor="event">Fotografo:</label>
            <div className='relative w-60'>
              <select
                id='photographerId'
                className={
                  clsx(
                    'px-2 py-2 border bg-gray-200 text-black focus:outline-none focus:border-gray-800 w-full peer block h-10 p-2 rounded-lg border-solid appearance-none',
                    {
                      'border-red-500': errors.photographer
                    }
                  )
                }
                {...register('photographer', { required: true })}
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
          </div>
          {
            errors.photographer?.type === 'required'
              ? (
                <span className='text-red-500 text-sm pt-2'>* El fotografo es requerido</span>)
              : (
                <span className='h-7'></span>)
          }
        </div>
      </div>

      <span className='text-red-500 pb-3'>{errorMessage}</span>
      {/* buttons */}
      <div className='flex w-full items-center justify-end gap-5'>
        <button type='button' className='btn-primary'>
          <Link href={'/show-photos'}>Cancelar</Link>
        </button>
        <button
          type='submit'
          className={clsx(
            'bg-red-600',
            {
              'btn-primary': !isSubmitting,
              'btn-disable': isSubmitting
            })}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subiendo...' : 'Subir'}
        </button>
      </div>
    </form >
  )
}
