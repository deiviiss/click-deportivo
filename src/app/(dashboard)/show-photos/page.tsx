import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PhotosGrid } from './ui/PhotosGrid'
import { getUserSessionServer } from '@/auth'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para mostrar imagenes',
  description: 'Pagina para mostrar imagenes'
}

export default async function ShowImagesPage() {
  const user = await getUserSessionServer()
  const isAdmin = user?.roles.includes('admin')

  if (!user) redirect('/auth/login')
  if (!isAdmin) redirect('/')

  const images = await prisma.photo.findMany({
    include: {
      photographer: true
    }
  })

  return (
    <div>
      <Title title='Pagina para mostrar imagenes' className='text-center' subtitle='' />

      <PhotosGrid photos={images} />
    </div>
  )
}
