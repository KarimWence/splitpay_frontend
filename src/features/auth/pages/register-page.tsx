import { Wallet } from 'lucide-react'

import { RegisterForm } from '../components/register-form'

export const RegisterPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-8'>
      <div className='flex w-full max-w-md flex-col items-center'>
        {/* HEADER */}

        <div className='mb-6 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 shadow-lg'>
            <Wallet className='h-8 w-8 text-white' />
          </div>

          <h1 className='text-5xl font-bold tracking-tight text-gray-900'>
            SplitPay
          </h1>

          <p className='mt-2 text-gray-500'>
            Split expenses with elegance
          </p>
        </div>

        {/* FORM */}

        <RegisterForm />
      </div>
    </main>
  )
}