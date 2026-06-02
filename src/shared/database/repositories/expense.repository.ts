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

    create: (
        expense: any
    ) =>
        db.expenses.put(
            expense
        ),

    upsertMany: async (
        expenses: any[]
    ) => {
        await db.expenses.bulkPut(
            expenses
        )
    },

    deleteByRequestId: (
        requestId: string
    ) =>
        db.expenses
            .where('requestId')
            .equals(requestId)
            .delete(),

    clear: () =>
        db.expenses.clear(),
}