import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import {
    loginSchema,
    type LoginSchema,
} from '../schemas/login.schema';

import { useLogin } from '../hooks/use-login';
import { SocialLogin } from './social-login';

export const LoginForm = () => {
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    })

    const onSubmit = (data: LoginSchema) => {
        loginMutation.mutate({
            email: data.email,
            password: data.password,
        })
    }

    return (
        <div className='w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
            <div className='mb-6'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                Welcome back
                </h1>

                <p className='mt-2 text-gray-500'>
                Please enter your details to sign in
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-5'
            >
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
                    className={`h-14 w-full rounded-xl border bg-white pl-12 pr-4 outline-none transition
                    
                    ${
                        errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-600'
                    }
                    `}
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
                <div className='mb-2 flex items-center justify-between'>
                    <label className='text-sm font-medium text-gray-700'>
                    Password
                    </label>

                    <button
                    type='button'
                    className='text-sm font-medium text-blue-600 hover:text-blue-700'
                    >
                    Forgot?
                    </button>
                </div>

                <div className='relative'>
                    <Lock className='absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400' />

                    <input
                    type='password'
                    className={`h-14 w-full rounded-xl border bg-white pl-12 pr-4 outline-none transition
                    
                    ${
                        errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-600'
                    }
                    `}
                    {...register('password')}
                    />
                </div>

                {errors.password && (
                    <div className='mt-2 flex items-center gap-2 text-sm text-red-500'>
                    <AlertCircle className='h-4 w-4' />

                    {errors.password.message}
                    </div>
                )}
                </div>

                {/* REMEMBER */}

                <div className='flex items-center gap-3'>
                <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300'
                    {...register('rememberMe')}
                />

                <span className='text-sm text-gray-600'>
                    Keep me logged in
                </span>
                </div>

                {/* BUTTON */}

                <button
                type='submit'
                disabled={loginMutation.isPending}
                className='h-14 w-full rounded-xl bg-blue-700 text-base font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                >
                {loginMutation.isPending
                    ? 'Signing In...'
                    : 'Sign In'}
                </button>
            </form>

            {/* DIVIDER */}

            <div className='my-8 flex items-center gap-4'>
                <div className='h-px flex-1 bg-gray-200' />

                <span className='text-xs font-semibold tracking-wide text-gray-400 uppercase'>
                Or continue with
                </span>

                <div className='h-px flex-1 bg-gray-200' />
            </div>

            <SocialLogin />

            {/* FOOTER */}

            <div className='mt-10 text-center text-sm text-gray-500'>
                Don&apos;t have an account?{' '}

                <Link
                    to='/register'
                    className='font-semibold text-blue-700 hover:text-blue-800'
                >
                    Create Account
                </Link>
            </div>
        </div>
    )
}