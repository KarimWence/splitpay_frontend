import { useQuery } from '@tanstack/react-query'

import { getGroupActivitiesRequest } from '../api/activities.api'

export const useGroupActivities =
    (
        groupId: string
    ) => {
        return useQuery({
            queryKey: [
                'group-activities',
                groupId,
            ],

            queryFn: () =>
                getGroupActivitiesRequest(
                    groupId
                ),
        })
    }