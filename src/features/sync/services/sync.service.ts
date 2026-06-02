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

export const saveBootstrapData =
    async (
        data: any
    ) => {
        console.log(
            'BOOTSTRAP DATA',
            data
        )

        console.log(
            'GROUPS',
            data.groups
        )

        console.log(
            'EXPENSES',
            data.expenses
        )

        console.log(
            'ACTIVITIES',
            data.activities
        )

        console.log(
            'SETTLEMENTS',
            data.settlements
        )

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