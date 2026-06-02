export const mapGroupToEntity = (
    group: any
) => ({
    id: group._id,

    name: group.name,

    ownerId: group.ownerId,

    createdAt:
        group.createdAt,

    updatedAt:
        group.updatedAt,

    deletedAt:
        group.deletedAt,
})