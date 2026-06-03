import { NotificationItem } from './notification-item'

import { useNotifications } from '../hooks/use-notifications'

import { useMarkNotificationRead } from '../hooks/use-mark-notification-read'

interface Props {
    open: boolean
}

export const NotificationsPopover =
    ({
        open,
    }: Props) => {
        const {
            data:
                notifications = [],
        } =
            useNotifications()

        const markRead =
            useMarkNotificationRead()

        if (!open) {
            return null
        }

        return (
            <div className='absolute right-0 top-14 z-50 w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl'>
                <div className='border-b border-gray-100 p-4'>
                    <h3 className='font-semibold'>
                        Notifications
                    </h3>
                </div>

                <div className='max-h-[420px] overflow-y-auto'>
                    {notifications.length ===
                    0 ? (
                        <div className='p-8 text-center text-sm text-gray-500'>
                            No notifications
                        </div>
                    ) : (
                        notifications.map(
                            (
                                notification
                            ) => (
                                <NotificationItem
                                    key={
                                        notification._id
                                    }
                                    notification={
                                        notification
                                    }
                                    onClick={
                                        (
                                            id
                                        ) =>
                                            markRead.mutate(
                                                id
                                            )
                                    }
                                />
                            )
                        )
                    )}
                </div>
            </div>
        )
    }