import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { syncChanges } from '../services/sync.service'

export const useSync = () => {
    const queryClient =
        useQueryClient()

    useEffect(() => {
        const runSync =
            async () => {
                try {
                    await syncChanges()

                    await queryClient.invalidateQueries({
                        queryKey: ['groups'],
                    })

                    await queryClient.invalidateQueries({
                        queryKey: [
                            'group-expenses',
                        ],
                    })
                } catch (error) {
                    console.error(
                        'Sync failed',
                        error
                    )
                }
            }

        runSync()

        const interval =
            setInterval(
                runSync,
                30000
            )

        return () =>
            clearInterval(
                interval
            )
    }, [queryClient])
}