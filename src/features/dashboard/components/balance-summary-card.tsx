export const BalanceSummaryCard = () => {
    return (
        <section className='grid gap-10 rounded-[32px] bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white shadow-xl md:p-10 xl:grid-cols-3'>
            <div className='min-w-0'>
                <p className='text-xs tracking-[0.2em] text-blue-100 uppercase md:text-sm'>
                    Total Net Balance
                </p>

                <h2 className='mt-4 whitespace-nowrap text-3xl font-bold md:text-5xl xl:text-6xl'>
                    +$1,240.50
                </h2>

                <p className='mt-5 text-sm text-blue-100 md:text-base'>
                    All balances are optimized
                </p>
            </div>

            <div className='min-w-0 border-y border-blue-400 py-8 lg:border-y-0 lg:border-x lg:px-10 lg:py-0'>
                <p className='text-xs tracking-[0.2em] text-blue-100 uppercase md:text-sm'>
                    You Are Owed
                </p>

                <h3 className='mt-4 whitespace-nowrap text-2xl font-bold md:text-4xl xl:text-5xl'>
                    $2,100.00
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                    <div className='h-full w-[65%] rounded-full bg-emerald-400' />
                </div>
            </div>

            <div className='min-w-0 lg:px-10'>
                <p className='text-xs tracking-[0.2em] text-blue-100 uppercase md:text-sm'>
                    You Owe
                </p>

                <h3 className='mt-4 whitespace-nowrap text-2xl font-bold text-blue-100 md:text-4xl xl:text-5xl'>
                    $859.50
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                    <div className='h-full w-[35%] rounded-full bg-red-400' />
                </div>
            </div>
        </section>
    )
}