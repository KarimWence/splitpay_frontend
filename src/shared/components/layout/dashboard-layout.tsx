import type { ReactNode } from 'react'

import { AppNavbar } from './app-navbar'

import { AppSidebar } from './app-sidebar'

interface Props {
  children: ReactNode
}

export const DashboardLayout = ({
  children,
}: Props) => {
  return (
    <div className='flex min-h-screen bg-[#f5f7fb]'>
      <AppSidebar />

      <div className='flex flex-1 flex-col'>
        <AppNavbar />

        <main className='flex-1 p-8'>
          {children}
        </main>
      </div>
    </div>
  )
}