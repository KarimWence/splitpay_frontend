import { useUser } from '@/features/auth/hooks/use-user'

interface Props {
    userId: string

    balance: number
}

export const BalanceItem = ({
    userId,

    balance,
}: Props) => {
    const { data: user } =
        useUser(userId)

    return (
        <div className='flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4'>
            <div>
                <p className='font-medium text-gray-900'>
                    {user
                        ? `${user.name} ${user.lastName}`
                        : 'Loading...'}
                </p>

                <p className='mt-1 text-sm text-gray-500'>
                    {balance > 0
                        ? 'Gets back'
                        : balance < 0
                          ? 'Owes'
                          : 'Settled'}
                </p>
            </div>

            <p
                className={`text-xl font-bold ${
                    balance > 0
                        ? 'text-green-600'
                        : balance < 0
                          ? 'text-red-600'
                          : 'text-gray-500'
                }`}
            >
                $
                {Math.abs(balance).toFixed(
                    2
                )}
            </p>
        </div>
    )
}