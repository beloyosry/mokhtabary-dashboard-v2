import { apiRequest } from "@/hooks/useApiRequest";
import { TestItem } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTestsList = (page: number) => {
    return useQuery({
        queryKey: ["tests", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/tests?page=${page}`,
                "GET"
            );

            if (error) {
                throw new Error(error.message);
            }

            const perPage = fetchedData?.perPage;
            const totalPages = fetchedData?.lastPage;
            const currentPage = fetchedData?.currentPage;

            const data: TestItem[] = fetchedData?.items?.map((item: any) => ({
                id: item.testId,
                testNameEn: item.testNameEn,
                testNameAr: item.testNameAr,
                numCode: item.numCode,
                contractPrice: item.contractPrice,
                beforePrice: item.beforePrice,
                afterPrice: item.afterPrice,
                offerPrice: item.offerPrice,
            }));

            return { data, perPage, totalPages, currentPage };
        },
    });
};

export const useTest = (id: number) => {
    return useQuery({
        queryKey: ["test", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/tests/${id}`,
                "GET",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return fetchedData;
        },
    });
};

export const useInsertTest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            num_code: number;
            code: string;
            name_en: string;
            name_ar: string;
        }) {
            const { error, data: newTest } = await apiRequest(
                "/tests",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return newTest;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["tests"],
            });
        },
    });
};

export const useUpdateTest = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            num_code: number;
            code: string;
            name_en: string;
            name_ar: string;
        }) {
            const { error, data: updatedTest } = await apiRequest(
                `/tests/${id}`,
                "PUT",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedTest;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["tests"],
            });
        },
    });
};

export const useDeleteTest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/tests/${id}`,
                "DELETE",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }
        },

        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["tests"],
            });
        },
    });
};
