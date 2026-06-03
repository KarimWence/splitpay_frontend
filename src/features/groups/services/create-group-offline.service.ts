import { v4 as uuidv4 } from 'uuid'

import { createGroupRequest } from '../api/groups.api'

import { GroupRepository } from '@/shared/database/repositories/group.repository'

import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

import { useAuthStore } from '@/features/auth/store/auth.store'

export const createGroupOfflineFirst =
    async (data: {
        name: string
    }) => {

        const user =
            useAuthStore.getState().user

        const requestId =
            uuidv4()

        if (navigator.onLine) {

            return createGroupRequest(
                data
            )
        }

        const now =
            new Date().toISOString()

        await PendingOperationRepository.add({
            id: requestId,

            type: 'CREATE_GROUP',

            payload:
                JSON.stringify({
                    ...data,
                    requestId,
                }),

            createdAt: now,

            status: 'PENDING',
        })

        await GroupRepository.upsertMany([
            {
                id: requestId,

                name: data.name,

                ownerId:
                    user?.id ?? '',

                members:
                    JSON.stringify([
                        user?.id,
                    ]),

                createdAt:
                    now,

                updatedAt:
                    now,
            },
        ])

        return {
            offline: true,
        }
    }