import { useEffect, useRef } from 'react'

import { toast } from 'sonner'

import { useNetworkStatus } from '@/shared/hooks/use-network-status'

export const useNetworkToasts = () => {
    const isOnline =
        useNetworkStatus()

    const firstRender =
        useRef(true)

    useEffect(() => {
        if (
            firstRender.current
        ) {
            firstRender.current =
                false

            return
        }

        if (isOnline) {
            toast.success(
                'Connection restored'
            )
        } else {
            toast.warning(
                'You are offline'
            )
        }
    }, [isOnline])
}