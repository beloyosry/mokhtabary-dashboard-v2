"use client";

import Swal from "sweetalert2";

const useAlert = () => {
    // Success toast
    const showToast = (message: string) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        Toast.fire({
            icon: "success",
            title: message,
        });
    };

    // Success alert with confirmation button
    const showSuccessAlert = (
        title: string,
        message: string,
        confirmButtonText: string,
        onConfirm?: () => void
    ) => {
        Swal.fire({
            title: title,
            text: message,
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: confirmButtonText,
        }).then((result) => {
            if (result.isConfirmed && onConfirm) {
                onConfirm();
            }
        });
    };

    // Success alert with redirect
    const showSuccessAlertWithRedirect = (
        title: string,
        message: string,
        redirectUrl: string
    ) => {
        Swal.fire({
            title: title,
            text: message,
            icon: "success",
        }).then(() => {
            window.location.href = redirectUrl; // Redirect after alert is closed
        });
    };

    // Warning alert with confirmation
    const showWarning = (
        message: string,
        title: string,
        confirmButtonText: string,
        onConfirm: () => void
    ) => {
        Swal.fire({
            title: title || "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText || "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
    };

    // Error alert
    const showError = (message: string) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        Toast.fire({
            icon: "error",
            title: "Oops...",
            text: message,
        });
    };

    // Function to handle different alert types
    const showAlert = async (
        type: "success" | "warning" | "error",
        message: string,
        onConfirm?: () => void,
        title?: string,
        confirmButtonText?: string,
        redirectUrl?: string // Add redirect URL for success alerts
    ) => {
        switch (type) {
            case "success":
                if (redirectUrl) {
                    showSuccessAlertWithRedirect(
                        title || "Success",
                        message,
                        redirectUrl
                    );
                } else if (confirmButtonText) {
                    showSuccessAlert(
                        title || "Success",
                        message,
                        confirmButtonText,
                        onConfirm
                    );
                } else {
                    showToast(message);
                }
                break;
            case "warning":
                if (onConfirm) {
                    showWarning(
                        message,
                        title || "Are you sure?",
                        confirmButtonText || "Yes, delete it!",
                        onConfirm
                    );
                }
                break;
            case "error":
                showError(message);
                break;
            default:
                console.error("Unknown alert type");
        }
    };

    return { showAlert };
};

export default useAlert;
