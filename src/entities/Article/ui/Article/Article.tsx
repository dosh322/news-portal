import { articleSelectors, fetchArticle } from "entities/Article";
import { ArticleBlock, ArticleBlockType } from "entities/Article/model/types";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CalendarIcon from "shared/assets/icons/calendar-20-20.svg";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { Avatar } from "shared/ui/Avatar";
import { Icon } from "shared/ui/Icon";
import { Skeleton } from "shared/ui/Skeleton";
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text";
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock";
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";
import classes from "./Article.module.scss";

interface Props {
    className?: string;
}

function Article({ className }: Props) {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const isLoading = useSelector(articleSelectors.selectArticleIsLoading);
    const error = useSelector(articleSelectors.selectArticleError);
    const article = useSelector(articleSelectors.selectArticleData);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlock
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlock
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlock
                        key={block.id}
                        className={classes.block}
                        block={block}
                    />
                );
            default:
                return null;
        }
    }, []);

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticle(id));
        }
    });

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={classes.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={classes.title} width={300} height={32} />
                <Skeleton className={classes.skeleton} width={600} height={24} />
                <Skeleton className={classes.skeleton} width={"100%"} height={200} />
                <Skeleton className={classes.skeleton} width={"100%"} height={200} />
            </>
        );
    } else if (!id || error) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                title={t("NO_ARTICLE")}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <>
                <div className={classes.avatarWrapper}>
                    <Avatar size={200} src={article?.img} className={classes.avatar} />
                </div>
                <Text
                    size={TextSize.L}
                    title={article?.title}
                    text={article?.subtitle}
                    className={classes.title}
                />
                <div className={classes.articleInfo}>
                    <Icon className={classes.icon} Svg={EyeIcon} />
                    <Text text={article?.views.toString()} />
                </div>
                <div className={classes.articleInfo}>
                    <Icon Svg={CalendarIcon} className={classes.icon} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return <div className={classes.article}>{content}</div>;
}

export { Article };
