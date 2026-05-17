// src/features/auth/pages/login-page.tsx

import { Wallet } from 'lucide-react'

import { LoginForm } from '../components/login-form'

export const LoginPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-8'>
      <div className='flex w-full max-w-md flex-col items-center'>
        {/* LOGO + HEADER */}

        <div className='mb-6 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 shadow-lg'>
            <Wallet className='h-8 w-8 text-white' />
          </div>

          <h1 className='text-5xl font-bold tracking-tight text-gray-900'>
            SplitPay
          </h1>

          <p className='mt-2 text-gray-500'>
            Manage debts with professional clarity
          </p>
        </div>

        {/* FORM */}

        <LoginForm />

        {/* SECURITY */}

        <div className='mt-6 flex items-center justify-center gap-6 text-xs text-gray-400'>
          <div className='flex items-center gap-2'>
            <span>🛡️</span>
            Secure SSL
          </div>

          <div className='flex items-center gap-2'>
            <span>🔒</span>
            256-bit AES
          </div>
        </div>
      </div>
    </main>
  )
}