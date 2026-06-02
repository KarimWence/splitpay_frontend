import { db } from '../db'

export const NotificationRepository =
    {
        getAll: () =>
            db.notifications.toArray(),

        upsertMany: async (
            notifications: any[]
        ) => {
            await db.notifications.bulkPut(
                notifications
            )
        },
    }