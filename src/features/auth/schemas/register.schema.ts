import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    lastname: z.string().min(2, 'Lastname must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

export type RegisterSchema = z.infer<typeof registerSchema>;