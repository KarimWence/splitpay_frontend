import { api } from '@/shared/services/api'

import type {
    CreateGroupDto,
    Group,
} from '../types/group.types'

export const getGroupsRequest =
    async (): Promise<Group[]> => {
        const response = await api.get(
            '/expenses/groups'
        )

        return response.data
    }

export const getGroupRequest =
    async (
        groupId: string
    ): Promise<Group> => {
        const response = await api.get(
            `/expenses/groups/${groupId}`
        )

        return response.data
    }

export const createGroupRequest = async (
    data: CreateGroupDto
): Promise<Group> => {
    const response = await api.post(
        '/expenses/groups',
        data
    )

    return response.data
}