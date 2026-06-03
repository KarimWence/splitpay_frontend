import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { socket } from './socket.service'

import { SOCKET_EVENTS } from './socket-events'
import type { Expense } from '@/features/expenses/types/expense.types'
import { syncChanges } from '../sync/services/sync.service'

export const useRealtimeEvents = () => {
    const queryClient =
        useQueryClient()

    useEffect(() => {
        const onExpenseCreated =
            async (payload: Expense) => {

                console.log(
                    'EXPENSE CREATED',
                    payload
                )

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-expenses',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-balances',
                    ],
                })
            }
        const onActivityCreated =
            async () => {

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-activities',
                    ],
                })
            }

        socket.on(
            SOCKET_EVENTS.EXPENSE_CREATED,
            onExpenseCreated
        )

        socket.on(
            SOCKET_EVENTS.ACTIVITY_CREATED,
            onActivityCreated
        )

        return () => {
            socket.off(
                SOCKET_EVENTS.EXPENSE_CREATED,
                onExpenseCreated
            )
            socket.off(
                SOCKET_EVENTS.ACTIVITY_CREATED,
                onActivityCreated
            )
        }
    }, [queryClient])
}