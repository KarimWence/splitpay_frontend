export const mapExpenseToEntity = (
    expense: any
) => ({
    id: expense._id,

    groupId:
        expense.groupId,

    paidBy:
        expense.paidBy,

    description:
        expense.description,

    amount:
        expense.amount,

    requestId:
        expense.requestId,

    splits: JSON.stringify(
        expense.splits ?? []
    ),

    createdAt:
        expense.createdAt,

    updatedAt:
        expense.updatedAt,

    deletedAt:
        expense.deletedAt,
})