"use client";

import { useState, ReactNode } from "react";

interface TableColumn<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
    pagination?: {
        pageSize: number;
        totalItems: number;
        currentPage: number;
        onPageChange: (page: number) => void;
    };
}

export function DataTable<T>({
    columns,
    data,
    keyExtractor,
    emptyMessage = "No data available",
    onRowClick,
    isLoading = false,
    pagination,
}: DataTableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null;
        direction: "ascending" | "descending";
    }>({
        key: null,
        direction: "ascending",
    });

    const getValueByAccessor = (
        item: T,
        accessor: TableColumn<T>["accessor"]
    ): ReactNode => {
        if (typeof accessor === "function") {
            return accessor(item);
        }

        // Get the value from the item
        const value = item[accessor];

        // Handle nullish values
        if (value === null || value === undefined) {
            return "";
        }

        // Handle objects and arrays by converting to string
        if (typeof value === "object") {
            return String(value);
        }

        // Return primitives directly (string, number, boolean)
        return value as ReactNode;
    };

    const handleSort = (key: keyof T) => {
        let direction: "ascending" | "descending" = "ascending";

        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA === valueB) return 0;

        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "ascending"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        if (sortConfig.direction === "ascending") {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    const totalPages = pagination
        ? Math.ceil(pagination.totalItems / pagination.pageSize)
        : 1;

    return (
        <div className="overflow-hidden overflow-y-auto h-[calc(100vh-20rem)] rounded-lg border border-gray-200 bg-white shadow">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${
                                        typeof column.accessor === "string"
                                            ? "cursor-pointer hover:bg-gray-100"
                                            : ""
                                    } ${column.className || ""}`}
                                    onClick={() => {
                                        if (
                                            typeof column.accessor === "string"
                                        ) {
                                            handleSort(
                                                column.accessor as keyof T
                                            );
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                        {column.header}
                                        {sortConfig.key === column.accessor && (
                                            <span className="ml-1">
                                                {sortConfig.direction ===
                                                "ascending"
                                                    ? "↑"
                                                    : "↓"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    <div className="flex justify-center">
                                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : sortedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((item) => (
                                <tr
                                    key={keyExtractor(item)}
                                    className={`${
                                        onRowClick
                                            ? "cursor-pointer hover:bg-gray-50"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        onRowClick && onRowClick(item)
                                    }
                                >
                                    {columns.map((column, columnIndex) => (
                                        <td
                                            key={columnIndex}
                                            className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 ${
                                                column.className || ""
                                            }`}
                                        >
                                            {getValueByAccessor(
                                                item,
                                                column.accessor
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            disabled={pagination.currentPage === 1}
                            onClick={() =>
                                pagination.onPageChange(
                                    pagination.currentPage - 1
                                )
                            }
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            disabled={pagination.currentPage === totalPages}
                            onClick={() =>
                                pagination.onPageChange(
                                    pagination.currentPage + 1
                                )
                            }
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing{" "}
                                <span className="font-medium">
                                    {(pagination.currentPage - 1) *
                                        pagination.pageSize +
                                        1}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {Math.min(
                                        pagination.currentPage *
                                            pagination.pageSize,
                                        pagination.totalItems
                                    )}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {pagination.totalItems}
                                </span>{" "}
                                results
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                                aria-label="Pagination"
                            >
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => pagination.onPageChange(1)}
                                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">First</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() =>
                                        pagination.onPageChange(
                                            pagination.currentPage - 1
                                        )
                                    }
                                    className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {Array.from({
                                    length: Math.min(5, totalPages),
                                }).map((_, i) => {
                                    let pageNumber;
                                    if (totalPages <= 5) {
                                        pageNumber = i + 1;
                                    } else if (pagination.currentPage <= 3) {
                                        pageNumber = i + 1;
                                    } else if (
                                        pagination.currentPage >=
                                        totalPages - 2
                                    ) {
                                        pageNumber = totalPages - 4 + i;
                                    } else {
                                        pageNumber =
                                            pagination.currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() =>
                                                pagination.onPageChange(
                                                    pageNumber
                                                )
                                            }
                                            aria-current={
                                                pagination.currentPage ===
                                                pageNumber
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium ${
                                                pagination.currentPage ===
                                                pageNumber
                                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                    : "bg-white text-gray-500 hover:bg-gray-50"
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={
                                        pagination.currentPage === totalPages
                                    }
                                    onClick={() =>
                                        pagination.onPageChange(
                                            pagination.currentPage + 1
                                        )
                                    }
                                    className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    disabled={
                                        pagination.currentPage === totalPages
                                    }
                                    onClick={() =>
                                        pagination.onPageChange(totalPages)
                                    }
                                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Last</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
