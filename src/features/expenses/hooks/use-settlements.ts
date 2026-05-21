import { useQuery } from '@tanstack/react-query'

import { getSettlementsRequest } from '../api/expenses.api'

export const useSettlements = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'settlements',
            groupId,
        ],

        queryFn: () =>
            getSettlementsRequest(
                groupId
            ),

        enabled: !!groupId,
    })
}