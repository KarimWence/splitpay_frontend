import { useState } from 'react'

import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

import { useGroups } from '../hooks/use-groups'

import { CreateGroupModal } from '../components/create-group-modal'

export const GroupsPage = () => {
  const { data, isLoading } =
    useGroups()

  const [isCreateOpen, setIsCreateOpen] =
    useState(false)

  return (
    <DashboardLayout>
      <div className='space-y-10'>
        <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>
              Your Groups
            </h1>

            <p className='mt-2 text-gray-500'>
              Manage shared expenses
              and balances
            </p>
          </div>

          <button
            onClick={() =>
              setIsCreateOpen(true)
            }
            className='h-12 rounded-2xl bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800'
          >
            Create Group
          </button>
        </div>

        {isLoading && (
          <div className='flex h-[300px] items-center justify-center rounded-3xl border border-gray-200 bg-white'>
            <p className='text-lg font-medium text-gray-500'>
              Loading groups...
            </p>
          </div>
        )}

        {!isLoading &&
          data?.length === 0 && (
            <div className='flex h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center'>
              <h2 className='text-3xl font-bold text-gray-900'>
                No groups yet
              </h2>

              <p className='mt-4 max-w-md text-gray-500'>
                Create your first
                group to start
                splitting expenses
                with friends,
                roommates, or trips
              </p>

              <button
                onClick={() =>
                  setIsCreateOpen(
                    true
                  )
                }
                className='mt-8 h-12 rounded-2xl bg-blue-700 px-6 font-semibold text-white transition hover:bg-blue-800'
              >
                Create Your First
                Group
              </button>
            </div>
          )}

        {!isLoading &&
          data &&
          data.length > 0 && (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {data.map((group) => (
                <div
                  key={group._id}
                  className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
                >
                  <div className='flex items-start justify-between'>
                    <div>
                      <h2 className='text-3xl font-bold text-gray-900'>
                        {
                          group.name
                        }
                      </h2>

                      <p className='mt-3 text-gray-500'>
                        {
                          group
                            .members
                            .length
                        }{' '}
                        members
                      </p>
                    </div>

                    <div className='rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700'>
                      Active
                    </div>
                  </div>

                  <div className='mt-10 flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-400'>
                        Created
                      </p>

                      <p className='mt-1 font-medium text-gray-700'>
                        Recently
                      </p>
                    </div>

                    <button className='rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200'>
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        <CreateGroupModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
        />
      </div>
    </DashboardLayout>
  )
}