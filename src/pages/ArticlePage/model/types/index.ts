import { ArticleCommentsSchema } from "./ArticleCommentsSchema";
import { ArticleRecommendationsSchema } from "./ArticleRecommendationsSchema";

export interface ArticlePageSchema {
    comments?: ArticleCommentsSchema;
    recommendations?: ArticleRecommendationsSchema;
}
