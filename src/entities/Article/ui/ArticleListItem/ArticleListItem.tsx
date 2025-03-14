import clsx from "clsx";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import { routePaths } from "@/shared/config/routesConfig";
import { AppLink } from "@/shared/ui/AppLink";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Text } from "@/shared/ui/Text";
import {
    Article,
    ArticleBlockType,
    ArticleView,
    ArticleTextBlock as IArticleTextBlock,
} from "../../model/types";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";
import classes from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(function ArticleListItem({
    className,
    article,
    view,
    target = "_self",
}: ArticleListItemProps) {
    const { t } = useTranslation("articlesList");
    const articleLink = `${routePaths.article}${article.id}`;

    const types = <Text text={article.type.join(", ")} className={classes.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={classes.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as IArticleTextBlock;

        return (
            <div className={clsx(classes.ArticleListItem, className, classes[view])}>
                <Card className={classes.card}>
                    <div className={classes.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={classes.username} />
                        <Text text={article.createdAt} className={classes.date} />
                    </div>
                    <Text title={article.title} className={classes.title} />
                    {types}
                    <img src={article.img} className={classes.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlock
                            block={textBlock}
                            className={classes.textBlock}
                        />
                    )}
                    <div className={classes.footer}>
                        <AppLink to={articleLink} target={target}>
                            <Button theme={ButtonTheme.OUTLINE}>{t("read more")}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            to={articleLink}
            className={clsx(classes.ArticleListItem, className, classes[view])}
            target={target}
        >
            <Card className={classes.card}>
                <div className={classes.imageWrapper}>
                    <img alt={article.title} src={article.img} className={classes.img} />
                    <Text text={article.createdAt} className={classes.date} />
                </div>
                <div className={classes.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={classes.title} />
            </Card>
        </AppLink>
    );
});
