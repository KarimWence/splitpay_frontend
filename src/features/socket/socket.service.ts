import { io } from 'socket.io-client'

export const socket = io(
    import.meta.env
        .VITE_REALTIME_URL,
    {
        autoConnect: false,
    }
)