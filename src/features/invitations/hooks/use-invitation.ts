import { useQuery } from '@tanstack/react-query'

import { getMyInvitationsRequest } from '../api/invitations.api'

export const useInvitations =
    () => {
        return useQuery({
            queryKey: [
                'invitations',
            ],

            queryFn:
                getMyInvitationsRequest,
        })
    }