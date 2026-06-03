import { ActivityCard } from './activity-card'

import type {
    Activity,
} from '../types/activity.types'

interface Props {
    activities: Activity[]
}

export const ActivitySection = ({
    activities,
}: Props) => {
    if (
        activities.length === 0
    ) {
        return (
            <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
                <h2 className='text-2xl font-bold text-gray-900'>
                    Recent Activity
                </h2>

                <p className='mt-2 text-gray-500'>
                    Stay updated with group changes
                </p>

                <div className='mt-8 text-center'>
                    <p className='text-gray-500'>
                        No activity yet
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                    Recent Activity
                </h2>

                <p className='mt-2 text-gray-500'>
                    Stay updated with group changes
                </p>
            </div>

            <div className='mt-6 space-y-4'>
                {activities
                    .slice(0, 5)
                    .map(
                        (
                            activity
                        ) => (
                            <ActivityCard
                                key={
                                    activity._id
                                }
                                activity={
                                    activity
                                }
                            />
                        )
                    )}
            </div>

            {activities.length >
                5 && (
                <p className='mt-6 text-center text-sm text-gray-500'>
                    Showing latest 5
                    activities
                </p>
            )}
        </div>
    )
}