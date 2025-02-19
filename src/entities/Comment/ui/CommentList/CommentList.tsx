import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";

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
            <VStack max gap="8" className={clsx(className)}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack max gap="16" className={clsx(className)}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
            ) : (
                <Text text={t("no comments")} />
            )}
        </VStack>
    );
});
