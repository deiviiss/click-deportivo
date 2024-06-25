import type { Metadata } from 'next'
import Link from 'next/link'
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
  discipline?: { name: string }
}

export default async function ShowImagesPage({
  searchParams
}: {
  searchParams?: {
    event?: string
    state?: string
    discipline?: string
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

  if (searchParams?.discipline) {
    whereCondition.discipline = {
      name: searchParams.discipline
    }
  }

  const images = await prisma.photo.findMany({
    where: {
      ...whereCondition
    },
    include: {
      photographer: true,
      event: true,
      discipline: true,
      state: true
    }
  })

  //       <div className='flex flex-col gap-3 py-6'>
  // < Title title = 'Pagina para mostrar imagenes' className = 'text-center text-xl' subtitle = 'Todas las imagenes de todos los eventos' />
  // </div >
  return (
    <div className='text-black'>
      {
        images.length === 0
          ? (
            <div className='flex flex-col items-center justify-center mx-auto mt-10 gap-3'>
              <Title title='No hay imagenes para mostrar' subtitle='' className='text-center text-2xl w-full' />
              <span>
                Comienza a agregar
                <Link className='hover:underline' href={'/upload-photo'}> imagenes</Link>

              </span>
            </div>)
          : (
            <PhotosGrid photos={images} />)
      }
    </div>
  )
}
