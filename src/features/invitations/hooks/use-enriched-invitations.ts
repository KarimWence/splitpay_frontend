import { useQuery } from '@tanstack/react-query'

import { getMyInvitationsRequest } from '../api/invitations.api'

import { getUserRequest } from '@/features/auth/api/auth.api'

import { getGroupRequest } from '@/features/groups/api/groups.api'

export const useEnrichedInvitations =
    () => {
        return useQuery({
            queryKey: [
                'enriched-invitations',
            ],

            queryFn: async () => {
                const invitations =
                    await getMyInvitationsRequest()

                const enriched =
                    await Promise.all(
                        invitations.map(
                            async (
                                invitation: any
                            ) => {
                                const [
                                    user,
                                    group,
                                ] =
                                    await Promise.all(
                                        [
                                            getUserRequest(
                                                invitation.invitedBy
                                            ),

                                            getGroupRequest(
                                                invitation.groupId
                                            ),
                                        ]
                                    )

                                return {
                                    ...invitation,

                                    invitedByName: `${user.name} ${user.lastName}`,

                                    groupName:
                                        group.name,
                                }
                            }
                        )
                    )

                return enriched
            },
        })
    }