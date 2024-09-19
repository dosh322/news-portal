import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { memo } from "react";
import classes from "./NotFoundPage.module.scss";

interface Props {
    className?: string;
}

const NotFoundPage = memo(function NotFoundPage({ className }: Props) {
    const { t } = useTranslation("notFound");

    return (
        <div className={clsx(classes.NotFoundPage, className)}>{t("Page not found")}</div>
    );
});

export default NotFoundPage;
