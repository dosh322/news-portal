import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { IArticle } from "entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
    IArticle[],
    void,
    ThunkConfig<string>
>("article/fetchArticleRecommendations", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<IArticle[]>("/articles", {
            params: {
                _limit: 4,
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
