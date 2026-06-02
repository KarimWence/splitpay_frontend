import { GroupRepository } from '@/shared/database/repositories/group.repository'

import { SyncStateRepository } from '@/shared/database/repositories/sync-state.repository'

export const saveBootstrapData =
    async (
        data: any
    ) => {
        await GroupRepository.upsertMany(
            data.groups
        )

        await SyncStateRepository.setLastSync(
            data.serverTime
        )
    }