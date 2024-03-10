import Link from 'next/link'
import { Carousel } from '@/components'
import { type PhotoWithPhotographer } from '@/photos/interfaces/photos'

interface Props {
  photos: PhotoWithPhotographer[]
}

export const PhotosGrid = ({ photos }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-2xl">Fotos</h1>

      <div className='w-full'>
        <Carousel
          slides={photos}
          autoSlide={true}
          autoSlideInterval={9000}
        />
      </div>

      <button className=' p-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer'>
        <Link href={'/upload-photo'}>Subir una imagen</Link>
      </button>

    </div>
  )
}
