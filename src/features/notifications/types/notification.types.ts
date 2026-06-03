export interface Notification {
    _id: string

    userId: string

    type: string

    title: string

    message: string

    read: boolean

    metadata: Record<
        string,
        unknown
    >

    createdAt: string

    updatedAt: string

    deletedAt: string | null
}