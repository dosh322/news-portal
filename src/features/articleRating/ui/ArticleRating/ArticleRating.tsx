import { RatingCard } from "@/entities/Rating";
import { getUser } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi";

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo(function ArticleRating({
    className,
    articleId,
}: ArticleRatingProps) {
    const { t } = useTranslation("article");
    const userData = useSelector(getUser);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? "",
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? "",
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                // handle error
                // eslint-disable-next-line no-console
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const handleAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const handleCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onCancel={handleCancel}
            onAccept={handleAccept}
            rating={rating?.rate}
            className={className}
            title={t("rate article")}
            feedbackTitle={t("feedbackTitle")}
            hasFeedback
        />
    );
});

export default ArticleRating;
