"use client";

import { getSession } from "next-auth/react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

let cachedToken: string | null = null;

export async function apiRequest(
    endpoint: string,
    method: RequestMethod = "GET",
    body: Record<string, any> | FormData | null = null,
    headers: Record<string, string> = {},
    requiresToken: boolean = false
) {
    try {
        // Fetch token if required
        if (requiresToken && !cachedToken) {
            // Get token from NextAuth session
            const session = await getSession();
            cachedToken = session?.accessToken || null; // Access token is stored here in the NextAuth session

            if (requiresToken &&!cachedToken) {
                throw new Error("Authentication token is missing");
            }
        }

        // Construct headers
        const defaultHeaders = {
            "Content-Type":
                body instanceof FormData
                    ? "multipart/form-data"
                    : "application/json",
            Accept: "application/json",
            ...(cachedToken ? { Authorization: `Bearer ${cachedToken}` } : {}),
            ...headers,
        };

        // Axios request
        const response = await axios({
            method,
            url: `${BASE_URL}${endpoint}`,
            ...(method !== "GET" && { data: body }),
            headers: defaultHeaders,
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw error.response;
        } else if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error(error.message || "An unexpected error occurred");
        }
    }
}
