'use client'

import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'

import { tittleFont } from '@/config/fonts'
import { useFilterStore, useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const openFilter = useFilterStore((state) => state.openSideFilter)

  return (
    <nav className="flex px-20 justify-between items-center w-full bg-primary shadow-md shadow-secondary hover:border-r-secondary text-white">
      {/* logo */}
      <div>
        <Link href={'/'}>
          <span className={`${tittleFont.className} antialiased font-bold`}>Click Deportivo</span>
        </Link>
      </div>

      {/* center menu */}
      <div className='hidden sm:block'>
        <Link href={'/show-photos'} className='m-2 p-2 pb-1 transition-all border-b-2 border-r-2 border-r-primary hover:border-b-secondary hover:border-r-secondary border-b-primary'>Fotos</Link>
        <Link href={'/photographers'} className='m-2 p-2 pb-1 transition-all border-b-2 border-r-2 border-r-primary hover:border-b-secondary hover:border-r-secondary border-b-primary '>Fotógrafos</Link>
      </div>

      {/* upload photo */}
      <div className='flex items-center'>
        <Link href={'/upload-photo'} className='m-2 p-1 transition-all border-2 rounded-full hover:border-secondary border-primary'>
          <IoAdd className='w-5 h-5'></IoAdd>
        </Link>

        <button type='button' onClick={openFilter} className='m-2 p-2 pb-0 trans1tion-all border-b-2 border-r-2 border-r-primary hover:border-b-secondary hover:border-r-secondary border-b-primary'>Filtro</button>

        <button type='button' onClick={openMenu} className='m-2 p-2 pb-0 trans1tion-all border-b-2 border-r-2 border-r-primary hover:border-b-secondary hover:border-r-secondary border-b-primary'>Menú</button>
      </div>
    </nav>
  )
}
