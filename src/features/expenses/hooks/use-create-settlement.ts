import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createSettlementOfflineFirst } from '../services/create-settlement-offline.service'

export const useCreateSettlement =
    (groupId: string) => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                createSettlementOfflineFirst,

            networkMode: 'always',
            onSuccess: (
                result: any
            ) => {

                if (
                    result?.offline
                ) {

                    toast.success(
                        'Settlement saved offline'
                    )

                    return
                }
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

                toast.success(
                    'Settlement completed'
                )
            },

            onError: (error: any) => {

                toast.error(
                    'Could not settle debt'
                )
            },
        })
    }