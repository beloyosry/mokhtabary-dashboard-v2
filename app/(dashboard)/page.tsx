"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Sample Card component with statistics
const DashboardStatCard = ({
    title,
    value,
    icon,
    trend,
    trendValue,
}: {
    title: string;
    value: string | number;
    icon: string;
    trend: "up" | "down" | "none";
    trendValue?: string;
}) => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <span className="rounded-full bg-blue-100 p-2 text-blue-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        {icon === "users" && (
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        )}
                        {icon === "document" && (
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            />
                        )}
                        {icon === "cash" && (
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        )}
                        {icon === "chart" && (
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        )}
                    </svg>
                </span>
            </div>
            <div className="mt-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                    {value}
                </h2>
                <div className="mt-2 flex items-center">
                    {trend !== "none" && (
                        <>
                            <span
                                className={`mr-1 text-sm ${
                                    trend === "up"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    {trend === "up" ? (
                                        <path
                                            fillRule="evenodd"
                                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                            clipRule="evenodd"
                                        />
                                    ) : (
                                        <path
                                            fillRule="evenodd"
                                            d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                                            clipRule="evenodd"
                                        />
                                    )}
                                </svg>
                            </span>
                            <span
                                className={`text-sm ${
                                    trend === "up"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {trendValue}
                            </span>
                        </>
                    )}
                    <span className="ml-2 text-sm text-gray-500">
                        vs last month
                    </span>
                </div>
            </div>
        </div>
    );
};

export default function DashboardHomePage() {
    const { data: session } = useSession();

    // Example of using react-query to fetch dashboard data
    // Replace with your actual API endpoints
    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: async () => {
            try {
                // This would be replaced with your actual API endpoint
                // const response = await axios.get('/api/dashboard/stats', {
                //   headers: {
                //     Authorization: `Bearer ${session?.accessToken}`,
                //   },
                // });
                // return response.data;

                // Mock data for demonstration
                return {
                    clients: 245,
                    clientsTrend: "up",
                    clientsTrendValue: "12%",
                    orders: 158,
                    ordersTrend: "up",
                    ordersTrendValue: "8%",
                    revenue: "$48,250",
                    revenueTrend: "up",
                    revenueTrendValue: "15%",
                    tests: 823,
                    testsTrend: "down",
                    testsTrendValue: "3%",
                };
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
                throw error;
            }
        },
        enabled: !!session, // Only fetch when session is available
    });

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }
    return;

    // return (
    //     <div>
    //         <div className="mb-8">
    //             <h1 className="text-2xl font-bold text-gray-900">
    //                 Dashboard Overview
    //             </h1>
    //             <p className="text-gray-600">
    //                 Welcome back, {session?.user?.name || "User"}! Here's what's
    //                 happening today.
    //             </p>
    //         </div>

    //         {/* Stats Cards */}
    //         <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //             <DashboardStatCard
    //                 title="Total Clients"
    //                 value={dashboardData?.clients || 0}
    //                 icon="users"
    //                 trend={
    //                     (dashboardData?.clientsTrend as
    //                         | "up"
    //                         | "down"
    //                         | "none") || "none"
    //                 }
    //                 trendValue={dashboardData?.clientsTrendValue || ""}
    //             />
    //             <DashboardStatCard
    //                 title="Active Orders"
    //                 value={dashboardData?.orders || 0}
    //                 icon="document"
    //                 trend={
    //                     (dashboardData?.ordersTrend as
    //                         | "up"
    //                         | "down"
    //                         | "none") || "none"
    //                 }
    //                 trendValue={dashboardData?.ordersTrendValue || ""}
    //             />
    //             <DashboardStatCard
    //                 title="Monthly Revenue"
    //                 value={dashboardData?.revenue || "$0"}
    //                 icon="cash"
    //                 trend={
    //                     (dashboardData?.revenueTrend as
    //                         | "up"
    //                         | "down"
    //                         | "none") || "none"
    //                 }
    //                 trendValue={dashboardData?.revenueTrendValue || ""}
    //             />
    //             <DashboardStatCard
    //                 title="Tests Completed"
    //                 value={dashboardData?.tests || 0}
    //                 icon="chart"
    //                 trend={
    //                     (dashboardData?.testsTrend as "up" | "down" | "none") ||
    //                     "none"
    //                 }
    //                 trendValue={dashboardData?.testsTrendValue || ""}
    //             />
    //         </div>

    //         {/* Recent Activity Section */}
    //         <div className="mb-8">
    //             <h2 className="mb-4 text-xl font-bold text-gray-900">
    //                 Recent Activity
    //             </h2>
    //             <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
    //                 <ul className="divide-y divide-gray-200">
    //                     {Array.from({ length: 5 }).map((_, index) => (
    //                         <li key={index} className="px-6 py-4">
    //                             <div className="flex items-center space-x-4">
    //                                 <div className="flex-shrink-0">
    //                                     <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
    //                                         <svg
    //                                             xmlns="http://www.w3.org/2000/svg"
    //                                             className="h-4 w-4"
    //                                             viewBox="0 0 20 20"
    //                                             fill="currentColor"
    //                                         >
    //                                             <path
    //                                                 fillRule="evenodd"
    //                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
    //                                                 clipRule="evenodd"
    //                                             />
    //                                         </svg>
    //                                     </div>
    //                                 </div>
    //                                 <div className="min-w-0 flex-1">
    //                                     <p className="truncate text-sm font-medium text-gray-900">
    //                                         New order #
    //                                         {Math.floor(Math.random() * 1000) +
    //                                             1000}{" "}
    //                                         was created
    //                                     </p>
    //                                     <p className="truncate text-sm text-gray-500">
    //                                         Client: Example Client {index + 1}
    //                                     </p>
    //                                 </div>
    //                                 <div>
    //                                     <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
    //                                         {Math.floor(Math.random() * 60) + 1}{" "}
    //                                         min ago
    //                                     </span>
    //                                 </div>
    //                             </div>
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         </div>

    //         {/* Quick Actions */}
    //         <div>
    //             <h2 className="mb-4 text-xl font-bold text-gray-900">
    //                 Quick Actions
    //             </h2>
    //             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    //                 {[
    //                     {
    //                         name: "Add Client",
    //                         path: "/dashboard/clients/new",
    //                         icon: "user-add",
    //                     },
    //                     {
    //                         name: "Create Order",
    //                         path: "/dashboard/orders/new",
    //                         icon: "document-add",
    //                     },
    //                     {
    //                         name: "View Reports",
    //                         path: "/dashboard/reports",
    //                         icon: "chart-square-bar",
    //                     },
    //                     {
    //                         name: "System Settings",
    //                         path: "/dashboard/settings",
    //                         icon: "cog",
    //                     },
    //                 ].map((action, index) => (
    //                     <a
    //                         key={index}
    //                         href={action.path}
    //                         className="flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
    //                     >
    //                         <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600">
    //                             <svg
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                                 className="h-5 w-5"
    //                                 viewBox="0 0 20 20"
    //                                 fill="currentColor"
    //                             >
    //                                 {action.icon === "user-add" && (
    //                                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
    //                                 )}
    //                                 {action.icon === "document-add" && (
    //                                     <path
    //                                         fillRule="evenodd"
    //                                         d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
    //                                         clipRule="evenodd"
    //                                     />
    //                                 )}
    //                                 {action.icon === "chart-square-bar" && (
    //                                     <path
    //                                         fillRule="evenodd"
    //                                         d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
    //                                         clipRule="evenodd"
    //                                     />
    //                                 )}
    //                                 {action.icon === "cog" && (
    //                                     <path
    //                                         fillRule="evenodd"
    //                                         d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
    //                                         clipRule="evenodd"
    //                                     />
    //                                 )}
    //                             </svg>
    //                         </div>
    //                         <div>
    //                             <h3 className="text-sm font-medium text-gray-900">
    //                                 {action.name}
    //                             </h3>
    //                         </div>
    //                     </a>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );
}
