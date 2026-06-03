import Dexie, {
    type Table,
} from 'dexie'

export interface GroupEntity {
    id: string

    name: string

    ownerId: string

    members: string

    createdAt: string

    updatedAt: string

    deletedAt?: string | null
}

export interface ExpenseEntity {
    id: string

    groupId: string

    paidBy: string

    description: string

    amount: number

    requestId?: string

    splits?: string

    createdAt: string

    updatedAt: string

    deletedAt?: string | null
}

export interface SettlementEntity {
    id: string

    groupId: string

    fromUserId: string

    toUserId: string

    amount: number

    createdAt: string

    updatedAt: string

    deletedAt?: string | null
}

export interface ActivityEntity {
    id: string

    groupId: string

    userId: string

    type: string

    message: string

    metadata?: string

    createdAt: string

    updatedAt: string

    deletedAt?: string | null
}

export interface NotificationEntity {
    id: string

    userId: string

    type: string

    title: string

    message: string

    read: number

    metadata?: string

    createdAt: string

    updatedAt: string

    deletedAt?: string | null
}

export interface InvitationEntity {
    id: string

    groupId: string

    invitedBy: string

    invitedUserId: string

    status: string

    expiresAt: string

    createdAt: string

    updatedAt: string
}

export interface PendingOperationEntity {
    id: string

    type: string

    payload: string

    createdAt: string

    status: string
}

export interface SyncStateEntity {
    key: string

    value: string
}

export class SplitPayDatabase extends Dexie {
    groups!: Table<GroupEntity>

    expenses!: Table<ExpenseEntity>

    settlements!: Table<SettlementEntity>

    activities!: Table<ActivityEntity>

    notifications!: Table<NotificationEntity>

    invitations!: Table<InvitationEntity>

    pendingOperations!: Table<PendingOperationEntity>

    syncState!: Table<SyncStateEntity>

    constructor() {
        super('splitpay-db')

        this.version(1).stores({
            groups:
                'id,name,ownerId',

            expenses:
                'id,groupId,paidBy,requestId',

            settlements:
                'id,groupId,fromUserId,toUserId',

            activities:
                'id,groupId,userId,type',

            notifications:
                'id,userId,read',

            invitations:
                'id,groupId,invitedUserId,status',

            pendingOperations:
                'id,type,status',

            syncState:
                'key',
        })
    }
}

export const db =
    new SplitPayDatabase()