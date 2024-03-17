import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SideFilter } from './show-photos/ui/SideFilter'
import { getUserSessionServer } from '@/auth'
import { Sidebar, TopMenu } from '@/components'
import prisma from '@/libs/prisma'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard layout'
}

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()
  if (!user) redirect('/auth/login')

  const events = await prisma.event.findMany()

  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <TopMenu />
      <Sidebar />
      <SideFilter events={events} />
      {children}
    </main >
  )
}
