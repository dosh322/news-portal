import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { HStack } from "@/shared/ui/Stack";
import clsx from "clsx";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    addCommentFormActions,
    addCommentFormSelectors,
} from "../../model/slices/addCommentFormSlice";
import cls from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
    className?: string;
    onSendComment?: (text: string) => void;
}

const AddCommentForm = memo(function AddCommentForm({
    className,
    onSendComment,
}: AddCommentFormProps) {
    const { t } = useTranslation("article");
    const text = useSelector(addCommentFormSelectors.selectAddCommentFormText);
    const dispatch = useAppDispatch();

    const handleCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const handleSendComment = useCallback(() => {
        if (onSendComment) {
            onSendComment(text || "");
        }
        handleCommentTextChange("");
    }, [handleCommentTextChange, onSendComment, text]);

    return (
        <HStack justify="between" max className={clsx(cls.AddCommentForm, className)}>
            <Input
                className={cls.input}
                placeholder={t("add comment")}
                value={text}
                onChange={handleCommentTextChange}
            />
            <Button theme={ButtonTheme.OUTLINE} onClick={handleSendComment}>
                {t("send comment")}
            </Button>
        </HStack>
    );
});

export default AddCommentForm;
