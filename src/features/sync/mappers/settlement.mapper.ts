export const mapSettlementToEntity = (
    settlement: any
) => ({
    id: settlement._id,

    groupId:
        settlement.groupId,

    fromUserId:
        settlement.fromUserId,

    toUserId:
        settlement.toUserId,

    amount:
        settlement.amount,

    createdAt:
        settlement.createdAt,

    updatedAt:
        settlement.updatedAt,

    deletedAt:
        settlement.deletedAt,
})