"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        window.onscroll = () => setSidebarOpen(false);
    }, []);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto"></div>
                    <p className="text-lg text-dark-700 dark:text-dark-200">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="antialiased bg-[#f5f7fa] dark:bg-gray-900">
            {/* Navbar */}
            <Header onToggleSidebar={toggleSidebar} />

            {/* Sidebar */}
            <Sidebar isSidebarOpen={sidebarOpen} />

            {/* Main Content */}
            <main className="md:ml-64 h-screen flex justify-center items-center ">
                <div className="relative h-[80vh] w-[85vw] dark:bg-gray-900 antialiased">
                    <div className="bg-white h-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
                <div className="flex justify-end items-center gap-10">
                    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a
                                href="#"
                                className="mr-4 hover:underline hover:text-primary-500 transition-all duration-300 ease-in-out font-bold text-sm md:mr-6 "
                            >
                                Terms of service
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="mr-4 hover:underline hover:text-primary-500 transition-all duration-300 ease-in-out font-bold text-sm md:mr-6"
                            >
                                Privacy police
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline hover:text-primary-500 transition-all duration-300 ease-in-out font-bold text-sm"
                            >
                                Contact information.
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
