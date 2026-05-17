import { create } from 'zustand'
import type { User } from '../types/auth.types'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean

  setAuth: (data: {
    user: User
    accessToken: string
  }) => void

  logout: () => void
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,

        setAuth: (data) =>
          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          }),
      }),

      {
        name: 'splitpay-auth',
      }
    )
  )