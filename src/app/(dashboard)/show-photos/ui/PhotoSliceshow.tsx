'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type Swiper as SwiperObject } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'

interface PhotoSlideshowProps {
  images: string[]
  alt: string
}

export const PhotoSlideshow = ({ images, alt }: PhotoSlideshowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  const swiperStyle: Record<string, string> = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  }

  return (
    <div className='flex flex-col'>
      <Swiper
        style={swiperStyle}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='h-[500px]'
      >

        {
          images.map(image => {
            return (
              <SwiperSlide key={image}>
                <Image
                  width={1024}
                  height={800}
                  src={image}
                  alt={alt}
                  className='rounded-lg object-fill'
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                width={300}
                height={300}
                src={image}
                alt={alt}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
