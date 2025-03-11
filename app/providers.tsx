"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider refetchOnWindowFocus={false}>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </SessionProvider>
        </Provider>
    );
}
