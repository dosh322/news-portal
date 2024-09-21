import { AxiosInstance } from "axios";
import { ProfileSchema } from "entities/Profile";
import type { UserSchema } from "entities/User";
import type { LoginFormSchema } from "features/authByUserName";
import { NavigateOptions, To } from "react-router-dom";

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
    navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
