import { createExpenseRequest } from '@/features/expenses/api/expenses.api'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

export const processPendingOperations =
    async () => {
        const operations =
            await PendingOperationRepository.getPending()

        for (const operation of operations) {

            try {
                switch (
                operation.type
                ) {
                    case 'CREATE_EXPENSE': {
                        const payload =
                            JSON.parse(
                                operation.payload
                            )

                        await createExpenseRequest(
                            payload
                        )

                        await PendingOperationRepository.remove(
                            operation.id
                        )

                        break
                    }
                }
            } catch (error: any) {
                console.error(
                    'FAILED RESPONSE',
                    error?.response?.data
                )

                console.error(
                    'FAILED STATUS',
                    error?.response?.status
                )

                console.error(error)
            }
        }
    }