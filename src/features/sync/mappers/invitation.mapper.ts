export const mapInvitationToEntity = (
    invitation: any
) => ({
    id: invitation._id,

    groupId:
        invitation.groupId,

    invitedBy:
        invitation.invitedBy,

    invitedUserId:
        invitation.invitedUserId,

    status:
        invitation.status,

    expiresAt:
        invitation.expiresAt,

    createdAt:
        invitation.createdAt,

    updatedAt:
        invitation.updatedAt,
})