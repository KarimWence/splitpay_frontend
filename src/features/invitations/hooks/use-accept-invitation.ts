import { useMutation } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

import { acceptInvitationRequest } from '../api/invitations.api'
import { bootstrapRequest } from '@/features/sync/api/sync.api'
import { saveBootstrapData } from '@/features/sync/services/sync.service'


export const useAcceptInvitation =
    () => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                acceptInvitationRequest,


            onSuccess: async () => {
                toast.success(
                    'Invitation accepted'
                )

                const bootstrap =
                    await bootstrapRequest()

                await saveBootstrapData(
                    bootstrap
                )

                await queryClient.invalidateQueries({
                    queryKey: [
                        'groups',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'enriched-invitations',
                    ],
                })
            },
        })
    }