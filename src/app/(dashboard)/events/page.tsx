import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth'
import { Title } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Pagina para los eventos',
  description: 'Pagina para administrar los eventos'
}

export default async function EventosPage({
  searchParams
}: {
  searchParams?: {
    event?: string
  }
}): Promise<JSX.Element> {
  const user = await getUserSessionServer()
  const isAdmin = user?.roles.includes('admin')
  if (!user) redirect('/auth/login')
  if (!isAdmin) redirect('/')

  const events = await prisma.event.findMany()

  return (
    <>
      <div className='flex flex-col gap-3 py-6'>
        <Title title='Pagina para administrar los eventos' className='text-center text-xl' subtitle='' />
        <p className='flex flex-col'>
          {events.map((event) => (
            <div key={event.id} className='flex flex-col gap-3'>
              <h2 className='text-2xl'>{event.name}</h2>
              <p>{event.description}</p>
            </div>
          ))}
        </p>
      </div>

    </>
  )
}
