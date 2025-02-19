import { clsx } from "clsx";
import { ArticleCodeBlock as IArticleCodeBlock } from "../../model/types";
import { memo } from "react";
import { Code } from "shared/ui/Code";
import classes from "./ArticleCodeBlock.module.scss";

interface ArticleCodeBlockProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlock = memo(function ArticleCodeBlock({
    className,
    block,
}: ArticleCodeBlockProps) {
    return (
        <div className={clsx(classes.ArticleCodeBlockComponent, className)}>
            <Code text={block.code} />
        </div>
    );
});
