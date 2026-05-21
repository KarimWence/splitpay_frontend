import { X } from 'lucide-react'

import { useState } from 'react'

import { useAddMember } from '../hooks/use-add-member'

import { useSearchUsers } from '@/features/auth/hooks/use-search-users'

export const AddMemberModal = ({
    isOpen,

    onClose,

    groupId,
}: {
    isOpen: boolean

    onClose: () => void

    groupId: string
}) => {
    const [query, setQuery] =
        useState('')

    const addMemberMutation =
        useAddMember(groupId)

    const { data: users } =
        useSearchUsers(query)

    const handleAddMember = (
        userId: string
    ) => {
        addMemberMutation.mutate(
            {
                groupId,

                userId,
            },

            {
                onSuccess: () => {
                    setQuery('')

                    onClose()
                },
            }
        )
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            Add Member
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            Search users by
                            name or email
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className='rounded-full p-2 transition hover:bg-gray-100'
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className='mt-8'>
                    <input
                        type='text'
                        placeholder='Search users...'
                        value={query}
                        onChange={(e) =>
                            setQuery(
                                e.target
                                    .value
                            )
                        }
                        className='h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                    />
                </div>

                <div className='mt-6 max-h-[320px] space-y-3 overflow-y-auto'>
                    {users?.map((user) => (
                        <button
                            key={user.id}
                            onClick={() =>
                                handleAddMember(
                                    user.id
                                )
                            }
                            className='flex w-full items-center justify-between rounded-2xl border border-gray-200 p-4 text-left transition hover:bg-gray-50'
                        >
                            <div>
                                <p className='font-semibold text-gray-900'>
                                    {
                                        user.name
                                    }{' '}
                                    {
                                        user.lastName
                                    }
                                </p>

                                <p className='mt-1 text-sm text-gray-500'>
                                    {
                                        user.email
                                    }
                                </p>
                            </div>

                            <div className='rounded-xl bg-blue-700 px-4 py-2 text-sm font-medium text-white'>
                                Add
                            </div>
                        </button>
                    ))}

                    {query.length >=
                        2 &&
                        users?.length ===
                        0 && (
                            <div className='py-10 text-center text-gray-500'>
                                No users found
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}