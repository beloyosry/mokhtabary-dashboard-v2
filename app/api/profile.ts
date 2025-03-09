import { apiRequest } from "@/hooks/useApiRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ProfileData {
    id?: number;
    email?: string;
    phone?: string;
    name?: string;
    country_id?: number;
    governorate_id?: number;
    city_id?: number;
    street?: string;
    description?: string;
    img?: string | File;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    phoneVerifiedAt?: string;
}

interface ProfileUpdateData {
    name?: string;
    country_id?: number;
    city_id?: number;
    governorate_id?: number;
    street?: string;
    description?: string;
}

interface PasswordUpdateData {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

/**
 * React Query hook to fetch user profile
 */
export const useUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const response = await apiRequest(
                    "/auth/profile",
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
 * React Query mutation hook to update user profile
 */
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (profileData: ProfileUpdateData) => {
            // Only send changed fields to the API
            const payload = Object.entries(profileData).reduce(
                (acc, [key, value]) => {
                    if (value !== undefined) {
                        acc[key] = value;
                    }
                    return acc;
                },
                {} as Record<string, any>
            );

            try {
                const response = await apiRequest(
                    "/auth/profile/update",
                    "POST",
                    payload,
                    {},
                    true // requires token
                );

                return response.data || { success: false };
            } catch (error) {
                console.error("Error updating profile:", error);
                // Return an error object instead of throwing
                return { 
                    success: false, 
                    error: error instanceof Error ? error.message : "Update profile failed" 
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
                    "/auth/change-password",
                    "POST",
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
                    error: error instanceof Error ? error.message : "Password change failed" 
                };
            }
        },
    });
};

/**
 * React Query mutation hook to update user profile picture
 */
export const useUpdateProfilePicture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (imageFile: File) => {
            const formData = new FormData();
            formData.append("img", imageFile);

            try {
                const response = await apiRequest(
                    "/auth/profile/update",
                    "POST",
                    formData,
                    {}, // Content-Type will be automatically set to multipart/form-data by apiRequest
                    true // requires token
                );

                return response.data || { success: false };
            } catch (error) {
                console.error("Error updating profile picture:", error);
                // Return an error object instead of throwing
                return { 
                    success: false, 
                    error: error instanceof Error ? error.message : "Update profile picture failed" 
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
