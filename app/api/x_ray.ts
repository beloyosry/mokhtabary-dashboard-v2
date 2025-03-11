import { apiRequest } from "@/hooks/useApiRequest";
import { XRayItem } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useXRayList = (page: number) => {
    return useQuery({
        queryKey: ["x_ray", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/x-rays?page=${page}`,
                "GET"
            );

            if (error) {
                throw new Error(error.message);
            }

            const perPage = fetchedData?.perPage;
            const totalPages = fetchedData?.lastPage;
            const currentPage = fetchedData?.currentPage;

            const data: XRayItem[] = fetchedData?.items?.map((item: any) => ({
                id: item.xrayId,
                xrayNameEn: item.xrayNameEn,
                xrayNameAr: item.xrayNameAr,
                numCode: item.numCode,
                contractPrice: item?.contractPrice,
                beforePrice: item?.beforePrice,
                afterPrice: item?.afterPrice,
                offerPrice: item?.offerPrice,
            }));

            return { data, perPage, totalPages, currentPage };
        },
    });
};

export const useXRay = (id: number) => {
    return useQuery({
        queryKey: ["x_ray", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/x-rays/${id}`,
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

export const useInsertXRay = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            num_code: number;
            code: string;
            name_en: string;
            name_ar: string;
        }) {
            const { error, data: newXRay } = await apiRequest(
                "/x-rays",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return newXRay;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["x_ray"],
            });
        },
    });
};

export const useUpdateXRay = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            num_code: number;
            code: string;
            name_en: string;
            name_ar: string;
        }) {
            const { error, data: updatedXRay } = await apiRequest(
                `/x-rays/${id}`,
                "PUT",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedXRay;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["x_ray"],
            });
        },
    });
};

export const useDeleteXRay = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/x-rays/${id}`,
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
                queryKey: ["x_ray"],
            });
        },
    });
};
