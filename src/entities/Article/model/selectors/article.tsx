import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "entities/User";
import { selectors } from "../slice/articleSlice";

export const selectCanEditArticle = createSelector(
    getUser,
    selectors.selectArticleData,
    (user, article) => {
        if (!user || !article) {
            return false;
        }

        return article.user.id === user.id;
    },
);
