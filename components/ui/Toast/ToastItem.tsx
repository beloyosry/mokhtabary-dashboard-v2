"use client";
import { useCallback, useEffect, useState } from "react";
import { removeToast, stopDelayAnimation } from "@/store/toasts/toastsSlice";
import { useAppDispatch } from "@/store/hooks";
import { TToast } from "@/Types";
import { theme } from "@/styles/theme";
import { Info, CheckCircle2, TriangleAlert, XCircleIcon } from "lucide-react";

const ToastItem = ({
    id,
    type = "primary",
    delayAnimation,
    message,
    onCloseToast,
    duration = 5000,
}: TToast) => {
    const dispatch = useAppDispatch();

    const totalWidth = 100;
    const intervalTime = duration / totalWidth;
    const maxProgress = 100;

    const [progressBarIndicator, setProgressBarIndicator] = useState(0);
    const [pauseProgressBarIndicator, setPauseProgressBarIndicator] =
        useState(false);

    const getToastStyles = () => {
        switch (type) {
            case "success":
                return {
                    iconName: CheckCircle2,
                    color: theme.colors.success,
                };
            case "error":
                return {
                    iconName: XCircleIcon,
                    color: theme.colors.error,
                };
            case "warning":
                return {
                    iconName: TriangleAlert,
                    color: theme.colors.warning,
                };
            case "primary":
            default:
                return {
                    iconName: Info,
                    color: theme.colors.info,
                };
        }
    };

    const toastStyle = getToastStyles();

    // remove toast handler
    const closeToastHandler = useCallback(() => {
        if (id) {
            dispatch(removeToast(id));
            onCloseToast?.();
        }
    }, [id, onCloseToast, dispatch]);

    //handle mouse hover over
    const handleMouseEvent = () => {
        setPauseProgressBarIndicator((prevState) => !prevState);
    };

    // progress bar indicator increment
    useEffect(() => {
        // if delay true stop progress bar
        if (delayAnimation) return;

        const timerId = setInterval(() => {
            setProgressBarIndicator((prevState) => {
                //if pause true stop incrementing progress
                if (!pauseProgressBarIndicator)
                    if (prevState < maxProgress) {
                        return prevState + 1; //increase 1 pixel
                    }
                return prevState;
            });
        }, intervalTime);

        return () => clearInterval(timerId);
    }, [intervalTime, pauseProgressBarIndicator, delayAnimation]);

    //close toast when progress bar is completed
    useEffect(() => {
        if (progressBarIndicator === 100) {
            closeToastHandler();
        }
    }, [progressBarIndicator, closeToastHandler]);

    // handle delay animation
    useEffect(() => {
        if (delayAnimation && id) {
            dispatch(stopDelayAnimation(id));
        }
    }, [dispatch, delayAnimation, id]);

    // if delay true, return nothing
    if (delayAnimation) return null;

    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-lg max-w-[400px] bg-white transform translate-y-0 transition-opacity duration-300 ease-in-out ${
                progressBarIndicator === 0 ? "opacity-0" : "opacity-100"
            }`}
            onMouseEnter={handleMouseEvent}
            onMouseLeave={handleMouseEvent}
        >
            <div className="flex items-center gap-2.5 py-2.5 px-5">
                <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${toastStyle.color}`}
                >
                    <toastStyle.iconName
                        style={{
                            color: toastStyle.color,
                        }}
                    />
                </div>
                <div className="flex-1">
                    <p className={`text-sm ${toastStyle.color}`}>{message}</p>
                </div>
                <button
                    title="Close"
                    onClick={closeToastHandler}
                    className="p-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={toastStyle.color}
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <div
                className="absolute bottom-0 left-0 h-1"
                style={{
                    width: `${progressBarIndicator}%`,
                    backgroundColor: toastStyle.color,
                }}
            />
        </div>
    );
};

export default ToastItem;
