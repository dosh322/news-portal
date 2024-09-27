import clsx from "clsx";
import { memo } from "react";
import { Text, TextAlign } from "shared/ui/Text";
import { ArticleImageBlock as IArticleImageBlock } from "../../model/types";
import classes from "./ArticleImageBlock.module.scss";

interface ArticleImageBlockProps {
    className?: string;
    block: IArticleImageBlock;
}

export const ArticleImageBlock = memo(function ArticleImageBlock(
    props: ArticleImageBlockProps,
) {
    const { className, block } = props;

    return (
        <div className={clsx(classes.ArticleImageBlockComponent, className)}>
            <img src={block.src} alt={block.title} className={classes.img} />
            {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
        </div>
    );
});
