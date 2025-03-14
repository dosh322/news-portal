import { EntityState } from "@reduxjs/toolkit";
import { ArticleSortFields, ArticleView, IArticle } from "@/entities/Article";
import { ArticleType } from "@/entities/Article/model/types";
import { SortOrder } from "@/shared/types";

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
