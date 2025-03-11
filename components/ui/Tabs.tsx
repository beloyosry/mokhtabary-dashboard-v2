"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactElement, useState } from "react";

// Define Tab Item Props
type TabItemProps<T extends string> = {
    label: string;
    value: T;
    buttonLabel?: string;
    buttonHref?: string;
    children: React.ReactNode;
};

// Define Tabs Props
type TabsProps<T extends string> = {
    children: ReactElement<TabItemProps<T>>[];
};

// Tabs Component
function Tabs<T extends string>({ children }: TabsProps<T>) {
    const [activeTab, setActiveTab] = useState<T>(children[0].props.value);

    // Find the active tab
    const activeTabItem = children.find(
        (child) => child.props.value === activeTab
    );

    return (
        <section className="relative dark:bg-gray-900 p-3 sm:p-5 antialiased ">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-full flex justify-end items-center">
                    {activeTabItem?.props.buttonLabel &&
                        activeTabItem?.props.buttonHref && (
                            <Link
                                href={activeTabItem.props.buttonHref || "#"}
                                className="flex items-center justify-center text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-500 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-800"
                            >
                                <PlusIcon className="h-3.5 w-3.5 mr-2" />
                                Create {activeTabItem.props.buttonLabel}
                            </Link>
                        )}
                </div>
            </div>

            {/* Tabs Navigation */}
            <nav className="p-3 flex flex-col items-center md:items-start space-x-4 space-y-4">
                <div className="flex space-x-4">
                    {children.map((child) => (
                        <button
                            key={child.props.value}
                            type="button"
                            className={`tab ${
                                activeTab === child.props.value
                                    ? "tab-active"
                                    : "tab-inactive"
                            }`}
                            aria-current={
                                activeTab === child.props.value
                                    ? "page"
                                    : undefined
                            }
                            onClick={() => setActiveTab(child.props.value)}
                        >
                            {child.props.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Render Active Tab Content */}
            <div className="py-4">{activeTabItem}</div>
        </section>
    );
}

// Define the Tabs.Item Component
Tabs.Item = function TabItem<T extends string>({ children }: TabItemProps<T>) {
    return <div>{children}</div>;
};

export default Tabs;
