import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define the authentication options
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text" },
                code: { label: "Code", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Step 1: Call login endpoint
                    const loginResponse = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/tokens/operation`,
                        {
                            phone: credentials?.phone,
                            code: "20", // Fixed value as requested
                            password: credentials?.password,
                        }
                    );

                    // Add debugging
                    console.log(
                        "Login API Response:",
                        JSON.stringify(loginResponse.data, null, 2)
                    );

                    // Check if login was successful
                    if (!loginResponse.data.success) {
                        console.error(
                            "Login failed:",
                            loginResponse.data.message
                        );
                        return null;
                    }

                    // Extract token and user data from response
                    const token = loginResponse.data.data.token;

                    console.log("Token and user data extracted:", {
                        token: token?.substring(0, 10) + "...",
                    });

                    // Step 2: Call profile endpoint with the token
                    const profileResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    // Add debugging
                    console.log(
                        "Profile API Response:",
                        JSON.stringify(profileResponse.data, null, 2)
                    );

                    // Check if profile fetch was successful
                    if (!profileResponse.data.success) {
                        console.error(
                            "Profile fetch failed:",
                            profileResponse.data.message
                        );
                        return null;
                    }

                    // Get the complete user profile data
                    const userProfile = profileResponse.data.data;

                    if (userProfile) {
                        const user = {
                            id: userProfile.id.toString(),
                            name: userProfile.name,
                            code: userProfile.code,
                            phone: userProfile.phone,
                            email: userProfile.email,
                            accountType: userProfile.accountType,
                            image: userProfile.photo, // Ensure photo is mapped to image
                            status: userProfile.status,
                            phoneVerifiedAt: userProfile.phoneVerifiedAt,
                            account: userProfile.account,
                            // Add these required properties
                            role: userProfile.accountType || "user", // Map accountType to role 
                            accessToken: token, // Token is required for NextAuth
                        };

                        console.log("User object created:", {
                            id: user.id,
                            name: user.name,
                            code: user.code,
                            phone: user.phone,
                            email: user.email,
                            accountType: user.accountType,
                            image: user.image, // Log the image to verify it's being set
                            status: user.status,
                            phoneVerifiedAt: user.phoneVerifiedAt,
                            account: user.account,
                        });

                        return user;
                    } else {
                        console.error("No user profile data in response");
                        return null;
                    }
                } catch (error) {
                    console.error("Authentication error:", error);
                    if (axios.isAxiosError(error)) {
                        console.error("API error details:", {
                            status: error.response?.status,
                            data: error.response?.data,
                            message: error.message,
                        });
                    }
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Add the access token and other user properties to the JWT token
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
                token.image = user.image;
                // Add new properties
                token.code = user.code;
                token.accountType = user.accountType;
                token.status = user.status;
                token.phoneVerifiedAt = user.phoneVerifiedAt;
                token.account = user.account;

                console.log("JWT token created/updated:", {
                    id: token.id,
                    accessTokenPresent: !!token.accessToken,
                });
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties from the token to the client
            if (session.user) {
                // Add user details to the session
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.phone = token.phone as string;
                session.user.image = token.image as string; // Ensure image is passed without undefined fallback
                // Add new properties
                session.user.code = (token.code as string) || undefined;
                session.user.accountType = (token.accountType as string) || undefined;
                session.user.status = (token.status as string) || undefined;
                session.user.phoneVerifiedAt = (token.phoneVerifiedAt as string) || undefined;
                session.user.account = token.account || undefined;
            }
            // Add the access token to the session (but not directly exposed to client)
            session.accessToken = token.accessToken as string;

            console.log("Session callback executed:", {
                userId: session.user?.id,
                userEmail: session.user?.email,
                userImage: session.user?.image, // Log image to verify it's being set
                hasAccessToken: !!session.accessToken,
            });

            return session;
        },
        async redirect({ url, baseUrl }) {
            // Handle redirects
            console.log("Redirect callback:", { url, baseUrl });

            // If the URL is relative, prefix with base URL
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // If it's already an absolute URL within our app, use it
            else if (url.startsWith(baseUrl)) {
                return url;
            }
            // Otherwise, redirect to dashboard
            return `${baseUrl}/`;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login", // Error code passed in query string as ?error=
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

// Export the handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
