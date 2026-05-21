import { useMemo } from 'react'

import { useQueries } from '@tanstack/react-query'

import { useGroups } from '@/features/groups/hooks/use-groups'

import { getGroupBalancesRequest } from '@/features/expenses/api/expenses.api'

import { useAuthStore } from '@/features/auth/store/auth.store'

export const useDashboardSummary =
    () => {
        const user =
            useAuthStore(
                (state) =>
                    state.user
            )

        const { data: groups = [] } =
            useGroups()

        const balancesQueries =
            useQueries({
                queries: groups.map(
                    (group) => ({
                        queryKey: [
                            'group-balances',
                            group._id,
                        ],

                        queryFn: () =>
                            getGroupBalancesRequest(
                                group._id
                            ),

                        enabled:
                            !!group._id,
                    })
                ),
            })

        const summary = useMemo(() => {
            let totalOwed = 0

            let totalOwes = 0

            for (const query of balancesQueries) {
                const balances =
                    query.data

                if (
                    !balances ||
                    !user
                )
                    continue

                const userBalance =
                    balances[
                        user.id
                    ] || 0

                if (
                    userBalance > 0
                ) {
                    totalOwed +=
                        userBalance
                } else {
                    totalOwes +=
                        Math.abs(
                            userBalance
                        )
                }
            }

            return {
                groupsCount:
                    groups.length,

                totalOwed,

                totalOwes,

                netBalance:
                    totalOwed -
                    totalOwes,
            }
        }, [
            balancesQueries,

            groups,

            user,
        ])

        return summary
    }