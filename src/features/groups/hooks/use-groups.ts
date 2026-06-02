import { useQuery } from '@tanstack/react-query'

import { GroupRepository } from '@/shared/database/repositories/group.repository'

export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],

        queryFn: async () => {
            const groups =
                await GroupRepository.getAll()

            return groups.map(
                (group) => ({
                    _id: group.id,

                    name: group.name,

                    ownerId:
                        group.ownerId,

                    members: JSON.parse(
                        group.members
                    ) as string[],

                    createdAt:
                        group.createdAt,

                    updatedAt:
                        group.updatedAt,
                })
            )
        },
    })
}

export const useGroup = (
    groupId: string
) => {
    return useQuery({
        queryKey: [
            'group',
            groupId,
        ],

        queryFn: async () => {
            const group =
                await GroupRepository.getById(
                    groupId
                )

            if (!group) {
                return null
            }

            return {
                _id: group.id,

                name: group.name,

                ownerId:
                    group.ownerId,

                members: JSON.parse(
                    group.members
                ) as string[],

                createdAt:
                    group.createdAt,

                updatedAt:
                    group.updatedAt,
            }
        },

        enabled: !!groupId,
    })
}