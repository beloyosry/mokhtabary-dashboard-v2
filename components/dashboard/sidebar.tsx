"use client";

import { usePathname } from "next/navigation";
import {
    ChevronDown,
    ChartPie,
    Files,
    ShoppingBag,
    Inbox,
    Lock,
    Settings,
    type Icon as LucideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import Link from "next/link";

type Props = {
    isSidebarOpen: boolean;
};

type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

type SidebarItem = {
    name: string;
    icon: Icon;
    active?: boolean;
    href?: string;
    items?: {
        name: string;
        href: string;
        active: boolean;
    }[];
    count?: number;
};

export const Sidebar = ({ isSidebarOpen }: Props) => {
    const pathname = usePathname();

    const sectionItems: SidebarItem[] = [
        {
            name: "Dashboard",
            icon: ChartPie,
            href: "/",
            active: pathname === "/",
        },
        {
            name: "User Management",
            icon: Files,
            items: [
                {
                    name: "Profile",
                    href: "/profile",
                    active: pathname?.startsWith("/profile") as boolean,
                },
                {
                    name: "Clients",
                    href: "/clients",
                    active: pathname?.startsWith("/clients") as boolean,
                },
            ],
        },
        {
            name: "Laboratory Management",
            icon: ShoppingBag,
            items: [
                {
                    name: "Tests & X-Ray",
                    href: "/tests-x-ray",
                    active: pathname?.startsWith("/tests-x-ray") as boolean,
                },
                {
                    name: "Labs & Radiology",
                    href: "/labs-radiology",
                    active: pathname?.startsWith("/labs-radiology") as boolean,
                },
            ],
        },
        {
            name: "Orders & Transactions",
            icon: Inbox,
            items: [
                {
                    name: "Orders",
                    href: "/orders",
                    active: pathname?.startsWith("/orders") as boolean,
                },
                {
                    name: "invoice",
                    href: "/invoice",
                    active: pathname?.startsWith("/invoice") as boolean,
                },
                {
                    name: "Deals",
                    href: "/deals",
                    active: pathname?.startsWith("/deals") as boolean,
                },
            ],
        },
        {
            name: "Settings & Administration",
            icon: Lock,
            items: [
                {
                    name: "Settings",
                    href: "/settings",
                    active: pathname?.startsWith("/settings") as boolean,
                },
                {
                    name: "Ledger",
                    href: "/ledger",
                    active: pathname?.startsWith("/ledger") as boolean,
                },
                {
                    name: "Auditing",
                    href: "/auditing",
                    active: pathname?.startsWith("/auditing") as boolean,
                },
            ],
        },
        {
            name: "Chat",
            icon: Inbox,
            href: "/chat",
            active: pathname?.startsWith("/chat") as boolean,
        },
    ];

    const [collapsedItem, setCollapsedItem] = useState<string | null>(null);

    const toggleCollapse = (item: SidebarItem) => {
        const isActiveItem =
            item.items?.some((subItem) => subItem.active) ||
            pathname === item.href;
        setCollapsedItem(
            collapsedItem === item.name && !isActiveItem ? null : item.name
        );
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <aside
            className={`fixed top-0 ${
                isSidebarOpen ? "left-[52%]" : "left-0"
            } z-40 w-64 h-screen pt-14 transition-all duration-300 ease-in-out -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        >
            {/* Sidebar content */}
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                <form className="md:hidden mb-2">
                    <label htmlFor="sidebar-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="sidebar-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search"
                        />
                    </div>
                </form>

                {/* First section */}
                <ul className="space-y-2">
                    {sectionItems.map((item) => (
                        <li key={item.name}>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex items-center p-2 text-base font-medium ${
                                        item.active
                                            ? "text-primary-700"
                                            : "text-gray-900 dark:text-white hover:bg-gray-100"
                                    }  rounded-lg dark:hover:bg-gray-700 group`}
                                >
                                    <item.icon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ml-3 text-sm whitespace-nowrap">
                                        {item.name}
                                    </span>
                                    {item.count && (
                                        <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
                                            {item.count}
                                        </span>
                                    )}
                                </Link>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="flex items-center p-2 w-full text-base font-medium  text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        onClick={() => toggleCollapse(item)}
                                    >
                                        <item.icon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                        <span className="flex-1 ml-3 text-sm text-left whitespace-nowrap">
                                            {item.name}
                                        </span>
                                        <ChevronDown
                                            size={20}
                                            className={
                                                collapsedItem === item.name
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        />
                                    </button>
                                    {collapsedItem === item.name && (
                                        <ul className="py-2 space-y-2">
                                            <li>
                                                {item?.items &&
                                                    item.items.map(
                                                        (subItem, index) => (
                                                            <Link
                                                                key={index}
                                                                href={
                                                                    subItem.href
                                                                }
                                                                className={`flex items-center p-2 pl-11 w-full text-base font-medium ${
                                                                    subItem.active
                                                                        ? "text-primary-700"
                                                                        : "text-gray-900 dark:text-white hover:bg-gray-100"
                                                                }  rounded-lg transition duration-75 group dark:hover:bg-gray-700`}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        )
                                                    )}
                                            </li>
                                        </ul>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom bar */}
            <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
                {/* Settings */}
                <Link
                    href="/profile"
                    className="justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 group"
                >
                    <Settings size={20} />

                    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 z-10 inline-block rounded-lg text-white bg-gray-900 px-3 py-2 text-sm font-medium shadow-sm transition-all duration-300 dark:bg-gray-700">
                        Settings page
                        <div className="tooltip-arrow" />
                    </div>
                </Link>

                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
        </aside>
    );
};
