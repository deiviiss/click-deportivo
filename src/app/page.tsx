import Link from 'next/link'
import { getUserSessionServer } from '@/auth'

export default async function HomePage() {
  const user = await getUserSessionServer()

  return (
    <main className='flex flex-col items-center justify-center w-full h-screen p-2' >

      <div className='flex flex-col items-center justify-center w-3/4 h-screen gap-5 p-2'>
        <h1 className='text-4xl font-bold text-center'>Bienvenido a Click Deportivo</h1>
        <p className='text-lg text-center'>Una plataforma para organizar, cargar y mostrar fotografías de eventos deportivos profesionales para impresión y venta en el sitio.</p>

        <div className="flex gap-4">
          <button className=' p-2 rounded bg-gray-400 hover:bg-gray-200 cursor-pointer w-full'>
            {
              !user
                ? <>
                  <Link href={'/auth/login'} >Iniciar</Link>
                </>
                : <>
                  <Link href={'/show-photos'} className='w-[900px]'>Iniciar</Link>
                </>
            }

          </button>
        </div>
      </div>

    </main>
  )
}
