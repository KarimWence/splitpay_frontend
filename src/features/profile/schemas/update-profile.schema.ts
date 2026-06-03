import { z } from 'zod'

export const updateProfileSchema =
    z.object({
        avatar: z
            .string()
            .trim()
            .refine(
                (value) =>
                    value === '' ||
                    z.string().url().safeParse(value).success,
                {
                    message:
                        'Avatar must be a valid URL',
                }
            ),

        phone: z
            .string()
            .trim()
            .refine(
                (value) =>
                    value === '' ||
                    /^[0-9+\-\s()]+$/.test(value),
                {
                    message:
                        'Invalid phone number',
                }
            )
            .refine(
                (value) =>
                    value === '' ||
                    value.length >= 8,
                {
                    message:
                        'Phone number is too short',
                }
            ),

        address: z
            .string()
            .trim()
            .max(
                200,
                'Address is too long'
            ),

        bio: z
            .string()
            .trim()
            .max(
                500,
                'Bio is too long'
            ),
    })

export type UpdateProfileSchema =
    z.infer<
        typeof updateProfileSchema
    >