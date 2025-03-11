"use client";

import { useState, useEffect } from "react";
import { useAddToast } from "@/hooks/useAddToast";
import { z } from "zod";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import {
    useUserProfile,
    useUpdateAuthProfile,
    useChangePassword,
} from "@/app/api/profile";
import { ProfileData } from "@/Types";
import Tabs from "@/components/ui/Tabs";
import { useTabs } from "@/hooks/useTabs";
import PageLayout from "@/layouts/PageLayout";

// Define validation schemas
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number is required"),
    code: z.string().optional(),
    country: z.string().optional(),
    governorate: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    description: z.string().optional(),
    photo: z.string().optional(),
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

export default function ProfilePage() {
    const addToast = useAddToast();
    const tabs = [
        { id: "profile", label: "Profile" },
        { id: "password", label: "Change Password" },
    ];

    const { activeTab, setActiveTab } = useTabs(tabs);

    // Use React Query hooks
    const {
        data: profileData,
        isLoading: isProfileLoading,
        error: profileError,
    } = useUserProfile();

    const updateProfileMutation = useUpdateAuthProfile();
    const changePasswordMutation = useChangePassword();

    // Initialize form data
    const [formData, setFormData] = useState<ProfileData>({
        name: "",
        code: "20",
        phone: "",
        email: "",
        accountType: "",
        status: "",
        phoneVerifiedAt: "",
        photo: "",
        account: {
            id: profileData?.account?.id || "",
            userId: profileData?.account?.userId || "",
            parentId: profileData?.account?.parentId || null,
            countryInfo: {
                id: profileData?.account?.countryInfo?.id || "",
                nameAr: profileData?.account?.countryInfo?.nameAr || "",
                nameEn: profileData?.account?.countryInfo?.nameEn || "",
            },
            governorateInfo: {
                id: profileData?.account?.governorateInfo?.id || "",
                nameAr: profileData?.account?.governorateInfo?.nameAr || "",
                nameEn: profileData?.account?.governorateInfo?.nameEn || "",
            },
            cityInfo: {
                id: profileData?.account?.cityInfo?.id || "",
                nameAr: profileData?.account?.cityInfo?.nameAr || "",
                nameEn: profileData?.account?.cityInfo?.nameEn || "",
            },
            street: profileData?.account?.street || "",
            description: profileData?.account?.description || "",
            entityType: profileData?.account?.entityType || "",
        },
    });

    // Function to transform ProfileData to the format expected by ProfileInfoForm
    const getFormattedProfileData = () => {
        return {
            name: formData.name || "",
            email: formData.email || "",
            phone: formData.phone || "",
            code: "20",
            country: formData.account?.countryInfo?.id || "",
            governorate: formData.account?.governorateInfo?.id || "",
            city: formData.account?.cityInfo?.id || "",
            street: formData.account?.street || "",
            description: formData.account?.description || "",
            photo: formData.photo || "",
        };
    };

    // Update form data when profile data changes
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                code: profileData.code || "20",
                phone: profileData.phone || "",
                email: profileData.email || "",
                accountType: profileData.accountType || "",
                photo: profileData.photo || "",
                status: profileData.status || "",
                phoneVerifiedAt: profileData.phoneVerifiedAt || "",
                account: {
                    id: profileData.account?.id || "",
                    userId: profileData.account?.userId || "",
                    parentId: profileData.account?.parentId || null,
                    countryInfo: {
                        id: profileData.account?.countryInfo?.id || "",
                        nameAr: profileData.account?.countryInfo?.nameAr || "",
                        nameEn: profileData.account?.countryInfo?.nameEn || "",
                    },
                    governorateInfo: {
                        id: profileData.account?.governorateInfo?.id || "",
                        nameAr:
                            profileData.account?.governorateInfo?.nameAr || "",
                        nameEn:
                            profileData.account?.governorateInfo?.nameEn || "",
                    },
                    cityInfo: {
                        id: profileData.account?.cityInfo?.id || "",
                        nameAr: profileData.account?.cityInfo?.nameAr || "",
                        nameEn: profileData.account?.cityInfo?.nameEn || "",
                    },
                    street: profileData.account?.street || "",
                    description: profileData.account?.description || "",
                    entityType: profileData.account?.entityType || "",
                },
            });
        }
    }, [profileData]);

    // Handle profile update
    const updateProfile = async (formData: any, imageFile: File | null) => {
        try {
            const validatedData = profileSchema.parse(formData);

            // Create FormData object
            const formDataToSend = new FormData();

            // Append profile data to FormData only if changed
            if (validatedData.name !== profileData?.name) {
                formDataToSend.append("name", validatedData.name);
            }
            if (validatedData.email !== profileData?.email) {
                formDataToSend.append("email", validatedData.email);
            }
            if (validatedData.phone !== profileData?.phone) {
                formDataToSend.append("phone", validatedData.phone);
            }
            if (validatedData.code !== profileData?.code) {
                formDataToSend.append("code", validatedData.code || "");
            }

            // Only include address fields if user is not admin
            if (profileData?.accountType !== "admin") {
                if (
                    validatedData.country !==
                    profileData?.account?.countryInfo?.id
                ) {
                    formDataToSend.append(
                        "country_id",
                        (validatedData.country
                            ? Number(validatedData.country)
                            : 0
                        ).toString()
                    );
                }
                if (
                    validatedData.governorate !==
                    profileData?.account?.governorateInfo?.id
                ) {
                    formDataToSend.append(
                        "governorate_id",
                        (validatedData.governorate
                            ? Number(validatedData.governorate)
                            : 0
                        ).toString()
                    );
                }
                if (validatedData.city !== profileData?.account?.cityInfo?.id) {
                    formDataToSend.append(
                        "city_id",
                        (validatedData.city
                            ? Number(validatedData.city)
                            : 0
                        ).toString()
                    );
                }
                if (validatedData.street !== profileData?.account?.street) {
                    formDataToSend.append("street", validatedData.street || "");
                }
                if (
                    validatedData.description !==
                    profileData?.account?.description
                ) {
                    formDataToSend.append(
                        "description",
                        validatedData.description || ""
                    );
                }
            }

            // Append image file if provided
            if (imageFile) {
                formDataToSend.append("photo", imageFile);
            }

            await updateProfileMutation.mutateAsync(formDataToSend);

            addToast({
                message: "Profile updated successfully",
                type: "success",
                title: "Success!",
            });
        } catch (error) {
            console.error("Error updating profile:", error);

            let errorMessage = "Failed to update profile. Please try again.";
            if (error instanceof z.ZodError) {
                errorMessage = error.errors.map((e) => e.message).join(", ");
            }

            addToast({
                message: errorMessage,
                type: "error",
                title: "Error",
            });
        }
    };

    // Handle password change
    const changePassword = async (data: any) => {
        try {
            const validatedData = passwordSchema.parse(data);

            await changePasswordMutation.mutateAsync({
                password: validatedData.currentPassword,
                new_password: validatedData.newPassword,
                new_password_confirmation: validatedData.confirmPassword,
            });

            addToast({
                message: "Password changed successfully",
                type: "success",
                title: "Success!",
            });
        } catch (error) {
            console.error("Error changing password:", error);

            let errorMessage = "Failed to change password. Please try again.";
            if (error instanceof z.ZodError) {
                errorMessage = error.errors.map((e) => e.message).join(", ");
            }

            addToast({
                message: errorMessage,
                type: "error",
                title: "Error",
            });
        }
    };

    // Handle loading and error states
    if (isProfileLoading) {
        return <div className="p-8">Loading profile information...</div>;
    }

    if (profileError) {
        return (
            <div className="p-8 text-red-500">
                Error loading profile:{" "}
                {profileError instanceof Error
                    ? profileError.message
                    : "Unknown error"}
            </div>
        );
    }

    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item
                    label="Profile"
                    value="profile"
                    buttonHref="#"
                    buttonLabel="Profile"
                >
                    <ProfileInfoForm
                        data={getFormattedProfileData()}
                        onSubmit={(data, imageFile) =>
                            updateProfile(data, imageFile)
                        }
                        isLoading={updateProfileMutation.isPending}
                    />
                </Tabs.Item>

                <Tabs.Item label="Change Password" value="password">
                    <ChangePasswordForm
                        onSubmit={changePassword}
                        isLoading={changePasswordMutation.isPending}
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}
