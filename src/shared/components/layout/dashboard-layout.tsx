import { useState } from 'react'

import type { ReactNode } from 'react'

import { AppNavbar } from './app-navbar'

import { AppSidebar } from './app-sidebar'

interface Props {
  children: ReactNode
}

export const DashboardLayout = ({
  children,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false)

  return (
    <div className='flex min-h-screen bg-[#f5f7fb]'>
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      <div className='flex flex-1 flex-col'>
        <AppNavbar
          onOpenSidebar={() =>
            setIsSidebarOpen(true)
          }
        />

        <main className='flex-1 p-4 md:p-8'>
          {children}
        </main>
      </div>
    </div>
  )
}