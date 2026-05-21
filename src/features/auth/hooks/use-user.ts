import { useQuery } from '@tanstack/react-query'

import { getUserRequest } from '../api/auth.api'

export const useUser = (
    userId: string
) => {
    return useQuery({
        queryKey: ['user', userId],

        queryFn: () =>
            getUserRequest(userId),

        enabled: !!userId,
    })
}