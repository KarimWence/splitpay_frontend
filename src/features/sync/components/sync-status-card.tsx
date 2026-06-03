import {
    Wifi,
    WifiOff,
    RefreshCcw,
} from 'lucide-react'

import { format } from 'date-fns/format'

import { useSyncStatus } from '../hooks/use-sync-status'

export const SyncStatusCard = () => {
    const {
        isOnline,
        pendingCount,
        lastSync,
    } = useSyncStatus()

    return (
        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>
                        Sync Status
                    </h3>

                    <p className='text-sm text-gray-500'>
                        Offline-first
                        synchronization
                    </p>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isOnline
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                >
                    {isOnline ? (
                        <Wifi size={22} />
                    ) : (
                        <WifiOff
                            size={22}
                        />
                    )}
                </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-4'>
                <div className='rounded-2xl bg-gray-50 p-4'>
                    <p className='text-xs uppercase tracking-wide text-gray-500'>
                        Status
                    </p>

                    <p
                        className={`mt-1 font-semibold ${isOnline
                            ? 'text-green-600'
                            : 'text-red-600'
                            }`}
                    >
                        {isOnline
                            ? 'Online'
                            : 'Offline'}
                    </p>
                </div>

                <div
                    className={`rounded-2xl p-4 ${pendingCount > 0
                        ? 'bg-amber-50'
                        : 'bg-gray-50'
                        }`}
                >
                    <p className='text-xs uppercase tracking-wide text-gray-500'>
                        Pending
                    </p>

                    <div className='mt-1 flex items-center gap-2'>
                        <p className='font-semibold text-gray-900'>
                            {pendingCount}
                        </p>

                        {pendingCount > 0 && (
                            <span className='rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700'>
                                Waiting
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-4 flex items-center gap-2 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700'>
                <RefreshCcw
                    size={16}
                />

                <span>
                    Last sync:{' '}
                    {lastSync
                        ? format(
                            new Date(lastSync),
                            'dd/MM/yyyy HH:mm'
                        )
                        : 'Never'}
                </span>
            </div>
        </div>
    )
}