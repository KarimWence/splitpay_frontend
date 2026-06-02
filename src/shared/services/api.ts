import axios from 'axios'

import { useAuthStore } from '@/features/auth/store/auth.store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token =
            useAuthStore.getState()
                .accessToken

        console.log(
            'TOKEN FROM STORE',
            token
        )

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`
        }

        console.log(
            'HEADERS',
            config.headers
        )

        return config
    }
)