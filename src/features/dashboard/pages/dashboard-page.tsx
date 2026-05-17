import { useAuthStore } from '@/features/auth/store/auth.store'

import { useLogout } from '@/features/auth/hooks/use-logout'

export const DashboardPage = () => {
  const logout = useLogout()

  const user = useAuthStore((state) => state.user)

  return (
    <main className='min-h-screen bg-[#f5f7fb] p-10'>
      <div className='mx-auto max-w-7xl'>
        <div className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
          <h1 className='text-4xl font-bold text-gray-900'>
            Dashboard
          </h1>

          <p className='mt-3 text-gray-500'>
            Welcome back,
            <span className='ml-2 font-semibold text-gray-900'>
              {user?.name || 'User'}
            </span>
          </p>

          <button
            onClick={logout}
            className='mt-6 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600'
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  )
}