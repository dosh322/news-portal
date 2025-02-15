import clsx from "clsx";
import { ArticleList } from "entities/Article";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import Page from "widgets/Page/Page";
import { fetchNextArticles } from "../../model/services/fetchNextArticlesPage/fetchNextArticles";
import { initArticlesPage } from "../../model/services/initArticlesPage";
import { articlesSelectors } from "../../model/slices/articlesListSlice";
import ArticlesListPageFilters from "../ArticlesListPageFilters/ArticlesListPageFilters";
import classes from "./ArticlesListPage.module.scss";

interface Props {
    className?: string;
}

function ArticlesListPage({ className }: Props) {
    const articles = useSelector(articlesSelectors.selectAll);
    const isLoading = useSelector(articlesSelectors.selectArticlesAreLoading);
    const view = useSelector(articlesSelectors.selectView);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const handlePageChange = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    return (
        <Page className={clsx(className)} onScrollEnd={handlePageChange}>
            <ArticlesListPageFilters />
            <ArticleList
                className={classes.list}
                isLoading={isLoading}
                view={view}
                articles={articles}
            />
        </Page>
    );
}

export default memo(ArticlesListPage);
