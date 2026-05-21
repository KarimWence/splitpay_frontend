import { useUser } from '@/features/auth/hooks/use-user'

import type { Expense } from '../types/expense.types'

interface Props {
    expense: Expense
}

export const ExpenseCard = ({
    expense,
}: Props) => {
    const { data: paidByUser } =
        useUser(expense.paidBy)

    return (
        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='flex items-start justify-between gap-4'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-900'>
                        {
                            expense.description
                        }
                    </h2>

                    <p className='mt-2 text-sm text-gray-500'>
                        Paid by{' '}
                        <span className='font-medium text-gray-700'>
                            {
                                paidByUser?.name
                            }{' '}
                            {
                                paidByUser?.lastName
                            }
                        </span>
                    </p>
                </div>

                <div className='text-right'>
                    <p className='text-sm text-gray-400'>
                        Total
                    </p>

                    <p className='mt-1 text-2xl font-bold text-gray-900'>
                        $
                        {expense.amount.toFixed(
                            2
                        )}
                    </p>
                </div>
            </div>

            <div className='mt-6 border-t border-gray-100 pt-4'>
                <p className='text-sm font-medium text-gray-700'>
                    Splits
                </p>

                <div className='mt-3 space-y-2'>
                    {expense.splits.map(
                        (
                            split,
                            index
                        ) => (
                            <SplitItem
                                key={index}
                                userId={
                                    split.userId
                                }
                                amount={
                                    split.amount
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

interface SplitItemProps {
    userId: string

    amount: number
}

const SplitItem = ({
    userId,

    amount,
}: SplitItemProps) => {
    const { data: user } =
        useUser(userId)

    return (
        <div className='flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3'>
            <span className='text-sm text-gray-700'>
                {user?.name}{' '}
                {user?.lastName}
            </span>

            <span className='font-semibold text-gray-900'>
                $
                {amount.toFixed(2)}
            </span>
        </div>
    )
}