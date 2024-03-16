import type { Metadata } from 'next'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para los fotógrafos',
  description: 'Pagina para administrar los fotógrafos'
}

export default async function EventosPage({
  searchParams
}: {
  searchParams?: {
    event?: string
  }
}): Promise<JSX.Element> {
  const photographers = await prisma.photographer.findMany()

  return (
    <>
      <div className='flex flex-col gap-3 py-6'>
        <Title title='Página de los fotografos' className='text-center text-xl' subtitle='Aquí pueden ir listado todos los fotógrafos del equipo.' />
        <p className='flex flex-col'>
          {photographers.map((photographer) => (
            <div key={photographer.id} className='flex flex-col gap-3'>
              <h2 className='text-2xl'>{photographer.name}</h2>
            </div>
          ))}
        </p>
      </div>

    </>
  )
}
