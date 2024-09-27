import clsx from "clsx";
import { memo } from "react";
import { Text } from "shared/ui/Text";
import { ArticleTextBlock as IArticleTextBlock } from "../../model/types";
import classes from "./ArticleTextBlock.module.scss";

interface ArticleTextBlockProps {
    className?: string;
    block: IArticleTextBlock;
}

export const ArticleTextBlock = memo(function ArticleTextBlock({
    className,
    block,
}: ArticleTextBlockProps) {
    return (
        <div className={clsx(classes.ArticleTextBlockComponent, className)}>
            {block.title && <Text title={block.title} className={classes.title} />}
            {block.paragraphs.map((paragraph) => (
                <Text key={paragraph} text={paragraph} className={classes.paragraph} />
            ))}
        </div>
    );
});
