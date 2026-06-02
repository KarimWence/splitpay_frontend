import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createGroupRequest } from '../api/groups.api'
import { mapGroupToEntity } from '@/features/sync/mappers/group.mappers'
import { GroupRepository } from '@/shared/database/repositories/group.repository'

export const useCreateGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createGroupRequest,

        onSuccess: async (group) => {
            toast.success('Group created')

            await GroupRepository.upsertMany([
                mapGroupToEntity(group),
            ])

            queryClient.invalidateQueries({
                queryKey: ['groups'],
            })
        },

        onError: () => {
            toast.error(
                'Could not create group'
            )
        },
    })
}