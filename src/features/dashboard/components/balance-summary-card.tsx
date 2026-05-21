interface Props {
    netBalance: number

    totalOwed: number

    totalOwes: number
}

export const BalanceSummaryCard = ({
    netBalance,

    totalOwed,

    totalOwes,
}: Props) => {
    return (
        <section className='grid gap-10 rounded-[32px] bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white shadow-xl md:p-10 xl:grid-cols-3'>
            <div className='min-w-0'>
                <p className='text-xs uppercase tracking-[0.2em] text-blue-100 md:text-sm'>
                    Total Net Balance
                </p>

                <h2 className='mt-4 whitespace-nowrap text-3xl font-bold md:text-5xl xl:text-6xl'>
                    {netBalance >= 0
                        ? '+'
                        : '-'}
                    $
                    {Math.abs(
                        netBalance
                    ).toFixed(2)}
                </h2>

                <p className='mt-5 text-sm text-blue-100 md:text-base'>
                    Across all your
                    groups
                </p>
            </div>

            <div className='min-w-0 border-y border-blue-400 py-8 lg:border-x lg:border-y-0 lg:px-10 lg:py-0'>
                <p className='text-xs uppercase tracking-[0.2em] text-blue-100 md:text-sm'>
                    You Are Owed
                </p>

                <h3 className='mt-4 whitespace-nowrap text-2xl font-bold md:text-4xl xl:text-5xl'>
                    $
                    {totalOwed.toFixed(
                        2
                    )}
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                    <div className='h-full w-[65%] rounded-full bg-emerald-400' />
                </div>
            </div>

            <div className='min-w-0 lg:px-10'>
                <p className='text-xs uppercase tracking-[0.2em] text-blue-100 md:text-sm'>
                    You Owe
                </p>

                <h3 className='mt-4 whitespace-nowrap text-2xl font-bold text-blue-100 md:text-4xl xl:text-5xl'>
                    $
                    {totalOwes.toFixed(
                        2
                    )}
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                    <div className='h-full w-[35%] rounded-full bg-red-400' />
                </div>
            </div>
        </section>
    )
}