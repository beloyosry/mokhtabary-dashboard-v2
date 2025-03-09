"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { z } from "zod";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { useUserProfile, useUpdateProfile, useChangePassword } from "@/app/api/profile";

// Define validation schemas
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    governorate: z.string().min(1, "Governorate is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().optional(),
    description: z.string().optional(),
});

const passwordSchema = z
    .object({
        currentPassword: z.string().min(6, "Current password is required"),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

// Define tab options
type TabType = "profile" | "password";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    
    // Use React Query hooks
    const { 
        data: profileData, 
        isLoading: isProfileLoading, 
        error: profileError 
    } = useUserProfile();
    
    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    // Initialize form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "Egypt",
        governorate: "Giza",
        city: "Bani Ubaid",
        street: "",
        description: "",
    });

    // Update form data when profile data changes
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                email: profileData.email || "",
                phone: profileData.phone || "",
                country: "Egypt", // Map from country_id
                governorate: "Giza", // Map from governorate_id
                city: "Bani Ubaid", // Map from city_id
                street: profileData.street || "",
                description: profileData.description || "",
            });
        }
    }, [profileData]);

    // Handle profile update
    const updateProfile = async (data: any) => {
        try {
            const validatedData = profileSchema.parse(data);
            
            // Map form data to API expected format
            const apiData = {
                name: validatedData.name,
                country_id: 1, // Replace with actual mapping
                governorate_id: 1, // Replace with actual mapping
                city_id: 1, // Replace with actual mapping
                street: validatedData.street,
                description: validatedData.description,
            };
            
            await updateProfileMutation.mutateAsync(apiData);
            
            Swal.fire({
                title: "Success",
                text: "Profile updated successfully",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            
            let errorMessage = "Failed to update profile. Please try again.";
            if (error instanceof z.ZodError) {
                errorMessage = error.errors.map((e) => e.message).join(", ");
            }
            
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
            });
        }
    };

    // Handle password change
    const changePassword = async (data: any) => {
        try {
            const validatedData = passwordSchema.parse(data);
            
            await changePasswordMutation.mutateAsync({
                current_password: validatedData.currentPassword,
                new_password: validatedData.newPassword,
                new_password_confirmation: validatedData.confirmPassword,
            });
            
            Swal.fire({
                title: "Success",
                text: "Password changed successfully",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error changing password:", error);
            
            let errorMessage = "Failed to change password. Please try again.";
            if (error instanceof z.ZodError) {
                errorMessage = error.errors.map((e) => e.message).join(", ");
            }
            
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
            });
        }
    };

    // Handle loading and error states
    if (isProfileLoading) {
        return <div className="p-8">Loading profile data...</div>;
    }

    if (profileError) {
        return (
            <div className="p-8 text-red-500">
                Error loading profile: {profileError instanceof Error ? profileError.message : "Unknown error"}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary-500 ml-4 mb-8">
                Profile
            </h2>

            <div className="bg-white rounded-lg shadow-sm border border-dark-100">
                <div className="border-b border-dark-100">
                    <div className="flex">
                        <button
                            className={`px-8 py-4 text-base font-medium ${
                                activeTab === "profile"
                                    ? "text-primary-500 border-b-2 border-primary-500"
                                    : "text-dark-400 hover:text-dark-500"
                            }`}
                            onClick={() => setActiveTab("profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={`px-8 py-4 text-base font-medium ${
                                activeTab === "password"
                                    ? "text-primary-500 border-b-2 border-primary-500"
                                    : "text-dark-400 hover:text-dark-500"
                            }`}
                            onClick={() => setActiveTab("password")}
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    {activeTab === "profile" ? (
                        <ProfileInfoForm
                            data={formData}
                            onSubmit={updateProfile}
                            isLoading={updateProfileMutation.isPending}
                        />
                    ) : (
                        <ChangePasswordForm
                            onSubmit={changePassword}
                            isLoading={changePasswordMutation.isPending}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
