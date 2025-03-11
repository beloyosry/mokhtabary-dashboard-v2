import React, { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
}

function PageLayout({ children, title }: PageLayoutProps) {
    return <div className="page-wrapper">{children}</div>;
}

export default PageLayout;
