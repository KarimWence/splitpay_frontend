import {
    useEffect,
} from 'react'

import { socket } from './socket.service'

import { useAuthStore } from '@/features/auth/store/auth.store'

export const SocketProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const user =
        useAuthStore(
            (state) =>
                state.user
        )

    useEffect(() => {
        if (!user) {
            return
        }

        socket.connect()

        socket.emit(
            'join-user',
            user.id
        )

        return () => {
            socket.disconnect()
        }
    }, [user])

    return children
}