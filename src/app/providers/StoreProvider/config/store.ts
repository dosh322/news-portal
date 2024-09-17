import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { StateSchema } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // @ts-expect-error will fix later
    store.reducerManager = reducerManager;

    return store;
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<ReturnType<typeof createReduxStore>["getState"]>;
