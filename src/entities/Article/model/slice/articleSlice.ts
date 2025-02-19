import { createSlice } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import { fetchArticle } from "../services/fetchArticleById";
import { ArticleSchema } from "../types";

const initialState: ArticleSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    selectors: {
        selectArticleData: (state) => state.data,
        selectArticleIsLoading: (state) => state.isLoading,
        selectArticleError: (state) => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticle.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? undefined;
            });
    },
});

const injectedArticleSlice = articleSlice.injectInto(rootReducer);

export const {
    actions: articleActions,
    reducer: articleReducer,
    selectors,
} = injectedArticleSlice;
