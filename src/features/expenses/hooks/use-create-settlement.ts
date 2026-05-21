import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createSettlementRequest } from '../api/expenses.api'

export const useCreateSettlement =
    (groupId: string) => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                createSettlementRequest,

            onSuccess: () => {
                toast.success(
                    'Settlement completed'
                )

                queryClient.invalidateQueries(
                    {
                        queryKey: [
                            'group-balances',
                            groupId,
                        ],
                    }
                )

                queryClient.invalidateQueries(
                    {
                        queryKey: [
                            'settlements',
                            groupId,
                        ],
                    }
                )
            },

            onError: () => {
                toast.error(
                    'Could not settle debt'
                )
            },
        })
    }