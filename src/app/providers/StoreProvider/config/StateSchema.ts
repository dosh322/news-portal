import { AxiosInstance } from "axios";
import { ArticleSchema } from "@/entities/Article";
import type { UserSchema } from "@/entities/User";
import { AddCommentFormSchema } from "@/features/addCommentForm";
import type { LoginFormSchema } from "@/features/authByUserName";
import { ScrollRestorationSchema } from "@/features/scrollRestoration";
import { ArticlesListSchema } from "@/pages/ArticlesListPage";
import { rtkApi } from "@/shared/api/rtkApi";
import { RootState } from "./store";
import { ProfileSchema } from "@/features/EditableProfileCard";

export interface StaticReducers {
    user: UserSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface LazyLoadedSlices {
    loginForm?: LoginFormSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    addCommentForm?: AddCommentFormSchema;
    articles?: ArticlesListSchema;
    scrollRestoration?: ScrollRestorationSchema;
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
