import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { memo } from "react";
import Page from "@/widgets/Page/Page";
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
