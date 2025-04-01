import { ArticleSortFields, ArticleType, ArticleView } from "@/entities/Article";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticlesViewSelector } from "@/features/ArticlesViewSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/shared/types";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { articlesSelectors } from "../../model/selectors";
import { fetchArticles } from "../../model/services/fetchArticles";
import { articlesActions } from "../../model/slices/articlesListSlice";
import classes from "./ArticlesListPageFilters.module.scss";

interface Props {
    className?: string;
}

function ArticlesListPageFilters({ className }: Props) {
    const { t } = useTranslation("articlesList");
    const view = useSelector(articlesSelectors.selectView);
    const sort = useSelector(articlesSelectors.selectSort);
    const order = useSelector(articlesSelectors.selectOrder);
    const search = useSelector(articlesSelectors.selectSearch);
    const type = useSelector(articlesSelectors.selectType);
    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const handleSortChange = useCallback(
        (newSort: ArticleSortFields) => {
            dispatch(articlesActions.setSort(newSort));
            dispatch(articlesActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const handleOrderChange = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesActions.setOrder(newOrder));
            dispatch(articlesActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const handleSearchChange = useCallback(
        (search: string) => {
            dispatch(articlesActions.setSearch(search));
            dispatch(articlesActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const handleViewChange = useCallback(
        (newView: ArticleView) => {
            dispatch(articlesActions.setView(newView));
        },
        [dispatch],
    );

    const handleChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesActions.setType(value));
            dispatch(articlesActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return (
        <div>
            <div className={classes.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={handleOrderChange}
                    onChangeSort={handleSortChange}
                />
                <ArticlesViewSelector view={view} onViewClick={handleViewChange} />
            </div>
            <Card className={classes.search}>
                <Input
                    placeholder={t("search")}
                    value={search}
                    onChange={handleSearchChange}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={handleChangeType}
                className={classes.tabs}
            />
        </div>
    );
}

export default memo(ArticlesListPageFilters);
