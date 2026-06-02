import { db } from '../db'

export const SettlementRepository = {
    getAll: () =>
        db.settlements.toArray(),

    getByGroupId: (
        groupId: string
    ) =>
        db.settlements
            .where('groupId')
            .equals(groupId)
            .toArray(),

    upsertMany: async (
        settlements: any[]
    ) => {
        await db.settlements.bulkPut(
            settlements
        )
    },

    clear: () =>
        db.settlements.clear(),
}