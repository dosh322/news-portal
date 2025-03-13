import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { ArticleSortFields, ArticleType } from "entities/Article";
import { SortOrder } from "shared/types";
import { articlesActions } from "../slices/articlesListSlice";
import { fetchArticles } from "./fetchArticles";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>("articles/init", (searchParams, thunkApi) => {
    const { dispatch } = thunkApi;
    const orderFromUrl = searchParams.get("order") as SortOrder;
    const sortFromUrl = searchParams.get("sort") as ArticleSortFields;
    const searchFromUrl = searchParams.get("search");
    const typeFromUrl = searchParams.get("type") as ArticleType;

    if (orderFromUrl) {
        dispatch(articlesActions.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
        dispatch(articlesActions.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
        dispatch(articlesActions.setSearch(searchFromUrl));
    }
    if (typeFromUrl) {
        dispatch(articlesActions.setType(typeFromUrl));
    }

    dispatch(articlesActions.initState());
    dispatch(fetchArticles());
});
