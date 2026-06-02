import { db } from '../db'

export const ExpenseRepository = {
    getAll: () =>
        db.expenses.toArray(),

    getByGroupId: (
        groupId: string
    ) =>
        db.expenses
            .where('groupId')
            .equals(groupId)
            .toArray(),

    upsertMany: async (
        expenses: any[]
    ) => {
        await db.expenses.bulkPut(
            expenses
        )
    },

    clear: () =>
        db.expenses.clear(),
}