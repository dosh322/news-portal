import { configureStore } from "@reduxjs/toolkit";
import { NavigateOptions, To } from "react-router-dom";
import { $api } from "shared/api/api";
import { rootReducer } from "./reducer";
import { StateSchema } from "./StateSchema";

interface CreateReduxStoreOptions {
    initialState?: StateSchema;
    navigate: (to: To, options?: NavigateOptions) => void;
}

export function createReduxStore({ initialState, navigate }: CreateReduxStoreOptions) {
    const store = configureStore({
        reducer: rootReducer,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                        navigate,
                    },
                },
            }),
    });

    return store;
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
