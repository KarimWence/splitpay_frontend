export interface Activity {
    _id: string

    groupId: string

    userId: string

    type: string

    message: string

    metadata: Record<
        string,
        any
    >

    createdAt: string

    updatedAt: string

    deletedAt: string | null
}