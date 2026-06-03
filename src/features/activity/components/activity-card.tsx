import {
    formatDistanceToNow,
} from 'date-fns'

import type {
    Activity,
} from '../types/activity.types'

interface Props {
    activity: Activity
}

export const ActivityCard = ({
    activity,
}: Props) => {
    return (
        <div className='rounded-3xl border border-gray-200 bg-white p-5 shadow-sm'>
            <p className='font-medium text-gray-900'>
                {
                    activity.message
                }
            </p>

            <p className='mt-2 text-sm text-gray-500'>
                {
                    activity.type
                }
            </p>

            <p className='mt-2 text-xs text-gray-400'>
                {formatDistanceToNow(
                    new Date(
                        activity.createdAt
                    ),
                    {
                        addSuffix:
                            true,
                    }
                )}
            </p>
        </div>
    )
}