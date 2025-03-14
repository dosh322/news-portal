import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "../types";

export const fetchArticle = createAsyncThunk<Article, string, ThunkConfig<string>>(
    "article/fetchArticle",
    async (articleId, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: "user",
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue("NO_ARTICLE");
        }
    },
);
