import { createExpenseRequest } from '@/features/expenses/api/expenses.api'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

import { createSettlementRequest } from '@/features/expenses/api/expenses.api'

export const processPendingOperations =
    async () => {
        const operations =
            await PendingOperationRepository.getPending()

        let processed = 0

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


                        processed++
                        break
                    }
                    case 'CREATE_SETTLEMENT': {

                        const payload =
                            JSON.parse(
                                operation.payload
                            )

                        await createSettlementRequest(
                            payload
                        )

                        await PendingOperationRepository.remove(
                            operation.id
                        )

                        processed++

                        break
                    }
                }
            } catch (error: any) {

                const errorMessage =
                    error?.response?.data?.error

                if (
                    typeof errorMessage ===
                    'string' &&
                    errorMessage.includes(
                        'duplicate key'
                    )
                ) {
                    await PendingOperationRepository.remove(
                        operation.id
                    )

                    processed++

                    continue
                }

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
        return processed
    }