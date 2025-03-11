import { apiRequest } from "@/hooks/useApiRequest";
import { User } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClientsList = (page: number) => {
    return useQuery({
        queryKey: ["clients", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/clients?page=${page}`,
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

            const data: User[] = fetchedData?.items?.map((item: User) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                countryInfo: item?.countryInfo?.name_en,
                cityInfo: item?.cityInfo?.name_en,
                governorateInfo: item?.governorateInfo?.name_en,
                street: item?.street,
                phoneVerifiedAt: item?.phoneVerifiedAt,
            }));

            return { data, perPage, totalPages, currentPage };
        },
    });
};

export const useClient = (id: number) => {
    return useQuery({
        queryKey: ["client", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/clients/${id}`,
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

export const useUpdateClient = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            name: string;
            country_id: number;
            governorate_id: number;
            city_id: number;
            street: string;
            img: string;
        }) {
            const { error, data: updatedClient } = await apiRequest(
                `/clients/${id}`,
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedClient;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },
    });
};

export const useUpdateClientPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: {
            current_password: string;
            new_password: string;
            new_password_confirmation: string;
        }) {
            const { error, data: updatedClient } = await apiRequest(
                "/auth/change-password",
                "POST",
                data,
                undefined,
                true
            );

            if (error) {
                throw new Error(error.message);
            }

            return updatedClient;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },
    });
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/clients/${id}`,
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
                queryKey: ["clients"],
            });
        },
    });
};
