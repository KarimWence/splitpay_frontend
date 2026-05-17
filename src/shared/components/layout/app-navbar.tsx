import { Bell } from 'lucide-react'

import { Settings } from 'lucide-react'

export const AppNavbar = () => {
  return (
    <header className='flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8'>
      <div className='flex h-12 w-[320px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4'>
        <input
          type='text'
          placeholder='Search groups...'
          className='w-full bg-transparent outline-none'
        />
      </div>

      <div className='flex items-center gap-5'>
        <button className='text-gray-500 transition hover:text-gray-700'>
          <Bell size={22} />
        </button>

        <button className='text-gray-500 transition hover:text-gray-700'>
          <Settings size={22} />
        </button>

        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 font-semibold text-white'>
          JD
        </div>
      </div>
    </header>
  )
}