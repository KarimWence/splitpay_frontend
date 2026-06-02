import { db } from '../db'

export const GroupRepository = {
    getAll: () =>
        db.groups.toArray(),

    getById: (
        id: string
    ) =>
        db.groups.get(id),

    upsertMany: async (
        groups: any[]
    ) => {
        await db.groups.bulkPut(
            groups
        )
    },

    clear: () =>
        db.groups.clear(),
}