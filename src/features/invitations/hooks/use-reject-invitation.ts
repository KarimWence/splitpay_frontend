import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { rejectInvitationRequest } from '../api/invitations.api'

export const useRejectInvitation =
    () => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                rejectInvitationRequest,

            onSuccess: () => {
                toast.success(
                    'Invitation rejected'
                )

                queryClient.invalidateQueries({
                    queryKey: [
                        'enriched-invitations',
                    ],
                })
            },
        })
    }