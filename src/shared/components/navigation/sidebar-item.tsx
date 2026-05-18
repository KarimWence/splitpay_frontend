import { Link } from "react-router-dom";

interface Props {
    icon: React.ElementType
    label: string
    path: string
    isActive: boolean
}

export const SidebarItem = ({
    icon: Icon,
    label,
    path,
    isActive
}: Props) => {
    return (
        <Link
            to={path}
            className={`flex h-12 items-center gap-4 rounded-xl px-4 font-medium transition ${
                isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            >
            <Icon size={20} />

            <span>{label}</span>
        </Link>
    )
}