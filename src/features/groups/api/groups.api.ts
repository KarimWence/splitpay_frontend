import { api } from '@/shared/services/api'
import { v4 as uuidv4 } from 'uuid'


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

interface AddMemberDto {
    groupId: string

    userId: string
}

export const addMemberRequest =
    async ({
        groupId,

        userId,
    }: AddMemberDto) => {
        const response = await api.post(
            `/expenses/groups/${groupId}/members`,
            {
                userId,
            }
        )

        return response.data
    }


export const createInvitationRequest =
    async ({
        groupId,
        invitedUserId,
    }: {
        groupId: string
        invitedUserId: string
    }) => {
        console.log({ invitedUserId, groupId });
        const response =
            await api.post(
                `/expenses/groups/${groupId}/invitations`,
                {
                    invitedUserId,
                    requestId: uuidv4()
                }
            )

        return response.data
    }

export const createGroupRequest = async (
    data: CreateGroupDto
): Promise<Group> => {
    try {
        const response =
            await api.post(
                '/expenses/groups',
                data
            )

        console.log(
            'CREATE GROUP SUCCESS',
            response.data
        )

        return response.data
    } catch (error: any) {
        console.log(
            'CREATE GROUP ERROR',
            error.response?.status
        )

        console.log(
            'CREATE GROUP DATA',
            error.response?.data
        )

        throw error
    }
}