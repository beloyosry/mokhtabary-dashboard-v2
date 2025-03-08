import { apiRequest } from "@/hooks/useApiRequest";
import { Coupon, Offer, Package } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Coupons
export const useCouponsList = () => {
    return useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/coupons",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Coupon[];
        },
    });
};

export const useCoupon = (id: number) => {
    return useQuery({
        queryKey: ["coupon", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/coupons/${id}`,
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Coupon;
        },
    });
};

export const useInsertCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/coupons",
                "POST",
                data,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
        },
    });
};

export const useUpdateCoupon = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                `/coupons/status/${id}`,
                "PUT",
                data,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
        },
    });
};

export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/coupons/${id}`,
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
                queryKey: ["coupons"],
            });
        },
    });
};

// Offers
export const useOffersList = () => {
    return useQuery({
        queryKey: ["offers"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/offers",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Offer[];
        },
    });
};

export const useOffer = (id: number) => {
    return useQuery({
        queryKey: ["offer", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/offers/${id}`,
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

export const useInsertOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/offers",
                "POST",
                data,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["offers"],
            });
        },
    });
};

export const useDeleteOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/offers/${id}`,
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
                queryKey: ["offers"],
            });
        },
    });
};

// Packages
export const usePackagesList = () => {
    return useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/packages",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Package[];
        },
    });
};

export const usePackage = (id: number) => {
    return useQuery({
        queryKey: ["package", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/packages/${id}`,
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

export const useInsertPackage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/packages",
                "POST",
                data,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ["packages"],
            });
        },
    });
};

export const useDeletePackage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/packages/${id}`,
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
                queryKey: ["packages"],
            });
        },
    });
};
