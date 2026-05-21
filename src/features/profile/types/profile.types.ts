export interface Profile {
    _id: string

    userId: string

    avatar: string

    bio: string

    phone: string

    address: string

    createdAt: string

    updatedAt: string
}

export interface UpdateProfileDto {
    avatar: string

    bio: string

    phone: string

    address: string
}