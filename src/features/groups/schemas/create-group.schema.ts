import { z } from 'zod'

export const createGroupSchema = z.object({
    name: z
        .string()
        .min(3, 'Group name is too short')
        .max(40, 'Group name is too long'),
})

export type CreateGroupSchema = z.infer<
    typeof createGroupSchema
>