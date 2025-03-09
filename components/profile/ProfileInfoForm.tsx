"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useUpdateProfilePicture } from "@/app/api/profile";

// Form validation schema
const profileFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    governorate: z.string().min(1, "Governorate is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().optional(),
    description: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileInfoFormProps {
    data: ProfileFormValues;
    onSubmit: (data: ProfileFormValues) => void;
    isLoading: boolean;
}

export default function ProfileInfoForm({
    data,
    onSubmit,
    isLoading,
}: ProfileInfoFormProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    
    const updatePictureMutation = useUpdateProfilePicture();

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
            country: data.country || "Egypt",
            governorate: data.governorate || "Giza",
            city: data.city || "Bani Ubaid",
            street: data.street || "",
            description: data.description || "",
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

    // Handle image upload
    const handleImageUpload = async () => {
        if (!profileImage) return;
        
        try {
            await updatePictureMutation.mutateAsync(profileImage);
            // Successful upload handled by the mutation
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    // Handle form submission
    const handleFormSubmit = async (formData: ProfileFormValues) => {
        // Submit profile data
        onSubmit(formData);

        // If there's an image to upload, do that too
        if (profileImage) {
            await handleImageUpload();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-primary-100 mb-4">
                    {previewImage ? (
                        <Image
                            src={previewImage}
                            alt="Profile"
                            fill
                            sizes="(max-width: 768px) 100vw, 128px"
                            className="object-cover"
                        />
                    ) : data.email ? (
                        <Image
                            src={`https://ui-avatars.com/api/?name=${data.name || "User"}&background=dc2626&color=fff&size=128`}
                            alt="Profile"
                            fill
                            sizes="(max-width: 768px) 100vw, 128px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-500">No Image</span>
                        </div>
                    )}
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
                {updatePictureMutation.isPending && <div className="mt-2 text-dark-400">Uploading...</div>}
                {updatePictureMutation.isError && (
                    <div className="mt-2 text-red-500">
                        Error uploading image: {updatePictureMutation.error instanceof Error 
                            ? updatePictureMutation.error.message 
                            : "Unknown error"}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-dark-500 mb-2">Full Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
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
                    <label className="block text-dark-500 mb-2">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                                placeholder="Enter your email"
                                disabled // Email cannot be changed
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
                    <label className="block text-dark-500 mb-2">Phone</label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="tel"
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                                placeholder="Enter your phone number"
                            />
                        )}
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                        </span>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label className="block text-dark-500 mb-2">Country</label>
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                            >
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
                    <label className="block text-dark-500 mb-2">
                        Governorate
                    </label>
                    <Controller
                        name="governorate"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                            >
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
                    <label className="block text-dark-500 mb-2">City</label>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
                            >
                                <option value="Bani Ubaid">Bani Ubaid</option>
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
                    <label className="block text-dark-500 mb-2">Street</label>
                    <Controller
                        name="street"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
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
            </div>

            {/* Description */}
            <div>
                <label className="block text-dark-500 mb-2">
                    About (Bio)
                </label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            rows={4}
                            className="w-full p-3 border border-dark-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
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

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-md transition duration-300 disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}
