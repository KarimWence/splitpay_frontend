import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { LoginPage } from '@/features/auth/pages/login-page'

import { RegisterPage } from '@/features/auth/pages/register-page'

import { ProtectedRoute } from '@/features/auth/components/protected-route'

import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}

        <Route
          path='/'
          element={<Navigate to='/login' replace />}
        />

        {/* AUTH */}

        <Route
          path='/login'
          element={<LoginPage />}
        />

        <Route
          path='/register'
          element={<RegisterPage />}
        />

        {/* DASHBOARD */}

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}