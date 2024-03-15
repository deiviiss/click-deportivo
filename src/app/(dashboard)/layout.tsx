import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth'

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
  const isAdmin = user?.roles.includes('admin')

  if (!user) redirect('/auth/login')
  if (!isAdmin) redirect('/')

  return (
    <main className='flex flex-col items-center justify-center w-full p-2' >
      {children}
    </main >
  )
}
