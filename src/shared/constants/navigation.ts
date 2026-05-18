import { LayoutDashboard, Users, Activity, User } from "lucide-react";

export const navigationItems = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Groups',
        path: '/groups',
        icon: Users,
    },
    {
        label: 'Activity',
        path: '/activity',
        icon: Activity,
    },
    {
        label: 'Profile',
        path: '/profile',
        icon: User,
    },
]