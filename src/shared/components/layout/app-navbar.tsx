import { Bell, Menu } from 'lucide-react'

import { Settings } from 'lucide-react'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { useNotifications } from '@/features/notifications/hooks/use-notifications'

import { useState } from 'react'

import { NotificationsPopover } from '@/features/notifications/components/notifications-popover'

interface Props {
  onOpenSidebar: () => void
}

export const AppNavbar = ({ onOpenSidebar, }: Props) => {
  const user = useAuthStore((state) => state.user)
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

      </div>

      <div className='flex items-center gap-5'>
        <div className='relative'>
          <button
            onClick={() =>
              setOpen(
                !open
              )
            }
            className='relative text-gray-500 transition hover:text-gray-700'
          >
            <Bell size={22} />

            {unreadCount > 0 && (
              <span className='absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white'>
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationsPopover
            open={open}
          />
        </div>


        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 font-semibold text-white'>
          {initials}
        </div>
      </div>
    </header>
  )
}