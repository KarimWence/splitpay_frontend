import { createExpenseRequest } from '@/features/expenses/api/expenses.api'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

export const processPendingOperations =
    async () => {
        const operations =
            await PendingOperationRepository.getPending()

        console.log(
            'PENDING OPS',
            operations.length
        )

        for (const operation of operations) {
            console.log(
                'PROCESSING',
                operation.id
            )

            try {
                switch (
                operation.type
                ) {
                    case 'CREATE_EXPENSE': {
                        const payload =
                            JSON.parse(
                                operation.payload
                            )

                        console.log(
                            'SENDING',
                            payload
                        )

                        console.log(
                            'BEFORE CREATE EXPENSE REQUEST'
                        )

                        await createExpenseRequest(
                            payload
                        )

                        console.log(
                            'AFTER CREATE EXPENSE REQUEST'
                        )

                        console.log(
                            'SENT'
                        )

                        await PendingOperationRepository.remove(
                            operation.id
                        )

                        console.log(
                            'REMOVED',
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