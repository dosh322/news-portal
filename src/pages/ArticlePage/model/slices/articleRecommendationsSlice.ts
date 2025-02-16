import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article/model/types";
import { articlePageReducer } from ".";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleRecommendationsSchema } from "../types/ArticleRecommendationsSchema";

const recommendationsAdapter = createEntityAdapter<Article, string>({
    selectId: (article) => article.id,
});

const articleRecommendationsCRUDSelectors =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articlePage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    );

const articleRecommendationsSlice = createSlice({
    name: "recommendations",
    initialState: recommendationsAdapter.getInitialState<ArticleRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    selectors: {
        selectArticleRecommendationsIsLoading: (state) => state.isLoading,
        selectArticleRecommendationsError: (state) => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

const injectedArticleRecommendationsSlice =
    articleRecommendationsSlice.injectInto(articlePageReducer);

export const {
    actions: articleRecommendationsActions,
    reducer: articleRecommendationsReducer,
    selectors,
} = injectedArticleRecommendationsSlice;

export const articleRecommendationsSelectors = {
    ...selectors,
    ...articleRecommendationsCRUDSelectors,
};
