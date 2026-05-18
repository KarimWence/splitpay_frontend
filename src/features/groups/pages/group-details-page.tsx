import { useParams } from 'react-router-dom'

import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

export const GroupDetailsPage = () => {
    const { groupId } = useParams()

    return (
        <DashboardLayout>
            <div className='space-y-8'>
                <div>
                    <h1 className='text-4xl font-bold text-gray-900'>
                        Group Details
                    </h1>

                    <p className='mt-2 text-gray-500'>
                        Group ID: {groupId}
                    </p>
                </div>
            </div>
        </DashboardLayout>
    )
}