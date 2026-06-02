import Dexie, {
    type Table,
} from 'dexie'

export interface GroupEntity {
    id: string

    name: string

    ownerId: string

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

export interface SyncStateEntity {
    key: string

    value: string
}

export class SplitPayDatabase extends Dexie {
    groups!: Table<GroupEntity>

    expenses!: Table<ExpenseEntity>

    settlements!: Table<SettlementEntity>

    syncState!: Table<SyncStateEntity>

    constructor() {
        super('splitpay-db')

        this.version(1).stores({
            groups:
                'id,name,ownerId',

            expenses:
                'id,groupId,paidBy',

            settlements:
                'id,groupId',

            syncState:
                'key',
        })
    }
}

export const db =
    new SplitPayDatabase()