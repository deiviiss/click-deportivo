import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-center w-full h-screen p-2' >

      <div className='flex flex-col items-center justify-center w-3/4 h-screen gap-5 p-2'>
        <h1 className='text-4xl font-bold text-center'>Bienvenido a Click Deportivo</h1>
        <p className='text-lg text-center'>Una plataforma para organizar, cargar y mostrar fotografías de eventos deportivos profesionales para impresión y venta en el sitio.</p>

        <div className="flex gap-4">
          <button className=' p-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer'>
            <Link href={'/upload-photo'}>Subir una imagen</Link>
          </button>

          <button className=' p-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer'>
            <Link href={'/show-photos'}>Ver imagenes</Link>
          </button>
        </div>
      </div>

    </main>
  )
}
