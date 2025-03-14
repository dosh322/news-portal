import { StateSchema } from "@/app/providers/StoreProvider";
import { ArticleSortFields, ArticleType, ArticleView } from "@/entities/Article";

export const articlesSelectors = {
    selectArticlesAreLoading: (state: StateSchema) => state.articles?.isLoading || false,
    selectArticlesError: (state: StateSchema) => state.articles?.error,
    selectView: (state: StateSchema) => state.articles?.view ?? ArticleView.SMALL,
    selectLimit: (state: StateSchema) => state.articles?.limit || 9,
    selectPage: (state: StateSchema) => state.articles?.page || 1,
    selectHasMore: (state: StateSchema) => state.articles?.hasMore,
    selectInited: (state: StateSchema) => state.articles?._inited,
    selectSort: (state: StateSchema) => state.articles?.sort ?? ArticleSortFields.CREATED,
    selectOrder: (state: StateSchema) => state.articles?.order ?? "asc",
    selectSearch: (state: StateSchema) => state.articles?.search ?? "",
    selectType: (state: StateSchema) => state.articles?.type ?? ArticleType.ALL,
};
