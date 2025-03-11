import React from "react";
import Image from "next/image";
import Spinner from "./spinner";
import { useSession } from "next-auth/react";

type ImageWithSpinnerProps = {
    src: string;
    alt: string;
    className?: string;
    rounded?: boolean;
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">;

export default function ImgWithSpinner({
    src,
    alt,
    className,
    rounded = false,
    ...props
}: ImageWithSpinnerProps) {
    const { status } = useSession();

    const loading = status === "loading";

    return (
        <div className={`relative ${rounded ? "rounded-full" : ""}`}>
            {loading && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-white/80`}
                    style={{
                        width: `${props.width}px`,
                        height: `${props.height}px`,
                        borderRadius: "50%",
                    }}
                >
                    <Spinner />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                className={`${
                    loading ? "opacity-0" : "opacity-100"
                } transition-opacity duration-500 ${
                    rounded ? "rounded-full" : ""
                }`}
                {...props}
            />
        </div>
    );
}
