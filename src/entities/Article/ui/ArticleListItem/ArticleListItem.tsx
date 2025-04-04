import EyeIcon from "@/shared/assets/icons/eye-20-20.svg";
import { getRouteArticle } from "@/shared/constants/router";
import { AppImage } from "@/shared/ui/AppImage";
import { AppLink } from "@/shared/ui/AppLink";
import { Avatar } from "@/shared/ui/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Icon } from "@/shared/ui/Icon";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Text } from "@/shared/ui/Text";
import clsx from "clsx";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";
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
    const articleLink = getRouteArticle(article.id);

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
                    <AppImage
                        src={article.img}
                        className={classes.img}
                        alt={article.title}
                        fallback={<Skeleton width="100%" height={250} />}
                    />
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
                    <AppImage
                        src={article.img}
                        className={classes.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
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
