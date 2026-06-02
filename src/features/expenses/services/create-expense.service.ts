import { v4 as uuidv4 } from 'uuid'

import { createExpenseRequest } from '../api/expenses.api'

import { ExpenseRepository } from '@/shared/database/repositories/expense.repository'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

import { useAuthStore } from '@/features/auth/store/auth.store'

export const createExpenseOfflineFirst =
    async (data: {
        groupId: string
        description: string
        amount: number
    }) => {

        const user =
            useAuthStore.getState().user

        const requestId =
            uuidv4()

        if (
            navigator.onLine
        ) {
            await createExpenseRequest({
                ...data,
                requestId,
            })

            return
        }

        const now =
            new Date().toISOString()

        await PendingOperationRepository.add(
            {
                id: requestId,

                type: 'CREATE_EXPENSE',

                payload:
                    JSON.stringify({
                        ...data,
                        requestId,
                    }),

                createdAt:
                    now,

                status:
                    'PENDING',
            }
        )

        await ExpenseRepository.create(
            {
                id: requestId,

                groupId:
                    data.groupId,

                paidBy:
                    user?.id ?? '',

                description:
                    data.description,

                amount:
                    data.amount,

                requestId,

                splits:
                    JSON.stringify(
                        []
                    ),

                createdAt:
                    now,

                updatedAt:
                    now,
            }
        )
    }