import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "devmokhtabary.my-test-solutions.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "devmokhtabary.my-test-solutions.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
