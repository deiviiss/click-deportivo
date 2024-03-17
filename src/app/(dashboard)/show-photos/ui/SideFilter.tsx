'use client'

import { type Event } from '@prisma/client'
import clsx from 'clsx'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { PhotoEventFilter } from './PhotoEventFilter'
import { useFilterStore } from '@/store'

interface Props {
  events: Event[]
}

export const SideFilter = ({ events }: Props) => {
  const isSideFilterOpen = useFilterStore((state) => state.isSideFilterOpen)
  const closeFilter = useFilterStore((state) => state.closeSideFilter)

  return (
    <>
      {
        isSideFilterOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeFilter} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-gray-500 z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideFilterOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeFilter}
        />

        {/* input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-1 left-2 text-gray-400' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded pl-10 pr-10 border-b-2 text-xl border-gray-600 focus:outline-none focus:border-gray-800'
          />
        </div>

        {/* filtros */}
        <>

          <PhotoEventFilter events={events} />

          <button onClick={closeFilter} className='w-full rounded-md py-2 bg-red-800 hover:bg-red-500'>Cerrar</button>

          <div className="w-full h-px bg-gray-100 rounded transition-all mt-10"></div>
        </>

      </nav>

    </>
  )
}
