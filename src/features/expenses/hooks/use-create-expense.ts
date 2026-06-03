import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createExpenseOfflineFirst } from '../services/create-expense.service'

import { ExpenseRepository } from '@/shared/database/repositories/expense.repository'

export const useCreateExpense = (
    groupId: string
) => {
    const queryClient =
        useQueryClient()

    return useMutation({
        mutationFn:
            createExpenseOfflineFirst,

        networkMode:
            'always',

        onSuccess: async () => {

            toast.success(
                'Expense added successfully'
            )

            const expenses =
                await ExpenseRepository.getByGroupId(
                    groupId
                )

            queryClient.setQueryData(
                [
                    'group-expenses',
                    groupId,
                ],
                expenses.map(
                    (expense) => ({
                        _id: expense.id,

                        groupId:
                            expense.groupId,

                        paidBy:
                            expense.paidBy,

                        description:
                            expense.description,

                        amount:
                            expense.amount,

                        splits: JSON.parse(
                            expense.splits ??
                            '[]'
                        ),

                        createdAt:
                            expense.createdAt,

                        updatedAt:
                            expense.updatedAt,
                    })
                )
            )

            queryClient.invalidateQueries({
                queryKey: [
                    'group-balances',
                    groupId,
                ],
            })
        },

        onError: () => {
            toast.error(
                'Could not create expense'
            )
        },
    })
}