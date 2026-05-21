import { useUser } from '@/features/auth/hooks/use-user'

interface Props {
    userId: string
}

export const MemberItem = ({
    userId,
}: Props) => {
    const { data: user } =
        useUser(userId)

    return (
        <div className='rounded-2xl bg-gray-100 px-4 py-3'>
            <p className='font-medium text-gray-900'>
                {user
                    ? `${user.name} ${user.lastName}`
                    : 'Loading...'}
            </p>

            <p className='mt-1 text-sm text-gray-500'>
                {user?.email}
            </p>
        </div>
    )
}