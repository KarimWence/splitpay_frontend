export const mapGroupToEntity = (
    group: any
) => ({
    id: group._id,

    name: group.name,

    ownerId: group.ownerId,

    members: JSON.stringify(
        group.members ?? []
    ),

    createdAt:
        group.createdAt,

    updatedAt:
        group.updatedAt,

    deletedAt:
        group.deletedAt,
})