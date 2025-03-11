import { apiRequest } from "@/hooks/useApiRequest";
import {
    AuthProfileUpdateData,
    PasswordUpdateData,
    ProfileData,
} from "@/Types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * React Query hook to fetch user profile
 */
export const useUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const response = await apiRequest(
                    "/users/auth/profile",
                    "GET",
                    null,
                    {},
                    true // requires token
                );

                // Ensure we return a non-undefined value
                if (!response || !response.data) {
                    // Return empty profile data if the response is missing or empty
                    return {} as ProfileData;
                }

                return response.data as ProfileData;
            } catch (error) {
                // If there's an error, still return an empty object instead of undefined
                console.error("Error fetching profile:", error);
                return {} as ProfileData;
            }
        },
    });
};

/**
 * React Query mutation hook to update user profile with optional image
 */
export const useUpdateAuthProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            try {
                const response = await apiRequest(
                    "/users/auth/profile",
                    "POST",
                    formData,
                    {
                        "Content-Type": "multipart/form-data",
                    },
                    true // requires token
                );

                return response.data || { success: false };
            } catch (error) {
                console.error("Error updating profile:", error);
                // Return an error object instead of throwing
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Update profile failed",
                };
            }
        },
        onSuccess: (data) => {
            // Only invalidate if the update was successful
            if (data.success !== false) {
                queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            }
        },
    });
};

/**
 * React Query mutation hook to change user password
 */
export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (passwordData: PasswordUpdateData) => {
            try {
                const response = await apiRequest(
                    "/users/auth/change-password",
                    "PUT",
                    passwordData,
                    {},
                    true // requires token
                );

                return response || { success: false };
            } catch (error) {
                console.error("Error changing password:", error);
                // Return an error object instead of throwing
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Password change failed",
                };
            }
        },
    });
};
