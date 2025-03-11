import { apiRequest } from "@/hooks/useApiRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Branch } from "@/Types";

// Radiology
export const useRadiologyList = (page: number) => {
    return useQuery({
        queryKey: ["radiology", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/radiologies?page=${page}`,
                "GET"
            );

            if (error) {
                throw new Error(error.message);
            }

            const perPage = fetchedData?.perPage;
            const totalPages = fetchedData?.lastPage;
            const currentPage = fetchedData?.currentPage;

            const data = fetchedData.items;

            return { data, perPage, totalPages, currentPage };
        },
    });
};

export const useRadiology = (id: number) => {
    return useQuery({
        queryKey: ["radiologies"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/radiologies/${id}`,
                "GET",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

export const useInsertRadiology = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            name: string;
            email: string;
            phone: string;
            password: string;
            country_id: number;
            governorate_id: number;
            city_id: number;
            street: string;
            description: string;
            img: string;
        }) {
            const { error, data: newRadiology } = await apiRequest(
                "/register/radiology",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return newRadiology;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["radiology"],
            });
        },
    });
};

export const useUpdateRadiology = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            name: string;
            country_id: number;
            governorate_id: number;
            city_id: number;
            street: string;
            description: string;
            img: string;
        }) {
            const { error, data: updatedRadiology } = await apiRequest(
                `/radiologies/${id}`,
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedRadiology;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["radiologies"],
            });
        },
    });
};

export const useDeleteRadiology = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/radiologies/${id}`,
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
                queryKey: ["radiology"],
            });
        },
    });
};

// Branches
export const useRadiologyBranch = (id: number) => {
    return useQuery({
        queryKey: ["branch"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/radiologies-branches/${id}`,
                "GET",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

export const useInsertRadiologyBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: Branch) {
            const { error, data: newBranch } = await apiRequest(
                "/register/radiologyBranch",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return newBranch;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["radiologies"],
            });
        },
    });
};

export const useUpdateRadiologyBranch = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            name: string;
            country_id: number;
            governorate_id: number;
            city_id: number;
            street: string;
            description: string;
        }) {
            const { error, data: updatedBranch } = await apiRequest(
                `/radiologies-branches/${id}`,
                "PUT",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedBranch;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["radiologies"],
            });
        },
    });
};

export const useDeleteRadiologyBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/radiologies-branches/${id}`,
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
                queryKey: ["radiologies"],
            });
        },
    });
};

// XRays
export const useRadiologyXRays = (id: number, page: number) => {
    return useQuery({
        queryKey: ["x-rays", id, page],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/radiology-x-rays/${id}/all?page=${page}`,
                "GET"
            );

            if (error) {
                throw new Error(error.message);
            }

            const perPage = data?.perPage;
            const totalPages = data?.lastPage;
            const currentPage = data?.currentPage;
            const items = data?.items;
            const info = data?.info;

            return { items, perPage, info, totalPages, currentPage };
        },
    });
};

export const useRadiologyXRay = (id: number) => {
    return useQuery({
        queryKey: ["x-ray"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/radiology-x-rays/${id}`,
                "GET",
                null,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

export const useInsertRadiologyXRay = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            x_ray_id: number;
            radiology_id: number;
            contract_price: number;
            before_price: number;
            after_price: number;
            offer_price: number;
        }) {
            const { error, data: newXRay } = await apiRequest(
                "/radiology-x-rays",
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
                queryKey: ["x-rays"],
            });
        },
    });
};
