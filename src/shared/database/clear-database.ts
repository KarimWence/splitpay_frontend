import { db } from './db'

export const clearDatabase =
    async () => {
        await db.groups.clear()

        await db.expenses.clear()

        await db.settlements.clear()

        await db.activities.clear()

        await db.notifications.clear()

        await db.invitations.clear()

        await db.pendingOperations.clear()

        await db.syncState.clear()
    }