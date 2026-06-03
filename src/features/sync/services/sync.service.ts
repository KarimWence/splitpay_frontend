import { GroupRepository } from '@/shared/database/repositories/group.repository'

import { ExpenseRepository } from '@/shared/database/repositories/expense.repository'

import { SettlementRepository } from '@/shared/database/repositories/settlement.repository'

import { ActivityRepository } from '@/shared/database/repositories/activity.repository'

import { NotificationRepository } from '@/shared/database/repositories/notification.repository'

import { InvitationRepository } from '@/shared/database/repositories/invitation.repository'

import { SyncStateRepository } from '@/shared/database/repositories/sync-state.repository'

import { mapGroupToEntity } from '../mappers/group.mappers'

import { mapExpenseToEntity } from '../mappers/expense.mapper'

import { mapActivityToEntity } from '../mappers/activity.mapper'

import { changesRequest } from '../api/sync.api'

import { processPendingOperations } from './process-pending-operations.service'

export const saveBootstrapData =
    async (
        data: any
    ) => {

        await GroupRepository.upsertMany(
            data.groups.map(
                mapGroupToEntity
            )
        )

        await ExpenseRepository.upsertMany(
            data.expenses.map(
                mapExpenseToEntity
            )
        )

        await SettlementRepository.upsertMany(
            data.settlements
        )

        await ActivityRepository.upsertMany(
            data.activities.map(
                mapActivityToEntity
            )
        )

        await NotificationRepository.upsertMany(
            data.notifications
        )

        await InvitationRepository.upsertMany(
            data.invitations
        )

        await SyncStateRepository.setLastSync(
            data.serverTime
        )
    }

const applyChanges = async (
    data: any
) => {
    if (
        data.groups?.length
    ) {
        await GroupRepository.upsertMany(
            data.groups.map(
                mapGroupToEntity
            )
        )
    }

    if (data.expenses?.length) {

        for (const expense of data.expenses) {

            if (expense.requestId) {

                await ExpenseRepository.deleteByRequestId(
                    expense.requestId
                )
            }
        }

        await ExpenseRepository.upsertMany(
            data.expenses.map(
                mapExpenseToEntity
            )
        )
    }

    if (
        data.activities?.length
    ) {
        await ActivityRepository.upsertMany(
            data.activities.map(
                mapActivityToEntity
            )
        )
    }
}

export const syncChanges =
    async () => {

        const processed =
            await processPendingOperations()

        const lastSync =
            await SyncStateRepository.getLastSync()

        if (!lastSync) {
            return
        }

        const changes =
            await changesRequest(
                lastSync
            )

        await applyChanges(
            changes
        )

        await SyncStateRepository.setLastSync(
            changes.serverTime
        )

        return processed
    }