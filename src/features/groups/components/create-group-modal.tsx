import { X } from 'lucide-react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    createGroupSchema,
    type CreateGroupSchema,
} from '../schemas/create-group.schema'

import { useCreateGroup } from '../hooks/use-create-group'

interface Props {
    isOpen: boolean

    onClose: () => void
}

export const CreateGroupModal = ({
    isOpen,
    onClose,
}: Props) => {
    const createGroupMutation =
        useCreateGroup()

    const {
        register,

        handleSubmit,

        reset,

        formState: { errors },
    } = useForm<CreateGroupSchema>({
        resolver:
            zodResolver(createGroupSchema),

        defaultValues: {
            name: '',
        },
    })

    const onSubmit = (
        data: CreateGroupSchema
    ) => {
        createGroupMutation.mutate(data, {
            onSuccess: () => {
                reset()

                onClose()
            },
        })
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            Create Group
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            Start splitting
                            expenses with your
                            friends
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
                            Group Name
                        </label>

                        <input
                            type='text'
                            placeholder='Trip to Japan'
                            className='h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                            {...register('name')}
                        />

                        {errors.name && (
                            <p className='mt-2 text-sm text-red-500'>
                                {
                                    errors.name
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={
                            createGroupMutation.isPending
                        }
                        className='h-14 w-full rounded-2xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                    >
                        {createGroupMutation.isPending
                            ? 'Creating Group...'
                            : 'Create Group'}
                    </button>
                </form>
            </div>
        </div>
    )
}