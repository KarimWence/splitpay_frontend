import { AppRouter } from './app/router'

import { useSync } from '@/features/sync/hooks/use-sync'

function App() {
    useSync()

    return <AppRouter />
}

export default App