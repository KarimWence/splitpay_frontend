import { useQuery } from '@tanstack/react-query'

import { getProfileRequest } from '../api/profile.api'

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],

        queryFn:
            getProfileRequest,
    })
}