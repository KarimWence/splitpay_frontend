export const mapNotificationToEntity = (
    notification: any
) => ({
    id: notification._id,

    userId:
        notification.userId,

    type:
        notification.type,

    title:
        notification.title,

    message:
        notification.message,

    read:
        notification.read
            ? 1
            : 0,

    metadata: JSON.stringify(
        notification.metadata ??
        {}
    ),

    createdAt:
        notification.createdAt,

    updatedAt:
        notification.updatedAt,

    deletedAt:
        notification.deletedAt,
})