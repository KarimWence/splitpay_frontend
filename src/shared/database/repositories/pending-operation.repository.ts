import { db } from '../db'

import type { PendingOperationEntity } from '../db'

export const PendingOperationRepository = {
    getPending: () =>
        db.pendingOperations
            .where('status')
            .equals('PENDING')
            .toArray(),

    add: (
        operation: PendingOperationEntity
    ) =>
        db.pendingOperations.add(
            operation
        ),

    remove: (id: string) =>
        db.pendingOperations.delete(
            id
        ),

    updateStatus: (
        id: string,
        status: string
    ) =>
        db.pendingOperations.update(
            id,
            {
                status,
            }
        ),
}