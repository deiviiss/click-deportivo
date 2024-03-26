'use client'

import { type Category } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  categories: Category[]
}

export function PhotoCategoryFilter({ categories }: Props): JSX.Element {
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
    <div className='flex flex-col py-5' >
      <div className='flex justify-center items-center gap-2'>
        <label htmlFor='category'>
          Categoria
        </label>
        <select
          id='category'
          name='category'
          onChange={(e) => {
            handleFilter(e)
          }}
          className='rounded-lg text-black py-1 px-2'
        >
          <option value=''>Todos</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
