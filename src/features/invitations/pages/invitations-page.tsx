import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'



import { useAcceptInvitation } from '../hooks/use-accept-invitation'

import { useRejectInvitation } from '../hooks/use-reject-invitation'
import { useEnrichedInvitations } from '../hooks/use-enriched-invitations'

export const InvitationsPage = () => {
    const {
        data,
        isLoading,
    } = useEnrichedInvitations()

    console.log(data);

    const acceptMutation =
        useAcceptInvitation()

    const rejectMutation =
        useRejectInvitation()

    return (
        <DashboardLayout>
            <div className='space-y-10'>
                <div>
                    <h1 className='text-4xl font-bold text-gray-900'>
                        Invitations
                    </h1>

                    <p className='mt-2 text-gray-500'>
                        Groups that have invited
                        you to join.
                    </p>
                </div>

                {isLoading && (
                    <div className='flex h-[300px] items-center justify-center rounded-3xl border border-gray-200 bg-white'>
                        <p className='text-lg font-medium text-gray-500'>
                            Loading invitations...
                        </p>
                    </div>
                )}

                {!isLoading &&
                    data?.length === 0 && (
                        <div className='flex h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center'>
                            <h2 className='text-3xl font-bold text-gray-900'>
                                No invitations
                            </h2>

                            <p className='mt-4 max-w-md text-gray-500'>
                                You don't have any
                                pending invitations
                                right now.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    data &&
                    data.length > 0 && (
                        <div className='space-y-5'>
                            {data.map(
                                (
                                    invitation
                                ) => (
                                    <div
                                        key={
                                            invitation._id
                                        }
                                        className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg'
                                    >
                                        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                                            <div>
                                                <h2 className='text-2xl font-bold text-gray-900'>
                                                    {
                                                        invitation.groupName
                                                    }
                                                </h2>

                                                <p className='mt-2 text-gray-500'>
                                                    Invited
                                                    by{' '}
                                                    {
                                                        invitation.invitedByName
                                                    }
                                                </p>
                                            </div>

                                            <div className='flex gap-3'>
                                                <button
                                                    onClick={() =>
                                                        acceptMutation.mutate(
                                                            invitation._id
                                                        )
                                                    }
                                                    className='rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800'
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        rejectMutation.mutate(
                                                            invitation._id
                                                        )
                                                    }
                                                    className='rounded-2xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100'
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </div>
        </DashboardLayout>
    )
}