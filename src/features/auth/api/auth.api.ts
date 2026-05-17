import { api } from '@/shared/services/api'

import type {
    AuthResponse,
    LoginDto,
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