import { AppRouter } from './app/router'

import { useSync } from '@/features/sync/hooks/use-sync'
import { useNetworkToasts } from './features/sync/hooks/use-network-toasts'
import { SocketProvider } from './features/socket/socket-provider'

function App() {
    useSync()
    useNetworkToasts()

    return (
        <SocketProvider>
            <AppRouter />
        </SocketProvider>
    )
}

export default App