export { fetchArticle } from "./model/services/fetchArticleById";
export { articleActions } from "./model/slice/articleSlice";
export { ArticleSortFields, ArticleType, ArticleView } from "./model/types";
export type { ArticleSchema, Article as IArticle } from "./model/types";
export { Article } from "./ui/Article/Article";
export { ArticleList } from "./ui/ArticleList";
export { ArticleSortSelector } from "./ui/ArticleSortSelector/ArticleSortSelector";
export { ArticlesViewSelector } from "./ui/ArticlesViewSelector/ArticlesViewSelector";
export { ArticleTypeTabs } from "./ui/ArticleTypeTabs/ArticleTypeTabs";
import { selectCanEditArticle } from "./model/selectors/article";
import { selectors } from "./model/slice/articleSlice";

export const articleSelectors = {
    ...selectors,
    selectCanEditArticle,
};
