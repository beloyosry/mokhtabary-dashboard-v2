import { useState } from "react";

interface Tab<T extends string> {
    id: T;
    label: string;
}

interface UseTabsReturn<T extends string> {
    activeTab: T;
    setActiveTab: (tab: T) => void;
}

export function useTabs<T extends string>(
    tabs: Tab<T>[],
    defaultTab?: T
): UseTabsReturn<T> {
    const initialTab =
        defaultTab && tabs.some((tab) => tab.id === defaultTab)
            ? defaultTab
            : tabs[0].id;
    const [activeTab, setActiveTab] = useState<T>(initialTab);

    return { activeTab, setActiveTab };
}
