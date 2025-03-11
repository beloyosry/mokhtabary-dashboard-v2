"use client";

import { useTheme } from "next-themes";

import { Button } from "./button";
import { Icons } from "./icons";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Icons.sun className="rotate-0 scale-105 transition-all dark:-rotate-90 dark:scale-0 text-primary-900" />
            <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
