"use client";

import { useEffect, Dispatch, SetStateAction } from "react";

export const usePagination = <T,>(
    currentPage: number = 1,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    data: T[],
    itemsPerPage: number = 10,
    totalPages: number = Math.ceil(data.length / itemsPerPage),
    fetchData: (page: number) => void
) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const setPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        if (fetchData !== undefined) {
            fetchData(currentPage); // Call fetchData whenever currentPage changes
        }
    }, [currentPage, fetchData]);

    return {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
};
