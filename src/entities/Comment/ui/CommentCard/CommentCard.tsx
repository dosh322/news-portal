import { routePaths } from "@/shared/constants/router";
import { AppLink } from "@/shared/ui/AppLink";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import clsx from "clsx";
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import classes from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(function CommentCard({
    className,
    comment,
    isLoading,
}: CommentCardProps) {
    if (isLoading) {
        return (
            <VStack
                max
                gap="8"
                className={clsx(classes.CommentCard, classes.loading, className)}
            >
                <div className={classes.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={classes.username} />
                </div>
                <Skeleton className={classes.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack gap="8" max className={clsx(classes.CommentCard, className)}>
            <AppLink
                to={`${routePaths.profile}${comment.user.id}`}
                className={classes.header}
            >
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text className={classes.username} title={comment.user.username} />
            </AppLink>
            <Text className={classes.text} text={comment.text} />
        </VStack>
    );
});
