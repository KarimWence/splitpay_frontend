import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { LoginPage } from '@/features/auth/pages/login-page'
import { RegisterPage } from '@/features/auth/pages/register-page'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* REDIRECT ROOT */}

        <Route
          path='/'
          element={<Navigate to='/login' replace />}
        />

        {/* LOGIN */}

        <Route
          path='/login'
          element={<LoginPage />}
        />

        {/* REGISTER */}

        <Route
          path='/register'
          element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}