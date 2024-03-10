import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProviderAuth } from '@/auth'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Click Deportivo',
  description: 'Una plataforma para organizar, cargar y mostrar fotografías de eventos deportivos profesionales para impresión y venta en el sitio.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <ProviderAuth>
        <body className={`${inter.className} bg-slate-600 text-white`}>
          {children}
        </body>
      </ProviderAuth>
    </html>
  )
}
