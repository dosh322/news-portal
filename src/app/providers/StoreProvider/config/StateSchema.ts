import {
    EnhancedStore,
    Reducer,
    ReducersMapObject,
    UnknownAction,
} from "@reduxjs/toolkit";
import { ProfileSchema } from "entities/Profile";
import type { UserSchema } from "entities/User";
import type { LoginFormSchema } from "features/authByUserName";

export interface StateSchema {
    user: UserSchema;

    // async reducers
    loginForm?: LoginFormSchema;
    profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}
