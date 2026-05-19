import { X } from 'lucide-react'

import { useForm } from 'react-hook-form'

import { useAddMember } from '../hooks/use-add-member'

interface Props {
    isOpen: boolean

    onClose: () => void

    groupId: string
}

interface FormData {
    userId: string
}

export const AddMemberModal = ({
    isOpen,

    onClose,

    groupId,
}: Props) => {
    const addMemberMutation =
        useAddMember(groupId)

    const {
        register,

        handleSubmit,

        reset,
    } = useForm<FormData>({
        defaultValues: {
            userId: '',
        },
    })

    const onSubmit = (
        data: FormData
    ) => {
        addMemberMutation.mutate(
            {
                groupId,

                userId: data.userId,
            },

            {
                onSuccess: () => {
                    reset()

                    onClose()
                },
            }
        )
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            Add Member
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            Add a user to this
                            group
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className='rounded-full p-2 transition hover:bg-gray-100'
                    >
                        <X size={22} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className='mt-8 space-y-6'
                >
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                            User ID
                        </label>

                        <input
                            type='text'
                            placeholder='Enter user ID'
                            className='h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                            {...register(
                                'userId'
                            )}
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={
                            addMemberMutation.isPending
                        }
                        className='h-14 w-full rounded-2xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                    >
                        {addMemberMutation.isPending
                            ? 'Adding Member...'
                            : 'Add Member'}
                    </button>
                </form>
            </div>
        </div>
    )
}