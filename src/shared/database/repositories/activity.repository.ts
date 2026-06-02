import { db } from '../db'

export const ActivityRepository = {
    getAll: () =>
        db.activities.toArray(),

    upsertMany: async (
        activities: any[]
    ) => {
        await db.activities.bulkPut(
            activities
        )
    },
}