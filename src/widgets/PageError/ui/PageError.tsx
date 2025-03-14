import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";

import classes from "./PageError.module.scss";

interface Props {
    className?: string;
}

export function PageError({ className }: Props) {
    const { t } = useTranslation();

    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={clsx(classes.pageError, className)}>
            <p>{t("unknown error")}</p>
            <Button onClick={reloadPage}>{t("Reload page")}</Button>
        </div>
    );
}
