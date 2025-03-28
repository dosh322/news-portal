import {
    ArticleSortFields,
    ArticleType,
    ArticleView,
    IArticle,
} from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { EntityState } from "@reduxjs/toolkit";

export interface ArticlesListSchema extends EntityState<IArticle, string> {
    isLoading?: boolean;
    error?: string;
    page: number;
    limit: number;
    hasMore: boolean;
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortFields;
    search: string;
    type: ArticleType;
    _inited: boolean;
}
