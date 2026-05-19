import { api } from '@/shared/services/api'

import type { Expense } from '../types/expense.types'

export const getGroupExpensesRequest =
    async (
        groupId: string
    ): Promise<Expense[]> => {
        const response = await api.get(
            `/expenses/groups/${groupId}/expenses`
        )

        return response.data
    }