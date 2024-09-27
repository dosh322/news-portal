export {
    articleCommentsActions,
    articleCommentsReducer,
    articleCommentsSelectors,
} from "./model/slices/articleCommentsSlice";
export type { ArticleCommentsSchema } from "./model/types/ArticleCommentsSchema";
export { ArticlePageLazy as ArticlePage } from "./ui/ArticlePage.lazy";
