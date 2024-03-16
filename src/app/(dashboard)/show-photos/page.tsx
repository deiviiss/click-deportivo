import type { Metadata } from 'next'
import { PhotoFilter } from './ui/PhotosFilter'
import { PhotosGrid } from './ui/PhotosGrid'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para mostrar imagenes',
  description: 'Pagina para mostrar imagenes'
}

export default async function ShowImagesPage({
  searchParams
}: {
  searchParams?: {
    event?: string
  }
}): Promise<JSX.Element> {
  const eventQuery = searchParams?.event || ''
  const event = eventQuery || {}

  const events = await prisma.event.findMany()

  const images = await prisma.photo.findMany({
    where: {
      event: {
        name: event
      }
    },
    include: {
      photographer: true,
      event: true
    }
  })

  return (
    <>
      <div className='flex flex-col gap-3 py-6'>
        <Title title='Pagina para mostrar imagenes' className='text-center text-xl' subtitle='Todas las imagenes de todos los eventos' />

        <PhotoFilter events={events} />
      </div>

      <PhotosGrid photos={images} />

    </>
  )
}
