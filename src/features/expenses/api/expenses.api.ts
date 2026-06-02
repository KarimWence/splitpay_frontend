import { api } from '@/shared/services/api'

import type { Expense } from '../types/expense.types'

import type { Balance } from '../types/balance.types'

import type { SuggestedSettlement } from '../types/settlement.types'

import { v4 as uuidv4 } from 'uuid'

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

    requestId?: string
}

export const createExpenseRequest =
    async (
        data: CreateExpenseDto
    ): Promise<void> => {
        try {
            const response =
                await api.post(
                    '/expenses/expense',
                    {
                        ...data,
                        requestId:
                            data.requestId ??
                            uuidv4(),
                    },
                    {
                        timeout: 5000,
                    }
                )
        } catch (error) {
            throw error
        }
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

export const getSettlementsRequest =
    async (
        groupId: string
    ): Promise<
        SuggestedSettlement[]
    > => {
        const response = await api.get(
            `/expenses/groups/${groupId}/settlements`
        )

        return response.data
    }

interface CreateSettlementDto {
    groupId: string

    toUserId: string

    amount: number
}

export const createSettlementRequest =
    async (
        data: CreateSettlementDto
    ) => {
        const response = await api.post(
            '/expenses/settlements',
            data
        )

        return response.data
    }