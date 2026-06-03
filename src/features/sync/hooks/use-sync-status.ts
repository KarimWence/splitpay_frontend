import { useEffect, useState } from 'react'

import { SyncStateRepository } from '@/shared/database/repositories/sync-state.repository'
import { PendingOperationRepository } from '@/shared/database/repositories/pending-operation.repository'

import { useNetworkStatus } from '@/shared/hooks/use-network-status'

export const useSyncStatus = () => {
    const isOnline =
        useNetworkStatus()

    const [
        pendingCount,
        setPendingCount,
    ] = useState(0)

    const [
        lastSync,
        setLastSync,
    ] = useState<string | null>(
        null
    )

    useEffect(() => {
        const load = async () => {
            const pending =
                await PendingOperationRepository.getPending()

            const sync =
                await SyncStateRepository.getLastSync()

            setPendingCount(
                pending.length
            )

            console.log(
                'SYNC STATUS READ',
                sync
            )

            setLastSync(sync)
        }

        load()

        const interval =
            setInterval(
                load,
                3000
            )

        return () =>
            clearInterval(
                interval
            )
    }, [])

    return {
        isOnline,
        pendingCount,
        lastSync,
    }
}