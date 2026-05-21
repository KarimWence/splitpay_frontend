import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

import { useAuthStore } from '@/features/auth/store/auth.store'

import { useProfile } from '../hooks/use-profile'

import { useState } from 'react'

import { EditProfileModal } from '../components/edit-profile-modal'

export const ProfilePage = () => {
  const user = useAuthStore(
    (state) => state.user
  )

  const {
    data: profile,

    isLoading,
  } = useProfile()

  const [isEditOpen, setIsEditOpen] = useState(false)

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='p-10'>
          Loading...
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        <div>
          <h1 className='text-5xl font-bold text-gray-900'>
            User Profile
          </h1>

          <p className='mt-3 text-lg text-gray-500'>
            Manage your
            account settings
            and preferences.
          </p>
        </div>

        <div className='grid gap-6 xl:grid-cols-[2fr_1fr]'>
          <div className='space-y-6'>
            <section className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
              <div className='flex flex-col gap-6 md:flex-row md:items-center'>
                <div className='relative'>
                  <img
                    src={
                      profile?.avatar ||
                      'https://i.pravatar.cc/300'
                    }
                    alt='Avatar'
                    className='h-28 w-28 rounded-full object-cover ring-4 ring-blue-100'
                  />
                </div>

                <div className='flex-1'>
                  <h2 className='text-4xl font-bold text-gray-900'>
                    {
                      user?.name
                    }{' '}
                    {
                      user?.lastname
                    }
                  </h2>

                  <p className='mt-2 text-lg text-gray-500'>
                    {
                      user?.email
                    }
                  </p>

                  <div className='mt-6 flex flex-wrap gap-3'>
                    <button
                      onClick={() =>
                        setIsEditOpen(true)
                      }
                      className='rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800'
                    >
                      Edit Profile
                    </button>

                    <button className='rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50'>
                      Change
                      Password
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
              <h3 className='text-3xl font-bold text-gray-900'>
                Personal
                Information
              </h3>

              <div className='mt-8 grid gap-6 md:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-400'>
                    Phone
                  </p>

                  <p className='mt-3 text-lg font-medium text-gray-900'>
                    {profile?.phone ||
                      'Not provided'}
                  </p>
                </div>

                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-400'>
                    Address
                  </p>

                  <p className='mt-3 text-lg font-medium text-gray-900'>
                    {profile?.address ||
                      'Not provided'}
                  </p>
                </div>

                <div className='md:col-span-2'>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-400'>
                    Bio
                  </p>

                  <p className='mt-3 text-lg leading-relaxed text-gray-700'>
                    {profile?.bio ||
                      'No bio yet'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className='space-y-6'>
            <section className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
              <h3 className='text-3xl font-bold text-gray-900'>
                Preferences
              </h3>

              <div className='mt-8 space-y-6'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-400'>
                    Currency
                  </p>

                  <div className='mt-3 rounded-2xl border border-gray-300 px-4 py-4 text-gray-700'>
                    USD ($)
                  </div>
                </div>

                {/*
                                Notifications feature
                                intentionally disabled for MVP
                                */}
              </div>
            </section>

            <section className='rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-sm'>
              <h3 className='text-2xl font-bold text-blue-700'>
                Optimization
                Active
              </h3>

              <p className='mt-4 leading-relaxed text-blue-600'>
                Your debts are
                being optimized
                in real-time by
                our settlement
                engine.
              </p>
            </section>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
      />
    </DashboardLayout>
  )
}