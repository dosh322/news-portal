import { AxiosInstance } from "axios";
import { ProfileSchema } from "entities/Profile";
import type { UserSchema } from "entities/User";
import type { LoginFormSchema } from "features/authByUserName";
import { RootState } from "./store";

export interface StaticReducers {
    user: UserSchema;
}

export interface LazyLoadedSlices {
    loginForm?: LoginFormSchema;
    profile?: ProfileSchema;
}

export type StateSchema = StaticReducers & LazyLoadedSlices;

export type StateSchemaKey = keyof StateSchema;

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: RootState;
}
