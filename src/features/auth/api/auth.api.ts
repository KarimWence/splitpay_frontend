import { api } from '@/shared/services/api'

import type {
    AuthResponse,
    LoginDto,
} from '../types/auth.types';

export const loginRequest = async (
    data: LoginDto
): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
}