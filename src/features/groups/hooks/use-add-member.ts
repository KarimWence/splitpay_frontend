import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { createInvitationRequest } from '../api/groups.api'

export const useAddMember = (
    groupId: string
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createInvitationRequest,

        onSuccess: () => {
            toast.success(
                'Invitation sent successfully'
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
                'Could not send invitation'
            )
        },
    })
}