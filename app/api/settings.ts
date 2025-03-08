import { apiRequest } from "@/hooks/useApiRequest";
import { BasicInfo, Governorate, Policy, QnA, Terms } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Basic Information
export const useBasicInformationList = () => {
    return useQuery({
        queryKey: ["basic-information"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/basic-information",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as BasicInfo;
        },
    });
};

export const useUpdateBasicInformation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: BasicInfo) {
            const { error } = await apiRequest(
                "/basic-information",
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
                queryKey: ["basic-information"],
            });
        },
    });
};

// Policy
export const usePolicyList = () => {
    return useQuery({
        queryKey: ["policy"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/policy",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }

            return fetchedData as Policy[];
        },
    });
};

export const usePolicy = (id: number) => {
    return useQuery({
        queryKey: ["policy", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/policy/${id}`,
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Policy;
        },
    });
};

export const useInsertPolicy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: Policy) {
            const { error } = await apiRequest(
                "/policy",
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
                queryKey: ["policy"],
            });
        },
    });
};

export const useUpdatePolicy = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: Policy) {
            const { error } = await apiRequest(
                `/policy/${id}`,
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
                queryKey: ["policy"],
            });
        },
    });
};

export const useDeletePolicy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/policy/${id}`,
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
                queryKey: ["policy"],
            });
        },
    });
};

// Q&A
export const useQnAList = () => {
    return useQuery({
        queryKey: ["qna"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/question-answer",
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as QnA[];
        },
    });
};

export const useQnA = (id: number) => {
    return useQuery({
        queryKey: ["qna", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/question-answer/${id}`,
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as QnA;
        },
    });
};

export const useInsertQnA = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/question-answer",
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
                queryKey: ["qna"],
            });
        },
    });
};

export const useUpdateQnA = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: QnA) {
            const { error } = await apiRequest(
                `/question-answer/${id}`,
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
                queryKey: ["qna"],
            });
        },
    });
};

export const useDeleteQnA = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/question-answer/${id}`,
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
                queryKey: ["qna"],
            });
        },
    });
};

// Terms & Conditions
export const useTermsList = () => {
    return useQuery({
        queryKey: ["terms"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/term-condition",
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

export const useTerms = (id: number) => {
    return useQuery({
        queryKey: ["terms", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/term-condition/${id}`,
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

export const useInsertTerms = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/term-condition",
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
                queryKey: ["terms"],
            });
        },
    });
};

export const useUpdateTerms = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                `/term-condition/${id}`,
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
                queryKey: ["terms"],
            });
        },
    });
};

export const useDeleteTerms = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/term-condition/${id}`,
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
                queryKey: ["terms"],
            });
        },
    });
};

// Partners
export const usePartnersList = () => {
    return useQuery({
        queryKey: ["partners"],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                "/partner",
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

export const useInsertPartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/partner",
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
                queryKey: ["partners"],
            });
        },
    });
};

export const useDeletePartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/partner/${id}`,
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
                queryKey: ["partners"],
            });
        },
    });
};

// Governorates
export const useGovernoratesList = (page: number) => {
    return useQuery({
        queryKey: ["governorates", page],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/governorate?page=${page}`,
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }

            return {
                items: fetchedData.items as Governorate[],
                currentPage: fetchedData.currentPage,
                lastPage: fetchedData.lastPage,
                nextPageUrl: fetchedData.nextPageUrl,
            };
        },
    });
};

export const useGovernorate = (id: number) => {
    return useQuery({
        queryKey: ["governorate", id],
        queryFn: async () => {
            const { data: fetchedData, error } = await apiRequest(
                `/governorate/${id}`,
                "GET",
                null,
                undefined,
                true
            );
            if (error) {
                throw new Error(error.message);
            }
            return fetchedData as Governorate;
        },
    });
};

export const useInsertGovernorate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                "/governorate",
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
                queryKey: ["governorates"],
            });
        },
    });
};

export const useUpdateGovernorate = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error } = await apiRequest(
                `/governorate/${id}`,
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
                queryKey: ["governorates"],
            });
        },
    });
};

export const useDeleteGovernorate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await apiRequest(
                `/governorate/${id}`,
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
                queryKey: ["governorates"],
            });
        },
    });
};
