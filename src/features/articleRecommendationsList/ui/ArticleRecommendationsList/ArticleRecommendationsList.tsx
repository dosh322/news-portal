import clsx from "clsx";
import { ArticleList } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { VStack } from "shared/ui/Stack";
import { Text, TextSize } from "shared/ui/Text";
import { useArticleRecommendations } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(function ArticleRecommendationsList({
    className,
}: ArticleRecommendationsListProps) {
    const { t } = useTranslation("article");
    const { isLoading, data: recommendations, error } = useArticleRecommendations(3);

    if (isLoading || error || !recommendations) {
        return null;
    }

    return (
        <VStack gap="8" className={clsx(className)}>
            <Text size={TextSize.L} title={t("recommendations")} />
            <ArticleList
                articles={recommendations}
                isLoading={isLoading}
                target="_blank"
            />
        </VStack>
    );
});
