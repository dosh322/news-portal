import { Article } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { Text } from "shared/ui/Text";
import { addCommentForArticle } from "../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { articleCommentsSelectors } from "../model/slices/articleCommentsSlice";
import classes from "./ArticlePage.module.scss";

function ArticlePage() {
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(articleCommentsSelectors.selectAll);
    const commentsIsLoading = useSelector(
        articleCommentsSelectors.selectArticleCommentsIsLoading,
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const handleSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return (
        <div className={classes.articlePage}>
            <Article />
            <Text className={classes.commentTitle} title={t("comments")} />
            <AddCommentForm onSendComment={handleSendComment} />
            <CommentList comments={comments} isLoading={commentsIsLoading} />
        </div>
    );
}

export default memo(ArticlePage);
