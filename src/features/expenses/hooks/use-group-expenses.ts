import { useQuery } from '@tanstack/react-query'

import { getGroupExpensesRequest } from '../api/expenses.api'

import { getGroupBalancesRequest } from '../api/expenses.api'

import { ExpenseRepository } from '@/shared/database/repositories/expense.repository'

export const useGroupExpenses = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'group-expenses',
            groupId,
        ],

        queryFn: async () => {
            const expenses =
                await ExpenseRepository.getByGroupId(
                    groupId
                )

            return expenses.map(
                (expense) => ({
                    _id:
                        expense.id,

                    groupId:
                        expense.groupId,

                    paidBy:
                        expense.paidBy,

                    description:
                        expense.description,

                    amount:
                        expense.amount,

                    splits:
                        JSON.parse(
                            expense.splits ??
                                '[]'
                        ),

                    createdAt:
                        expense.createdAt,

                    updatedAt:
                        expense.updatedAt,
                })
            )
        },

        enabled: !!groupId,
    })
}

export const useGroupBalances = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'group-balances',
            groupId,
        ],

        queryFn: () =>
            getGroupBalancesRequest(
                groupId
            ),

        enabled: !!groupId,
    })
}