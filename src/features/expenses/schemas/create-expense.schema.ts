import { z } from 'zod'

export const createExpenseSchema =
    z.object({
        description: z
            .string()
            .min(
                3,
                'Description is too short'
            ),

        amount: z
            .number()
            .positive(
                'Amount must be greater than 0'
            ),
    })

export type CreateExpenseSchema =
    z.infer<
        typeof createExpenseSchema
    >