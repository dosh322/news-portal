import clsx from "clsx";
import { routePaths } from "shared/config/routesConfig/routesConfig";
import { AppLink } from "shared/ui/AppLink";

import { useTranslation } from "react-i18next";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();

    return (
        <nav className={clsx(classes.Navbar, className)}>
            <div className={clsx(classes.links)}>
                <AppLink to={routePaths.home}>{t("home page")}</AppLink>
                <AppLink to={routePaths.about}>{t("about page")}</AppLink>
            </div>
        </nav>
    );
}

export { Navbar };
