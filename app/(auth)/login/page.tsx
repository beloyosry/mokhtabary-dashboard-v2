"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { z } from "zod";

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Show error message if redirected with error
    useEffect(() => {
        if (error) {
            let errorMessage = "An error occurred during sign in.";

            if (error === "CredentialsSignin") {
                errorMessage = "Invalid email or password. Please try again.";
            }

            console.log("Auth error from URL:", error);

            Swal.fire({
                title: "Authentication Error",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "Try Again",
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
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            // Validate form manually
            try {
                loginSchema.parse({ email, password });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const errors: { email?: string; password?: string } = {};
                    error.errors.forEach((err) => {
                        if (err.path[0] === "email") {
                            errors.email = err.message;
                        } else if (err.path[0] === "password") {
                            errors.password = err.message;
                        }
                    });
                    setFormErrors(errors);
                    return;
                }
            }

            setIsLoading(true);

            console.log("Attempting login with:", {
                email,
                password: "********",
            });

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log("SignIn result:", result);

            if (result?.error) {
                console.error("Login error from result:", result.error);

                Swal.fire({
                    title: "Authentication Error",
                    text: "Invalid email or password. Please try again.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            } else {
                console.log(
                    "Login successful, waiting for session to establish..."
                );
                Swal.fire({
                    title: "Success!",
                    text: "You have been logged in successfully",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                // Let the useEffect hook handle the redirect once the session is established
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Form validation handlers
    const validateEmail = (email: string) => {
        try {
            loginSchema.shape.email.parse(email);
            setFormErrors({ ...formErrors, email: undefined });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors({
                    ...formErrors,
                    email: error.errors[0].message,
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
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                onBlur={() => validateEmail(email)}
                                placeholder="you@example.com"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                disabled={isLoading}
                                autoComplete="email"
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.email}
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
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
                            className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
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
