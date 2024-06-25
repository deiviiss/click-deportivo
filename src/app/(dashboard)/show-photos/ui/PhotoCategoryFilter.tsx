'use client'

import { type Discipline } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  disciplines: Discipline[]
}

export function PhotoCategoryFilter({ disciplines }: Props): JSX.Element {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(filterParams)

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    params.set('category', category)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex flex-col py-5 w-full text-white' >
      <div className='flex justify-between items-center gap-2'>
        <label htmlFor='category'>
          Disciplina
        </label>
        <select
          id='discipline'
          name='discipline'
          onChange={(e) => {
            handleFilter(e)
          }}
          className='rounded-lg text-black py-1 px-2'
        >
          <option value=''>Todos</option>
          {disciplines.map((dicipline) => (
            <option key={dicipline.id} value={dicipline.name}>
              {dicipline.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
