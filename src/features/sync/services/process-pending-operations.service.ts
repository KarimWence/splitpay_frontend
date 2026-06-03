import { createExpenseRequest } from '@/features/expenses/api/expenses.api'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

import { createSettlementRequest } from '@/features/expenses/api/expenses.api'
import { createGroupRequest } from '@/features/groups/api/groups.api'
import { GroupRepository } from '@/shared/database/repositories/group.repository'
import { mapGroupToEntity } from '../mappers/group.mappers'
let isProcessing = false
export const processPendingOperations =
    async () => {

        if (isProcessing) {
            console.log(
                'SYNC ALREADY RUNNING'
            )

            return 0
        }

        isProcessing = true

        try {
            const operations =
                await PendingOperationRepository.getPending()


            let processed = 0


            for (const operation of operations) {

                try {
                    // mark as processing to reduce duplicate concurrent work
                    await PendingOperationRepository.updateStatus(
                        operation.id,
                        'PROCESSING'
                    )
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

                        case 'CREATE_GROUP': {

                            const payload =
                                JSON.parse(
                                    operation.payload
                                )

                            const createdGroup = await createGroupRequest(
                                payload
                            )

                            // remove local temporary group created with requestId
                            if (payload.requestId) {
                                await GroupRepository.deleteById(
                                    payload.requestId
                                )
                            }

                            // upsert the server-created group into local DB
                            if (createdGroup) {
                                await GroupRepository.upsertMany([
                                    mapGroupToEntity(createdGroup),
                                ])
                            }

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

                    // revert status to pending so it can be retried
                    try {
                        await PendingOperationRepository.updateStatus(
                            operation.id,
                            'PENDING'
                        )
                    } catch (e) {
                        // ignore
                    }

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
        finally {
            isProcessing = false
        }
    }