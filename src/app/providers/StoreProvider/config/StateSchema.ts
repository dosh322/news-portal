import { AxiosInstance } from "axios";
import { ArticleSchema } from "entities/Article";
import { ProfileSchema } from "entities/Profile";
import type { UserSchema } from "entities/User";
import { AddCommentFormSchema } from "features/addCommentForm";
import type { LoginFormSchema } from "features/authByUserName";
import { ArticleCommentsSchema } from "pages/ArticlePage";
import { RootState } from "./store";

export interface StaticReducers {
    user: UserSchema;
}

export interface LazyLoadedSlices {
    loginForm?: LoginFormSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    articleComments?: ArticleCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
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
