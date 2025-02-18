import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Page from "widgets/Page/Page";
import classes from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo(function ArticleEditPage({
    className,
}: ArticleEditPageProps) {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={clsx(classes.ArticleEditPage, className)}>
            {isEdit
                ? t("Редактирование статьи с ID = ") + id
                : t("Создание новой статьи")}
        </Page>
    );
});

export default ArticleEditPage;
