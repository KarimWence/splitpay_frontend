import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

import { useGroupExpenses } from '@/features/expenses/hooks/use-group-expenses'

import { AddExpenseModal } from '@/features/expenses/components/add-expense-modal'

import { useGroup } from '../hooks/use-groups'

import { AddMemberModal } from '../components/add-member-modal'

export const GroupDetailsPage = () => {
    const { groupId } = useParams()

    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

    const {
        data: expenses,

        isLoading,
    } = useGroupExpenses(
        groupId || ''
    )

    const { data: group } = useGroup(
        groupId || ''
    )

    const [isAddMemberOpen, setIsAddMemberOpen] =
        useState(false)

    return (
        <DashboardLayout>
            <div className='space-y-10'>
                <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-900'>
                            {group?.name || 'Group'}
                        </h1>

                        <p className='mt-2 text-gray-500'>
                            {group?.members.length || 0}{' '}
                            members
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setIsAddExpenseOpen(true)
                        }
                        className='h-12 rounded-2xl bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800'
                    >
                        Add Expense
                    </button>
                </div>

                {group && (
                    <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
                        <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Members
                                </h2>

                                <p className='mt-2 text-gray-500'>
                                    {
                                        group.members
                                            .length
                                    }{' '}
                                    total members
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setIsAddMemberOpen(
                                        true
                                    )
                                }
                                className='h-12 rounded-2xl bg-gray-900 px-6 font-semibold text-white transition hover:bg-black'
                            >
                                Add Member
                            </button>
                        </div>

                        <div className='mt-6 flex flex-wrap gap-3'>
                            {group.members.map(
                                (memberId) => (
                                    <div
                                        key={memberId}
                                        className='rounded-2xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700'
                                    >
                                        {memberId}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className='flex h-[300px] items-center justify-center rounded-3xl border border-gray-200 bg-white'>
                        <p className='text-lg font-medium text-gray-500'>
                            Loading expenses...
                        </p>
                    </div>
                )}

                {!isLoading &&
                    expenses?.length ===
                    0 && (
                        <div className='flex h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center'>
                            <h2 className='text-3xl font-bold text-gray-900'>
                                No expenses yet
                            </h2>

                            <p className='mt-4 max-w-md text-gray-500'>
                                Add your first
                                expense to start
                                tracking balances
                            </p>

                            <button
                                onClick={() =>
                                    setIsAddExpenseOpen(true)
                                }
                                className='mt-8 h-12 rounded-2xl bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800'
                            >
                                Add First Expense
                            </button>
                        </div>
                    )}

                {!isLoading &&
                    expenses &&
                    expenses.length > 0 && (
                        <div className='space-y-5'>
                            {expenses.map(
                                (expense) => (
                                    <div
                                        key={
                                            expense._id
                                        }
                                        className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'
                                    >
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <h2 className='text-2xl font-bold text-gray-900'>
                                                    {
                                                        expense.description
                                                    }
                                                </h2>

                                                <p className='mt-2 text-sm text-gray-500'>
                                                    Paid
                                                    by{' '}
                                                    <span className='font-medium text-gray-700'>
                                                        {
                                                            expense.paidBy
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
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className='flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3'
                                                        >
                                                            <span className='text-sm text-gray-700'>
                                                                {
                                                                    split.userId
                                                                }
                                                            </span>

                                                            <span className='font-semibold text-gray-900'>
                                                                $
                                                                {split.amount.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </div>
            {groupId && (
                <AddExpenseModal
                    isOpen={isAddExpenseOpen}
                    onClose={() =>
                        setIsAddExpenseOpen(false)
                    }
                    groupId={groupId}
                />
            )}
            {groupId && (
                <AddMemberModal
                    isOpen={isAddMemberOpen}
                    onClose={() =>
                        setIsAddMemberOpen(false)
                    }
                    groupId={groupId}
                />
            )}
        </DashboardLayout>
    )
}