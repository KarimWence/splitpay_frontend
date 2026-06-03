import { formatDistanceToNow } from 'date-fns'

import type { Notification } from '../types/notification.types'

interface Props {
    notification: Notification

    onClick: (
        id: string
    ) => void
}

export const NotificationItem = ({
    notification,
    onClick,
}: Props) => {
    return (
        <button
            onClick={() =>
                onClick(
                    notification._id
                )
            }
            className='flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50'
        >
            {!notification.read && (
                <div className='mt-2 h-2 w-2 rounded-full bg-blue-600' />
            )}

            <div className='flex-1'>
                <p className='font-medium text-gray-900'>
                    {
                        notification.title
                    }
                </p>

                <p className='mt-1 text-sm text-gray-600'>
                    {
                        notification.message
                    }
                </p>

                <p className='mt-2 text-xs text-gray-400'>
                    {formatDistanceToNow(
                        new Date(
                            notification.createdAt
                        ),
                        {
                            addSuffix:
                                true,
                        }
                    )}
                </p>
            </div>
        </button>
    )
}