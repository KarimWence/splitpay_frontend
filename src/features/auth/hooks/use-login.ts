import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { loginRequest } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

import { bootstrapRequest } from '@/features/sync/api/sync.api'
import { saveBootstrapData } from '@/features/sync/services/sync.service'

export const useLogin = () => {
    const navigate = useNavigate()

    const setAuth = useAuthStore(
        (state) => state.setAuth
    )

    return useMutation({
        mutationFn: loginRequest,

        onSuccess: async (data) => {
            localStorage.removeItem(
                'splitpay-auth'
            )

            setAuth({
                accessToken: data.token,
                user: data.user,
            })

            try {
                const bootstrapData =
                    await bootstrapRequest()

                await saveBootstrapData(
                    bootstrapData
                )
            } catch (error) {
                console.error(
                    'Bootstrap failed',
                    error
                )
            }

            toast.success(
                'Login successful!'
            )

            navigate('/dashboard')
        },

        onError: () => {
            toast.error(
                'Invalid credentials.'
            )
        },
    })
}