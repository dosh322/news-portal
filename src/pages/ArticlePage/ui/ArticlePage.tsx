import { Article, ArticleList } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { routePaths } from "shared/config/routesConfig";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Text, TextSize } from "shared/ui/Text";
import Page from "widgets/Page/Page";
import { addCommentForArticle } from "../model/services/addCommentForArticle/addCommentForArticle";
import { fetchArticleRecommendations } from "../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleCommentsSelectors } from "../model/slices/articleCommentsSlice";
import { articleRecommendationsSelectors } from "../model/slices/articleRecommendationsSlice";
import classes from "./ArticlePage.module.scss";

function ArticlePage() {
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const comments = useSelector(articleCommentsSelectors.selectAll);
    const recommendations = useSelector(articleRecommendationsSelectors.selectAll);
    const areRecommendationsLoading = useSelector(
        articleRecommendationsSelectors.selectArticleRecommendationsIsLoading,
    );
    const commentsIsLoading = useSelector(
        articleCommentsSelectors.selectArticleCommentsIsLoading,
    );

    const handleBackBtnClick = useCallback(() => {
        navigate(routePaths.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    const handleSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return (
        <Page className={classes.articlePage}>
            <Button theme={ButtonTheme.OUTLINE} onClick={handleBackBtnClick}>
                {t("back to list")}
            </Button>
            <Article />
            <Text
                size={TextSize.L}
                className={classes.commentTitle}
                title={t("recommendations")}
            />
            <ArticleList
                articles={recommendations}
                isLoading={areRecommendationsLoading}
                className={classes.recommendations}
                target="_blank"
            />
            <Text
                size={TextSize.L}
                className={classes.commentTitle}
                title={t("comments")}
            />
            <AddCommentForm onSendComment={handleSendComment} />
            <CommentList comments={comments} isLoading={commentsIsLoading} />
        </Page>
    );
}

export default memo(ArticlePage);
