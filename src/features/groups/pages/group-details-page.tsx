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
import { useJoinGroup } from '@/features/socket/use-join-group'

import { useGroupActivities } from '@/features/activity/hooks/use-group-activities'
import { ActivitySection } from '@/features/activity/components/activity-section'

import { useAuthStore } from '@/features/auth/store/auth.store'

import { usePendingSettlements } from '@/features/expenses/hooks/use-pending-settlements'


export const GroupDetailsPage = () => {
    const { groupId } = useParams()
    useJoinGroup(groupId)

    const currentUser =
        useAuthStore(
            (state) => state.user
        )

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

    const {
        data: pendingSettlements,
    } = usePendingSettlements(
        groupId || ''
    )

    console.log(
        'PENDING SETTLEMENTS',
        pendingSettlements
    )

    const mySettlements =
        settlements?.filter(
            (settlement) =>
                settlement.from ===
                currentUser?.id
        ) ?? []

    const {
        data: activities,
    } = useGroupActivities(
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

                    {mySettlements.length >
                        0 ? (
                        <div className='mt-6 space-y-3'>
                            {mySettlements.map(
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
                    ) : (
                        <p className='mt-6 text-gray-500'>
                            You have no pending
                            settlements.
                        </p>
                    )}
                </div>
                {pendingSettlements &&
                    pendingSettlements.length >
                    0 && (
                        <div className='rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm'>
                            <div>
                                <h2 className='text-2xl font-bold text-amber-900'>
                                    Pending Settlements
                                </h2>

                                <p className='mt-2 text-amber-700'>
                                    These settlements are waiting
                                    to be synchronized.
                                </p>
                            </div>

                            <div className='mt-6 space-y-3'>
                                {pendingSettlements.map(
                                    (
                                        settlement: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={
                                                settlement.requestId ??
                                                index
                                            }
                                            className='flex items-center justify-between rounded-2xl border border-amber-200 bg-white px-5 py-4'
                                        >
                                            <div>
                                                <p className='font-semibold text-gray-900'>
                                                    Settlement
                                                </p>

                                                <p className='mt-1 text-sm text-gray-500'>
                                                    $
                                                    {Number(
                                                        settlement.amount
                                                    ).toFixed(
                                                        2
                                                    )}
                                                </p>
                                            </div>

                                            <span className='rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700'>
                                                ⏳ Pending
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                <ActivitySection
                    activities={
                        activities
                    }
                />
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