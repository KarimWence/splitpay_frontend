import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createExpenseOfflineFirst } from '../services/create-expense.service'

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

            await queryClient.refetchQueries({
                queryKey: [
                    'group-expenses',
                    groupId,
                ],
            })

            await queryClient.refetchQueries({
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