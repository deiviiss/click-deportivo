import { Loader } from '@/components'

export default function Loading() {
  return (
    <div className='absolute inset-0 z-10 flex justify-center items-center bg-white'>
      <Loader />
    </div>
  )
}
