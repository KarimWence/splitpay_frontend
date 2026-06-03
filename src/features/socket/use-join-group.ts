import { useEffect } from 'react'

import { socket } from './socket.service'

export const useJoinGroup = (
    groupId?: string
) => {
    useEffect(() => {
        if (!groupId) {
            return
        }

        socket.emit(
            'join-group',
            groupId
        )

        console.log(
            'JOIN GROUP',
            groupId
        )


    }, [groupId])
}