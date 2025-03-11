import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TToast } from "@/Types";
import type { RootState } from "../index";

interface IToastState {
    records: TToast[];
    position?: "top" | "bottom";
}

const initialState: IToastState = {
    records: [],
};

const toastSlice = createSlice({
    name: "toasts",
    initialState,
    reducers: {
        removeToast: (state: IToastState, action: PayloadAction<string>) => {
            state.records = state.records.filter(
                (el: TToast) => el.id !== action.payload
            );
        },
        addToast: (state: IToastState, action: PayloadAction<TToast>) => {
            // Remove any existing toasts with the same message to prevent duplicates
            state.records = state.records.filter(
                (el: TToast) => el.message !== action.payload.message
            );

            // Limit the number of toasts to prevent overflow
            if (state.records.length >= 3) {
                state.records.shift(); // Remove the oldest toast
            }

            // Add the new toast with a unique ID
            const newToast = {
                id: nanoid(),
                title: action.payload.title || action.payload.type,
                type: action.payload.type,
                message: action.payload.message,
                delayAnimation: false,
                onCloseToast: action.payload.onCloseToast,
                position: action.payload.position || state.position,
            };

            state.records.push(newToast);
            state.position = action.payload.position || state.position;
        },
        stopDelayAnimation: (
            state: IToastState,
            action: PayloadAction<string>
        ) => {
            state.records = state.records.map((el: TToast) => {
                if (el.id === action.payload) {
                    return { ...el, delayAnimation: false };
                }
                return el;
            });
        },
    },
});

export const { removeToast, addToast, stopDelayAnimation } = toastSlice.actions;
export const selectRecords = (state: RootState) => state.toasts.records;
export const selectToastsPosition = (state: RootState) => state.toasts.position;

export default toastSlice.reducer;
