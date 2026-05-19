import { api } from '@/shared/services/api'

import type { Expense } from '../types/expense.types'

import type { Balance } from '../types/balance.types'

export const getGroupExpensesRequest =
    async (
        groupId: string
    ): Promise<Expense[]> => {
        const response = await api.get(
            `/expenses/groups/${groupId}/expenses`
        )

        return response.data
    }

interface CreateExpenseDto {
    groupId: string

    description: string

    amount: number
}

export const createExpenseRequest =
    async (
        data: CreateExpenseDto
    ): Promise<void> => {
        await api.post(
            '/expenses/expense',
            data
        )
    }

export const getGroupBalancesRequest =
    async (
        groupId: string
    ): Promise<
        Record<string, number>
    > => {
        const response = await api.get(
            `/expenses/groups/${groupId}/balances`
        )

        return response.data
    }