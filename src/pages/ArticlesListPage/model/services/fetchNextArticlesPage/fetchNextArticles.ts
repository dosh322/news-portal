import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { articlesSelectors } from "../../selectors";
import { articlesActions } from "../../slices/articlesListSlice";
import { fetchArticles } from "../fetchArticles";

export const fetchNextArticles = createAsyncThunk<void, void, ThunkConfig<string>>(
    "articles/fetchNextArticles",
    (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = articlesSelectors.selectHasMore(getState());
        const page = articlesSelectors.selectPage(getState());
        const isLoading = articlesSelectors.selectArticlesAreLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesActions.setPage(page + 1));
            dispatch(fetchArticles());
        }
    },
);
