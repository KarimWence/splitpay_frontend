import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { syncChanges } from '../services/sync.service'

import { toast } from 'sonner'

export const useSync = () => {
    const queryClient =
        useQueryClient()

    useEffect(() => {
        const runSync = async () => {
            if (!navigator.onLine) {
                return
            }

            try {
                const processed =
                    await syncChanges()

                if (processed > 0) {
                    toast.success(
                        `${processed} operation${processed > 1
                            ? 's'
                            : ''
                        } synchronized`
                    )
                }

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