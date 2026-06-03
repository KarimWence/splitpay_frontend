import { api } from '@/shared/services/api'


export const getMyInvitationsRequest =
    async () => {
        const response =
            await api.get(
                '/expenses/invitations/me'
            )

        return response.data
    }

export const acceptInvitationRequest =
    async (
        invitationId: string
    ) => {
        const response =
            await api.post(
                `/expenses/invitations/${invitationId}/accept`
            )

        return response.data
    }

export const rejectInvitationRequest =
    async (
        invitationId: string
    ) => {
        const response =
            await api.post(
                `/expenses/invitations/${invitationId}/reject`
            )

        return response.data
    }