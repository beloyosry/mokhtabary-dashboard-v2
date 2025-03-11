// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import toasts from "./toasts/toastsSlice";

const rootReducer = combineReducers({
    toasts,
});

const store = configureStore({
    reducer: rootReducer, // لا داعي لـ persistReducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["toasts/addToast"],
                ignoredPaths: [/^toasts\.records\.\d+\.onCloseToast$/],
            },
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
