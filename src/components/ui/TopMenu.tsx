'use client'

import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'

import { tittleFont } from '@/config/fonts'
import { useFilterStore, useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const openFilter = useFilterStore((state) => state.openSideFilter)

  return (
    <nav className="flex px-5 justify-between items-center w-full border-b-2 border-gray-400 shadow-2xl">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span className={`${tittleFont.className} antialiased font-bold`}>Click Deportivo</span>
        </Link>
      </div>

      {/* center menu */}
      <div className='hidden sm:block'>
        <Link href={'/show-photos'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-400'>Fotos</Link>
        <Link href={'/photographers'} className='m-2 p-2 rounded-md transition-all hover:bg-gray-400'>Fotógrafos</Link>
      </div>

      {/* upload photo */}
      <div className='flex items-center'>
        <Link href={'/upload-photo'} className='mx-2 hover:bg-gray-400 rounded-md transition-all'>
          <IoAdd className='w-5 h-5'></IoAdd>
        </Link>

        <button type='button' onClick={openFilter} className='m-2 p-2 rounded-md transition-all hover:bg-gray-400'>Filtro</button>

        <button type='button' onClick={openMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-400'>Menú</button>
      </div>
    </nav>
  )
}
