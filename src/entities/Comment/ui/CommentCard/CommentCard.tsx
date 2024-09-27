import clsx from "clsx";
import { memo } from "react";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text } from "shared/ui/Text";
import { Comment } from "../../model/types/comment";
import classes from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(function CommentCard({
    className,
    comment,
    isLoading,
}: CommentCardProps) {
    if (isLoading) {
        return (
            <div className={clsx(classes.CommentCard, className)}>
                <div className={classes.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={classes.username} />
                </div>
                <Skeleton className={classes.text} width="100%" height={50} />
            </div>
        );
    }

    return (
        <div className={clsx(classes.CommentCard, className)}>
            <div className={classes.header}>
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text className={classes.username} title={comment.user.username} />
            </div>
            <Text className={classes.text} text={comment.text} />
        </div>
    );
});
