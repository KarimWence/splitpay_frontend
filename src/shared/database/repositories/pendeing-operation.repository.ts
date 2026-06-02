import { db } from '../db'

export const PendingOperationRepository =
    {
        getAll: () =>
            db.pendingOperations.toArray(),

        create: (
            operation: any
        ) =>
            db.pendingOperations.add(
                operation
            ),

        remove: (
            id: string
        ) =>
            db.pendingOperations.delete(
                id
            ),
    }