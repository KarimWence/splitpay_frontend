interface Props {
    password: string;
}

export const PasswordStrength = ({
    password,
}: Props) => {
    const getStrength = () => {
        if (password.length > 0) {
            if (password.length < 8) {
                return {
                    width: '33%',
                    label: 'Weak'
                }
            }
            if (password.length < 10) {
                return {
                    width: '66%',
                    label: 'Medium'
                }
            }
            return {
                width: '100%',
                label: 'Strong'
            }
        }
        return {
            width: '0%',
            label: 'None'
        }
    }

    const strength = getStrength();

    return (
        <div className='mt-3'>
            <div className='h-2 overflow-hidden rounded-full bg-gray-200'>
                <div
                className='h-full rounded-full bg-blue-700 transition-all'
                style={{
                    width: strength.width,
                }}
                />
            </div>

            <p className='mt-2 text-xs text-gray-500'>
                Password strength: {strength.label}
            </p>
        </div>
    )
}