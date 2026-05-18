import { useQuery } from '@tanstack/react-query'

import { getGroupsRequest } from '../api/groups.api'

export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],

        queryFn: getGroupsRequest,
    })
}