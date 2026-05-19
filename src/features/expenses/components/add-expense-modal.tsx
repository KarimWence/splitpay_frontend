import { X } from 'lucide-react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    createExpenseSchema,

    type CreateExpenseSchema,
} from '../schemas/create-expense.schema'

import { useCreateExpense } from '../hooks/use-create-expense'

interface Props {
    isOpen: boolean

    onClose: () => void

    groupId: string
}

export const AddExpenseModal = ({
    isOpen,

    onClose,

    groupId,
}: Props) => {
    const createExpenseMutation =
        useCreateExpense(groupId)

    const {
        register,

        handleSubmit,

        reset,

        formState: { errors },
    } = useForm<CreateExpenseSchema>({
        resolver:
            zodResolver(
                createExpenseSchema
            ),

        defaultValues: {
            description: '',

            amount: 0,
        },
    })

    const onSubmit = (
        data: CreateExpenseSchema
    ) => {
        createExpenseMutation.mutate(
            {
                groupId,

                description:
                    data.description,

                amount: data.amount,
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
                            Add Expense
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            Add a new shared
                            expense
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
                            Description
                        </label>

                        <input
                            type='text'
                            placeholder='Dinner'
                            className='h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                            {...register(
                                'description'
                            )}
                        />

                        {errors.description && (
                            <p className='mt-2 text-sm text-red-500'>
                                {
                                    errors
                                        .description
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-700'>
                            Amount
                        </label>

                        <input
                            type='number'
                            step='0.01'
                            placeholder='0.00'
                            className='h-14 w-full rounded-2xl border border-gray-300 px-4 outline-none transition focus:border-blue-700'
                            {...register('amount', {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.amount && (
                            <p className='mt-2 text-sm text-red-500'>
                                {
                                    errors
                                        .amount
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={
                            createExpenseMutation.isPending
                        }
                        className='h-14 w-full rounded-2xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                    >
                        {createExpenseMutation.isPending
                            ? 'Adding Expense...'
                            : 'Add Expense'}
                    </button>
                </form>
            </div>
        </div>
    )
}