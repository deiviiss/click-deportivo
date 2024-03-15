'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { MdOutlineEmojiEvents, MdOutlinePhotoCamera, MdOutlinePhoto } from 'react-icons/md'
import { useUiStore } from '@/store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-gray-500 z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
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

        {/* menú */}
        <div>
          <Link href='/profile'
            className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
            <IoPersonOutline size={30} />
            <span className='ml-3 text-xl'>Perfil</span>
          </Link>

          <Link href='/show-photos'
            className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
            <MdOutlinePhoto size={30} />
            <span className='ml-3 text-xl'>Fotos</span>
          </Link>

          <Link href='/'
            className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
            <IoLogInOutline size={30} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>

          <Link href='/'
            className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
            <IoLogOutOutline size={30} />
            <span className='ml-3 text-xl'>Salir</span>
          </Link>

          <div className="w-full h-px bg-gray-100 rounded transition-all"></div>
        </div>

        <Link href='/events'
          className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
          <MdOutlineEmojiEvents size={30} />
          <span className='ml-3 text-xl'>Eventos</span>
        </Link>

        <Link href='/photographers'
          className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
          <MdOutlinePhotoCamera size={30} />
          <span className='ml-3 text-xl'>Fotógrafos</span>
        </Link>

        <Link href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-600 rounded transition-all'>
          <IoPeopleOutline size={30} />
          <span className='ml-3 text-xl'>Usuarios</span>
        </Link>
      </nav>

    </div>
  )
}
