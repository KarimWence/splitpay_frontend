import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { addMemberRequest } from '../api/groups.api'

export const useAddMember = (
    groupId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addMemberRequest,

        onSuccess: () => {
            toast.success(
                'Member added successfully'
            )

            queryClient.invalidateQueries({
                queryKey: [
                    'group',
                    groupId,
                ],
            })
        },

        onError: () => {
            toast.error(
                'Could not add member'
            )
        },
    })
}