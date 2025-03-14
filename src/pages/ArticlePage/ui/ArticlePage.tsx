import { Article } from "@/entities/Article";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { VStack } from "@/shared/ui/Stack";
import Page from "@/widgets/Page/Page";
import { ArticleComments } from "./ArticleComments/ArticleComments";
import classes from "./ArticlePage.module.scss";
import { ArticlePageHeader } from "./ArticlePageHeader/ArticlePageHeader";

function ArticlePage() {
    const { id = "" } = useParams<{ id: string }>();

    return (
        <Page className={classes.articlePage}>
            <VStack gap="16" max>
                <ArticlePageHeader />
                <Article />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
}

export default memo(ArticlePage);
