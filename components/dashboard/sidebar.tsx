"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Settings,
    ShoppingCart,
    Users,
    CreditCard,
    LogOut,
    User2,
    TestTube,
    Radiation,
    MessageCircle,
    NotepadText,
    MessageSquareWarningIcon,
    Handshake
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    const links = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Profile", href: "/profile", icon: User2 },
        { name: "Test & X-Ray", href: "/tests", icon: TestTube },
        { name: "Lab & Radiology", href: "/labs", icon: Radiation },
        { name: "Clients", href: "/clients", icon: Users },
        { name: "Setting", href: "/settings", icon: Settings },
        { name: "Deals", href: "/deals", icon: Handshake },
        { name: "Chat", href: "/chat", icon: MessageCircle },
        { name: "Order", href: "/orders", icon: ShoppingCart },
        { name: "Ledger", href: "/ledger", icon: NotepadText },
        { name: "Auditing", href: "/auditing", icon: MessageSquareWarningIcon },
        { name: "Payment Method", href: "/payment-method", icon: CreditCard },
    ];

    return (
        <aside
            className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto border-r border-dark-100 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 dark:border-dark-600 dark:bg-dark-700`}
        >
            <div className="flex h-16 items-center justify-between border-b border-dark-100 px-4 dark:border-dark-600">
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary-50 p-1 dark:bg-dark-600">
                        <PackageIcon className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-dark-700 dark:text-dark-100">
                            Mokhtabary
                        </h3>
                        <p className="text-xs text-dark-400 dark:text-dark-300">
                            Admin Dashboard
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <div className="space-y-1 py-2">
                    <h4 className="px-2 py-1 text-xs font-semibold uppercase text-dark-400 dark:text-dark-300">
                        Main
                    </h4>
                    {links.map((link) => {
                        const isCurrentPath = isActive(link.href);
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium ${
                                    isCurrentPath
                                        ? "bg-primary-50 text-primary-500 dark:bg-dark-600 dark:text-primary-400"
                                        : "text-dark-500 hover:bg-dark-50 hover:text-dark-700 dark:text-dark-200 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
                <button
                    onClick={handleSignOut}
                    className="mt-auto flex w-full items-center gap-2 cursor-pointer rounded-md px-2 py-2 text-sm font-medium text-dark-500 hover:bg-dark-50 hover:text-dark-700 dark:text-dark-200 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
};
