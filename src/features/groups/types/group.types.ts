export interface Group {
    _id: string

    name: string

    ownerId: string

    members: string[]

    createdAt?: string

    updatedAt?: string
}

export interface CreateGroupDto {
    name: string
}