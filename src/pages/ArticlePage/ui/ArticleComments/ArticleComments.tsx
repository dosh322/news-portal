import clsx from "clsx";
import { CommentList } from "@/entities/Comment";
import { getUser } from "@/entities/User";
import { AddCommentForm } from "@/features/addCommentForm";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spinner } from "@/shared/ui/Spinner";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextSize } from "@/shared/ui/Text";
import { useArticleComments, useSaveArticleComment } from "../../api/articleCommentsApi";

interface Props {
    id: string;
    className?: string;
}

function ArticleComments({ className, id }: Props) {
    const { t } = useTranslation("article");
    const { data, isLoading, isError } = useArticleComments(id);
    const user = useSelector(getUser);
    const [
        saveComment,
        { isLoading: isCommentSaving, error: isCommentSaveError, data: commentSaveData },
    ] = useSaveArticleComment();

    const handleSaveComment = (text: string) => {
        saveComment({ text, userId: user?.id || "", articleId: id });
    };

    if (!data || isLoading || isError) {
        return null;
    }

    return (
        <VStack gap="16" max className={clsx(className)}>
            <Text size={TextSize.L} title={t("comments")} />
            <Suspense fallback={<Spinner />}>
                <AddCommentForm onSendComment={handleSaveComment} />
            </Suspense>
            <CommentList comments={data} isLoading={isCommentSaving || isLoading} />
        </VStack>
    );
}

export { ArticleComments };
