import { EntityState } from "@reduxjs/toolkit";
import { Article } from "entities/Article/model/types";

export interface ArticleRecommendationsSchema extends EntityState<Article, string> {
    isLoading?: boolean;
    error?: string;
}
