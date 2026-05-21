import { ArrowRight } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import { useGroupBalanceSummary } from '../hooks/use-group-balance-summary'

interface Props {
    id: string

    title: string

    members: number
}

export const GroupCard = ({
    id,

    title,

    members,
}: Props) => {
    const navigate = useNavigate()

    const summary = useGroupBalanceSummary(id)
    return (
        <article className='rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
            <div className='flex items-start justify-between'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl'>
                    👥
                </div>

                <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
                    Group
                </span>
            </div>

            <h3 className='mt-6 line-clamp-1 text-2xl font-bold text-gray-900'>
                {title}
            </h3>

            <p className='mt-2 text-sm text-gray-500'>
                {members} members
            </p>

            <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-5'>
                <div className='min-w-0'>
                    <p className='text-xs uppercase tracking-wide text-gray-400'>
                        {summary.type === 'owed'
                            ? 'You are owed'
                            : 'You owe'}
                    </p>

                    <p
                        className={`mt-1 truncate text-2xl font-bold ${summary.type === 'owed'
                            ? 'text-emerald-500'
                            : 'text-red-500'
                            }`}
                    >
                        $
                        {summary.amount.toFixed(2)}
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate(
                            `/groups/${id}`
                        )
                    }
                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-50 transition hover:bg-blue-50'
                >
                    <ArrowRight
                        size={18}
                        className='text-blue-700'
                    />
                </button>
            </div>
        </article>
    )
}