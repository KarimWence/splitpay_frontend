import { ArrowRight } from "lucide-react";

interface Props {
    title: string;
    members: number;
    category: string;
    amount: string;
    type: 'owed' | 'owe'
}

export const GroupCard = ({
    title,
    members,
    category,
    amount,
    type,
}: Props) => {
    return (
        <article className='rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md'>
            <div className='flex items-start justify-between'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50'>
                ✈️
                </div>

                <span className='rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600'>
                {category}
                </span>
            </div>

            <h3 className='mt-8 text-4xl font-bold text-gray-900'>
                {title}
            </h3>

            <p className='mt-3 text-lg text-gray-500'>
                {members} members active
            </p>

            <div className='mt-10 flex items-center justify-between border-t border-gray-100 pt-6'>
                <div>
                <p className='text-sm uppercase text-gray-400'>
                    {type === 'owed'
                    ? 'You are owed'
                    : 'You owe'}
                </p>

                <p
                    className={`mt-2 text-3xl font-bold ${
                    type === 'owed'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    }`}
                >
                    {amount}
                </p>
                </div>

                <button className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 transition hover:bg-blue-50'>
                <ArrowRight className='text-blue-700' />
                </button>
            </div>
        </article>
    )
}