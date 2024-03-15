'use client'

import { type Event } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface PhotoFilterProps {
  events: Event[]
}

export function PhotoFilter({ events }: PhotoFilterProps): JSX.Element {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(filterParams)

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value
    params.set('event', event)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-col' >
      <div className='flex justify-center items-center gap-2'>
        <label htmlFor='event'>
          Evento
        </label>
        <select
          id='event'
          name='event'
          onChange={(e) => {
            handleFilter(e)
          }}
          className='rounded-lg text-black py-1 px-2'
        >
          <option value=''>Todos</option>
          {events.map((event) => (
            <option key={event.id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
