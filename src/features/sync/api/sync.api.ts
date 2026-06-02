import { api } from '@/shared/services/api'

export const bootstrapRequest =
    async () => {
        const response =
            await api.get(
                '/expenses/sync/bootstrap'
            )

        return response.data
    }