import { useQuery } from '@tanstack/react-query'

import { searchUsersRequest } from '../api/auth.api'

export const useSearchUsers = (
    query: string
) => {
    return useQuery({
        queryKey: [
            'search-users',
            query,
        ],

        queryFn: () =>
            searchUsersRequest(
                query
            ),

        enabled:
            query.length >= 2,
    })
}