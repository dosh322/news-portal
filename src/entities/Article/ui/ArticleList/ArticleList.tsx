import clsx from "clsx";
import { ArticleListItemSkeleton } from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextSize } from "shared/ui/Text";
import { Article, ArticleView } from "../../model/types";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import classes from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={classes.card} key={index} view={view} />
        ));

export const ArticleList = memo(function ArticleList({
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
}: ArticleListProps) {
    const { t } = useTranslation("articlesList");
    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={classes.card}
            key={article.id}
        />
    );

    if (!isLoading && articles.length === 0) {
        return (
            <div className={clsx(classes.ArticleList, className, classes[view])}>
                <Text size={TextSize.L} title={t("not found")} />
            </div>
        );
    }

    return (
        <div className={clsx(classes.ArticleList, className, classes[view])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
