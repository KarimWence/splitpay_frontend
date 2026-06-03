import { api } from '@/shared/services/api'

export const getGroupActivitiesRequest =
    async (
        groupId: string
    ) => {
        const {
            data,
        } = await api.get(
            `/expenses/groups/${groupId}/activities`
        )

        return data
    }