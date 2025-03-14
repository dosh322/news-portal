import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleType, IArticle } from "@/entities/Article";
import { addQueryParams } from "@/shared/lib/url/addQueryParams/addQueryParams";
import { articlesSelectors } from "../selectors";

interface FetchArticlesReqParams {
    replace?: boolean;
}

export const fetchArticles = createAsyncThunk<
    IArticle[],
    FetchArticlesReqParams | void,
    ThunkConfig<string>
>("articles/fetchArticles", async ({ replace } = {}, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = articlesSelectors.selectLimit(getState());
    const sort = articlesSelectors.selectSort(getState());
    const order = articlesSelectors.selectOrder(getState());
    const search = articlesSelectors.selectSearch(getState());
    const page = articlesSelectors.selectPage(getState());
    const type = articlesSelectors.selectType(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<IArticle[]>("/articles", {
            params: {
                _expand: "user",
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue("error");
    }
});
