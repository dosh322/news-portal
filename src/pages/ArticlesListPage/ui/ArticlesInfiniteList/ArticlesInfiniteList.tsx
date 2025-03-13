import { ArticleList } from "entities/Article";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { Text, TextAlign } from "shared/ui/Text";
import { articlesSelectors } from "../../model/selectors";
import { fetchNextArticles } from "../../model/services/fetchNextArticlesPage/fetchNextArticles";
import { initArticlesPage } from "../../model/services/initArticlesPage";
import { articlesCRUDSelectors } from "../../model/slices/articlesListSlice";

interface Props {
    className?: string;
}

function ArticlesInfiniteList({ className }: Props) {
    const articles = useSelector(articlesCRUDSelectors.selectAll);
    const { t } = useTranslation();
    const isLoading = useSelector(articlesSelectors.selectArticlesAreLoading);
    const err = useSelector(articlesSelectors.selectArticlesError);
    const view = useSelector(articlesSelectors.selectView);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const handlePageChange = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    if (err) {
        return <Text align={TextAlign.CENTER} title={t("error")} />;
    }

    return (
        <ArticleList
            className={className}
            isLoading={isLoading}
            view={view}
            articles={articles}
            virtualized
            onEndReached={handlePageChange}
        />
    );
}

export { ArticlesInfiniteList };
