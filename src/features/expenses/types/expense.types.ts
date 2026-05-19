export interface Split {
    userId: string
    amount: number
}

export interface Expense {
    _id: string
    groupId: string
    paidBy: string
    description: string
    amount: number
    splits: Split[]
    createdAt: string
    updatedAt: string
}