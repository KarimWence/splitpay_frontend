import { useQuery } from '@tanstack/react-query'

import { getGroupsRequest, getGroupRequest } from '../api/groups.api'

export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],

        queryFn: getGroupsRequest,
    })
}

export const useGroup = (
    groupId: string
) => {
    return useQuery({
        queryKey: ['group', groupId],

        queryFn: () =>
            getGroupRequest(groupId),

        enabled: !!groupId,
    })
}