import { X } from 'lucide-react'

interface Props {
    isOpen: boolean

    amount: number

    onClose: () => void

    onConfirm: () => void

    isLoading?: boolean
}

export const ConfirmSettlementModal = ({
    isOpen,
    amount,
    onClose,
    onConfirm,
    isLoading = false,
}: Props) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>
                            Confirm Settlement
                        </h2>

                        <p className='mt-2 text-gray-500'>
                            You are about to settle a debt.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className='rounded-full p-2 transition hover:bg-gray-100'
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className='mt-8 rounded-2xl bg-blue-50 p-5'>
                    <p className='text-sm text-blue-700'>
                        Amount
                    </p>

                    <p className='mt-1 text-3xl font-bold text-blue-700'>
                        ${amount.toFixed(2)}
                    </p>
                </div>

                <div className='mt-8 flex gap-3'>
                    <button
                        onClick={onClose}
                        className='h-14 flex-1 rounded-2xl border border-gray-300 font-semibold text-gray-700 transition hover:bg-gray-50'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className='h-14 flex-1 rounded-2xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50'
                    >
                        {isLoading
                            ? 'Processing...'
                            : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    )
}