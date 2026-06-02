import { DashboardLayout } from '@/shared/components/layout/dashboard-layout'

import { BalanceSummaryCard } from '../components/balance-summary-card'

import { CreateGroupCard } from '../components/create-group-card'

import { GroupCard } from '../components/group-card'

import { useGroups } from '@/features/groups/hooks/use-groups'

import { useDashboardSummary } from '../hooks/use-dashboard-summary'

export const DashboardPage = () => {
    const { data: groups = [] } =
        useGroups()

    const summary =
        useDashboardSummary()

    return (
        <DashboardLayout>
            <div className='space-y-8'>
                <BalanceSummaryCard
                    netBalance={
                        summary.netBalance
                    }
                    totalOwed={
                        summary.totalOwed
                    }
                    totalOwes={
                        summary.totalOwes
                    }
                />

                <section>
                    <div className='mb-6 flex items-center gap-3'>
                        <div className='h-2.5 w-2.5 rounded-full bg-emerald-500' />

                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>
                            Your Active Groups
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                        {groups.map(
                            (group) => (
                                <GroupCard
                                    key={
                                        group._id
                                    }
                                    id={
                                        group._id
                                    }
                                    title={
                                        group.name
                                    }
                                    members={
                                        group
                                            .members
                                            .length
                                    }
                                />
                            )
                        )}

                        <CreateGroupCard />
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}