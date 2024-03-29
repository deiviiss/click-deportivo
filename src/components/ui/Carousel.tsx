'use client'
import { type Photo } from '@prisma/client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { SlideButtons } from '@/components'

export const Carousel = ({
  autoSlide = false,
  autoSlideInterval = 4000,
  slides
}: {
  autoSlide?: boolean
  autoSlideInterval?: number
  slides: Photo[]
}): JSX.Element => {
  const [curr, setCurr] = useState(0)

  const prev = (): void => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  }

  const next = (): void => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  }

  useEffect(() => {
    let slideInterval: NodeJS.Timeout | undefined
    if (autoSlide) {
      slideInterval = setInterval(() => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
      }, autoSlideInterval)
    }
    return () => {
      clearInterval(slideInterval)
    }
  }, [autoSlide, autoSlideInterval, slides.length])

  return (
    <div className='relative bg-slate-600 overflow-hidden'>
      <div className='flex transition-transform ease-out duration-500'
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full min-w-full h-96">
            <Image
              className='w-full min-w-full h-96 bg-center bg-cover object-cover object-top'
              key={slide.id}
              src={slide.url}
              width={300}
              height={300}
              alt={slide.url}
            />
            <div className="absolute bottom-0 w-full text-white text-center bg-black bg-opacity-50 p-2"> {/* Estilo para el texto */}
              {slide.eventId}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden absolute inset-0 sm:flex items-center justify-between px-4 '>
        <button
          onClick={prev}
          className='px-4 py-2 bg-transparent text-white border-none rounded-lg cursor-pointer transition duration-200 ease-out hover:rounded-lg hover:bg-white hover:text-primary absolute top-1/2 left-3 transform -translate-y-1/2'
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          onClick={next}
          className='px-4 py-2 bg-transparent text-white border-none rounded-lg cursor-pointer transition duration-200 ease-out hover:rounded-lg hover:bg-white hover:text-primary absolute top-1/2 right-3 transform -translate-y-1/2'
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>

      <SlideButtons slides={slides} curr={curr} setCurr={setCurr} />
    </div>
  )
}
