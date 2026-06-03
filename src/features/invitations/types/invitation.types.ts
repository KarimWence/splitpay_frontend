export interface Invitation {
    _id: string

    requestId: string

    groupId: string

    invitedBy: string

    invitedUserId: string

    status:
    | 'pending'
    | 'accepted'
    | 'rejected'
    | 'expired'

    expiresAt: string

    createdAt: string

    updatedAt: string
}