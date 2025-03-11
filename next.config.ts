import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dev.mokhtabary.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "dev.mokhtabary.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
