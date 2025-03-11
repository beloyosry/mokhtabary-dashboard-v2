import { apiRequest } from "@/hooks/useApiRequest";
import { User, Branch } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Labs
export const useLabList = (page: number) => {
    return useQuery({
        queryKey: ["labs", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/labs?page=${page}`,
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

export const useLab = (id: number) => {
    return useQuery({
        queryKey: ["lab"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/labs/${id}`,
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

export const useInsertLab = () => {
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
            const { error, data: newLab } = await apiRequest(
                "/register/lab",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return newLab;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["labs"],
            });
        },
    });
};

export const useUpdateLab = (id: number) => {
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
            const { error, data: updatedLab } = await apiRequest(
                `/labs/${id}`,
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedLab;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["labs"],
            });
        },
    });
};

export const useDeleteLab = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/labs/${id}`,
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
                queryKey: ["labs"],
            });
        },
    });
};

// Branches
export const useLabBranch = (id: number) => {
    return useQuery({
        queryKey: ["branch"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/labs-branches/${id}`,
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

export const useInsertLabBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: Branch) {
            const { error, data: newBranch } = await apiRequest(
                "/register/labBranch",
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
                queryKey: ["labs"],
            });
        },
    });
};

export const useUpdateLabBranch = (id: number) => {
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
                `/labs-branches/${id}`,
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
                queryKey: ["labs"],
            });
        },
    });
};

export const useDeleteLabBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/labs-branches/${id}`,
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
                queryKey: ["labs"],
            });
        },
    });
};

// Tests
export const useLabTests = (id: number, page: number) => {
    return useQuery({
        queryKey: ["tests", id, page],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/lab-tests/${id}/all?page=${page}`,
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

export const useLabTest = (id: number) => {
    return useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const { data, error } = await apiRequest(
                `/lab-tests/${id}`,
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

export const useInsertLabTest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            test_id: number;
            lab_id: number;
            contract_price: number;
            before_price: number;
            after_price: number;
            offer_price: number;
        }) {
            const { error, data: newTest } = await apiRequest(
                "/lab-tests",
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
