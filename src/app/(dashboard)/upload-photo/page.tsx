import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { UploadImageForm } from './ui/UploadImageForm'
import { getUserSessionServer } from '@/auth'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para subir imagenes',
  description: 'Pagina para subir imagenes a la aplicacion.'
}

export default async function UploadImagesPage() {
  const user = await getUserSessionServer()
  const isAdmin = user?.roles?.includes('admin')
  if (!isAdmin) redirect('/show-photos')

  const photographers = await prisma.photographer.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const events = await prisma.event.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const disciplines = await prisma.discipline.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const states = await prisma.state.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const venues = await prisma.venue.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const ramas = await prisma.rama.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className='p-3 pt-6 xl:pt-12'>
      <Title title='Subir imagenes' className='w-full text-xl' subtitle='Formulario para subir imagenes' />

      <UploadImageForm photographers={photographers} events={events} disciplines={disciplines} states={states} ramas={ramas} venues={venues} categories={categories} />
    </div>
  )
}
