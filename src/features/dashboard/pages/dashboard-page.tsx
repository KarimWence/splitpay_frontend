import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'
import { BalanceSummaryCard } from '../components/balance-summary-card'
import { CreateGroupCard } from '../components/create-group-card'
import { GroupCard } from '../components/group-card'

export const DashboardPage = () => {

  return (
    <DashboardLayout>
      <div className='space-y-10'>
        <BalanceSummaryCard />

        <section>
          <div className='mb-8 flex items-center gap-3'>
            <div className='h-3 w-3 rounded-full bg-emerald-500' />

            <p className='text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase'>
              Live Optimization Active
            </p>
          </div>

          <div className='grid grid-cols-3 gap-8'>
            <GroupCard
              title='Trip to Spain'
              members={4}
              category='Travel'
              amount='$420.00'
              type='owed'
            />

            <GroupCard
              title='Roomies'
              members={3}
              category='Housing'
              amount='$125.50'
              type='owe'
            />

            <GroupCard
              title='Dinner Crew'
              members={6}
              category='Food'
              amount='$85.00'
              type='owed'
            />

            <CreateGroupCard />
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}