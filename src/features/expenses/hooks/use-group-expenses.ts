import { useQuery } from '@tanstack/react-query'

import { getGroupExpensesRequest } from '../api/expenses.api'

export const useGroupExpenses = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'group-expenses',
            groupId,
        ],

        queryFn: () =>
            getGroupExpensesRequest(
                groupId
            ),

        enabled: !!groupId,
    })
}