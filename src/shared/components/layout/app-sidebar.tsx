export const AppSidebar = () => {
  return (
    <aside className='flex w-[260px] flex-col border-r border-gray-200 bg-white px-6 py-8'>
      <div>
        <h1 className='text-4xl font-bold text-blue-700'>
          SplitPay
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Expense Optimizer
        </p>
      </div>

      <nav className='mt-14 flex flex-col gap-3'>
        <button className='flex h-12 items-center rounded-xl bg-blue-50 px-4 font-medium text-indigo-600'>
          Dashboard
        </button>

        <button className='flex h-12 items-center rounded-xl px-4 text-gray-600 transition hover:bg-gray-100'>
          Groups
        </button>

        <button className='flex h-12 items-center rounded-xl px-4 text-gray-600 transition hover:bg-gray-100'>
          Activity
        </button>

        <button className='flex h-12 items-center rounded-xl px-4 text-gray-600 transition hover:bg-gray-100'>
          Profile
        </button>
      </nav>

      <div className='mt-auto'>
        <button className='h-14 w-full rounded-2xl bg-blue-700 font-semibold text-white shadow-lg transition hover:bg-blue-800'>
          Add Expense
        </button>
      </div>
    </aside>
  )
}