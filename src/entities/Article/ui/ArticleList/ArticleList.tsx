import clsx from "clsx";
import { ArticleListItemSkeleton } from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { Text, TextSize } from "shared/ui/Text";
import { Article, ArticleView } from "../../model/types";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import classes from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualized?: boolean;
    onEndReached?: () => void;
}

interface ArticlesFooterProps {
    context?: {
        view: ArticleView;
        isLoading?: boolean;
    };
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={classes.card} key={index} view={view} />
        ));

const ArticlesFooter = memo(function ArticlesFooter({ context }: ArticlesFooterProps) {
    if (context && context.isLoading) {
        const { view } = context;

        return <div className={clsx(classes[view])}>{getSkeletons(view)}</div>;
    }

    return null;
});

export const ArticleList = memo(function ArticleList({
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target = "_self",
    virtualized = false,
    onEndReached,
}: ArticleListProps) {
    const { t } = useTranslation("articlesList");
    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={classes.card}
            key={article.id}
            target={target}
        />
    );

    if (!isLoading && articles.length === 0) {
        return (
            <div className={clsx(classes.ArticleList, className, classes[view])}>
                <Text size={TextSize.L} title={t("not found")} />
            </div>
        );
    }

    if (!virtualized) {
        return (
            <div className={clsx(classes.ArticleList, className, classes[view])}>
                {articles.length > 0 ? articles.map(renderArticle) : null}
                {isLoading && getSkeletons(view)}
            </div>
        );
    }

    if (view === ArticleView.BIG) {
        return (
            <Virtuoso
                context={{ isLoading, view }}
                data={articles}
                className={clsx(classes[view], className)}
                // По хорошему использовать реф, создать реф и повесить на <Page />, предварительно смержив их
                // Либо разнести логику и не использовать Page, прокинуть сортировку через components Header
                customScrollParent={document.getElementById("page")!}
                itemContent={(_, article) => renderArticle(article)}
                endReached={onEndReached}
                components={{ Footer: ArticlesFooter }}
            />
        );
    }

    if (view === ArticleView.SMALL) {
        return (
            <VirtuosoGrid
                className={clsx(className)}
                listClassName={classes[view]}
                context={{ isLoading, view }}
                endReached={onEndReached}
                data={articles}
                customScrollParent={document.getElementById("page")!}
                itemContent={(_, article) => renderArticle(article)}
                components={{ Footer: ArticlesFooter }}
            />
        );
    }
});
