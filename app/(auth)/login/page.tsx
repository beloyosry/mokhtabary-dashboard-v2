"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useAddToast } from "@/hooks/useAddToast";
import { z } from "zod";
import Image from "next/image";
import logoImage from "../../../assets/logo.png";

export default function LoginPage() {
    const router = useRouter();
    const addToast = useAddToast();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";
    const error = searchParams?.get("error");
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        phone?: string;
        password?: string;
    }>({});
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    // Fixed code value
    const code = "20";

    // Show error message if redirected with error
    useEffect(() => {
        if (error) {
            let errorMessage = "An error occurred during sign in.";

            if (error === "CredentialsSignin") {
                errorMessage =
                    "Invalid phone number or password. Please try again.";
            }

            console.log("Auth error from URL:", error);

            addToast({
                message: errorMessage,
                type: "error",
                title: "Authentication Error",
            });
        }
    }, [error]);

    // Redirect if authenticated
    useEffect(() => {
        if (status === "authenticated" && session) {
            console.log(
                "Session established, redirecting to dashboard...",
                session
            );
            router.push(callbackUrl);
            router.refresh();
        }
    }, [status, session, router, callbackUrl]);

    // Define form validation schema with Zod
    const loginSchema = z.object({
        phone: z.string().min(9, "Please enter a valid phone number"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    // Handle phone number input to remove leading zero if present
    const handlePhoneChange = (value: string) => {
        // Store the phone number with leading zero for display
        setPhone(value);
    };

    // Function to format phone number before sending (remove leading zero)
    const formatPhoneForSubmission = (phoneNumber: string) => {
        // Remove leading zero if present
        if (phoneNumber.startsWith("0")) {
            return phoneNumber.substring(1);
        }
        return phoneNumber;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            // Validate form manually
            try {
                loginSchema.parse({ phone, password });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const errors: { phone?: string; password?: string } = {};
                    error.errors.forEach((err) => {
                        if (err.path[0] === "phone") {
                            errors.phone = err.message;
                        } else if (err.path[0] === "password") {
                            errors.password = err.message;
                        }
                    });
                    setFormErrors(errors);
                    return;
                }
            }

            setIsLoading(true);

            // Format phone number by removing leading zero if present
            const formattedPhone = formatPhoneForSubmission(phone);

            console.log("Attempting login with:", {
                phone: formattedPhone,
                code,
                password: "********",
            });

            const result = await signIn("credentials", {
                phone: formattedPhone,
                code,
                password,
                redirect: false,
            });

            console.log("SignIn result:", result);

            if (result?.error) {
                console.error("Login error from result:", result.error);

                addToast({
                    message:
                        "Invalid phone number or password. Please try again.",
                    type: "error",
                    title: "Authentication Error",
                });
            } else {
                console.log(
                    "Login successful, waiting for session to establish..."
                );
                addToast({
                    message: "You have been logged in successfully",
                    type: "success",
                    title: "Success!",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            addToast({
                message: "An unexpected error occurred. Please try again.",
                type: "error",
                title: "Error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Form validation handlers
    const validatePhone = (phone: string) => {
        try {
            loginSchema.shape.phone.parse(phone);
            setFormErrors({ ...formErrors, phone: undefined });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors({
                    ...formErrors,
                    phone: error.errors[0].message,
                });
            }
        }
    };

    const validatePassword = (password: string) => {
        try {
            loginSchema.shape.password.parse(password);
            setFormErrors({ ...formErrors, password: undefined });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors({
                    ...formErrors,
                    password: error.errors[0].message,
                });
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg sm:p-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src={logoImage}
                            alt="Mokhtabary Logo"
                            width={150}
                            height={80}
                            priority
                            className="h-auto"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Phone Number with Country Code Display */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="flex mt-1">
                                {/* Country Code Display */}
                                <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                    +{code}
                                </div>
                                {/* Phone Input */}
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        handlePhoneChange(e.target.value);
                                        validatePhone(e.target.value);
                                    }}
                                    onBlur={() => validatePhone(phone)}
                                    placeholder="Enter your phone number"
                                    className="flex-1 block w-full rounded-r-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                    disabled={isLoading}
                                    autoComplete="tel"
                                />
                            </div>
                            {formErrors.phone && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                onBlur={() => validatePassword(password)}
                                placeholder="••••••••"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                            {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="mr-2 h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
