import { useQuery } from '@tanstack/react-query'

import { db } from '@/shared/database/db'

export const usePendingSettlements = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'pending-settlements',
            groupId,
        ],

        networkMode: 'always',

        queryFn: async () => {

            const operations =
                await db.pendingOperations
                    .toArray()

            console.log(
                'ALL OPERATIONS',
                operations
            )

            return operations
                .filter(
                    (operation) =>
                        operation.type ===
                        'CREATE_SETTLEMENT'
                )
                .map((operation) =>
                    JSON.parse(
                        operation.payload
                    )
                )
                .filter(
                    (settlement) =>
                        settlement.groupId ===
                        groupId
                )
        },

        enabled: !!groupId,

        refetchInterval: 1000,
    })
}