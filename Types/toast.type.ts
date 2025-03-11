export type TToast = {
    id?: string;
    type: "primary" | "success" | "warning" | "error";
    title?: string | null;
    message: string;
    delayAnimation?: boolean;
    onCloseToast?: () => void;
    position?: "top" | "bottom";
    duration?: number;
};
