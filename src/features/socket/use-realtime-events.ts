import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { socket } from './socket.service'

import { SOCKET_EVENTS } from './socket-events'
import type { Expense } from '@/features/expenses/types/expense.types'
import { syncChanges } from '../sync/services/sync.service'
import type { Invitation } from '../invitations/types/invitation.types'
import type { SettlementEntity } from '@/shared/database/db'

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

                await queryClient.invalidateQueries({
                    queryKey: [
                        'notifications',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'settlements',
                    ],
                })
            }


        const onSettlementCreated =
            async (payload: SettlementEntity) => {

                console.log(
                    'SETTLEMENT CREATED',
                    payload
                )

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: [
                        'settlements',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-balances',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'notifications',
                    ],
                })
            }

        const onMemberInvited =
            async (payload: Invitation) => {

                console.log(
                    'MEMBER INVITED',
                    payload
                )

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: [
                        'enriched-invitations',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'notifications',
                    ],
                })
            }


        const onInvitationAccepted =
            async () => {

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: ['groups'],
                })

                await queryClient.invalidateQueries({
                    queryKey: ['group'],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'enriched-invitations',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-activities',
                    ],
                })
            }

        const onInvitationRejected =
            async () => {

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: [
                        'enriched-invitations',
                    ],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-activities',
                    ],
                })
            }

        const onMemberJoined =
            async () => {

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: ['groups'],
                })

                await queryClient.invalidateQueries({
                    queryKey: ['group'],
                })

                await queryClient.invalidateQueries({
                    queryKey: [
                        'group-activities',
                    ],
                })
            }

        const onNotificationCreated =
            async () => {

                await syncChanges()

                await queryClient.invalidateQueries({
                    queryKey: [
                        'notifications',
                    ],
                })
            }
        const onActivityCreated =
            async () => {
                await syncChanges()

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
            SOCKET_EVENTS.SETTLEMENT_CREATED,
            onSettlementCreated
        )

        socket.on(
            SOCKET_EVENTS.MEMBER_INVITED,
            onMemberInvited
        )

        socket.on(
            SOCKET_EVENTS.INVITATION_ACCEPTED,
            onInvitationAccepted
        )

        socket.on(
            SOCKET_EVENTS.INVITATION_REJECTED,
            onInvitationRejected
        )

        socket.on(
            SOCKET_EVENTS.MEMBER_JOINED,
            onMemberJoined
        )

        socket.on(
            SOCKET_EVENTS.NOTIFICATION_CREATED,
            onNotificationCreated
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
                SOCKET_EVENTS.SETTLEMENT_CREATED,
                onSettlementCreated
            )
            socket.off(
                SOCKET_EVENTS.MEMBER_INVITED,
                onMemberInvited
            )
            socket.off(
                SOCKET_EVENTS.INVITATION_ACCEPTED,
                onInvitationAccepted
            )
            socket.off(
                SOCKET_EVENTS.INVITATION_REJECTED,
                onInvitationRejected
            )
            socket.off(
                SOCKET_EVENTS.MEMBER_JOINED,
                onMemberJoined
            )
            socket.off(
                SOCKET_EVENTS.NOTIFICATION_CREATED,
                onNotificationCreated
            )
            socket.off(
                SOCKET_EVENTS.ACTIVITY_CREATED,
                onActivityCreated
            )
        }
    }, [queryClient])
}