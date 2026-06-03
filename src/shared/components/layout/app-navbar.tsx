import { Bell, Menu } from 'lucide-react'

import { useAuthStore } from '@/features/auth/store/auth.store'

import { useNotifications } from '@/features/notifications/hooks/use-notifications'

import { useState } from 'react'

import { NotificationsPopover } from '@/features/notifications/components/notifications-popover'

import { useNavigate } from 'react-router-dom'

interface Props {
  onOpenSidebar: () => void
}

export const AppNavbar = ({
  onOpenSidebar,
}: Props) => {
  const navigate = useNavigate()
  const user = useAuthStore(
    (state) => state.user
  )
  const initials = `${user?.name?.[0] ?? ''}${user?.lastname?.[0] ?? ''}`
  const {
    data: notifications = [],
  } = useNotifications()

  const [open, setOpen] =
    useState(false)

  const unreadCount =
    notifications.filter(
      notification =>
        !notification.read
    ).length

  return (
    <header className='flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8'>
      <div className='flex items-center gap-4'>
        <button
          onClick={onOpenSidebar}
          className='md:hidden'
        >
          <Menu size={28} />
        </button>
        <div className='hidden md:block'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Welcome {user?.name}
          </h2>

          <p className='text-sm text-gray-500'>
            Manage your expenses effortlessly
          </p>
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <div className='relative'>
          <button
            onClick={() =>
              setOpen(!open)
            }
            className='relative text-gray-500 transition hover:text-gray-700'
          >
            <Bell
              size={22}
              className={
                unreadCount > 0
                  ? 'animate-pulse'
                  : ''
              }
            />

            {unreadCount > 0 && (
              <span className='absolute -right-2 -top-2 flex h-5 min-w-5 animate-bounce items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white'>
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationsPopover
            open={open}
          />
        </div>

        <button
          onClick={() =>
            navigate('/profile')
          }
          title='View Profile'
          className='relative flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 font-semibold text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300'
        >
          {initials}
        </button>
      </div>
    </header>
  )
}