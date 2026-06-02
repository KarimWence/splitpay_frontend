export const mapActivityToEntity = (
    activity: any
) => ({
    id: activity._id,

    groupId:
        activity.groupId,

    userId:
        activity.userId,

    type:
        activity.type,

    message:
        activity.message,

    metadata: JSON.stringify(
        activity.metadata ?? {}
    ),

    createdAt:
        activity.createdAt,

    updatedAt:
        activity.updatedAt,

    deletedAt:
        activity.deletedAt,
})