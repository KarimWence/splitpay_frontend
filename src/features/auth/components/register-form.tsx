import { Mail, Lock, User, AlertCircle } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, type RegisterSchema} from '../schemas/register.schema';

import { useRegister } from '../hooks/use-register';
import { PasswordStrength } from './password-strength';

import { Link } from 'react-router-dom';

export const RegisterForm = () => {
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            password: '',
        },
    })

    console.log(errors)

    const password = watch('password');

    const onSubmit = (data: RegisterSchema) => {
        console.log('REGISTER DATA', data)
        registerMutation.mutate({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        })
    }

    return (
        <div className='w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
            <div className='mb-6'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                    Create account
                </h1>
                <p className='mt-2 text-gray-500'>
                    Start managing shared expenses smarter
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-5'
            >
                {/* NAME */}

                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        First Name
                    </label>

                    <div className='relative'>
                        <User className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                        <input
                        type='text'
                        placeholder='John'
                        className='h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-600'
                        {...register('name')}
                        />
                    </div>

                    {errors.name && (
                        <p className='mt-2 text-sm text-red-500'>
                        {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Last Name
                    </label>

                    <div className='relative'>
                        <User className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                        <input
                        type='text'
                        placeholder='Doe'
                        className='h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-600'
                        {...register('lastName')}
                        />
                    </div>

                    {errors.lastName && (
                        <p className='mt-2 text-sm text-red-500'>
                        {errors.lastName.message}
                        </p>
                    )}
                </div>

                {/* EMAIL */}

                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Email Address
                    </label>

                    <div className='relative'>
                        <Mail className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                        <input
                            type='email'
                            placeholder='name@company.com'
                            className='h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-600'
                            {...register('email')}
                        />
                    </div>

                    {errors.email && (
                        <p className='mt-2 text-sm text-red-500'>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* PASSWORD */}

                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Password
                    </label>

                    <div className='relative'>
                        <Lock className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                        <input
                            type='password'
                            className='h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-600'
                            {...register('password')}
                        />
                    </div>

                    <PasswordStrength password={password} />

                    {errors.password && (
                        <div className='mt-2 flex items-center gap-2 text-sm text-red-500'>
                            <AlertCircle className='h-4 w-4' />

                            {errors.password.message}
                        </div>
                    )}
                </div>

                {/* CONFIRM */}

                <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Confirm Password
                    </label>

                    <div className='relative'>
                        <Lock className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                        <input
                            type='password'
                            className='h-14 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 outline-none transition focus:border-blue-600'
                            {...register('confirmPassword')}
                        />
                    </div>

                    {errors.confirmPassword && (
                        <div className='mt-2 flex items-center gap-2 text-sm text-red-500'>
                            <AlertCircle className='h-4 w-4' />

                            {errors.confirmPassword.message}
                        </div>
                    )}
                </div>

                {/* TERMS */}

                <div className='flex items-start gap-3'>
                    <input
                        type='checkbox'
                        className='mt-1 h-4 w-4 rounded border-gray-300'
                    />

                    <p className='text-sm text-gray-600'>
                        I agree to the Terms of Service and Privacy
                        Policy
                    </p>
                </div>

                {/* BUTTON */}

                <button
                    type='submit'
                    disabled={registerMutation.isPending}
                    className='h-14 w-full rounded-xl bg-blue-700 text-base font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                >
                    {registerMutation.isPending
                        ? 'Creating Account...'
                        : 'Create Account'}
                </button>

                <div className='mt-8 text-center text-sm text-gray-500'>
                    Already have an account?{' '}

                    <Link
                        to='/login'
                        className='font-semibold text-blue-700 transition hover:text-blue-800'
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
  )
}