"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useAddToast } from "@/hooks/useAddToast";
import Link from "next/link";

// Define schema for client form validation
const clientSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    status: z.enum(["active", "inactive"]),
});

type ClientFormValues = z.infer<typeof clientSchema>;

export default function AddClientPage() {
    const router = useRouter();
    const addToast = useAddToast();

    // Default form values
    const defaultValues: ClientFormValues = {
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "active",
    };

    const form = useForm({
        defaultValues,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    Add New Client
                </h1>
                <Link
                    href="/clients"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Cancel
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-6 p-6"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name Field */}
                        <div>
                            {form.Field({
                                name: "name",
                                children: (field) => (
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                                field.state.meta.errors.length >
                                                0
                                                    ? "border-red-300"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {field.state.meta.errors.join(
                                                    ", "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ),
                            })}
                        </div>

                        {/* Email Field */}
                        <div>
                            {form.Field({
                                name: "email",
                                children: (field) => (
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                                field.state.meta.errors.length >
                                                0
                                                    ? "border-red-300"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {field.state.meta.errors.join(
                                                    ", "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ),
                            })}
                        </div>

                        {/* Phone Field */}
                        <div>
                            {form.Field({
                                name: "phone",
                                children: (field) => (
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                                field.state.meta.errors.length >
                                                0
                                                    ? "border-red-300"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {field.state.meta.errors.join(
                                                    ", "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ),
                            })}
                        </div>

                        {/* Status Field */}
                        <div>
                            {form.Field({
                                name: "status",
                                children: (field) => (
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value as
                                                        | "active"
                                                        | "inactive"
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                                field.state.meta.errors.length >
                                                0
                                                    ? "border-red-300"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {field.state.meta.errors.join(
                                                    ", "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ),
                            })}
                        </div>

                        {/* Address Field - Full width */}
                        <div className="md:col-span-2">
                            {form.Field({
                                name: "address",
                                children: (field) => (
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            rows={3}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                                field.state.meta.errors.length >
                                                0
                                                    ? "border-red-300"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {field.state.meta.errors.join(
                                                    ", "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                ),
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link
                            href="/clients"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
