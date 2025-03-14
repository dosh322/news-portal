import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer, StateSchema } from "@/app/providers/StoreProvider";
import { ArticleSortFields, ArticleView, IArticle } from "@/entities/Article";
import { ArticleType } from "@/entities/Article/model/types";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "@/shared/constants/localStorage";
import { SortOrder } from "@/shared/types";
import { fetchArticles } from "../services/fetchArticles";
import { ArticlesListSchema } from "../types/ArticlesListSchema";

const articlesAdapter = createEntityAdapter<IArticle, string>({
    selectId: (article) => article.id,
});

export const articlesCRUDSelectors = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articles || articlesAdapter.getInitialState(),
);

const articlesSlice = createSlice({
    name: "articles",
    initialState: articlesAdapter.getInitialState<ArticlesListSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        page: 1,
        limit: 9,
        hasMore: true,
        search: "",
        sort: ArticleSortFields.CREATED,
        order: "asc",
        type: ArticleType.ALL,
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view =
                (localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView) ||
                ArticleView.SMALL;

            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortFields>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg && action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg && action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

const injectedArticlesSlice = articlesSlice.injectInto(rootReducer);

export const { actions: articlesActions, reducer: articlesReducer } =
    injectedArticlesSlice;
