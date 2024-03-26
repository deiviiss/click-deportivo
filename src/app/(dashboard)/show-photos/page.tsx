import type { Metadata } from 'next'
import { PhotosGrid } from './ui/PhotosGrid'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para mostrar imagenes',
  description: 'Pagina para mostrar imagenes'
}

interface WhereConditionType {
  event?: { name: string }
  state?: { name: string }
  category?: { name: string }
}

export default async function ShowImagesPage({
  searchParams
}: {
  searchParams?: {
    event?: string
    state?: string
    category?: string
  }
}): Promise<JSX.Element> {
  const whereCondition: WhereConditionType = {}

  if (searchParams?.event) {
    whereCondition.event = {
      name: searchParams.event
    }
  }

  if (searchParams?.state) {
    whereCondition.state = {
      name: searchParams.state
    }
  }

  if (searchParams?.category) {
    whereCondition.category = {
      name: searchParams.category
    }
  }

  const images = await prisma.photo.findMany({
    where: {
      ...whereCondition
    },
    include: {
      photographer: true,
      event: true,
      category: true,
      state: true
    }
  })

  return (
    <>
      <div className='flex flex-col gap-3 py-6'>
        <Title title='Pagina para mostrar imagenes' className='text-center text-xl' subtitle='Todas las imagenes de todos los eventos' />
      </div>

      {
        images.length === 0
          ? (
            <h1 className='text-4xl'>No hay imagenes para mostrar</h1>)
          : (
            <PhotosGrid photos={images} />)
      }

    </>
  )
}
