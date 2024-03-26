'use client'

import { type State } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  states: State[]
}

export function PhotoStateFilter({ states }: Props): JSX.Element {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(filterParams)

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value
    params.set('state', state)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-col py-5' >
      <div className='flex justify-center items-center gap-2'>
        <label htmlFor='state'>
          Estado
        </label>
        <select
          id='state'
          name='state'
          onChange={(e) => {
            handleFilter(e)
          }}
          className='rounded-lg text-black py-1 px-2'
        >
          <option value=''>Todos</option>
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
