import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

export const DashboardPage = () => {

  return (
    <DashboardLayout>
      <div>
        <h1 className='text-4xl font-bold text-gray-900'>
          Dashboard
        </h1>

        <p className='mt-2 text-gray-500'>
          Welcome back to SplitPay
        </p>
      </div>
    </DashboardLayout>
  )
}