import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createGroupRequest } from '../api/groups.api'

export const useCreateGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createGroupRequest,

        onSuccess: () => {
            toast.success('Group created')

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