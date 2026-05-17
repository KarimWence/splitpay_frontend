export const BalanceSummaryCard = () => {
    return (
        <section className='grid grid-cols-3 rounded-[32px] bg-gradient-to-r from-blue-700 to-blue-600 p-10 text-white shadow-xl'>
            <div>
                <p className='text-sm tracking-[0.2em] text-blue-100 uppercase'>
                Total Net Balance
                </p>

                <h2 className='mt-4 text-6xl font-bold'>
                +$1,240.50
                </h2>

                <p className='mt-5 text-blue-100'>
                All balances are optimized
                </p>
            </div>

            <div className='border-x border-blue-400 px-10'>
                <p className='text-sm tracking-[0.2em] text-blue-100 uppercase'>
                You Are Owed
                </p>

                <h3 className='mt-4 text-5xl font-bold'>
                $2,100.00
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                <div className='h-full w-[65%] rounded-full bg-emerald-400' />
                </div>
            </div>

            <div className='px-10'>
                <p className='text-sm tracking-[0.2em] text-blue-100 uppercase'>
                You Owe
                </p>

                <h3 className='mt-4 text-5xl font-bold text-blue-200'>
                $859.50
                </h3>

                <div className='mt-6 h-2 overflow-hidden rounded-full bg-blue-400'>
                <div className='h-full w-[35%] rounded-full bg-red-400' />
                </div>
            </div>
        </section>
    )
}