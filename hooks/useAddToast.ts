import { useAppDispatch } from "@/store/hooks";
import { addToast } from "@/store/toasts/toastsSlice";
import type { TToast } from "@/Types";

export const useAddToast = () => {
    const dispatch = useAppDispatch();

    return ({
        message,
        type = "primary",
        title,
        onCloseToast,
        position = "top",
        delayAnimation = false,
        id,
    }: TToast) => {
        dispatch(
            addToast({
                message,
                type,
                title,
                onCloseToast,
                position,
                delayAnimation,
                id,
            })
        );
    };
};
