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

  if (!isAdmin) redirect('/')

  const photographers = await prisma.photographer.findMany()
  const events = await prisma.event.findMany()
  const categories = await prisma.category.findMany()
  const states = await prisma.state.findMany()

  return (
    <div>
      <Title title='Pagina para subir imagenes' className='text-center' subtitle='' />

      <UploadImageForm photographers={photographers} events={events} categories={categories} states={states} />
    </div>
  )
}
