import { Plus } from "lucide-react";

export const CreateGroupCard = () => {
    return (
        <button className='flex min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white transition hover:border-blue-400 hover:bg-blue-50'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-blue-100'>
                <Plus
                size={40}
                className='text-indigo-700'
                />
            </div>

            <p className='mt-6 text-2xl font-semibold text-gray-500'>
                Create New Group
            </p>
        </button>
    )
}