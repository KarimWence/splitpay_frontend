import { api } from '@/shared/services/api'

import type {
    Notification,
} from '../types/notification.types'

export const getNotificationsRequest =
    async (): Promise<
        Notification[]
    > => {
        const response =
            await api.get(
                '/expenses/notifications/me'
            )

        return response.data
    }

export const markNotificationReadRequest =
    async (
        id: string
    ): Promise<Notification> => {
        const response =
            await api.post(
                `/expenses/notifications/${id}/read`
            )

        return response.data
    }