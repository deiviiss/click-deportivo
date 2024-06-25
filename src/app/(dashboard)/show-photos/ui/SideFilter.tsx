'use client'

import { type State, type Event, type Discipline } from '@prisma/client'
import clsx from 'clsx'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { PhotoCategoryFilter } from './PhotoCategoryFilter'
import { PhotoEventFilter } from './PhotoEventFilter'
import { PhotoStateFilter } from './PhotoStateFilter'
import { useFilterStore } from '@/store'

interface Props {
  events: Event[]
  states: State[]
  disciplines: Discipline[]
}

export const SideFilter = ({ events, states, disciplines }: Props) => {
  const isSideFilterOpen = useFilterStore((state) => state.isSideFilterOpen)
  const closeFilter = useFilterStore((state) => state.closeSideFilter)

  return (
    <>
      {
        isSideFilterOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-prima opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeFilter} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-primary z-20 shadow-2xl transform transition-all duration-300 text-center',
          {
            'translate-x-full': !isSideFilterOpen
          }
        )
      }>

        <IoCloseOutline
          size={35}
          className='absolute top-5 right-5 cursor-pointer text-white hover:text-tertiary transition-all'
          onClick={closeFilter}
        />

        {/* input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2 text-secondary' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-white rounded pl-10 pr-10 py-1 border-b-2 text-lg border-secondary focus:outline-none focus:border-tertiary'
          />
        </div>

        {/* filtros */}
        <div className='flex flex-col items-center mt-4 max-w-[280px] mx-auto'>

          <PhotoEventFilter events={events} />

          <PhotoStateFilter states={states} />

          <PhotoCategoryFilter disciplines={disciplines} />

        </div>
        <button onClick={closeFilter} className='btn-primary'>Aplicar</button>

        <div className="w-full h-px bg-tertiary rounded transition-all mt-10"></div>
      </nav>

    </>
  )
}
