import { useMemo } from 'react'

import { useAuthStore } from '@/features/auth/store/auth.store'

import { useGroupBalances } from '@/features/expenses/hooks/use-group-expenses'

export const useGroupBalanceSummary =
    (groupId: string) => {
        const user =
            useAuthStore(
                (state) =>
                    state.user
            )

        const { data: balances } =
            useGroupBalances(
                groupId
            )

        const summary = useMemo(() => {
            if (
                !balances ||
                !user
            ) {
                return {
                    amount: 0,

                    type: 'owed' as const,
                }
            }

            const balance =
                balances[
                    user.id
                ] || 0

            return {
                amount:
                    Math.abs(
                        balance
                    ),

                type:
                    balance >= 0
                        ? ('owed' as const)
                        : ('owe' as const),
            }
        }, [balances, user])

        return summary
    }