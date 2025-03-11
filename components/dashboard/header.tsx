import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const Header = ({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}) => {
    const { data: session } = useSession();
    const pathname = usePathname();

    // Function to get the current page title based on the pathname
    const getPageTitle = () => {
        const path = pathname;

        if (path === "/") return "Dashboard";
        if (path === "/clients") return "Clients";
        if (path === "/orders") return "Orders";
        if (path === "/labs") return "Labs";
        if (path === "/radiology") return "Radiology";
        if (path === "/x-ray") return "X-Ray";
        if (path === "/tests") return "Tests";
        if (path === "/settings") return "Settings";

        return "Dashboard";
    };

    const handleProfileClick = () => {
        // Add your profile click handler here
    };

    return (
        <header className="sticky top-0 z-30 h-16 flex w-full items-center justify-between border-b border-dark-100 bg-white px-4 dark:border-dark-600 dark:bg-dark-700">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="mr-4 rounded-md p-1.5 text-dark-500 hover:bg-dark-50 hover:text-dark-700 lg:hidden dark:text-dark-300 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                    aria-label="Toggle sidebar"
                    title="Toggle sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <h1 className="text-xl font-semibold text-primary-500 dark:text-dark-100">
                    {getPageTitle()}
                </h1>
            </div>

            <div className="lg:w-96">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-dark-400 dark:text-dark-300" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-md border border-dark-100 bg-white py-2 pl-10 pr-4 text-sm text-dark-800 placeholder-dark-400 focus:border-primary-500 focus:outline-none dark:border-dark-600 dark:bg-dark-700 dark:text-dark-100 dark:placeholder-dark-300"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    className="relative rounded-md p-1.5 text-dark-500 hover:bg-dark-50 hover:text-dark-700 dark:text-dark-300 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                    aria-label="Notifications"
                    title="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                        3
                    </span>
                </button>

                <div className="relative">
                    <button
                        onClick={handleProfileClick}
                        className="flex items-center space-x-2 rounded-md p-1.5 text-dark-500 hover:bg-dark-50 hover:text-dark-700 dark:text-dark-300 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                        aria-label="User profile"
                        title="User profile"
                    >
                        <div className="h-8 w-8 overflow-hidden rounded-full border border-dark-100 dark:border-dark-600">
                            <Image
                                src={String(session?.user?.image)}
                                alt="Profile"
                                width={32}
                                height={32}
                            />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};
