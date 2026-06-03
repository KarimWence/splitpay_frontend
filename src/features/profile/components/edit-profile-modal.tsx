import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { X } from 'lucide-react'

import { useProfile } from '../hooks/use-profile'

import { useUpdateProfile } from '../hooks/use-update-profile'

import {
    updateProfileSchema,
    type UpdateProfileSchema,
} from '../schemas/update-profile.schema'

interface Props {
    isOpen: boolean

    onClose: () => void
}

export const EditProfileModal = ({
    isOpen,

    onClose,
}: Props) => {
    const { data: profile } =
        useProfile()

    const updateProfileMutation =
        useUpdateProfile()

    const {
        register,

        handleSubmit,

        reset,

        formState: {
            errors,
        },
    } =
        useForm<UpdateProfileSchema>({
            resolver:
                zodResolver(
                    updateProfileSchema
                ),
        })

    useEffect(() => {
        if (profile) {
            reset({
                avatar:
                    profile.avatar,

                bio: profile.bio,

                phone:
                    profile.phone,

                address:
                    profile.address,
            })
        }
    }, [profile, reset])

    const onSubmit = (
        data: UpdateProfileSchema
    ) => {
        updateProfileMutation.mutate(
            data,
            {
                onSuccess: () => {
                    onClose()
                },
            }
        )
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            Edit Profile
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            Update your
                            personal
                            information
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
                        <label className='text-sm font-semibold text-gray-700'>
                            Avatar URL
                        </label>

                        <input
                            type='text'
                            {...register(
                                'avatar'
                            )}
                            className='mt-2 h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                        />
                        {errors.avatar && (
                            <p className='mt-2 text-sm text-red-500'>
                                {errors.avatar.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Phone
                        </label>

                        <input
                            type='text'
                            {...register(
                                'phone'
                            )}
                            className='mt-2 h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                        />
                        {errors.phone && (
                            <p className='mt-2 text-sm text-red-500'>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Address
                        </label>

                        <input
                            type='text'
                            {...register(
                                'address'
                            )}
                            className='mt-2 h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                        />
                        {errors.address && (
                            <p className='mt-2 text-sm text-red-500'>
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='text-sm font-semibold text-gray-700'>
                            Bio
                        </label>

                        <textarea
                            rows={5}
                            {...register(
                                'bio'
                            )}
                            className='mt-2 w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-blue-700'
                        />
                        {errors.bio && (
                            <p className='mt-2 text-sm text-red-500'>
                                {errors.bio.message}
                            </p>
                        )}
                    </div>

                    <div className='flex justify-end gap-3 pt-4'>
                        <button
                            type='button'
                            onClick={
                                onClose
                            }
                            className='rounded-2xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50'
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            disabled={
                                updateProfileMutation.isPending
                            }
                            className='rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}