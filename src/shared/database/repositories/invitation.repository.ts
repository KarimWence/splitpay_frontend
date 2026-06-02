import { db } from '../db'

export const InvitationRepository =
    {
        getAll: () =>
            db.invitations.toArray(),

        upsertMany: async (
            invitations: any[]
        ) => {
            await db.invitations.bulkPut(
                invitations
            )
        },
    }