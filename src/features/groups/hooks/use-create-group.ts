import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'


import { mapGroupToEntity } from '@/features/sync/mappers/group.mappers'
import { GroupRepository } from '@/shared/database/repositories/group.repository'
import { createGroupOfflineFirst } from '../services/create-group-offline.service'

export const useCreateGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createGroupOfflineFirst,

        networkMode: 'always',

        onSuccess: async (group) => {

            if (
                group?.offline
            ) {

                toast.success(
                    'Group saved offline'
                )

                queryClient.invalidateQueries({
                    queryKey: ['groups'],
                })

                return
            }

            await GroupRepository.upsertMany([
                mapGroupToEntity(group),
            ])

            queryClient.invalidateQueries({
                queryKey: ['groups'],
            })
            toast.success('Group created')
        },

        onError: () => {
            toast.error(
                'Could not create group'
            )
        },
    })
}