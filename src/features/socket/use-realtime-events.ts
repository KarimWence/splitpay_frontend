import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { socket } from './socket.service'

import { SOCKET_EVENTS } from './socket-events'
import type { Expense } from '@/features/expenses/types/expense.types'

export const useRealtimeEvents = () => {
    const queryClient =
        useQueryClient()

    useEffect(() => {
        const onExpenseCreated =
            (payload: Expense) => {
                console.log(
                    'EXPENSE CREATED',
                    payload
                )

                queryClient.invalidateQueries({
                    queryKey: [
                        'group-expenses',
                    ],
                })

                queryClient.invalidateQueries({
                    queryKey: [
                        'group-balances',
                    ],
                })
            }

        socket.on(
            SOCKET_EVENTS.EXPENSE_CREATED,
            onExpenseCreated
        )

        return () => {
            socket.off(
                SOCKET_EVENTS.EXPENSE_CREATED,
                onExpenseCreated
            )
        }
    }, [queryClient])
}