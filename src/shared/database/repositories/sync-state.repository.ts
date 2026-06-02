import { db } from '../db'

export const SyncStateRepository =
    {
        async getLastSync() {
            const state =
                await db.syncState.get(
                    'lastSync'
                )

            return (
                state?.value ??
                null
            )
        },

        async setLastSync(
            value: string
        ) {
            await db.syncState.put(
                {
                    key: 'lastSync',

                    value,
                }
            )
        },
    }