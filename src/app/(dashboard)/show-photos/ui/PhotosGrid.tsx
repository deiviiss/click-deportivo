import { PhotoSlideshow } from './PhotoSliceshow'
import { Title } from '@/components'
import { type PhotoShow } from '@/photos/interfaces/photos'

interface Props {
  photos: PhotoShow[]
}

export const PhotosGrid = ({ photos }: Props) => {
  const slices = photos.map((photo) => {
    const slice = photo.url

    return slice
  })

  // Check if all photos belong to the same event
  const allPhotosSameEvent = photos.every(photo => photo.eventId === photos[0].eventId)

  // get unique events
  const uniqueEvents = Array.from(new Map(photos.map(photo => [photo.event.id, photo.event])).values())

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px,1fr,1fr] gap-3 py-7 max-w-[1280px]'>

      <div className='col-span-1 p-5'>
        <div className='flex flex-col gap-3 flex-shrink-0'>
          {
            allPhotosSameEvent
              ? <>
                <Title title={photos[0].event.name} subtitle='' className='text-center text-2xl' />
                <p><strong>Estadio: </strong>{photos[0].event.location}</p>
                <p>{photos[0].event.description}</p>
                <p> <strong>Disciplina: </strong>{photos[0].discipline.name}</p>
                <p> <strong>Estado: </strong>{photos[0].state.name} - {photos[0].state.code}</p>
                <p> <strong>Fotógrafo: </strong>{photos[0].photographer.name}</p>
              </>
              : <>
                <h2 className="text-center text-2xl">Eventos Destacados</h2>
                <ul className='list-disc list-inside mt-2'>
                  {uniqueEvents.map((event) => (
                    <li key={event.id} className='mt-1'>
                      <span className="font-semibold">{event.name}</span> - <span className="text-sm">{event.location}</span>
                    </li>
                  ))}
                </ul>
              </>
          }

        </div>
      </div>

      <div className='col-span-1 md:col-span-2'>
        <PhotoSlideshow images={slices} alt='slides-images' />
      </div>

    </div>
  )
}
