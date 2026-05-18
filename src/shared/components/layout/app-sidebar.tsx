import { LogOut } from 'lucide-react'

import { useLocation } from 'react-router-dom'

import { navigationItems } from '@/shared/constants/navigation'

import { SidebarItem } from '../navigation/sidebar-item'

import { useLogout } from '@/features/auth/hooks/use-logout'

interface Props {
    isOpen: boolean

    onClose: () => void
}

export const AppSidebar = ({ isOpen, onClose }: Props) => {
  const location = useLocation()

  const logout = useLogout()

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition md:hidden ${isOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0'
          }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white px-6 py-8 transition-transform duration-300 md:static md:translate-x-0 ${isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }`}
      >
        <div>
          <h1 className='text-4xl font-bold text-blue-700'>
            SplitPay
          </h1>

          <p className='mt-1 text-sm text-gray-500'>
            Expense Optimizer
          </p>
        </div>

        <nav className='mt-14 flex flex-col gap-3'>
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={
                location.pathname ===
                item.path
              }
            />
          ))}
        </nav>

        <div className='mt-auto space-y-5'>
          <button className='h-14 w-full rounded-2xl bg-blue-700 font-semibold text-white shadow-lg transition hover:bg-blue-800'>
            Add Expense
          </button>

          <button
            onClick={logout}
            className='flex h-12 w-full items-center justify-center gap-3 rounded-xl text-gray-500 transition hover:bg-gray-100'
          >
            <LogOut size={20} />

            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}