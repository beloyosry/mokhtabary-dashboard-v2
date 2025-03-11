"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Form validation schema
const passwordFormSchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Current password is required"),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("New password is required"),
        confirmPassword: z
            .string()
            .min(6, "Confirm password is required")
            .nonempty("Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface ChangePasswordFormProps {
    onSubmit: (data: PasswordFormValues) => void;
    isLoading: boolean;
}

const ChangePasswordForm = ({
    onSubmit,
    isLoading,
}: ChangePasswordFormProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const handleFormSubmit = (data: PasswordFormValues) => {
        onSubmit(data);
        // Reset form after submission (will happen only if submission is successful)
        // The actual reset will be handled by the parent component after successful API call
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6 max-w-md mx-auto"
        >
            <div className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="form-label">Current Password</label>
                    <div className="relative">
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input"
                                    placeholder="Enter your current password"
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400"
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                        >
                            {showCurrentPassword ? (
                                <EyeOffIcon size={18} />
                            ) : (
                                <EyeIcon size={18} />
                            )}
                        </button>
                    </div>
                    {errors.currentPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.currentPassword.message}
                        </span>
                    )}
                </div>

                {/* New Password */}
                <div>
                    <label className="form-label">New Password</label>
                    <div className="relative">
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-input"
                                    placeholder="Enter your new password"
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <EyeOffIcon size={18} />
                            ) : (
                                <EyeIcon size={18} />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="form-label">Confirm Password</label>
                    <div className="relative">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input"
                                    placeholder="Confirm your new password"
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 cursor-pointer"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOffIcon size={18} />
                            ) : (
                                <EyeIcon size={18} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
                <button
                    type="submit"
                    disabled={isLoading || !isDirty || !isValid}
                    className="form-button"
                >
                    {isLoading ? "Changing Password..." : "Change Password"}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
