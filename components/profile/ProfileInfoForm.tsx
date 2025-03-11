"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useSession } from "next-auth/react";

// Form validation schema
const profileFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().min(10, "Phone number is required").optional(),
    code: z.string().optional(),
    country: z.string().optional(),
    governorate: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    description: z.string().optional(),
    photo: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileInfoFormProps {
    data: ProfileFormValues;
    onSubmit: (data: ProfileFormValues, imageFile: File | null) => void;
    isLoading: boolean;
}

export default function ProfileInfoForm({
    data,
    onSubmit,
    isLoading,
}: ProfileInfoFormProps) {
    const { data: session } = useSession();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    // Check if address fields should be shown (only when accountType is not admin)
    const showAddressFields = session?.user?.accountType !== "admin";

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            code: data.code || "20",
            country: data.country || "",
            governorate: data.governorate || "",
            city: data.city || "",
            street: data.street || "",
            description: data.description || "",
            photo: data.photo || "",
        },
        values: data,
    });

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProfileImage(file);

        // Create a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Handle form submission with both profile data and image
    const handleFormSubmit = async (formData: ProfileFormValues) => {
        // Submit profile data and image together
        onSubmit(formData, profileImage);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-primary-100 mb-4">
                    <Image
                        src={previewImage || session?.user?.image || ""}
                        alt="Profile"
                        fill
                        sizes="(max-width: 768px) 100vw, 128px"
                        className="object-cover"
                    />
                </div>
                <label className="cursor-pointer bg-primary-50 hover:bg-primary-100 text-primary-500 px-4 py-2 rounded-md transition duration-300">
                    Upload New Picture
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
                {isLoading && (
                    <div className="mt-2 text-dark-400">Uploading...</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Type */}
                <div>
                    <label className="form-label">Account Type</label>
                    <input
                        type="text"
                        aria-label="Account Type"
                        className={`form-input form-input-disabled`}
                        value={session?.user.accountType}
                        disabled
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="form-label">Full Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="form-input"
                                placeholder="Enter your full name"
                            />
                        )}
                    />

                    {errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="form-label">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                            />
                        )}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        aria-label="Phone"
                        className="form-input form-input-disabled"
                        value={session?.user.phone}
                        disabled
                    />
                </div>

                {/* Address fields - only show if not admin */}
                {showAddressFields && (
                    <>
                        {/* Country */}
                        <div>
                            <label className="form-label">Country</label>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="form-input">
                                        <option value="Egypt">Egypt</option>
                                        {/* Add more countries as needed */}
                                    </select>
                                )}
                            />
                            {errors.country && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.country.message}
                                </span>
                            )}
                        </div>

                        {/* Governorate */}
                        <div>
                            <label className="form-label">Governorate</label>
                            <Controller
                                name="governorate"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="form-input">
                                        <option value="Giza">Giza</option>
                                        <option value="Cairo">Cairo</option>
                                        {/* Add more governorates as needed */}
                                    </select>
                                )}
                            />
                            {errors.governorate && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.governorate.message}
                                </span>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <label className="form-label">City</label>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="form-input">
                                        <option value="Bani Ubaid">
                                            Bani Ubaid
                                        </option>
                                        <option value="Dokki">Dokki</option>
                                        {/* Add more cities as needed */}
                                    </select>
                                )}
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.city.message}
                                </span>
                            )}
                        </div>

                        {/* Street */}
                        <div>
                            <label className="form-label">Street</label>
                            <Controller
                                name="street"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter your street address"
                                    />
                                )}
                            />
                            {errors.street && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.street.message}
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Description - only show if not admin */}
            {showAddressFields && (
                <div>
                    <label className="form-label">About (Bio)</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                rows={4}
                                className="form-input"
                                placeholder="Write something about yourself..."
                            />
                        )}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </span>
                    )}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="form-button"
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
