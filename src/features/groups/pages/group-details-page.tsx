import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

import { useGroupExpenses } from '@/features/expenses/hooks/use-group-expenses'

import { AddExpenseModal } from '@/features/expenses/components/add-expense-modal'

import { useGroup } from '../hooks/use-groups'

import { AddMemberModal } from '../components/add-member-modal'

import { useGroupBalances } from '@/features/expenses/hooks/use-group-expenses'

import { MemberItem } from '../components/member.item'

import { BalanceItem } from '../components/balance-item'

import { useSettlements } from '@/features/expenses/hooks/use-settlements'

import { SettlementItem } from '@/features/expenses/components/settlement-item'

import { ExpenseCard } from '@/features/expenses/components/expense-card'

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

    const { data: balances } =
        useGroupBalances(
            groupId || ''
        )

    const {
        data: settlements,
    } = useSettlements(
        groupId || ''
    )
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
                                    <MemberItem
                                        key={memberId}
                                        userId={memberId}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}

                {balances && (
                    <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Balances
                                </h2>

                                <p className='mt-2 text-gray-500'>
                                    Current group balances
                                </p>
                            </div>
                        </div>

                        <div className='mt-6 space-y-3'>
                            {Object.entries(
                                balances
                            ).map(
                                ([
                                    userId,
                                    balance,
                                ]) => (
                                    <BalanceItem
                                        key={userId}
                                        userId={userId}
                                        balance={balance}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}

                {settlements &&
                    settlements.length >
                    0 && (
                        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    Suggested
                                    Settlements
                                </h2>

                                <p className='mt-2 text-gray-500'>
                                    Simplified debt
                                    resolution
                                </p>
                            </div>

                            <div className='mt-6 space-y-3'>
                                {settlements.map(
                                    (
                                        settlement,
                                        index
                                    ) => (
                                        <SettlementItem
                                            key={
                                                index
                                            }
                                            groupId={
                                                groupId ||
                                                ''
                                            }
                                            from={
                                                settlement.from
                                            }
                                            to={
                                                settlement.to
                                            }
                                            amount={
                                                settlement.amount
                                            }
                                        />
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
                                    <ExpenseCard
                                        key={expense._id}
                                        expense={expense}
                                    />
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