import { Page } from "@/widgets/Page";
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import classes from "./NotFoundPage.module.scss";

interface Props {
    className?: string;
}

const NotFoundPage = memo(function NotFoundPage({ className }: Props) {
    const { t } = useTranslation("notFound");

    return (
        <Page className={clsx(classes.NotFoundPage, className)}>
            {t("Page not found")}
        </Page>
    );
});

export default NotFoundPage;
