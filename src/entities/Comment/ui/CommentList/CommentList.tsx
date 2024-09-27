import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import classes from "./CommentList.module.scss";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(function CommentList({
    className,
    isLoading,
    comments,
}: CommentListProps) {
    const { t } = useTranslation("article");

    if (isLoading) {
        return (
            <div className={clsx(classes.CommentList, className)}>
                <CommentCard className={classes.comment} isLoading />
                <CommentCard className={classes.comment} isLoading />
                <CommentCard className={classes.comment} isLoading />
            </div>
        );
    }

    return (
        <div className={clsx(classes.CommentList, className)}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        className={classes.comment}
                        comment={comment}
                    />
                ))
            ) : (
                <Text text={t("no comments")} />
            )}
        </div>
    );
});
