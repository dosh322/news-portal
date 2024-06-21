import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import { routePaths } from "shared/config/routesConfig";
import { AppLink } from "shared/ui/AppLink";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button";
import { LangSwitcher } from "widgets/LangSwithcer";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

import classes from "./Sidebar.module.scss";

interface SidebarProps {
    className?: string;
}

function Sidebar({ className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useTranslation("shared");

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div
            className={clsx(classes.Sidebar, isCollapsed && classes.collapsed, className)}
            data-testid="sidebar"
        >
            <div className={classes.items}>
                <AppLink to={routePaths.home} className={classes.item}>
                    <MainIcon className={classes.icon} />
                    <span className={classes.link}>{t("home page")}</span>
                </AppLink>
                <AppLink to={routePaths.about} className={classes.item}>
                    <AboutIcon className={classes.icon} />
                    <span className={classes.link}>{t("about page")}</span>
                </AppLink>
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher className={classes.ThemeSwitcher} />
                <LangSwitcher classname={classes.langSwitcher} short={isCollapsed} />
            </div>
            <Button
                type="button"
                onClick={handleToggle}
                className={classes.collapsedBtn}
                data-testid="toggle-btn"
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {isCollapsed ? ">" : "<"}
            </Button>
        </div>
    );
}

export { Sidebar };
