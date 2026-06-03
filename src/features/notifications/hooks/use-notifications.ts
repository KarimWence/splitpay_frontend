import { useQuery } from '@tanstack/react-query'

import {
    getNotificationsRequest,
} from '../api/notifications.api'

export const useNotifications =
    () => {
        return useQuery({
            queryKey: [
                'notifications',
            ],

            queryFn:
                getNotificationsRequest,
        })
    }