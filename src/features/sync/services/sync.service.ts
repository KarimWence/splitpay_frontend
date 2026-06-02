import { GroupRepository } from '@/shared/database/repositories/group.repository'

import { ExpenseRepository } from '@/shared/database/repositories/expense.repository'

import { SettlementRepository } from '@/shared/database/repositories/settlement.repository'

import { ActivityRepository } from '@/shared/database/repositories/activity.repository'

import { NotificationRepository } from '@/shared/database/repositories/notification.repository'

import { InvitationRepository } from '@/shared/database/repositories/invitation.repository'

import { SyncStateRepository } from '@/shared/database/repositories/sync-state.repository'

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

        await GroupRepository.upsertMany(
            data.groups.map(
                (group: any) => ({
                    id: group._id,

                    name: group.name,

                    ownerId:
                        group.ownerId,

                    createdAt:
                        group.createdAt,

                    updatedAt:
                        group.updatedAt,

                    deletedAt:
                        group.deletedAt,
                })
            )
        )

        await ExpenseRepository.upsertMany(
            data.expenses
        )

        await SettlementRepository.upsertMany(
            data.settlements
        )

        await ActivityRepository.upsertMany(
            data.activities
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