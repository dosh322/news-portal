import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
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
            <Button
                type="button"
                onClick={handleToggle}
                className={classes.toggleButton}
                data-testid="toggle-btn"
            >
                {t("toggle")}
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher className={classes.ThemeSwitcher} />
                <LangSwitcher classname={classes.langSwitcher} />
            </div>
        </div>
    );
}

export { Sidebar };
