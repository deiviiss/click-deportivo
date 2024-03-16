import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth'
import { Sidebar, TopMenu } from '@/components'

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

  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      <TopMenu />
      <Sidebar />
      {children}
    </main >
  )
}
