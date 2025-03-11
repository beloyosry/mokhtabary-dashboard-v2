"use client";

import { useState } from "react";
import { DataTable } from "@/components/dashboard/data-table";
import { useAddToast } from "@/hooks/useAddToast";
import Link from "next/link";

// Define the Client interface
interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    status: "active" | "inactive";
}

export default function ClientsPage() {
    const addToast = useAddToast();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Mocked client data for demonstration
    const mockClients: Client[] = [
        {
            id: "1",
            name: "Ahmed Mohamed",
            email: "ahmed@example.com",
            phone: "+201234567890",
            address: "Cairo, Egypt",
            createdAt: "2023-01-15",
            status: "active",
        },
        {
            id: "2",
            name: "Sara Ahmed",
            email: "sara@example.com",
            phone: "+201123456789",
            address: "Alexandria, Egypt",
            createdAt: "2023-02-20",
            status: "active",
        },
        {
            id: "3",
            name: "Mohamed Ibrahim",
            email: "mohamed@example.com",
            phone: "+201234567891",
            address: "Giza, Egypt",
            createdAt: "2023-03-05",
            status: "inactive",
        },
        {
            id: "4",
            name: "Aisha Hassan",
            email: "aisha@example.com",
            phone: "+201234567892",
            address: "Luxor, Egypt",
            createdAt: "2023-03-10",
            status: "active",
        },
        {
            id: "5",
            name: "Mahmoud Ali",
            email: "mahmoud@example.com",
            phone: "+201234567893",
            address: "Aswan, Egypt",
            createdAt: "2023-04-15",
            status: "active",
        },
        {
            id: "6",
            name: "Lina Mahmoud",
            email: "lina@example.com",
            phone: "+201234567894",
            address: "Cairo, Egypt",
            createdAt: "2023-05-10",
            status: "inactive",
        },
        {
            id: "1",
            name: "Ahmed Mohamed",
            email: "ahmed@example.com",
            phone: "+201234567890",
            address: "Cairo, Egypt",
            createdAt: "2023-01-15",
            status: "active",
        },
        {
            id: "2",
            name: "Sara Ahmed",
            email: "sara@example.com",
            phone: "+201123456789",
            address: "Alexandria, Egypt",
            createdAt: "2023-02-20",
            status: "active",
        },
        {
            id: "3",
            name: "Mohamed Ibrahim",
            email: "mohamed@example.com",
            phone: "+201234567891",
            address: "Giza, Egypt",
            createdAt: "2023-03-05",
            status: "inactive",
        },
        {
            id: "4",
            name: "Aisha Hassan",
            email: "aisha@example.com",
            phone: "+201234567892",
            address: "Luxor, Egypt",
            createdAt: "2023-03-10",
            status: "active",
        },
        {
            id: "5",
            name: "Mahmoud Ali",
            email: "mahmoud@example.com",
            phone: "+201234567893",
            address: "Aswan, Egypt",
            createdAt: "2023-04-15",
            status: "active",
        },
        {
            id: "6",
            name: "Lina Mahmoud",
            email: "lina@example.com",
            phone: "+201234567894",
            address: "Cairo, Egypt",
            createdAt: "2023-05-10",
            status: "inactive",
        },
    ];

    // Filter clients based on search query
    const filteredClients = mockClients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery)
    );

    const pageSize = 10;
    const totalItems = filteredClients.length;

    // Get paginated data
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns = [
        {
            header: "Name",
            accessor: "name" as keyof Client,
        },
        {
            header: "Email",
            accessor: "email" as keyof Client,
        },
        {
            header: "Phone",
            accessor: "phone" as keyof Client,
        },
        {
            header: "Address",
            accessor: "address" as keyof Client,
        },
        {
            header: "Created At",
            accessor: "createdAt" as keyof Client,
        },
        {
            header: "Status",
            accessor: (client: Client) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        client.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {client.status}
                </span>
            ),
        },
        {
            header: "Actions",
            accessor: (client: Client) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                    >
                        View
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="rounded bg-yellow-500 px-2 py-1 text-xs text-white hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
            className: "text-right",
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                <Link
                    href="/clients/add"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add New Client
                </Link>
            </div>

            <div className="flex w-full items-center space-x-4">
                <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Search clients..."
                    />
                </div>
                <div>
                    <label htmlFor="statusFilter" className="sr-only">
                        Filter by status
                    </label>
                    <select
                        id="statusFilter"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Filter by status
                        </option>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={paginatedClients}
                keyExtractor={(client) => client.id}
                isLoading={isLoading}
                pagination={{
                    pageSize,
                    totalItems,
                    currentPage,
                    onPageChange: setCurrentPage,
                }}
                emptyMessage="No clients found. Try adjusting your search."
            />
        </div>
    );
}
