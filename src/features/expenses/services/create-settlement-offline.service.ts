import { v4 as uuidv4 } from 'uuid'

import { createSettlementRequest } from '../api/expenses.api'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

interface CreateSettlementDto {
    groupId: string
    toUserId: string
    amount: number
}

export const createSettlementOfflineFirst =
    async (
        data: CreateSettlementDto
    ) => {

        const requestId =
            uuidv4()

        if (
            navigator.onLine
        ) {

            await createSettlementRequest(
                {
                    ...data,
                    requestId,
                }
            )

            return
        }

        const now =
            new Date().toISOString()

        await PendingOperationRepository.add(
            {
                id: requestId,

                type:
                    'CREATE_SETTLEMENT',

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

        return {
            offline: true,
        }
    }