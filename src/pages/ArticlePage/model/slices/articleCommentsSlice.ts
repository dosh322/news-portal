import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { articlePageReducer } from ".";
import { fetchCommentsByArticleId } from "../services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { ArticleCommentsSchema } from "../types/ArticleCommentsSchema";

const commentsAdapter = createEntityAdapter<Comment, string>({
    selectId: (comment) => comment.id,
});

const articleCommentsCRUDSelectors = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articlePage.comments || commentsAdapter.getInitialState(),
);

const articleCommentsSlice = createSlice({
    name: "comments",
    initialState: commentsAdapter.getInitialState<ArticleCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    selectors: {
        selectArticleCommentsIsLoading: (state) => state.isLoading,
        selectArticleCommentsError: (state) => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    commentsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

const injectedArticleCommentsSlice = articleCommentsSlice.injectInto(articlePageReducer);

export const {
    actions: articleCommentsActions,
    reducer: articleCommentsReducer,
    selectors,
} = injectedArticleCommentsSlice;

export const articleCommentsSelectors = { ...selectors, ...articleCommentsCRUDSelectors };
