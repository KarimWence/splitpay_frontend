import { useUser } from '@/features/auth/hooks/use-user'

import { useCreateSettlement } from '../hooks/use-create-settlement'

interface Props {
    groupId: string

    from: string

    to: string

    amount: number
}

export const SettlementItem = ({
    groupId,

    from,

    to,

    amount,
}: Props) => {
    const { data: fromUser } =
        useUser(from)

    const { data: toUser } =
        useUser(to)

    const createSettlementMutation =
        useCreateSettlement(groupId)

    const handleSettle = () => {
        createSettlementMutation.mutate(
            {
                groupId,

                toUserId: to,

                amount,
            }
        )
    }

    return (
        <div className='flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4'>
            <div>
                <p className='font-semibold text-gray-900'>
                    {
                        fromUser?.name
                    }{' '}
                    {
                        fromUser?.lastName
                    }
                </p>

                <p className='mt-1 text-sm text-gray-500'>
                    pays{' '}
                    {
                        toUser?.name
                    }{' '}
                    {
                        toUser?.lastName
                    }
                </p>
            </div>

            <div className='flex items-center gap-4'>
                <p className='text-lg font-bold text-gray-900'>
                    $
                    {amount.toFixed(
                        2
                    )}
                </p>

                <button
                    onClick={
                        handleSettle
                    }
                    disabled={
                        createSettlementMutation.isPending
                    }
                    className='rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                >
                    Settle Up
                </button>
            </div>
        </div>
    )
}