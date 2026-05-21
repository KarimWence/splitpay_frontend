import { api } from '@/shared/services/api'

import type {
    Profile,
    UpdateProfileDto,
} from '../types/profile.types'

export const getProfileRequest =
    async (): Promise<Profile> => {
        const response = await api.get(
            '/profile/me'
        )

        return response.data
    }

export const updateProfileRequest =
    async (
        data: UpdateProfileDto
    ): Promise<Profile> => {
        const response = await api.put(
            '/profile',
            data
        )

        return response.data
    }