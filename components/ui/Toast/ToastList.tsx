"use client";

import { useAppSelector } from "@/store/hooks";
import ToastItem from "./ToastItem";
import {
    selectRecords,
    selectToastsPosition,
} from "@/store/toasts/toastsSlice";

const ToastList = () => {
    const records = useAppSelector(selectRecords);
    const position = useAppSelector(selectToastsPosition);

    if (records.length === 0) return null;
    return (
        <div
            className={`fixed z-[9999] right-4 ${
                position === "top" ? "top-12" : "bottom-4"
            }`}
        >
            {records.map((record) => (
                <div key={record.id} className="my-2">
                    <ToastItem
                        id={record.id}
                        title={record.title}
                        type={record.type}
                        message={record.message}
                        delayAnimation={record.delayAnimation}
                        onCloseToast={record.onCloseToast}
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastList;
