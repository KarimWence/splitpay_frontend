import {
    Home,
    Users,
    Mail,
    User,
} from 'lucide-react'

export const navigationItems = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: Home,
    },
    {
        label: 'Groups',
        path: '/groups',
        icon: Users,
    },
    {
        label: 'Invitations',
        path: '/invitations',
        icon: Mail,
    },
    {
        label: 'Profile',
        path: '/profile',
        icon: User,
    },
]