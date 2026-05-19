import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createExpenseRequest } from '../api/expenses.api'

export const useCreateExpense = (
    groupId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createExpenseRequest,

        onSuccess: () => {
            toast.success(
                'Expense added successfully'
            )

            queryClient.invalidateQueries({
                queryKey: [
                    'group-expenses',
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