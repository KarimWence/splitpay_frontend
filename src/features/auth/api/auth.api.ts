import { api } from '@/shared/services/api'

import type {
    AuthResponse,
    LoginDto,
    PublicUser,
} from '../types/auth.types';
import type { RegisterDto } from '../types/auth.types'

export const loginRequest = async (
    data: LoginDto
): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
}

export const registerRequest = async (
  data: RegisterDto
): Promise<AuthResponse> => {
  const response = await api.post(
    '/auth/register',
    data
  )

  return response.data
}

export const getUserRequest =
    async (
        userId: string
    ): Promise<PublicUser> => {
        const response = await api.get(
            `/auth/users/${userId}`
        )

        return response.data
    }

export const searchUsersRequest =
    async (
        query: string
    ): Promise<PublicUser[]> => {
        const response = await api.get(
            `/auth/users/search?q=${query}`
        )

        return response.data
    }