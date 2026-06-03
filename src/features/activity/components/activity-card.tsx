import {
    Receipt,
} from 'lucide-react'

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

    const activityTitles: Record<
        string,
        string
    > = {
        expense_created:
            'Expense Created',

        member_joined:
            'Member Joined',

        settlement_created:
            'Settlement Created',

        invitation_accepted:
            'Invitation Accepted',

        invitation_rejected:
            'Invitation Rejected',
    }
    return (
        <div className='flex items-start gap-4 rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700'>
                <Receipt
                    size={20}
                />
            </div>

            <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-4'>
                    <p className='font-semibold text-gray-900'>
                        {activityTitles[activity.type] ||
                            'Activity'}
                    </p>

                    <p className='text-xs text-gray-400'>
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

                <p className='mt-1 text-gray-600'>
                    {
                        activity.message
                    }
                </p>

                {activity.metadata?.amount && (
                    <p className='mt-2 text-sm font-semibold text-blue-700'>
                        Amount: ${activity.metadata.amount}
                    </p>
                )}
            </div>
        </div>
    )
}