import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {
    markNotificationReadRequest,
} from '../api/notifications.api'

export const useMarkNotificationRead =
    () => {
        const queryClient =
            useQueryClient()

        return useMutation({
            mutationFn:
                markNotificationReadRequest,

            onSuccess:
                () => {
                    queryClient.invalidateQueries(
                        {
                            queryKey: [
                                'notifications',
                            ],
                        }
                    )
                },
        })
    }