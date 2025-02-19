import { useCallback } from "react";
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
import { HStack, VStack } from "shared/ui/Stack";
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text";
import { articleSelectors } from "../../.";
import { fetchArticle } from "../../model/services/fetchArticleById";
import { ArticleBlock, ArticleBlockType } from "../../model/types";
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
            <VStack gap="16" max>
                <HStack justify="center" max>
                    <Skeleton
                        className={classes.avatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                </HStack>

                <Skeleton width={300} height={32} />
                <Skeleton width={600} height={24} />
                <Skeleton width={"100%"} height={200} />
                <Skeleton width={"100%"} height={200} />
            </VStack>
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
                <HStack justify="center" max>
                    <Avatar size={200} src={article?.img} className={classes.avatar} />
                </HStack>
                <VStack gap="4" max>
                    <Text
                        size={TextSize.L}
                        title={article?.title}
                        text={article?.subtitle}
                        className={classes.title}
                    />
                    <HStack gap="8">
                        <Icon className={classes.icon} Svg={EyeIcon} />
                        <Text text={article?.views.toString()} />
                    </HStack>
                    <HStack gap="8">
                        <Icon Svg={CalendarIcon} />
                        <Text text={article?.createdAt} />
                    </HStack>
                </VStack>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <VStack gap="16" max className={classes.article}>
            {content}
        </VStack>
    );
}

export { Article };
