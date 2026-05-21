import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { toast } from 'sonner'

import { updateProfileRequest } from '../api/profile.api'

export const useUpdateProfile =
    () => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                updateProfileRequest,

            onSuccess: () => {
                toast.success(
                    'Profile updated'
                )

                queryClient.invalidateQueries(
                    {
                        queryKey: [
                            'profile',
                        ],
                    }
                )
            },

            onError: () => {
                toast.error(
                    'Could not update profile'
                )
            },
        })
    }