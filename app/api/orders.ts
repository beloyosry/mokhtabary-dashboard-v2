import { apiRequest } from "@/hooks/useApiRequest";
import { useQuery } from "@tanstack/react-query";

export const useOrdersList = (page: number, type: "lab" | "radiology") => {
    return useQuery({
        queryKey: ["orders", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/orders?page=${page}&type=${type}`,
                "GET",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            const perPage = fetchedData?.perPage;
            const totalPages = fetchedData?.lastPage;
            const currentPage = fetchedData?.currentPage;

            const data: Order[] = fetchedData?.items?.map((item: Order) => ({
                id: item.id,
                customerName: item.customerName,
                orderDate: item.orderDate,
                status: item.status,
                totalAmount: item.totalAmount,
            }));

            return { data, perPage, totalPages, currentPage };
        },
    });
};
